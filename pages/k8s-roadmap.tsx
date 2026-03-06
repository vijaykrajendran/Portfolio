import K8sRoadmap from '@/components/K8sRoadmap'

export default function K8sRoadmapPage() {
  return (
    <>
      <div className="space-y-2 pb-6 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          K8s Roadmap
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          My structured path from a basic Civo cluster to a fully GitOps-managed, policy-enforced,
          observable Kubernetes setup — 7 phases, hands-on.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <K8sRoadmap />
      </div>
    </>
  )
}