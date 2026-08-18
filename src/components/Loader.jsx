// src/components/Loader.jsx
// Shows real progress for each API call (profile, about, skills, projects)
// instead of a generic spinner — ticks each item off as its fetch resolves.

const ITEMS = [
  { key: 'profile',  label: 'profile'  },
  { key: 'about',    label: 'about-me' },
  { key: 'skills',   label: 'skills'   },
  { key: 'projects', label: 'projects' },
];

const Loader = ({ status = {} }) => {
  const doneCount = ITEMS.filter((item) => status[item.key]).length;
  const percent = Math.round((doneCount / ITEMS.length) * 100);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080B12] grid-bg overflow-hidden">
      {/* Ambient orbs, consistent with the rest of the site */}
      <div className="orb w-96 h-96 bg-[#00FF94]/8 top-10 -left-32" />
      <div className="orb w-80 h-80 bg-[#00D4FF]/6 bottom-10 -right-24" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-xs">
        {/* Rotating ring avatar mark, echoes the Hero avatar rings */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
          <div
            className="absolute inset-0 rounded-full border border-[#00FF94]/20 animate-spin"
            style={{ animationDuration: '3s' }}
          >
            <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-[#00FF94] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00FF94]" />
          </div>
          <div
            className="absolute inset-3 rounded-full border border-[#00D4FF]/20 animate-spin"
            style={{ animationDuration: '2.2s', animationDirection: 'reverse' }}
          >
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF]" />
          </div>
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#0D1117] to-[#161B27] border border-[#00FF94]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,148,0.15)]">
            <span className="font-mono text-[#00FF94] text-lg animate-pulse">{'</>'}</span>
          </div>
        </div>

        {/* Live checklist — one line per API call */}
        <div className="w-full font-mono text-xs sm:text-sm space-y-2">
          {ITEMS.map((item) => {
            const isDone = !!status[item.key];
            return (
              <div
                key={item.key}
                className="flex items-center gap-2 transition-colors duration-300"
              >
                <span
                  className={
                    isDone
                      ? 'text-[#00FF94]'
                      : 'text-gray-600 animate-pulse'
                  }
                >
                  {isDone ? '✓' : '○'}
                </span>
                <span className={isDone ? 'text-gray-300' : 'text-gray-500'}>
                  loading {item.label}
                </span>
                {!isDone && (
                  <span className="text-[#00D4FF] animate-pulse">...</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar reflects real completion, not a fake sweep */}
        <div className="w-full">
          <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FF94] to-[#00D4FF] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-2 font-mono text-[10px] text-gray-600 text-center tracking-widest">
            {percent}% READY
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
