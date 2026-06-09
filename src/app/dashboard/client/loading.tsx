export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      {/* Header skeleton */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-emerald-950/80 backdrop-blur-md border-b border-gray-100 dark:border-emerald-900/30 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 animate-pulse" />
            <div className="hidden sm:block w-28 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 animate-pulse ml-1" />
          </div>
        </div>
      </div>

      {/* Page content skeleton */}
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full pb-36">

        {/* Page title skeleton */}
        <div className="mb-6">
          <div className="w-48 h-7 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-2" />
          <div className="w-72 h-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* Stats row skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 animate-pulse" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700 mb-3" />
              <div className="w-16 h-6 bg-gray-200 dark:bg-gray-600 rounded-lg mb-1" />
              <div className="w-24 h-3 bg-gray-100 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600" />
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="w-16 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full" />
                  <div className="w-20 h-4 bg-gray-100 dark:bg-gray-700 rounded-full" />
                </div>
                <div className="w-full h-5 bg-gray-200 dark:bg-gray-600 rounded-lg" />
                <div className="w-3/4 h-4 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                <div className="flex justify-between items-center pt-1">
                  <div className="w-20 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg" />
                  <div className="w-16 h-8 bg-emerald-600/20 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.30s' }} />
        </div>
      </main>

      {/* Bottom nav skeleton */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-emerald-950/90 border-t border-gray-100/50 dark:border-emerald-800/30 rounded-t-3xl flex items-center justify-around px-6 pb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className={`rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse ${i === 2 ? 'w-14 h-14 -mt-6' : 'w-7 h-7'}`} style={{ animationDelay: `${i * 0.1}s` }} />
            {i !== 2 && <div className="w-8 h-2 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  );
}
