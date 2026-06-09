export default function RootLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46] flex flex-col items-center justify-center relative overflow-hidden">

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          [8,6],[18,15],[32,8],[50,20],[65,10],[80,25],[92,14],[12,40],
          [27,55],[43,48],[60,62],[75,50],[88,70],[5,75],[20,82],[38,78],
          [55,90],[70,85],[85,92],[95,78],
        ].map(([x, y], i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`, top: `${y}%`,
              width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
              background: i % 4 === 0 ? '#6ee7b7' : '#ffffff',
              opacity: 0.5 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 200" className="w-full" preserveAspectRatio="none" style={{ height: 160 }}>
          <polygon points="0,200 200,80 400,200"   fill="rgba(2,44,34,0.6)" />
          <polygon points="150,200 420,40 690,200"  fill="rgba(2,44,34,0.55)" />
          <polygon points="450,200 700,70 950,200"  fill="rgba(2,44,34,0.65)" />
          <polygon points="700,200 950,50 1200,200" fill="rgba(2,44,34,0.60)" />
          <rect x="0" y="160" width="1200" height="40" fill="rgba(2,44,34,0.85)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Animated tent */}
        <div className="relative">
          <div className="text-7xl animate-bounce" style={{ animationDuration: '1.4s' }}>⛺</div>
          {/* Glow ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-400/10 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tight mb-1">
            <span className="text-white">Campy</span>
            <span className="text-emerald-400">Win</span>
          </h1>
          <p className="text-emerald-300/70 text-sm font-medium tracking-widest uppercase">
            Loading your adventure…
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-loading-bar" />
        </div>

        {/* Feature pills */}
        <div className="flex items-center gap-4 mt-2">
          {['🏕️ Séjours', '📅 Événements', '💼 Carrières'].map((f, i) => (
            <span
              key={f}
              className="text-xs text-white/50 font-medium"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   transform: translateX(0); }
          50%  { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(110%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
