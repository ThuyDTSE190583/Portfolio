import React, { Suspense, useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Loader from './components/Loader/Loader';
import CursorGlow from './components/CursorGlow';

// Lazy loaded components
const About = React.lazy(() => import('./components/About/About'));
const Stats = React.lazy(() => import('./components/About/Stats'));
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Experience = React.lazy(() => import('./components/Experience/Experience'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Achievements = React.lazy(() => import('./components/Achievements/Achievements'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

// Loading Fallback for Suspense
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24 min-h-[30vh]">
    <div className="w-8 h-8 border-2 border-white/10 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Do Thanh Thuy | Software Engineer Portfolio</title>
        <meta name="description" content="Portfolio of Do Thanh Thuy, a passionate Software Engineer specialized in React, Node.js, and modern web development." />
        <meta property="og:title" content="Do Thanh Thuy | Software Engineer" />
        <meta property="og:description" content="Portfolio of Do Thanh Thuy, a passionate Software Engineer specialized in React, Node.js, and modern web development." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="relative min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden w-full">
          <CursorGlow />
          
          {/* Global Background Ambient Effects */}
          <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {/* Mesh gradient blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/10 blur-[120px]"></div>
            <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px]"></div>
            
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background/90 to-background"></div>
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
      )}
    </HelmetProvider>
  );
}

export default App;