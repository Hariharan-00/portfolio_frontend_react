// src/App.jsx
import { ProfileProvider } from './context/context';  // ✅ add this import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ProfileProvider>                                
      <div className="noise min-h-screen bg-[#080B12]">
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
    </ProfileProvider>                                
  );
}

export default App;