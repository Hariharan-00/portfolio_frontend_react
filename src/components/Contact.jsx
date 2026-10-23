import { useEffect, useRef, useState } from 'react';
import EmailIcon from "../../src/assets/icons/gmail.png";
import Linkedin from "../../src/assets/icons/linkedin.png";
import Github from "../../src/assets/icons/github.png";
import SmartPhone from "../../src/assets/icons/smartphone.png"
import VideoGif from "../../src/assets/animation/hariharan_fullstack_skills.gif";


const Contact = () => {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });



  const contacts = [
    {
      icon: EmailIcon,
      label: 'Email',
      value: 'hariharang441@gmail.com',
      // href: 'mailto:hariharang441@gmail.com?subject=Inquiry%20from%20Portfolio', 
      isExternal: true
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/hariharan46',
      href: 'https://www.linkedin.com/in/hariharan46/',
      isExternal: true
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Hariharan-00',
      href: 'https://github.com/Hariharan-00',
      isExternal: true
    },
    {
      icon: SmartPhone,
      label: 'Phone',
      value: '+91 9025122156',
      href: 'tel:+919025122156',
      isExternal: false
    },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#0D1117] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#00FF94]/5 bottom-0 right-0" />
      <div className="orb w-64 h-64 bg-[#00D4FF]/5 top-10 left-0" />

      <div ref={ref} className="section-animate max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <div className="font-mono text-[#00FF94] text-sm mb-2 tracking-widest">// 04. LET'S CONNECT</div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white">
            Get In <span className="text-[#00FF94]">Touch</span>
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-[#00FF94] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div>
            <p className="text-gray-300 text-base leading-relaxed mb-8">
              I'm currently open to new opportunities. Whether you have a project in mind,
              want to collaborate, or just want to say hi — my inbox is always open!
            </p>

            <div className="space-y-4 mb-8">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.isExternal ? '_blank' : '_self'}
                  rel={c.isExternal ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 bg-[#080B12] border border-[#1E2535] rounded-xl hover:border-[#00FF94]/30 hover:bg-[#00FF94]/5 transition-all duration-200 group"
                >
                  <img src={c.icon} alt="" className="h-6 w-6" />
                  {/* <span className="text-2xl">Img={c.icon}</span> */}
                  <div>
                    <div className="font-mono text-xs text-gray-500 mb-0.5">{c.label}</div>
                    <div className="font-sans text-sm text-white group-hover:text-[#00FF94] transition-colors">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile-Friendly Quick Mail Link */}
            <div className="mb-8 block sm:hidden">
              <a
                href="mailto:hariharang441@gmail.com?subject=Portfolio%20Contact"
                className="inline-flex items-center justify-center w-full gap-2 p-3 bg-[#1E2535] text-[#00FF94] font-mono text-xs rounded-xl border border-[#00FF94]/30 hover:bg-[#00FF94]/10 transition-all"
              >
                 <img src={EmailIcon} alt="" className="h-6 w-6" /> Open Mail App Directly
              </a>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 bg-[#00FF94]/5 border border-[#00FF94]/20 rounded-xl px-5 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_8px_#00FF94]"></div>
              <div>
                <div className="font-mono text-xs text-[#00FF94]">Available for freelance & full-time</div>
                <div className="font-sans text-xs text-gray-500">Response within 24 hours</div>
              </div>
            </div>
          </div>

          {/* Right - video Section */}
          {/* Right - video Section */}
          <div className="bg-[#080B12] border border-[#1E2535] rounded-2xl p-6 sm:p-8 relative">
            {/* <div className="font-mono text-sm text-[#00FF94] mb-6">
              {"// hariharan.skills()"}
            </div> */}

            <img
              src={VideoGif}
              alt="Hariharan V - Full Stack Developer skills"
              className="w-full h-full rounded-xl border border-[#1E2535]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;