import { useState } from "react";

const categories = [
  { id: "all", label: "All Tools", icon: "◈" },
  { id: "gitops", label: "GitOps & CD", icon: "⟳" },
  { id: "packaging", label: "Packaging", icon: "⎈" },
  { id: "security", label: "Security", icon: "🛡" },
  { id: "policy", label: "Policy", icon: "📋" },
  { id: "observability", label: "Observability", icon: "📊" },
  { id: "networking", label: "Networking", icon: "🕸" },
  { id: "storage", label: "Storage", icon: "💾" },
  { id: "devtools", label: "Dev Tools", icon: "🔧" },
  { id: "scheduling", label: "Scheduling", icon: "⚖" },
  { id: "secrets", label: "Secrets", icon: "🔑" },
  { id: "infra", label: "Infra Mgmt", icon: "☁" },
];

const tools = [
  // GitOps & CD
  { name: "ArgoCD", cat: "gitops", cncf: "graduated", priority: "essential", tagline: "Declarative GitOps CD for Kubernetes", desc: "Watches a Git repo and continuously syncs your cluster to match. App-of-Apps pattern lets you manage all workloads from one root application.", url: "https://argo-cd.readthedocs.io", tags: ["GitOps", "CD", "UI"], youHaveIt: true },
  { name: "Flux", cat: "gitops", cncf: "graduated", priority: "know", tagline: "GitOps toolkit, ArgoCD's main rival", desc: "Same GitOps concept as ArgoCD but CLI-first, more modular. Uses a set of controllers (source-controller, helm-controller, etc.). Popular in enterprise setups.", url: "https://fluxcd.io", tags: ["GitOps", "CD"] },
  { name: "Argo Rollouts", cat: "gitops", cncf: "incubating", priority: "important", tagline: "Progressive delivery: canary & blue-green", desc: "Replaces standard Deployments with a Rollout CRD. Supports canary (10%→50%→100%), blue-green, and automatic rollback based on Prometheus metrics.", url: "https://argoproj.github.io/rollouts", tags: ["Canary", "Blue-Green", "CRD"] },
  { name: "Argo Workflows", cat: "gitops", cncf: "incubating", priority: "know", tagline: "Kubernetes-native workflow engine", desc: "Run DAG-based workflows as Kubernetes pods. Used for CI pipelines, ML pipelines, data processing. Each step is a container.", url: "https://argoproj.github.io/workflows", tags: ["Workflow", "CI", "DAG"] },
  { name: "Tekton", cat: "gitops", cncf: "graduated", priority: "know", tagline: "Cloud-native CI/CD pipelines", desc: "Build CI/CD pipelines entirely as Kubernetes CRDs (Pipeline, Task, PipelineRun). Very powerful but verbose. Foundation for OpenShift Pipelines.", url: "https://tekton.dev", tags: ["CI", "Pipeline", "CRD"] },

  // Packaging
  { name: "Helm", cat: "packaging", cncf: "graduated", priority: "essential", tagline: "The Kubernetes package manager", desc: "Templates your YAML with values.yaml overrides. Charts are versioned, shareable, and the de-facto standard for distributing k8s apps.", url: "https://helm.sh", tags: ["Charts", "Templates"] },
  { name: "Kustomize", cat: "packaging", cncf: "core", priority: "important", tagline: "Template-free YAML customization", desc: "Built into kubectl. Uses overlays and patches instead of templates. Great for env differences (dev/prod) without a full chart. Often used alongside Helm.", url: "https://kustomize.io", tags: ["Overlay", "Patches"] },
  { name: "Timoni", cat: "packaging", cncf: "none", priority: "explore", tagline: "Helm alternative using CUE language", desc: "Next-gen packaging using CUE for type-safe configuration. Smaller community but solves real Helm pain points. Worth watching.", url: "https://timoni.sh", tags: ["CUE", "Type-safe"] },

  // Security
  { name: "NeuVector", cat: "security", cncf: "incubating", priority: "important", tagline: "Full-lifecycle container security", desc: "Runtime security, network policy enforcement via eBPF, vulnerability scanning, and compliance — all CRD-driven. Discover→Monitor→Protect mode progression.", url: "https://neuvector.com", tags: ["Runtime", "eBPF", "Zero-trust", "CRD"] },
  { name: "Falco", cat: "security", cncf: "graduated", priority: "important", tagline: "Runtime threat detection via syscalls", desc: "Listens to Linux kernel syscalls and fires alerts when suspicious behavior happens (shell in container, unexpected file write, privilege escalation). Pairs with NeuVector.", url: "https://falco.org", tags: ["Runtime", "Syscalls", "Alerts"] },
  { name: "Trivy", cat: "security", cncf: "incubating", priority: "essential", tagline: "Vulnerability scanner for images & IaC", desc: "Scan container images, Helm charts, Terraform, k8s manifests for CVEs and misconfigs. Run in CI before push, or as a cluster-side operator (Trivy Operator).", url: "https://trivy.dev", tags: ["CVE", "Scanning", "IaC"] },
  { name: "Cosign", cat: "security", cncf: "incubating", priority: "know", tagline: "Container image signing & verification", desc: "Sign your Docker images with a key, verify signatures at deploy time. Kyverno can enforce 'only signed images allowed'. The foundation of supply chain security.", url: "https://docs.sigstore.dev/cosign", tags: ["Signing", "Supply Chain"] },
  { name: "Kubescape", cat: "security", cncf: "sandbox", priority: "know", tagline: "K8s security posture scanner", desc: "Scans your cluster against NSA/CISA hardening guides, CIS benchmarks, and MITRE ATT&CK. Finds misconfigs before attackers do.", url: "https://kubescape.io", tags: ["Posture", "Compliance", "NSA"] },

  // Policy
  { name: "Kyverno", cat: "policy", cncf: "graduated", priority: "essential", tagline: "Kubernetes-native policy engine", desc: "Policies are Kubernetes resources (YAML). validate, mutate, generate, verifyImages. No Rego needed. Runs as admission webhook. First CRD to learn.", url: "https://kyverno.io", tags: ["Validate", "Mutate", "Generate", "CRD"] },
  { name: "OPA Gatekeeper", cat: "policy", cncf: "graduated", priority: "know", tagline: "Policy engine using Rego language", desc: "Older, more battle-tested than Kyverno. Policies written in Rego (a query language). More powerful but steeper learning curve. Common in enterprises.", url: "https://open-policy-agent.github.io/gatekeeper", tags: ["Rego", "OPA", "Webhook"] },
  { name: "Kubewarden", cat: "policy", cncf: "sandbox", priority: "explore", tagline: "Policy engine using WebAssembly", desc: "Write policies in Rust, Go, Python — compiled to WASM. Interesting architecture, rapidly growing. Good alternative to Kyverno for polyglot teams.", url: "https://kubewarden.io", tags: ["WASM", "Policies"] },

  // Observability
  { name: "Prometheus", cat: "observability", cncf: "graduated", priority: "essential", tagline: "Metrics collection & alerting", desc: "Pull-based metrics scraper. ServiceMonitor CRDs tell it what to scrape. PrometheusRule CRDs define alerts. The backbone of k8s observability.", url: "https://prometheus.io", tags: ["Metrics", "Alerts", "CRD"] },
  { name: "Grafana", cat: "observability", cncf: "none", priority: "essential", tagline: "Metrics, logs, traces visualization", desc: "Dashboards for Prometheus, Loki, Tempo, and 50+ data sources. The UI where you actually see what's happening. Deploy via kube-prometheus-stack chart.", url: "https://grafana.com", tags: ["Dashboards", "UI"] },
  { name: "Loki", cat: "observability", cncf: "none", priority: "important", tagline: "Log aggregation — Prometheus for logs", desc: "Stores logs indexed only by labels (not full-text). Cheap storage, fast queries for labeled log streams. Promtail DaemonSet ships logs from nodes.", url: "https://grafana.com/oss/loki", tags: ["Logs", "LogQL"] },
  { name: "Tempo", cat: "observability", cncf: "none", priority: "know", tagline: "Distributed tracing backend", desc: "Stores traces from OpenTelemetry/Jaeger/Zipkin. Grafana can correlate a log line directly to a trace. Completes the metrics+logs+traces triad.", url: "https://grafana.com/oss/tempo", tags: ["Tracing", "OTEL"] },
  { name: "OpenTelemetry", cat: "observability", cncf: "incubating", priority: "important", tagline: "Unified instrumentation standard", desc: "The future of observability. Single SDK/collector for metrics, logs, and traces. Instrument your app once, send to any backend. Auto-instrumentation for common frameworks.", url: "https://opentelemetry.io", tags: ["OTEL", "Standard", "Collector"] },
  { name: "Jaeger", cat: "observability", cncf: "graduated", priority: "know", tagline: "Distributed tracing (older standard)", desc: "Jaeger was the tracing standard before OpenTelemetry unified the space. Still widely deployed. Understanding it helps understand OTEL's context.", url: "https://jaegertracing.io", tags: ["Tracing"] },
  { name: "VictoriaMetrics", cat: "observability", cncf: "none", priority: "know", tagline: "High-performance Prometheus drop-in", desc: "Stores Prometheus metrics with 10x less RAM and better compression. Prometheus-compatible API. Popular for large clusters where Prometheus struggles.", url: "https://victoriametrics.com", tags: ["Metrics", "Performance"] },

  // Networking
  { name: "Cilium", cat: "networking", cncf: "graduated", priority: "important", tagline: "eBPF-based networking & security", desc: "Replaces kube-proxy with eBPF. Provides CNI, NetworkPolicy, load balancing, service mesh, and deep observability (Hubble). The most powerful CNI available.", url: "https://cilium.io", tags: ["eBPF", "CNI", "Service Mesh"] },
  { name: "Istio", cat: "networking", cncf: "graduated", priority: "know", tagline: "Full-featured service mesh (sidecar)", desc: "Injects Envoy sidecar proxies into every pod for mTLS, traffic management, observability. Powerful but heavy. Cilium Mesh is replacing it in new clusters.", url: "https://istio.io", tags: ["Service Mesh", "mTLS", "Envoy"] },
  { name: "Traefik", cat: "networking", cncf: "none", priority: "important", tagline: "Cloud-native ingress controller", desc: "Ingress + IngressRoute CRDs. Auto-discovers services, built-in Let's Encrypt, middleware chain (rate limiting, auth, headers). Very k3s/Civo friendly.", url: "https://traefik.io", tags: ["Ingress", "TLS", "CRD"] },
  { name: "ingress-nginx", cat: "networking", cncf: "none", priority: "important", tagline: "The standard Nginx ingress", desc: "Most widely deployed ingress controller. Familiar nginx config via annotations. Solid and battle-tested. Good starting point before Traefik.", url: "https://kubernetes.github.io/ingress-nginx", tags: ["Ingress", "Nginx"] },
  { name: "Gateway API", cat: "networking", cncf: "core", priority: "know", tagline: "Next-gen Ingress standard (k8s SIG)", desc: "Replacing Ingress. HTTPRoute, Gateway, GRPCRoute CRDs. Richer routing, multi-tenancy aware. Cilium, Istio, Traefik all implement it. The future of k8s networking.", url: "https://gateway-api.sigs.k8s.io", tags: ["HTTPRoute", "Standard", "CRD"] },
  { name: "MetalLB", cat: "networking", cncf: "sandbox", priority: "know", tagline: "LoadBalancer for bare-metal/Civo clusters", desc: "Provides real LoadBalancer IPs on non-cloud clusters using BGP or L2 announcements. Essential if your cloud provider doesn't give you LB IPs.", url: "https://metallb.universe.tf", tags: ["LoadBalancer", "BGP"] },

  // Storage
  { name: "Longhorn", cat: "storage", cncf: "incubating", priority: "important", tagline: "Distributed block storage for k8s", desc: "Turns your node disks into a distributed, replicated block storage system. PVCs backed by Longhorn volumes. Great for Civo/k3s. Has a beautiful UI.", url: "https://longhorn.io", tags: ["PVC", "Replicated", "UI"] },
  { name: "Rook-Ceph", cat: "storage", cncf: "graduated", priority: "know", tagline: "Cloud-native Ceph storage operator", desc: "Manages a Ceph cluster as Kubernetes CRDs. Provides block, object (S3), and filesystem storage. Heavy but extremely powerful for large deployments.", url: "https://rook.io", tags: ["Ceph", "S3", "Block"] },
  { name: "Velero", cat: "storage", cncf: "incubating", priority: "important", tagline: "Backup & restore for k8s resources + PVs", desc: "Backs up Kubernetes objects and persistent volume data to S3/object storage. Disaster recovery, cluster migration. Essential for anything stateful.", url: "https://velero.io", tags: ["Backup", "DR", "Migration"] },

  // Dev Tools
  { name: "k9s", cat: "devtools", cncf: "none", priority: "essential", tagline: "Terminal UI for Kubernetes", desc: "The best way to navigate a cluster in the terminal. Browse pods, logs, exec into containers, manage resources — all with keyboard shortcuts. Install this first.", url: "https://k9scli.io", tags: ["TUI", "CLI"] },
  { name: "Lens", cat: "devtools", cncf: "none", priority: "know", tagline: "Kubernetes IDE (desktop app)", desc: "Full desktop GUI for multiple clusters. Good for visual exploration but heavier than k9s. OpenLens is the open-source version.", url: "https://k8slens.dev", tags: ["GUI", "IDE"] },
  { name: "Telepresence", cat: "devtools", cncf: "sandbox", priority: "know", tagline: "Local dev against remote cluster", desc: "Run your service locally but intercept k8s traffic to it. Debug your container locally with real cluster dependencies. Solves the 'need to rebuild image to test' problem.", url: "https://telepresence.io", tags: ["Dev", "Debug", "Intercept"] },
  { name: "Skaffold", cat: "devtools", cncf: "none", priority: "know", tagline: "Dev inner loop automation", desc: "Watches your source, rebuilds image, pushes, and redeploys automatically on save. Google-made. Alternatives: Tilt, DevSpace.", url: "https://skaffold.dev", tags: ["Dev Loop", "Rebuild"] },
  { name: "Tilt", cat: "devtools", cncf: "none", priority: "know", tagline: "Dev environment for k8s microservices", desc: "Like Skaffold but with a nicer UI and more flexibility. Live-updates containers, manages dependencies between services. Very popular for multi-service dev.", url: "https://tilt.dev", tags: ["Dev Loop", "Multi-service"] },
  { name: "Stern", cat: "devtools", cncf: "none", priority: "important", tagline: "Multi-pod log tailing", desc: "`kubectl logs` but for multiple pods simultaneously with color-coded output. Tail logs from all pods of a deployment at once. Essential CLI tool.", url: "https://github.com/stern/stern", tags: ["Logs", "CLI"] },
  { name: "Kubectx/Kubens", cat: "devtools", cncf: "none", priority: "essential", tagline: "Fast context & namespace switching", desc: "`kubectx prod` to switch cluster, `kubens monitoring` to switch namespace. The most-used CLI tools after kubectl itself. Install immediately.", url: "https://github.com/ahmetb/kubectx", tags: ["CLI", "Context"] },

  // Scheduling
  { name: "Descheduler", cat: "scheduling", cncf: "sandbox", priority: "important", tagline: "Rebalance pods across nodes", desc: "Runs as a CronJob and evicts pods that violate balance policies. Fixes cluster drift after node upgrades/scaling. Pods get rescheduled by the scheduler.", url: "https://github.com/kubernetes-sigs/descheduler", tags: ["Eviction", "Balance", "CronJob"] },
  { name: "KEDA", cat: "scheduling", cncf: "graduated", priority: "important", tagline: "Event-driven autoscaling", desc: "Scale deployments to zero AND beyond based on external events: queue depth (RabbitMQ, Kafka), HTTP requests, cron schedule, Prometheus metrics. HPA on steroids.", url: "https://keda.sh", tags: ["Autoscaling", "HPA", "Zero-scale", "CRD"] },
  { name: "Cluster Autoscaler", cat: "scheduling", cncf: "none", priority: "important", tagline: "Auto add/remove cluster nodes", desc: "Adds nodes when pods are Pending (not enough resources), removes nodes when underutilized. Works with Civo's node pool API.", url: "https://github.com/kubernetes/autoscaler", tags: ["Nodes", "Scale"] },
  { name: "Vertical Pod Autoscaler", cat: "scheduling", cncf: "none", priority: "know", tagline: "Auto-set resource requests/limits", desc: "Observes actual CPU/memory usage and recommends (or auto-applies) right-sized requests. Fixes the 'I guessed 500m CPU' problem.", url: "https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler", tags: ["Resources", "Rightsizing"] },

  // Secrets
  { name: "Sealed Secrets", cat: "secrets", cncf: "none", priority: "important", tagline: "Encrypt secrets safe for Git commit", desc: "Kubeseal encrypts a Secret with your cluster's public key. The sealed YAML is safe to commit. Controller in-cluster decrypts it back. Simplest secrets-in-Git solution.", url: "https://sealed-secrets.netlify.app", tags: ["Git-safe", "Encrypt"] },
  { name: "External Secrets Operator", cat: "secrets", cncf: "incubating", priority: "important", tagline: "Pull secrets from Vault/AWS/GCP/1Password", desc: "ExternalSecret CRD defines where to fetch a secret from (AWS SSM, HashiCorp Vault, 1Password, etc.) and what k8s Secret to create. Best for multi-cloud/team setups.", url: "https://external-secrets.io", tags: ["Vault", "AWS SSM", "CRD"] },
  { name: "HashiCorp Vault", cat: "secrets", cncf: "none", priority: "know", tagline: "Full secrets management platform", desc: "The gold standard for secrets at scale. Dynamic secrets (generates DB credentials on demand), PKI, encryption as a service. Steep learning curve. Use ESO to integrate with k8s.", url: "https://vaultproject.io", tags: ["Dynamic", "PKI", "Enterprise"] },

  // Infra
  { name: "Crossplane", cat: "infra", cncf: "graduated", priority: "important", tagline: "Provision cloud infra as Kubernetes CRDs", desc: "Create AWS RDS instances, S3 buckets, Civo clusters via kubectl apply. Your cloud infra becomes CRDs managed by ArgoCD. The ultimate GitOps extension.", url: "https://crossplane.io", tags: ["IaC", "Cloud", "CRD"] },
  { name: "cert-manager", cat: "infra", cncf: "graduated", priority: "essential", tagline: "Auto-provision & renew TLS certs", desc: "Certificate and ClusterIssuer CRDs. Request a cert, cert-manager handles ACME challenge, provisions Secret with TLS keypair, renews 30 days before expiry. Zero-touch TLS.", url: "https://cert-manager.io", tags: ["TLS", "ACME", "CRD"] },
  { name: "Cluster API", cat: "infra", cncf: "incubating", priority: "know", tagline: "Manage k8s clusters as CRDs", desc: "Provision and lifecycle-manage entire Kubernetes clusters using CRDs. Your cluster becomes a Kubernetes object managed by another cluster. Mind-bending but powerful.", url: "https://cluster-api.sigs.k8s.io", tags: ["Cluster Mgmt", "CRD"] },
  { name: "Rancher", cat: "infra", cncf: "none", priority: "know", tagline: "Multi-cluster management UI", desc: "Full UI for managing multiple k8s clusters, deploying apps, managing users/RBAC. NeuVector was originally a Rancher project. Good for teams.", url: "https://rancher.com", tags: ["Multi-cluster", "UI", "RBAC"] },
];

