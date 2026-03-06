import { useState } from 'react'

const phases = [
  {
    id: 1,
    title: 'Helm Mastery',
    subtitle: 'Package your workloads properly',
    icon: '⎈',
    color: '#00D4FF',
    status: 'START HERE',
    duration: '1–2 weeks',
    context:
      "You've deployed ArgoCD and Jellyfin manually. Now chart everything so it's reproducible, versionable, and GitOps-ready.",
    steps: [
      {
        title: 'Helm fundamentals',
        detail:
          'Understand Chart.yaml, values.yaml, templates/, helpers. Learn how `helm template`, `helm install`, `helm upgrade --install` work.',
        cmd: 'helm create jellyfin-chart\nhelm template ./jellyfin-chart\nhelm lint ./jellyfin-chart',
      },
      {
        title: 'Convert Jellyfin deploy to a Helm chart',
        detail:
          'Parameterize your Docker image (repo, tag, pullSecret), storage (PVC size, storageClass), service type, and ingress.',
        cmd: '# values.yaml\nimage:\n  repository: youruser/jellyfin\n  tag: latest\n  pullPolicy: IfNotPresent\nimagePullSecrets:\n  - name: regcred',
      },
      {
        title: 'Private registry pull secret',
        detail:
          'Create a Kubernetes secret for your DockerHub private repo and reference it in your chart via imagePullSecrets.',
        cmd: 'kubectl create secret docker-registry regcred \\\n  --docker-server=docker.io \\\n  --docker-username=YOU \\\n  --docker-password=TOKEN \\\n  --docker-email=you@example.com',
      },
      {
        title: 'Push chart to OCI registry',
        detail:
          'Use DockerHub or GitHub Container Registry as a Helm OCI chart repo. This is how ArgoCD will pull your charts later.',
        cmd: 'helm package ./jellyfin-chart\nhelm push jellyfin-chart-0.1.0.tgz oci://registry-1.docker.io/youruser',
      },
      {
        title: 'Deploy ArgoCD itself via Helm',
        detail:
          'Replace your ArgoCD kubectl-apply with the official argo/argo-cd chart. Practice upgrading it — builds muscle memory for GitOps.',
        cmd: 'helm repo add argo https://argoproj.github.io/argo-helm\nhelm upgrade --install argocd argo/argo-cd \\\n  -n argocd --create-namespace \\\n  -f argocd-values.yaml',
      },
    ],
    milestone:
      'You can `helm upgrade --install` both ArgoCD and Jellyfin from charts. Values are in Git. No more raw YAML kubectl applies.',
  },
  {
    id: 2,
    title: 'ArgoCD as the GitOps Engine',
    subtitle: 'Everything deploys through Git, nothing by hand',
    icon: '⟳',
    color: '#7C3AED',
    status: 'CORE SKILL',
    duration: '1–2 weeks',
    context:
      'ArgoCD is your single source of truth. Every Helm chart, every CRD operator — all managed as ArgoCD Applications.',
    steps: [
      {
        title: 'App-of-Apps pattern',
        detail:
          'Create a root ArgoCD Application that points to a Git repo containing other Application manifests. Bootstrap an entire cluster from one commit.',
        cmd: '# apps/root-app.yaml\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: root\nspec:\n  source:\n    repoURL: https://github.com/you/cluster-config\n    path: apps/\n  destination:\n    server: https://kubernetes.default.svc',
      },
      {
        title: 'ApplicationSet for multi-env',
        detail:
          'Use ApplicationSet with a list generator to deploy the same chart to dev/staging/prod with different values files.',
        cmd: '# Generates one Application per environment\ngenerators:\n  - list:\n      elements:\n        - env: dev\n        - env: prod',
      },
      {
        title: 'Helm chart via ArgoCD',
        detail:
          'Define your Jellyfin ArgoCD Application with source.helm.valuesFiles pointing to env-specific overrides.',
        cmd: 'source:\n  repoURL: oci://registry-1.docker.io/youruser\n  chart: jellyfin-chart\n  targetRevision: 0.1.0\n  helm:\n    valuesFiles:\n      - values-prod.yaml',
      },
      {
        title: 'Sync policies & health checks',
        detail:
          'Configure automated sync with selfHeal and prune. Learn how ArgoCD health checks work for CRDs.',
        cmd: 'syncPolicy:\n  automated:\n    selfHeal: true\n    prune: true\n  syncOptions:\n    - CreateNamespace=true',
      },
      {
        title: 'Notifications & webhooks',
        detail:
          'Set up ArgoCD Notifications for Slack/email alerts. Configure GitHub webhooks so pushes trigger immediate syncs.',
        cmd: '# Add to argocd-values.yaml\nnotifications:\n  enabled: true\n  argocdUrl: https://argocd.yourdomain.com',
      },
    ],
    milestone:
      'Entire cluster state lives in Git. A `git push` deploys. Nothing is applied with kubectl manually anymore.',
  },
  {
    id: 3,
    title: 'Kyverno — Policy as Code',
    subtitle: 'Enforce rules, mutate resources, validate everything',
    icon: '🛡',
    color: '#10B981',
    status: 'CRD #1',
    duration: '1 week',
    context:
      'Kyverno is a Kubernetes-native policy engine. No Rego, no OPA — policies are YAML. Perfect first CRD to learn.',
    steps: [
      {
        title: 'Install via ArgoCD + Helm',
        detail:
          'Deploy Kyverno using the kyverno/kyverno chart as an ArgoCD Application. First time wiring a CRD operator through your GitOps pipeline.',
        cmd: 'helm repo add kyverno https://kyverno.github.io/kyverno/\n# Then define as ArgoCD Application pointing to this chart',
      },
      {
        title: 'Understand the 4 policy types',
        detail:
          'validate (block bad resources), mutate (auto-fix/add fields), generate (create related resources), verifyImages (check image signatures).',
        cmd: '',
      },
      {
        title: 'Write a validate policy',
        detail: 'Require all Deployments to have resource limits. Block any image using the `latest` tag.',
        cmd: "spec:\n  rules:\n    - name: disallow-latest\n      match:\n        resources:\n          kinds: [Deployment]\n      validate:\n        message: \"Use a specific image tag\"\n        pattern:\n          spec:\n            template:\n              spec:\n                containers:\n                  - image: \"!*:latest\"",
      },
      {
        title: 'Write a mutate policy',
        detail:
          "Auto-add a label `managed-by: kyverno` to all Deployments. This shows how Kyverno acts as an admission webhook.",
        cmd: '',
      },
      {
        title: 'Write a generate policy',
        detail:
          'Auto-generate a NetworkPolicy for every new Namespace. New ns = instant isolation. Powerful for multi-tenant clusters.',
        cmd: '',
      },
    ],
    milestone:
      'Your cluster enforces policies. `kubectl apply` of a bad manifest is rejected with a clear message. Kyverno runs as an ArgoCD app.',
  },
  {
    id: 4,
    title: 'Descheduler',
    subtitle: 'Intelligent pod rebalancing',
    icon: '⚖',
    color: '#F59E0B',
    status: 'CRD #2',
    duration: '3–5 days',
    context:
      "Kubernetes scheduler places pods at creation time. It never moves them. Descheduler runs periodically and evicts pods that violate policies — letting the scheduler re-place them better.",
    steps: [
      {
        title: 'Understand WHY descheduler exists',
        detail:
          'After node upgrades or scaling events, pods pile up on certain nodes. The scheduler won't fix this. Key insight: descheduler evicts, it does not schedule.',
        cmd: '',
      },
      {
        title: 'Install via Helm + ArgoCD',
        detail:
          'Deploy kubernetes-sigs/descheduler chart. Run it as a CronJob (every 5 minutes on test).',
        cmd: 'helm repo add descheduler https://kubernetes-sigs.github.io/descheduler/\nhelm upgrade --install descheduler descheduler/descheduler \\\n  --set schedule="*/5 * * * *"',
      },
      {
        title: 'Configure descheduling profiles',
        detail:
          'Learn built-in strategies: RemoveDuplicates, LowNodeUtilization, RemovePodsViolatingNodeAffinity.',
        cmd: 'profiles:\n  - name: default\n    plugins:\n      balance:\n        enabled:\n          - RemoveDuplicates\n          - LowNodeUtilization',
      },
      {
        title: 'Test with LowNodeUtilization',
        detail:
          'Set thresholds — if a node is below 20% CPU and another above 50%, evict pods from the busy one. Watch pods get rescheduled.',
        cmd: 'pluginConfig:\n  - name: LowNodeUtilization\n    args:\n      thresholds:\n        cpu: 20\n        memory: 20\n      targetThresholds:\n        cpu: 50\n        memory: 50',
      },
    ],
    milestone:
      'Cluster stays balanced after node events. You understand eviction vs scheduling and have configured PDBs to protect Jellyfin.',
  },
  {
    id: 5,
    title: 'NeuVector — Runtime Security',
    subtitle: 'Zero-trust network policy & container security',
    icon: '🔒',
    color: '#EF4444',
    status: 'CRD #3',
    duration: '1–2 weeks',
    context:
      'NeuVector is a full-lifecycle container security platform. It does network policy enforcement, vulnerability scanning, process profiling — all as a CRD-driven operator.',
    steps: [
      {
        title: "Understand NeuVector's architecture",
        detail:
          '4 components: Manager (UI), Controller (brain), Enforcer (DaemonSet on every node), Scanner (image vulns). Controller exposes CRDs for policy-as-code.',
        cmd: '',
      },
      {
        title: 'Install via Helm + ArgoCD',
        detail:
          'Deploy the neuvector/core chart. Use the bundled UI to explore before writing CRDs.',
        cmd: 'helm repo add neuvector https://neuvector.github.io/neuvector-helm/\nhelm upgrade --install neuvector neuvector/core \\\n  -n neuvector --create-namespace',
      },
      {
        title: 'Explore Discover mode',
        detail:
          'NeuVector starts in Discover mode — it watches and learns your traffic patterns. Run Jellyfin, browse it, let NeuVector map connections.',
        cmd: '',
      },
      {
        title: 'Write NvSecurityRule CRDs',
        detail:
          'Switch from Discover → Monitor → Protect. Write NvSecurityRule manifests that allow only legitimate connections.',
        cmd: 'apiVersion: neuvector.com/v1\nkind: NvSecurityRule\nmetadata:\n  name: jellyfin-policy\nspec:\n  ingress:\n    - ports: "tcp/8096"\n      action: allow\n  egress:\n    - action: deny',
      },
      {
        title: 'Image vulnerability scanning',
        detail:
          'Configure NeuVector scanner to scan your private Jellyfin image. Block deployment if critical CVEs are found.',
        cmd: '',
      },
    ],
    milestone:
      'Jellyfin runs in Protect mode. Unexpected outbound connections are blocked. CVE scan runs on every push. Policy is in Git.',
  },
  {
    id: 6,
    title: 'Observability Stack',
    subtitle: "You can't fix what you can't see",
    icon: '📊',
    color: '#06B6D4',
    status: 'ESSENTIAL',
    duration: '1–2 weeks',
    context:
      'Deploy the full stack (Loki, Grafana, Prometheus) — all via Helm + ArgoCD. ServiceMonitor and PrometheusRule CRDs will make the operator pattern completely click.',
    steps: [
      {
        title: 'kube-prometheus-stack',
        detail:
          'Deploy via Helm — this gets you Prometheus, Grafana, Alertmanager, and node-exporter in one chart with pre-built dashboards.',
        cmd: 'helm repo add prometheus-community \\\n  https://prometheus-community.github.io/helm-charts\nhelm upgrade --install kube-prom \\\n  prometheus-community/kube-prometheus-stack \\\n  -n monitoring --create-namespace',
      },
      {
        title: 'Loki for logs',
        detail:
          'Deploy Grafana Loki + Promtail DaemonSet. Query Jellyfin logs in Grafana alongside metrics.',
        cmd: 'helm repo add grafana https://grafana.github.io/helm-charts\nhelm upgrade --install loki grafana/loki-stack \\\n  --set promtail.enabled=true',
      },
      {
        title: 'ServiceMonitor CRDs',
        detail:
          'Write a ServiceMonitor that tells Prometheus which services to scrape. This is your first hands-on CRD interaction with the Prometheus Operator.',
        cmd: 'apiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  name: jellyfin\nspec:\n  selector:\n    matchLabels:\n      app: jellyfin\n  endpoints:\n    - port: http\n      path: /metrics',
      },
      {
        title: 'PrometheusRule CRDs for alerts',
        detail:
          'Write a PrometheusRule that alerts when Jellyfin restarts more than 3 times or CPU spikes.',
        cmd: 'apiVersion: monitoring.coreos.com/v1\nkind: PrometheusRule\nmetadata:\n  name: jellyfin-alerts\nspec:\n  groups:\n    - name: jellyfin\n      rules:\n        - alert: JellyfinDown\n          expr: up{job="jellyfin"} == 0',
      },
    ],
    milestone:
      'Single Grafana dashboard shows cluster health, Jellyfin metrics, and logs. Alerts fire. You understand ServiceMonitor/PrometheusRule as CRDs watched by an operator.',
  },
  {
    id: 7,
    title: 'Advanced GitOps Patterns',
    subtitle: 'Secrets, progressive delivery, infra as CRDs',
    icon: '🔀',
    color: '#8B5CF6',
    status: 'LEVEL UP',
    duration: '2–3 weeks',
    context:
      'This phase handles the hard real-world problems: secrets in Git, safe rollouts, and scaling to multiple clusters.',
    steps: [
      {
        title: 'Sealed Secrets or External Secrets',
        detail:
          'Never commit plain secrets to Git. Use Sealed Secrets (encrypt at cluster level) or External Secrets Operator (pull from Vault/AWS SSM).',
        cmd: '# Sealed Secrets\nkubeseal --format yaml < secret.yaml > sealed-secret.yaml\n# Now safe to commit sealed-secret.yaml',
      },
      {
        title: 'Argo Rollouts for progressive delivery',
        detail:
          'Replace Jellyfin Deployment with an Argo Rollout. Configure canary: 10% → wait 5min → 50% → full. Auto rollback on error spike.',
        cmd: 'apiVersion: argoproj.io/v1alpha1\nkind: Rollout\nspec:\n  strategy:\n    canary:\n      steps:\n        - setWeight: 10\n        - pause: {duration: 5m}\n        - setWeight: 50\n        - pause: {duration: 5m}',
      },
      {
        title: 'cert-manager CRD',
        detail:
          'Write a Certificate CRD for your Jellyfin ingress. cert-manager watches Certificate objects and auto-provisions/renews TLS from Let\'s Encrypt.',
        cmd: 'apiVersion: cert-manager.io/v1\nkind: Certificate\nmetadata:\n  name: jellyfin-tls\nspec:\n  secretName: jellyfin-tls\n  issuerRef:\n    name: letsencrypt-prod\n    kind: ClusterIssuer\n  dnsNames:\n    - jellyfin.yourdomain.com',
      },
      {
        title: 'Crossplane for infra-as-CRDs',
        detail:
          'Use Crossplane to provision Civo resources as Kubernetes CRDs. `kubectl apply` to create cloud infra.',
        cmd: '# Provision a Civo object store\napiVersion: storage.civo.crossplane.io/v1alpha1\nkind: ObjectStore\nmetadata:\n  name: jellyfin-media\nspec:\n  maxSizeGB: 500',
      },
    ],
    milestone:
      'No secrets in Git. Jellyfin uses canary deploys. TLS auto-renews. You understand CRDs are just an API extension — operators watch them and act.',
  },
]

