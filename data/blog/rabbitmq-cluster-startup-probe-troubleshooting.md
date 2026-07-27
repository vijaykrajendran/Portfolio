---
title: 'Troubleshooting RabbitMQ Cluster Startup Probe Failures on Kubernetes'
date: '2026-07-27'
tags: ['rabbitmq', 'kubernetes', 'aks', 'troubleshooting', 'cluster']
draft: false
summary: 'Step-by-step guide to diagnose and fix RabbitMQ cluster startup probe failures caused by split-brain scenarios in Kubernetes.'
authors: ['default']
---

In this article, we'll walk through troubleshooting a RabbitMQ cluster that was failing startup probes on Kubernetes (AKS). The root cause was a **split-brain scenario** where one node was running as a standalone cluster instead of joining the main cluster.

## The Problem

After scaling a RabbitMQ cluster to 3 replicas, pods were stuck in a `Running` state but not becoming `Ready` due to startup probe failures.

### Initial Symptoms

```bash
kubectl get pods -n rmq
```

```
NAME                   READY   STATUS    RESTARTS   AGE
rmq-cluster-server-0   1/1     Running   0          10m
rmq-cluster-server-1   1/1     Running   0          7m48s
rmq-cluster-server-2   0/1     Running   0          2m3s
```

Pod `rmq-cluster-server-2` was showing `0/1` Ready with startup probe failures.

### Understanding the Startup Probe

The RabbitMQ operator uses a startup probe that checks if the cluster has reached its target size:

```yaml
startupProbe:
  exec:
    command:
    - /bin/bash
    - -c
    - rabbitmqctl eval 'rabbit_nodes:reached_target_cluster_size().' | grep -q '^true$'
  failureThreshold: 30
  initialDelaySeconds: 10
  periodSeconds: 10
```

This probe returns `true` only when all expected nodes have joined the cluster.

## Diagnosis Steps

### Step 1: Check Pod Events

```bash
kubectl describe pod rmq-cluster-server-2 -n rmq | tail -50
```

Output showed:
```
Warning  Unhealthy  2s (x8 over 72s)  kubelet  Startup probe failed:
```

### Step 2: Check RabbitMQ Logs

```bash
kubectl logs rmq-cluster-server-2 -n rmq --tail=50
```

The logs showed the server started successfully but had TLS certificate warnings:
```
TLS server: In state wait_finished received CLIENT ALERT: Fatal - Bad Certificate
```

### Step 3: Verify Cluster Status from Node 0

```bash
kubectl exec rmq-cluster-server-0 -n rmq -- rabbitmqctl cluster_status
```

This revealed only 2 nodes were in the cluster:
```
Running Nodes

rabbit@rmq-cluster-server-0.rmq-cluster-nodes.rmq
rabbit@rmq-cluster-server-2.rmq-cluster-nodes.rmq
```

**Where was server-1?**

### Step 4: Check Server-1's Cluster Status

```bash
kubectl exec rmq-cluster-server-1 -n rmq -- rabbitmqctl cluster_status
```

Output:
```
Running Nodes

rabbit@rmq-cluster-server-1.rmq-cluster-nodes.rmq
```

**Root Cause Found**: Server-1 was running as a **standalone cluster** with only itself as a member!

### Step 5: Verify Target Cluster Size Check

```bash
kubectl exec rmq-cluster-server-2 -n rmq -- rabbitmqctl eval 'rabbit_nodes:reached_target_cluster_size().'
```

Output: `false`

This confirmed why the startup probe was failing - the target is 3 nodes, but only 2 were actually in the cluster.

## The Split-Brain Scenario

We had two separate clusters:

| Cluster A (Main) | Cluster B (Orphan) |
|------------------|-------------------|
| server-0, server-2 | server-1 (alone) |

This typically happens when:
- A node's PVC retains stale cluster data from a previous deployment
- Race conditions during cluster formation
- Network partitions during initial cluster bootstrap

## The Fix

### Why Deleting the Pod Didn't Work

Simply deleting the pod doesn't help because the **PVC persists** the old cluster membership data:

```bash
kubectl delete pod rmq-cluster-server-1 -n rmq
# Pod restarts but still thinks it's a standalone cluster
```

### Solution: Force Reset and Rejoin

The fix requires resetting the RabbitMQ node and explicitly joining the main cluster:

```bash
# Stop the RabbitMQ application
kubectl exec rmq-cluster-server-1 -n rmq -- rabbitmqctl stop_app

# Reset the node (clears cluster membership data)
kubectl exec rmq-cluster-server-1 -n rmq -- rabbitmqctl reset

# Join the main cluster
kubectl exec rmq-cluster-server-1 -n rmq -- rabbitmqctl join_cluster rabbit@rmq-cluster-server-0.rmq-cluster-nodes.rmq

# Start the application
kubectl exec rmq-cluster-server-1 -n rmq -- rabbitmqctl start_app
```

