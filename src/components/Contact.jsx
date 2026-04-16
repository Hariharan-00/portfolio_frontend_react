import { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate send
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  const contacts = [
    { icon: '📧', label: 'Email', value: 'alex.kumar@email.com', href: 'mailto:alex.kumar@email.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/alexkumar', href: '#' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/alexkumar', href: '#' },
    { icon: '📱', label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
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
          {/* Left */}
          <div>
            <p className="text-gray-300 text-base leading-relaxed mb-8">
              I'm currently open to new opportunities. Whether you have a project in mind, 
              want to collaborate, or just want to say hi — my inbox is always open!
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex items-center gap-4 p-4 bg-[#080B12] border border-[#1E2535] rounded-xl hover:border-[#00FF94]/30 hover:bg-[#00FF94]/5 transition-all duration-200 group"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-gray-500 mb-0.5">{c.label}</div>
                    <div className="font-sans text-sm text-white group-hover:text-[#00FF94] transition-colors">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 bg-[#00FF94]/5 border border-[#00FF94]/20 rounded-xl px-5 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_8px_#00FF94]"></div>
              <div>
                <div className="font-mono text-xs text-[#00FF94]">Available for freelance & full-time</div>
                <div className="font-sans text-xs text-gray-500">Response within 24 hours</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#080B12] border border-[#1E2535] rounded-2xl p-6 sm:p-8">
            <div className="font-mono text-sm text-[#00FF94] mb-6">// send_message()</div>

            {sent ? (
              <div className="flex flex-col items-center justify-center h-48 gap-4">
                <div className="text-4xl">✅</div>
                <div className="font-mono text-[#00FF94] text-center">Message sent successfully!</div>
                <div className="font-sans text-gray-500 text-sm text-center">I'll get back to you shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs text-gray-500 block mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-[#0D1117] border border-[#1E2535] rounded-lg px-4 py-3 text-white text-sm font-sans placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-gray-500 block mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-[#0D1117] border border-[#1E2535] rounded-lg px-4 py-3 text-white text-sm font-sans placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-gray-500 block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#0D1117] border border-[#1E2535] rounded-lg px-4 py-3 text-white text-sm font-sans placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#00FF94] text-[#080B12] font-mono font-bold text-sm py-3 rounded-lg hover:bg-white transition-all duration-200 tracking-wider"
                >
                  SEND MESSAGE →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
