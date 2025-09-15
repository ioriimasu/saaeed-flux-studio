'use client';

import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  const taglines = [
    "Build the future. Ship relentlessly.",
    "Engineering systems that compound",
    "Real-time RFID, mission-critical SaaS, and factory intelligence"
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial animations
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(headlineRef.current, 
      { 
        opacity: 0, 
        y: 50, 
        filter: "blur(10px)" 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        duration: 1.2, 
        ease: "power3.out" 
      }
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .fromTo(splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // Floating orbs animation
    gsap.to(".hero-orb", {
      y: "-=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // Rotating taglines
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [taglines.length]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Spline */}
      <div 
        ref={splineRef}
        className="absolute inset-0 z-0"
      >
        <iframe 
          src='https://my.spline.design/particles-uF95sVQl3AnGrmSjLtIdcFU5/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          title="Interactive 3D background animation"
          aria-hidden="true"
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-orb floating-orb floating-orb-1 w-64 h-64 top-1/4 left-1/4" />
        <div className="hero-orb floating-orb floating-orb-2 w-48 h-48 top-3/4 right-1/4" />
        <div className="hero-orb floating-orb floating-orb-3 w-56 h-56 top-1/2 right-1/3" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto section-padding">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="animate-text-shimmer block md:inline">
            Saaed Imam
          </span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-light">
            Platform Architect · RFID · SaaS
          </span>
        </h1>

        <p 
          ref={taglineRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 h-8 font-light tracking-wide"
        >
          {taglines[currentTagline]}
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="btn-neon group text-primary-foreground inline-flex items-center space-x-3 text-lg"
          aria-label="Navigate to contact section to hire me"
        >
          <span>Let's Build Together</span>
          <ArrowRight 
            size={20} 
            className="group-hover:translate-x-1 transition-transform duration-300" 
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        role="button"
        tabIndex={0}
        onClick={scrollToContact}
        onKeyDown={(e) => e.key === 'Enter' && scrollToContact()}
        aria-label="Scroll down to see more content"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;