const priorityColors = {
  'START HERE': '#00D4FF',
  'CORE SKILL': '#7C3AED',
  'CRD #1': '#10B981',
  'CRD #2': '#F59E0B',
  'CRD #3': '#EF4444',
  ESSENTIAL: '#06B6D4',
  'LEVEL UP': '#8B5CF6',
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

export default function K8sRoadmap() {
  const [activePhase, setActivePhase] = useState(null)
  const [activeStep, setActiveStep] = useState(null)

  const togglePhase = (id) => {
    setActivePhase(activePhase === id ? null : id)
    setActiveStep(null)
  }

  return (
    <div
      style={{
        background: '#0A0B0F',
        fontFamily: "'DM Mono', 'Fira Code', monospace",
        color: '#E2E8F0',
        padding: '1.5rem 1rem',
        borderRadius: '12px',
        border: '1px solid #1A1D27',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Epilogue:wght@700;900&display=swap');
        .rm-phase { transition: all 0.2s ease; cursor: pointer; }
        .rm-phase:hover { transform: translateX(3px); }
        .rm-step { transition: all 0.15s ease; cursor: pointer; }
        .rm-step:hover { opacity: 1 !important; }
        .rm-fade { animation: rmFade 0.3s ease; }
        @keyframes rmFade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .rm-scroll::-webkit-scrollbar { width: 3px; }
        .rm-scroll::-webkit-scrollbar-thumb { background: #2D3748; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.6rem', color: '#4A5568', letterSpacing: '0.15em' }}>CIVO CLUSTER</span>
          <span style={{ color: '#4A5568', fontSize: '0.7rem' }}>→</span>
          <span style={{ fontSize: '0.6rem', color: '#00D4FF', letterSpacing: '0.15em' }}>PRODUCTION-GRADE K8S</span>
        </div>
        <div
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 900,
            color: '#F7FAFC',
            lineHeight: 1.15,
          }}
        >
          Kubernetes Mastery Roadmap
        </div>
        <p style={{ color: '#718096', fontSize: '0.8rem', marginTop: '0.4rem', maxWidth: 480 }}>
          7 phases from Helm basics to full GitOps — security, observability, and advanced CRDs.
        </p>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          {['✓ Civo cluster', '✓ ArgoCD deployed', '✓ Jellyfin on DockerHub', '→ Helm next'].map((t, i) => (
            <span
              key={i}
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.65rem',
                background: i < 3 ? 'rgba(16,185,129,0.1)' : 'rgba(0,212,255,0.1)',
                border: `1px solid ${i < 3 ? 'rgba(16,185,129,0.3)' : 'rgba(0,212,255,0.3)'}`,
                color: i < 3 ? '#10B981' : '#00D4FF',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Phases */}
      {phases.map((phase, idx) => (
        <div key={phase.id} style={{ marginBottom: '0.75rem' }}>
          {idx > 0 && (
            <div style={{ width: 1, height: 12, background: '#2D3748', margin: '0 0 0.75rem 24px' }} />
          )}

          {/* Phase header */}
          <div
            role="button"
            tabIndex={0}
            className="rm-phase"
            onClick={() => togglePhase(phase.id)}
            onKeyDown={(e) => e.key === 'Enter' && togglePhase(phase.id)}
            style={{
              background:
                activePhase === phase.id
                  ? `linear-gradient(135deg, rgba(${hexToRgb(phase.color)},0.07) 0%, #111318 100%)`
                  : '#111318',
              border: `1px solid ${activePhase === phase.id ? phase.color + '40' : '#1E2330'}`,
              borderLeft: `3px solid ${phase.color}`,
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.25rem', minWidth: 30 }}>{phase.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#F7FAFC',
                  }}
                >
                  Phase {phase.id}: {phase.title}
                </span>
                <span
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.1em',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '3px',
                    background: `rgba(${hexToRgb(phase.color)},0.15)`,
                    color: phase.color,
                    border: `1px solid rgba(${hexToRgb(phase.color)},0.3)`,
                  }}
                >
                  {phase.status}
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#718096', marginTop: '0.15rem' }}>
                {phase.subtitle} ·{' '}
                <span style={{ color: '#4A5568' }}>{phase.duration}</span>
              </div>
            </div>
            <span
              style={{
                color: '#4A5568',
                fontSize: '0.75rem',
                transform: activePhase === phase.id ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              ▶
            </span>
          </div>

          {/* Expanded */}
          {activePhase === phase.id && (
            <div
              className="rm-fade"
              style={{
                background: '#0D0E13',
                border: '1px solid #1E2330',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                padding: '1.25rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#A0AEC0',
                  margin: '0 0 1rem',
                  padding: '0.6rem 0.85rem',
                  background: `rgba(${hexToRgb(phase.color)},0.05)`,
                  borderLeft: `2px solid ${phase.color}`,
                  borderRadius: '0 4px 4px 0',
                  lineHeight: 1.7,
                }}
              >
                💡 {phase.context}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {phase.steps.map((step, si) => (
                  <div key={si}>
                    <div
                      role="button"
                      tabIndex={0}
                      className="rm-step"
                      onClick={() =>
                        setActiveStep(activeStep === `${phase.id}-${si}` ? null : `${phase.id}-${si}`)
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        setActiveStep(activeStep === `${phase.id}-${si}` ? null : `${phase.id}-${si}`)
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '6px',
                        background: activeStep === `${phase.id}-${si}` ? '#161820' : '#111318',
                        border: `1px solid ${activeStep === `${phase.id}-${si}` ? '#2D3748' : '#1A1D27'}`,
                        opacity: 0.9,
                      }}
                    >
                      <span
                        style={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: `rgba(${hexToRgb(phase.color)},0.2)`,
                          border: `1px solid rgba(${hexToRgb(phase.color)},0.4)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.6rem',
                          color: phase.color,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {si + 1}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#CBD5E0', flex: 1 }}>{step.title}</span>
                      <span style={{ color: '#4A5568', fontSize: '0.65rem' }}>
                        {activeStep === `${phase.id}-${si}` ? '▲' : '▼'}
                      </span>
                    </div>

                    {activeStep === `${phase.id}-${si}` && (
                      <div
                        className="rm-fade"
                        style={{
                          margin: '0.2rem 0 0.2rem 2.2rem',
                          padding: '0.85rem',
                          background: '#0A0B0F',
                          border: '1px solid #1E2330',
                          borderRadius: '0 0 6px 6px',
                        }}
                      >
                        <p style={{ fontSize: '0.77rem', color: '#A0AEC0', margin: '0 0 0.65rem', lineHeight: 1.7 }}>
                          {step.detail}
                        </p>
                        {step.cmd && (
                          <pre
                            style={{
                              background: '#060709',
                              border: '1px solid #1E2330',
                              borderRadius: '4px',
                              padding: '0.6rem 0.85rem',
                              fontSize: '0.7rem',
                              color: '#68D391',
                              margin: 0,
                              lineHeight: 1.6,
                              overflowX: 'auto',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                            }}
                          >
                            {step.cmd}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.6rem 0.85rem',
                  background: 'rgba(16,185,129,0.05)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#6EE7B7',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: '#10B981', marginRight: '0.4rem' }}>✓ MILESTONE:</span>
                {phase.milestone}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
