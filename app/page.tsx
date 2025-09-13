'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AppWrapper } from '../src/components/AppWrapper';

// Dynamically import components that use browser APIs
const About = dynamic(() => import('../src/components/About'), { ssr: false });
const Contact = dynamic(() => import('../src/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const Hero = dynamic(() => import('../src/components/Hero'), { ssr: false });
const Preloader = dynamic(() => import('../src/components/Preloader'), { ssr: false });
const Projects = dynamic(() => import('../src/components/Projects'), { ssr: false });

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    console.log('Preloader completed, showing main content');
    setIsLoading(false);
    // Enable smooth scroll after loading
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    // Disable scroll during loading
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    
    // Safety fallback - ensure content shows after 5 seconds
    const safetyTimeout = setTimeout(() => {
      console.warn('Safety timeout: forcing content to show');
      setIsLoading(false);
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    }, 5000);
    
    return () => {
      clearTimeout(safetyTimeout);
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  return (
    <AppWrapper>
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
    </AppWrapper>
  );
}