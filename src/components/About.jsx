import { useEffect, useRef } from 'react';
import { useAboutMe } from '../context/context';

const About = () => {
  const { aboutMe, aboutLoading } = useAboutMe();
  const ref = useRef(null);

  // ✅ Intersection animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Highlight function
  const highlightText = (text, keywords) => {
    if (!keywords || keywords.length === 0) return text;

    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
        <span key={index} className="text-[#00FF94] font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // // ✅ Loading state
  // if (aboutLoading) {
  //   return (
  //     <section className="py-20 text-center text-white">
  //       Loading...
  //     </section>
  //   );
  // }

  // ✅ Safe destructuring
  const {
    section_label = '',
    section_title = '',
    bio = [],
    stats = [],
    skill_cards = [],
    highlighted_keywords = [],
    currently_learning = []
  } = aboutMe || {};

  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
      
      {/* bg accent */}
      <div className="orb w-96 h-96 bg-[#00D4FF]/5 top-10 right-0" />

      <div ref={ref} className="section-animate max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ✅ Header */}
        <div className="mb-14">
          <div className="font-mono text-[#00FF94] text-sm mb-2 tracking-widest">
            {section_label}
          </div>

          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white">
            {section_title.split(' ')[0]}{' '}
            <span className="text-[#00FF94]">
              {section_title.split(' ')[1]}
            </span>
          </h2>

          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-[#00FF94] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* ✅ LEFT SIDE */}
          <div>
            {/* Bio with Highlight */}
            {bio
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <p
                  key={item.order}
                  className="text-gray-400 text-base leading-relaxed mb-5"
                >
                  {highlightText(item.text, highlighted_keywords)}
                </p>
              ))}

            {/* Keywords Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {highlighted_keywords.map((k, i) => (
                <span
                  key={i}
                  className="text-xs bg-[#1E2535] px-3 py-1 rounded-full text-[#00FF94]"
                >
                  {k}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#0D1117] border border-[#1E2535] rounded-lg p-4"
                >
                  <div className="font-mono text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="font-sans font-semibold text-white text-sm">
                    {item.is_active ? '🟢 ' : ''}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Currently Learning */}
            <div className="mt-6">
              <h4 className="text-sm text-gray-400 mb-2">
                Currently Learning
              </h4>
              <div className="flex flex-wrap gap-2">
                {currently_learning.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#0D1117] border border-[#1E2535] px-3 py-1 rounded-full text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ RIGHT SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skill_cards
              .sort((a, b) => a.order - b.order)
              .map((item, i) => (
                <div
                  key={i}
                  className="card-hover bg-[#0D1117] border border-[#1E2535] hover:border-[#00FF94]/30 rounded-xl p-5"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>

                  <h3 className="font-sans font-bold text-white text-sm mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;