### Verify the Fix

```bash
kubectl exec rmq-cluster-server-0 -n rmq -- rabbitmqctl cluster_status
```

Output now shows all 3 nodes:
```
Running Nodes

rabbit@rmq-cluster-server-0.rmq-cluster-nodes.rmq
rabbit@rmq-cluster-server-1.rmq-cluster-nodes.rmq
rabbit@rmq-cluster-server-2.rmq-cluster-nodes.rmq
```

Check pod status:
```bash
kubectl get pods -n rmq
```

```
NAME                   READY   STATUS    RESTARTS   AGE
rmq-cluster-server-0   1/1     Running   0          15m
rmq-cluster-server-1   1/1     Running   0          2m52s
rmq-cluster-server-2   1/1     Running   0          7m11s
```

All pods are now `1/1 Running`.

## Testing Auto-Rejoin

After fixing, we tested whether a clean pod restart would auto-rejoin:

```bash
kubectl delete pod rmq-cluster-server-2 -n rmq
```

The pod restarted and **automatically rejoined** the cluster correctly. This confirms:
- **Corrupted/stale PVC data** = needs manual reset
- **Clean restart** (pod deleted, PVC intact with correct cluster data) = auto-rejoin works

## Key Takeaways

1. **Startup probe failures** in RabbitMQ clusters often indicate incomplete cluster formation
2. **Check cluster membership** from multiple nodes to detect split-brain scenarios
3. **`rabbitmqctl reset`** clears cluster membership data and allows a fresh join
4. **PVC data persists** across pod restarts - simply deleting pods won't fix stale cluster data
5. **Always verify** cluster status after any fix using `rabbitmqctl cluster_status`

## Useful Commands Reference

### Cluster Management

| Command | Purpose |
|---------|---------|
| `rabbitmqctl cluster_status` | Check cluster membership and health |
| `rabbitmqctl eval 'rabbit_nodes:reached_target_cluster_size().'` | Check if target cluster size reached |
| `rabbitmqctl stop_app` | Stop RabbitMQ application (keeps Erlang running) |
| `rabbitmqctl start_app` | Start RabbitMQ application |
| `rabbitmqctl reset` | Reset node (clear cluster data) - use when rejoining |
| `rabbitmqctl force_reset` | Force reset even if other nodes are unreachable |
| `rabbitmqctl join_cluster rabbit@<target-node>` | Join existing cluster |
| `rabbitmqctl forget_cluster_node rabbit@<node>` | Remove a node from cluster (run from healthy node) |
| `rabbitmqctl force_boot` | Force node to start even if it wasn't last to shut down |

### Node Maintenance

| Command | Purpose |
|---------|---------|
| `rabbitmqctl drain` | Put node in maintenance mode (stop accepting connections) |
| `rabbitmqctl revive` | Take node out of maintenance mode |
| `rabbitmqctl await_online_nodes <count>` | Wait until N nodes are online |
| `rabbitmqctl await_startup` | Wait for RabbitMQ to fully start |
| `rabbitmqctl shutdown` | Gracefully stop RabbitMQ and Erlang VM |

### Health Checks

| Command | Purpose |
|---------|---------|
| `rabbitmq-diagnostics check_running` | Check if RabbitMQ is running |
| `rabbitmq-diagnostics check_local_alarms` | Check for local alarms (disk/memory) |
| `rabbitmq-diagnostics check_alarms` | Check for cluster-wide alarms |
| `rabbitmq-diagnostics ping` | Simple ping check |
| `rabbitmq-diagnostics status` | Detailed node status |
| `rabbitmq-diagnostics cluster_status` | Cluster-wide status |
| `rabbitmq-diagnostics check_port_connectivity` | Verify port connectivity |
| `rabbitmq-diagnostics memory_breakdown` | Memory usage breakdown |

### Queue Management

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_queues name messages consumers` | List queues with message count |
| `rabbitmqctl list_queues name messages_ready messages_unacknowledged` | Check queue backlogs |
| `rabbitmqctl purge_queue <queue_name>` | Delete all messages from a queue |
| `rabbitmqctl delete_queue <queue_name>` | Delete a queue |
| `rabbitmqctl list_queues name state` | Check queue states (running, down, etc.) |
| `rabbitmqctl sync_queue <queue_name>` | Sync a mirrored queue |

### Connection & Channel Management

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_connections` | List all connections |
| `rabbitmqctl list_connections user peer_host state` | Connections with details |
| `rabbitmqctl list_channels` | List all channels |
| `rabbitmqctl close_connection <connection_pid> "reason"` | Force close a connection |
| `rabbitmqctl list_consumers` | List all consumers |

