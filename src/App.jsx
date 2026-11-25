// src/App.jsx
import { useEffect, useState } from 'react';
import { ProfileProvider, useProfile } from './context/context';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoaderGif from './assets/animation/loading.gif';

function AppContent() {
  const { appReady, loading, aboutLoading, skillLoading, projectsLoading } =
    useProfile();

  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  const steps = [!loading, !aboutLoading, !skillLoading, !projectsLoading];
  const done = steps.filter(Boolean).length;
  const target = appReady ? 100 : Math.min(Math.round((done / steps.length) * 100), 90);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p < target ? p + 1 : p));
    }, 15);
    return () => clearInterval(id);
  }, [target]);

  const isReady = appReady && progress >= 100;

  useEffect(() => {
    if (!isReady) return;
    const t = setTimeout(() => setShowLoader(false), 500);
    return () => clearTimeout(t);
  }, [isReady]);

  return (
    <div className="noise min-h-screen bg-[#080B12]">
      {showLoader && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#080B12] ${
            isReady ? 'loader-exit' : ''
          }`}
        >
          <img src={LoaderGif} alt="Loading" className="h-32 w-32 object-contain" />

          <div className="w-64 sm:w-80">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#30C3B3]/15">
              <div
                className="h-full rounded-full bg-[#30C3B3] shadow-[0_0_10px_rgba(48,195,179,0.6)] transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium tabular-nums text-[#30C3B3]">
              {progress}%
            </p>
          </div>
        </div>
      )}

      {isReady && (
        <div className="site-fade-in">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
}

export default App;