import { useEffect, useState } from 'react';

import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Preloader from '@/components/Preloader';
import Projects from '@/components/Projects';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    console.log('Preloader completed, showing main content');
    setIsLoading(false);
    // Enable smooth scroll after loading
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';
    
    // Safety fallback - ensure content shows after 5 seconds
    const safetyTimeout = setTimeout(() => {
      console.warn('Safety timeout: forcing content to show');
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 5000);
    
    return () => {
      clearTimeout(safetyTimeout);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div 
        className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          minHeight: '100vh',
          backgroundColor: 'hsl(224 20% 8%)', // Fallback background
        }}
      >
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
