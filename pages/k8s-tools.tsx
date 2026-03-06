import K8sToolsExplorer from '@/components/K8sToolsExplorer'

export default function K8sToolsPage() {
  return (
    <>
      {/* Page header — matches your site's style */}
      <div className="space-y-2 pb-6 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          K8s Tools
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          An interactive map of 50+ Kubernetes tools — filter by category, priority, or search by name.
        </p>
      </div>

      {/* The explorer — fixed height so it doesn't overflow */}
      <div style={{ height: '80vh', borderRadius: '12px', overflow: 'hidden' }}>
        <K8sToolsExplorer />
      </div>
    </>
  )
}