const priorityMeta = {
  essential: { label: "MUST HAVE", color: "#00D4FF", bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.3)" },
  important: { label: "IMPORTANT", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
  know: { label: "KNOW IT", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  explore: { label: "EXPLORE", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.3)" },
};

const cncfMeta = {
  graduated: { label: "CNCF ✓", color: "#10B981" },
  incubating: { label: "CNCF ~", color: "#F59E0B" },
  sandbox: { label: "CNCF ○", color: "#8B5CF6" },
  core: { label: "K8s Core", color: "#00D4FF" },
  none: { label: "", color: "" },
};

function K8sTools() {
  const [activeCat, setActiveCat] = useState("all");
  const [activePriority, setActivePriority] = useState("all");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = tools.filter(t => {
    const catMatch = activeCat === "all" || t.cat === activeCat;
    const prioMatch = activePriority === "all" || t.priority === activePriority;
    const searchMatch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tagline.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return catMatch && prioMatch && searchMatch;
  });

  const selectedTool = tools.find(t => t.name === selected);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08090C",
      fontFamily: "'DM Mono', 'Fira Code', monospace",
      color: "#C9D1D9",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Epilogue:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2D3748; border-radius: 2px; }
        .tool-card { transition: all 0.15s ease; cursor: pointer; }
        .tool-card:hover { transform: translateY(-2px); }
        .cat-btn { transition: all 0.1s; cursor: pointer; white-space: nowrap; }
        .cat-btn:hover { opacity: 1 !important; }
        .prio-btn { transition: all 0.1s; cursor: pointer; }
        .prio-btn:hover { opacity: 1 !important; }
        .slide-in { animation: slideIn 0.2s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .fade-in { animation: fadeIn 0.15s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        input::placeholder { color: #4A5568; }
        input:focus { outline: none; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

        {/* LEFT SIDEBAR */}
        <div style={{
          width: 200, minWidth: 200,
          background: "#0D0E13",
          borderRight: "1px solid #1A1D27",
          display: "flex", flexDirection: "column",
          overflow: "hidden"
        }}>
          <div style={{ padding: "1.25rem 1rem 0.75rem" }}>
            <div style={{ fontFamily: "'Epilogue', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: "#F0F6FC", lineHeight: 1.2 }}>
              K8s Tools<br />
              <span style={{ color: "#00D4FF" }}>Explorer</span>
            </div>
            <div style={{ fontSize: "0.65rem", color: "#4A5568", marginTop: "0.4rem" }}>
              {tools.length} tools · {Object.keys(priorityMeta).length} tiers
            </div>
          </div>

          <div style={{ padding: "0.75rem 0.5rem 0.25rem" }}>
            <div style={{ fontSize: "0.6rem", color: "#4A5568", letterSpacing: "0.15em", padding: "0 0.5rem", marginBottom: "0.4rem" }}>CATEGORY</div>
            {categories.map(c => (
              <div
                key={c.id}
                className="cat-btn"
                onClick={() => setActiveCat(c.id)}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "5px",
                  fontSize: "0.75rem",
                  opacity: activeCat === c.id ? 1 : 0.55,
                  background: activeCat === c.id ? "rgba(0,212,255,0.08)" : "transparent",
                  color: activeCat === c.id ? "#00D4FF" : "#A0AEC0",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  marginBottom: "0.1rem"
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>{c.icon}</span>
                <span>{c.label}</span>
                <span style={{ marginLeft: "auto", fontSize: "0.65rem", color: "#4A5568" }}>
                  {c.id === "all" ? tools.length : tools.filter(t => t.cat === c.id).length}
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: "0.75rem 0.5rem 0.25rem" }}>
            <div style={{ fontSize: "0.6rem", color: "#4A5568", letterSpacing: "0.15em", padding: "0 0.5rem", marginBottom: "0.4rem" }}>PRIORITY</div>
            {[["all", "All", "#718096"], ...Object.entries(priorityMeta).map(([k, v]) => [k, v.label, v.color])].map(([id, label, color]) => (
              <div
                key={id}
                className="prio-btn"
                onClick={() => setActivePriority(id)}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "5px",
                  fontSize: "0.7rem",
                  opacity: activePriority === id ? 1 : 0.5,
                  background: activePriority === id ? `rgba(${hexToRgb(color)},0.08)` : "transparent",
                  color: activePriority === id ? color : "#718096",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  marginBottom: "0.1rem",
                  cursor: "pointer"
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", padding: "0.75rem", borderTop: "1px solid #1A1D27" }}>
            <div style={{ fontSize: "0.6rem", color: "#4A5568", lineHeight: 1.6 }}>
              CNCF ✓ Graduated<br />
              CNCF ~ Incubating<br />
              CNCF ○ Sandbox
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Top bar */}
          <div style={{
            padding: "0.75rem 1.25rem",
            borderBottom: "1px solid #1A1D27",
            display: "flex", alignItems: "center", gap: "1rem",
            background: "#0D0E13"
          }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
              <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#4A5568", fontSize: "0.8rem" }}>⌕</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tools, tags..."
                style={{
                  width: "100%",
                  background: "#111318",
                  border: "1px solid #1E2330",
                  borderRadius: "6px",
                  padding: "0.45rem 0.75rem 0.45rem 2rem",
                  fontSize: "0.78rem",
                  color: "#C9D1D9",
                  fontFamily: "inherit"
                }}
              />
            </div>
            <div style={{ fontSize: "0.75rem", color: "#4A5568" }}>
              {filtered.length} tools
            </div>
            {tools.find(t => t.youHaveIt) && (
              <div style={{ fontSize: "0.7rem", color: "#10B981", padding: "0.2rem 0.6rem", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px" }}>
                ✓ already deployed = outlined
              </div>
            )}
          </div>

          {/* Grid + Detail */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

            {/* Tool grid */}
            <div style={{
              flex: 1, padding: "1rem 1.25rem",
              overflowY: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.65rem",
              alignContent: "start"
            }}>
              {filtered.map(tool => {
                const pm = priorityMeta[tool.priority];
                const cm = cncfMeta[tool.cncf];
                const isSelected = selected === tool.name;
                return (
                  <div
                    key={tool.name}
                    className="tool-card fade-in"
                    onClick={() => setSelected(isSelected ? null : tool.name)}
                    style={{
                      background: isSelected ? `rgba(${hexToRgb(pm.color)},0.08)` : "#111318",
                      border: `1px solid ${isSelected ? pm.color + "60" : tool.youHaveIt ? "#10B98140" : "#1E2330"}`,
                      borderTop: `2px solid ${pm.color}`,
                      borderRadius: "6px",
                      padding: "0.9rem",
                      outline: tool.youHaveIt ? `1px solid #10B98130` : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <div style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: "0.9rem", fontWeight: 700,
                        color: isSelected ? pm.color : "#F0F6FC"
                      }}>
                        {tool.name}
                        {tool.youHaveIt && <span style={{ marginLeft: "0.3rem", fontSize: "0.6rem", color: "#10B981" }}>✓</span>}
                      </div>
                      {cm.label && (
                        <span style={{ fontSize: "0.55rem", color: cm.color, letterSpacing: "0.05em", flexShrink: 0 }}>{cm.label}</span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#718096", lineHeight: 1.4, marginBottom: "0.6rem" }}>
                      {tool.tagline}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                      <span style={{
                        fontSize: "0.58rem", padding: "0.15rem 0.45rem",
                        borderRadius: "3px",
                        background: pm.bg, color: pm.color,
                        border: `1px solid ${pm.border}`
                      }}>{pm.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail panel */}
            {selectedTool && (
              <div className="slide-in" style={{
                width: 300, minWidth: 300,
                background: "#0D0E13",
                borderLeft: "1px solid #1A1D27",
                padding: "1.25rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "1.4rem", fontWeight: 900,
                      color: "#F0F6FC"
                    }}>{selectedTool.name}</div>
                    <button
                      onClick={() => setSelected(null)}
                      style={{ background: "none", border: "none", color: "#4A5568", cursor: "pointer", fontSize: "1rem" }}
                    >✕</button>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#718096", marginTop: "0.25rem" }}>{selectedTool.tagline}</div>
                </div>

                {/* Priority badge */}
                <div style={{
                  padding: "0.6rem 0.8rem",
                  borderRadius: "6px",
                  background: priorityMeta[selectedTool.priority].bg,
                  border: `1px solid ${priorityMeta[selectedTool.priority].border}`
                }}>
                  <div style={{ fontSize: "0.6rem", color: priorityMeta[selectedTool.priority].color, letterSpacing: "0.15em", marginBottom: "0.2rem" }}>PRIORITY</div>
                  <div style={{ fontSize: "0.85rem", color: priorityMeta[selectedTool.priority].color, fontWeight: 500 }}>
                    {priorityMeta[selectedTool.priority].label}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div style={{ fontSize: "0.6rem", color: "#4A5568", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>WHAT IT DOES</div>
                  <p style={{ fontSize: "0.8rem", color: "#A0AEC0", lineHeight: 1.7 }}>{selectedTool.desc}</p>
                </div>

                {/* Tags */}
                <div>
                  <div style={{ fontSize: "0.6rem", color: "#4A5568", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>TAGS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {selectedTool.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: "0.68rem", padding: "0.2rem 0.6rem",
                        background: "#161820", border: "1px solid #2D3748",
                        borderRadius: "4px", color: "#718096"
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* CNCF status */}
                {cncfMeta[selectedTool.cncf].label && (
                  <div style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: "5px",
                    background: "#111318",
                    border: "1px solid #1E2330",
                    display: "flex", alignItems: "center", gap: "0.5rem"
                  }}>
                    <span style={{ fontSize: "0.65rem", color: cncfMeta[selectedTool.cncf].color }}>
                      {cncfMeta[selectedTool.cncf].label}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#4A5568" }}>
                      {selectedTool.cncf === "graduated" ? "Production-ready, widely adopted" :
                        selectedTool.cncf === "incubating" ? "Growing, stable for most use cases" :
                          selectedTool.cncf === "sandbox" ? "Early stage, promising" :
                            "Part of Kubernetes core"}
                    </span>
                  </div>
                )}

                {/* Related to your stack */}
                {selectedTool.youHaveIt && (
                  <div style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: "5px",
                    background: "rgba(16,185,129,0.05)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    fontSize: "0.72rem", color: "#6EE7B7"
                  }}>
                    ✓ Already in your cluster
                  </div>
                )}

                {/* Docs link */}
                <a
                  href={selectedTool.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "block",
                    padding: "0.6rem",
                    background: "#111318",
                    border: "1px solid #2D3748",
                    borderRadius: "6px",
                    fontSize: "0.72rem",
                    color: "#00D4FF",
                    textDecoration: "none",
                    textAlign: "center"
                  }}
                >
                  → Official Docs ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  if (!hex || !hex.startsWith("#")) return "100,100,100";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
export default K8sTools;
