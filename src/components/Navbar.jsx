import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["home", "about", "skills", "projects"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080B12]/90 backdrop-blur-xl border-b border-[#00FF94]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="font-mono text-[#00FF94] text-xl font-bold tracking-widest cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          &lt;DEV/&gt;
        </div>

        {/* Centered Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                active === link
                  ? "text-[#00FF94]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#00FF94] flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-[#00FF94] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#00FF94] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#00FF94] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-[#0D1117]/95 backdrop-blur-xl border-t border-[#00FF94]/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`font-mono text-sm uppercase tracking-widest text-left transition-colors ${
                active === link ? "text-[#00FF94]" : "text-gray-400"
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