### User & Permission Management

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_users` | List all users |
| `rabbitmqctl add_user <user> <password>` | Create a user |
| `rabbitmqctl delete_user <user>` | Delete a user |
| `rabbitmqctl change_password <user> <newpass>` | Change user password |
| `rabbitmqctl set_permissions -p <vhost> <user> ".*" ".*" ".*"` | Set full permissions |
| `rabbitmqctl list_permissions -p <vhost>` | List permissions for vhost |
| `rabbitmqctl set_user_tags <user> administrator` | Set user as administrator |

### Virtual Hosts

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_vhosts` | List all virtual hosts |
| `rabbitmqctl add_vhost <vhost>` | Create a virtual host |
| `rabbitmqctl delete_vhost <vhost>` | Delete a virtual host |

### Policy Management

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_policies` | List all policies |
| `rabbitmqctl set_policy ha-all ".*" '{"ha-mode":"all"}'` | Create HA policy (classic queues) |
| `rabbitmqctl clear_policy <name>` | Remove a policy |

### Shovel Management (if enabled)

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_shovels` | List all shovels |
| `rabbitmqctl shovel_status` | Check shovel status |
| `rabbitmqctl restart_shovel <name>` | Restart a shovel |

### Logs & Debugging

| Command | Purpose |
|---------|---------|
| `rabbitmqctl environment` | Show environment variables |
| `rabbitmqctl eval 'rabbit_misc:version().'` | Get RabbitMQ version |
| `rabbitmqctl report` | Generate full diagnostic report |
| `rabbitmq-diagnostics log_tail` | Tail the RabbitMQ log |
| `rabbitmq-diagnostics log_tail_stream` | Stream log in real-time |

### Feature Flags

| Command | Purpose |
|---------|---------|
| `rabbitmqctl list_feature_flags` | List all feature flags |
| `rabbitmqctl enable_feature_flag <flag>` | Enable a feature flag |

### Kubernetes-Specific Commands

```bash
# Check pod logs
kubectl logs <pod> -n rmq --tail=100

# Check previous pod logs (after restart)
kubectl logs <pod> -n rmq --previous

# Describe pod for events
kubectl describe pod <pod> -n rmq

# Check RabbitMQ cluster custom resource
kubectl get rabbitmqcluster -n rmq -o yaml

# Check PVCs for the cluster
kubectl get pvc -n rmq

# Delete PVC to fully reset a node (WARNING: data loss)
kubectl delete pvc persistence-rmq-cluster-server-X -n rmq

# Force delete stuck pod
kubectl delete pod <pod> -n rmq --force --grace-period=0

# Check services
kubectl get svc -n rmq

# Port-forward to management UI
kubectl port-forward svc/rmq-cluster -n rmq 15672:15672
```

### One-liner for Quick Health Check

```bash
# Check all nodes are in cluster and healthy
kubectl exec rmq-cluster-server-0 -n rmq -- rabbitmqctl cluster_status | grep -A 10 "Running Nodes"
```

### Emergency: Force Remove Dead Node from Cluster

If a node is permanently gone and blocking operations:

```bash
# From a healthy node, forget the dead node
kubectl exec rmq-cluster-server-0 -n rmq -- rabbitmqctl forget_cluster_node rabbit@rmq-cluster-server-X.rmq-cluster-nodes.rmq
```

### Emergency: Reset Entire Cluster

If cluster is completely broken, reset all nodes (WARNING: data loss):

```bash
for i in 0 1 2; do
  kubectl exec rmq-cluster-server-$i -n rmq -- rabbitmqctl stop_app
  kubectl exec rmq-cluster-server-$i -n rmq -- rabbitmqctl force_reset
done

# Start first node
kubectl exec rmq-cluster-server-0 -n rmq -- rabbitmqctl start_app

# Join others
for i in 1 2; do
  kubectl exec rmq-cluster-server-$i -n rmq -- rabbitmqctl join_cluster rabbit@rmq-cluster-server-0.rmq-cluster-nodes.rmq
  kubectl exec rmq-cluster-server-$i -n rmq -- rabbitmqctl start_app
done
```

## Conclusion

RabbitMQ cluster startup probe failures on Kubernetes are often caused by split-brain scenarios where nodes fail to properly join the cluster. By understanding how the startup probe works and using `rabbitmqctl` commands to diagnose and fix cluster membership issues, you can quickly restore cluster health.

If you encounter this issue, always check cluster status from multiple nodes to identify orphaned nodes, then use the reset and rejoin procedure to fix them.