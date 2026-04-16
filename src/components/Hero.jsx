// src/components/Hero.js
import { useState, useEffect } from 'react';
import { useProfile } from '../context/context';
import ProfileImage from "../assets/image/hari_profile_image.jpeg";

const Hero = () => {
  const { profile, loading } = useProfile();

  // Typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

const roles = profile?.roles || [];

useEffect(() => {
  if (roles.length === 0) return; // 🛑 STOP if no roles

  const current = roles[roleIndex] || "";
  let timeout;

  if (!deleting && charIndex < current.length) {
    timeout = setTimeout(() => {
      setDisplayed(current.substring(0, charIndex + 1));
      setCharIndex(c => c + 1);
    }, 80);

  } else if (!deleting && charIndex === current.length) {
    timeout = setTimeout(() => setDeleting(true), 2000);

  } else if (deleting && charIndex > 0) {
    timeout = setTimeout(() => {
      setDisplayed(current.substring(0, charIndex - 1));
      setCharIndex(c => c - 1);
    }, 40);

  } else if (deleting && charIndex === 0) {
    setDeleting(false);
    setRoleIndex(r => roles.length ? (r + 1) % roles.length : 0);
  }

  return () => clearTimeout(timeout);
}, [charIndex, deleting, roleIndex, roles]);
  // Stats built from profile data
const stats = [
  { num: `${profile?.yearsOfExperience ?? 2}+`,  label: 'Years Exp.'  },
  { num: `${profile?.totalProjects ?? 18}+`,     label: 'Projects'    },
  { num: profile?.title ?? 'Full Stack',         label: 'Role'        },
];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Orbs */}
      <div className="orb w-96 h-96 bg-[#00FF94]/8 top-20 -left-40" />
      <div className="orb w-80 h-80 bg-[#00D4FF]/6 bottom-20 -right-20" />
      <div className="orb w-64 h-64 bg-[#00FF94]/5 top-1/2 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">

            {/* Available badge */}
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00FF94] border border-[#00FF94]/30 px-4 py-2 rounded-full mb-6 bg-[#00FF94]/5">
              <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse"></span>
              {profile?.availability ?? 'Available for work'}
            </div>

            {/* Name */}
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-3">
              Hello, I'm<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#00D4FF]">
                {profile?.name }
              </span>
            </h1>

            {/* Typewriter */}
            <div className="font-mono text-lg sm:text-xl text-gray-400 mb-6 h-8">
              <span className="text-[#00D4FF]">&gt; </span>
              <span className="text-white">{displayed}</span>
              <span className="text-[#00FF94] animate-pulse">_</span>
            </div>

            {/* Bio */}
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8 mx-auto lg:mx-0">
              {profile?.bio ?? '2+ years crafting high-performance web experiences.'}
            </p>

            {/* Stats — dynamic */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-mono font-bold text-2xl text-[#00FF94]">{stat.num}</div>
                  <div className="font-sans text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-mono text-sm bg-[#00FF94] text-[#080B12] px-6 py-3 rounded font-bold hover:bg-white transition-all duration-200 tracking-wider"
              >
                VIEW PROJECTS
              </button>
              {/* <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-mono text-sm border border-[#00FF94]/40 text-[#00FF94] px-6 py-3 rounded hover:bg-[#00FF94]/10 transition-all duration-200 tracking-wider"
              >
                GET IN TOUCH
              </button> */}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Rotating rings */}
              <div className="absolute inset-0 rounded-full border border-[#00FF94]/20 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#00FF94] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#00FF94]" />
              </div>
              <div className="absolute inset-4 rounded-full border border-[#00D4FF]/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF]" />
              </div>

              {/* Center — profile image or emoji fallback */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#0D1117] to-[#161B27] border border-[#00FF94]/30 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(0,255,148,0.15)]">
                {ProfileImage ? (
                  <img
                    src={ProfileImage}
                    alt={profile?.name || "profile"}
                   className="w-full h-full object-cover object-top rounded-full"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">👨‍💻</div>
                    <div className="font-mono text-[#00FF94] text-xs">{'<dev/>'}</div>
                  </div>
                )}
              </div>

              {/* Floating badges — dynamic */}
              <div className="absolute -top-2 -right-4 bg-[#0D1117] border border-[#00FF94]/30 rounded-lg px-3 py-1.5 font-mono text-xs text-[#00FF94] shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                {profile?.topSkill ?? 'React'} ⚡
              </div>
              <div className="absolute -bottom-2 -left-4 bg-[#0D1117] border border-[#00D4FF]/30 rounded-lg px-3 py-1.5 font-mono text-xs text-[#00D4FF] shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
                {profile?.totalProjects ?? ''} Projects 🚀
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="font-mono text-xs uppercase tracking-widest">scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00FF94]/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-[#00FF94] animate-[scan_2s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;