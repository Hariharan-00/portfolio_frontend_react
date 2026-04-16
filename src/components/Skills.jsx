import { useEffect, useRef, useState } from "react";
import { useSkills } from "../context/context";

const Skills = () => {
  const { skills } = useSkills(); // ✅ API data
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  // ✅ Intersection Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add("visible");
          setAnimate(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Convert percentage → tag
  const getTag = (percentage) => {
    if (percentage >= 90) return "Expert";
    if (percentage >= 75) return "Advanced";
    if (percentage >= 60) return "Intermediate";
    if (percentage >= 40) return "Learning";
    return "Growing";
  };

  // ✅ Transform API → UI format
  const skillGroups =
    skills
      ?.filter((group) => group.skills && group.skills.length > 0)
      .sort((a, b) => a.order - b.order)
      .map((group) => ({
        category: group.category,
        icon: group.icon,
        color: group.color,
        skills: group.skills.map((skill) => ({
          name: skill.name,
          level: skill.percentage,
          tag: getTag(skill.percentage),
        })),
      })) || [];

  // ✅ Get Tech Tags
  const techTags =
    skills?.find((g) => g.category === "All Technologies")?.tags || [];

  const tagColors = {
    Expert: "text-[#00FF94] border-[#00FF94]/30 bg-[#00FF94]/5",
    Advanced: "text-[#00D4FF] border-[#00D4FF]/30 bg-[#00D4FF]/5",
    Intermediate: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    Learning: "text-purple-400 border-purple-400/30 bg-purple-400/5",
    Growing: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  };

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 bg-[#0D1117] overflow-hidden"
    >
      <div className="orb w-80 h-80 bg-[#00FF94]/5 -bottom-20 -left-20" />

      <div
        ref={ref}
        className="section-animate max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[#00FF94] text-sm mb-2 tracking-widest">
            // 02. WHAT I KNOW
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white">
            My <span className="text-[#00FF94]">Skills</span>
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-[#00FF94] to-transparent" />
        </div>

        {/* Skill Groups */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="bg-[#080B12] border border-[#1E2535] rounded-2xl p-6 hover:border-[#00FF94]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">{group.icon}</div>
                <div>
                  <div className="font-sans font-bold text-white text-sm">
                    {group.category}
                  </div>
                  <div className="font-mono text-xs text-gray-500">
                    {group.skills.length} skills
                  </div>
                </div>
              </div>

              {group.skills.map((skill, j) => (
                <div key={j} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm text-gray-300">
                        {skill.name}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                          tagColors[skill.tag] || tagColors["Learning"]
                        }`}
                      >
                        {skill.tag}
                      </span>
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{ color: group.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-[#1E2535] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: animate ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, ${group.color}, ${group.color}88)`,
                        boxShadow: `0 0 8px ${group.color}50`,
                        transition: `width 1.2s ease ${
                          j * 0.15 + i * 0.1
                        }s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Technologies Cloud */}
        <div className="mt-12 p-6 bg-[#080B12] border border-[#1E2535] rounded-2xl">
          <div className="font-mono text-xs text-gray-500 mb-5 uppercase tracking-widest">
            All Technologies
          </div>
          <div className="flex flex-wrap gap-2">
            {techTags.map((tech) => (
              <span key={tech} className="tech-tag cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;