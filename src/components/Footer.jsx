const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080B12] border-t border-[#1E2535] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[#00FF94] font-bold text-lg">&lt;DEV/&gt;</div>
        <div className="font-mono text-xs text-gray-600 text-center">
          Designed & Built by <span className="text-[#00FF94]">Hariharan</span> · {year}
        </div>
        <div className="font-mono text-xs text-gray-600">
          React · Vite · Tailwind . Node js . Mongodb
        </div>
      </div>
    </footer>
  );
};

export default Footer;
