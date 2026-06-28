import React, { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Lazy loaded components
const About = React.lazy(() => import('./components/About/About'));
const Stats = React.lazy(() => import('./components/About/Stats'));
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Experience = React.lazy(() => import('./components/Experience/Experience'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Achievements = React.lazy(() => import('./components/Achievements/Achievements'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

// Loading Fallback
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24 min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Global Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background"></div>
      </div>

      <Navbar />
      <main>
        {/* Hero is critical, load synchronously */}
        <Hero />
        
        {/* Lazy load below the fold */}
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Stats />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;