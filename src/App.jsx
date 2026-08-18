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
import Loader from './components/Loader';

// Minimum time (ms) the loader stays on screen so it never just flashes
// on a fast connection — feels intentional instead of a glitch.
const MIN_LOADER_MS = 900;

function AppContent() {
  const {
    appReady,
    loading,         // profile
    aboutLoading,    // about-me
    skillLoading,    // skills
    projectsLoading, // projects
  } = useProfile();

  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeElapsed(true), MIN_LOADER_MS);
    return () => clearTimeout(t);
  }, []);

  const isReady = appReady && minTimeElapsed;

  useEffect(() => {
    if (!isReady) return;
    const t = setTimeout(() => setShowLoader(false), 500);
    return () => clearTimeout(t);
  }, [isReady]);

  const loaderStatus = {
    profile: !loading,
    about: !aboutLoading,
    skills: !skillLoading,
    projects: !projectsLoading,
  };

  return (
    <div className="noise min-h-screen bg-[#080B12]">
      {showLoader && (
        <div className={isReady ? 'loader-exit' : ''}>
          <Loader status={loaderStatus} />
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
            {/* <Contact /> */}
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