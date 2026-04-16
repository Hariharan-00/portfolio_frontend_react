import { useEffect, useRef, useState } from "react";
import { useProjects } from "../context/context";

const filters = ["All", "Frontend", "Full Stack"];

const Projects = () => {
  const { projects } = useProjects(); // ✅ API data
  const ref = useRef(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // ✅ Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) ref.current?.classList.add("visible");
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Sort + Filter API Data
  const filtered =
    projects
      ?.sort((a, b) => a.order - b.order)
      ?.filter(
        (p) => activeFilter === "All" || p.type === activeFilter
      ) || [];

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      <div className="orb w-96 h-96 bg-[#00D4FF]/5 top-20 right-0" />

      <div
        ref={ref}
        className="section-animate max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[#00FF94] text-sm mb-2 tracking-widest">
            // 03. WHAT I'VE BUILT
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-white">
                My <span className="text-[#00FF94]">Projects</span>
              </h2>
              <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-[#00FF94] to-transparent" />
            </div>

            <div className="font-mono text-xs text-gray-500">
              {projects?.length || 0}+ projects delivered
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[#00FF94] text-[#080B12] border-[#00FF94] font-bold"
                  : "border-[#1E2535] text-gray-400 hover:border-[#00FF94]/30 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((p, i) => (
            <div
              key={p._id}
              className="card-hover group bg-[#0D1117] border border-[#1E2535] rounded-2xl p-6 cursor-pointer"
              style={{ borderColor: `${p.color}15` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{p.icon}</div>

                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="font-mono text-[10px] text-[#FFD700] border border-[#FFD700]/30 bg-[#FFD700]/5 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}

                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      color: p.color,
                      borderColor: `${p.color}40`,
                      background: `${p.color}08`,
                    }}
                  >
                    {p.type}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-white text-base mb-2">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                {p.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1E2535] text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Bottom Line */}
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded"
                style={{
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Show More */}
        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-sm border border-[#00FF94]/30 text-[#00FF94] px-8 py-3 rounded hover:bg-[#00FF94]/10 transition-all duration-200 tracking-wider"
            >
              {showAll
                ? "SHOW LESS ↑"
                : `VIEW ALL ${filtered.length} PROJECTS ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;