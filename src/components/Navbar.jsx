import { useState, useEffect, useRef } from "react";
import WebDevLogo from "../assets/icons/WebDesign.svg";
import ResumePdf from "../assets/pdf/Hariharan_FullStack_Developer.pdf";

/* ---------- Small icons ---------- */
const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

/* ---------- Running robot (carries a tiny resume page) ---------- */
const RunningRobot = () => (
  <svg viewBox="0 0 36 36" width="30" height="30" className="robot-bob overflow-visible">
    {/* antenna */}
    <line x1="16" y1="2" x2="16" y2="6" stroke="#00FF94" strokeWidth="1.5" />
    <circle cx="16" cy="2" r="1.6" fill="#00FF94" />
    {/* head */}
    <rect x="6" y="6" width="20" height="13" rx="4" fill="#0D1117" stroke="#00FF94" strokeWidth="1.5" />
    <circle cx="12" cy="12.5" r="2" fill="#00FF94" />
    <circle cx="20" cy="12.5" r="2" fill="#00FF94" />
    {/* body */}
    <rect x="9" y="20" width="14" height="9" rx="3" fill="#0D1117" stroke="#00FF94" strokeWidth="1.5" />
    {/* legs */}
    <line className="robot-leg-a" x1="13" y1="29" x2="13" y2="35" stroke="#00FF94" strokeWidth="2" strokeLinecap="round" />
    <line className="robot-leg-b" x1="19" y1="29" x2="19" y2="35" stroke="#00FF94" strokeWidth="2" strokeLinecap="round" />
    {/* arm holding resume page */}
    <line x1="23" y1="23" x2="27" y2="22" stroke="#00FF94" strokeWidth="2" strokeLinecap="round" />
    <rect x="26" y="15" width="8" height="10" rx="1.2" fill="#E5E7EB" />
    <line x1="28" y1="18" x2="32" y2="18" stroke="#0D1117" strokeWidth="1" />
    <line x1="28" y1="20.5" x2="32" y2="20.5" stroke="#0D1117" strokeWidth="1" />
    <line x1="28" y1="23" x2="31" y2="23" stroke="#0D1117" strokeWidth="1" />
  </svg>
);

// const RESUME_URL = {ResumePdf};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [downloaded, setDownloaded] = useState(false);
  const [run, setRun] = useState({ left: 0, dist: 0 });

  const innerRef = useRef(null);
  const contactRef = useRef(null);
  const downloadRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* measure the distance from "Contact" to the download button */
  // useEffect(() => {
  //   const measure = () => {
  //     if (!innerRef.current || !contactRef.current || !downloadRef.current) return;
  //     const c = innerRef.current.getBoundingClientRect();
  //     const a = contactRef.current.getBoundingClientRect();
  //     const b = downloadRef.current.getBoundingClientRect();
  //     const start = a.right - c.left + 14;
  //     const end = b.left - c.left - 36;
  //     setRun({ left: start, dist: Math.max(0, end - start) });
  //   };
  //   measure();
  //   window.addEventListener("resize", measure);
  //   window.addEventListener("load", measure);
  //   return () => {
  //     window.removeEventListener("resize", measure);
  //     window.removeEventListener("load", measure);
  //   };
  // }, []);
  useEffect(() => {
    const measure = () => {
      const isDesktop = window.innerWidth >= 768;           // Tailwind md breakpoint
      const startEl = isDesktop ? contactRef.current : logoRef.current;
      if (!innerRef.current || !startEl || !downloadRef.current) return;

      const c = innerRef.current.getBoundingClientRect();
      const a = startEl.getBoundingClientRect();
      const b = downloadRef.current.getBoundingClientRect();

      const start = a.right - c.left + 10;
      const end = b.left - c.left - 34;
      setRun({ left: start, dist: Math.max(0, end - start) });
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);
  const links = ["home", "about", "skills", "projects", "contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#080B12]/90 backdrop-blur-xl border-b border-[#00FF94]/10"
        : "bg-transparent"
        }`}
    >
      <div
        ref={innerRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div
          ref={logoRef}
          className="font-mono text-[#00FF94] text-xl font-bold tracking-widest cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          <img src={WebDevLogo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Centered Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {links.map((link) => (
            <button
              key={link}
              ref={link === "contact" ? contactRef : null}
              onClick={() => scrollTo(link)}
              className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${active === link ? "text-[#00FF94]" : "text-gray-400 hover:text-white"
                }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Robot running: Contact -> Download (desktop only) */}
        {/* {run.dist > 0 && (
          <div
            className="hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: run.left }}
          >
            <div className="robot-run" style={{ "--run-dist": `${run.dist}px` }}>
              <RunningRobot />
            </div>
          </div>
        )} */}
        {run.dist > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: run.left }}
          >
            <div className="robot-run" style={{ "--run-dist": `${run.dist}px` }}>
              <RunningRobot />
            </div>
          </div>
        )}

        {/* Right side: Resume + hamburger */}
        <div className="flex items-center gap-3">
          <a
            ref={downloadRef}
            href={ResumePdf}
            download="Hariharan_V_Resume.pdf"
            onClick={handleDownload}
            title="Download Resume"
            aria-label="Download Resume"
            className="resume-ping flex items-center gap-2 rounded-lg border border-[#00FF94]/60
                       text-[#00FF94] px-3 py-2 font-mono text-xs uppercase tracking-widest
                       hover:bg-[#00FF94] hover:text-[#080B12] transition-colors duration-200"
          >
            {downloaded ? <CheckIcon /> : <DownloadIcon />}
            <span className="hidden lg:inline">{downloaded ? "Saved" : "Resume"}</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#00FF94] flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#00FF94] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-[#00FF94] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-[#00FF94] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80" : "max-h-0"
          }`}
      >
        <div className="bg-[#0D1117]/95 backdrop-blur-xl border-t border-[#00FF94]/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`font-mono text-sm uppercase tracking-widest text-left transition-colors ${active === link ? "text-[#00FF94]" : "text-gray-400"
                }`}
            >
              {`> ${link}`}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;