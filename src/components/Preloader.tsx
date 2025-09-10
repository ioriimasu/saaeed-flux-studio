import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress from 0 to 100
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        setProgress(progress);
      }
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.5")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb floating-orb-1 w-64 h-64 top-1/4 left-1/4" />
        <div className="floating-orb floating-orb-2 w-48 h-48 top-3/4 right-1/4" />
        <div className="floating-orb floating-orb-3 w-56 h-56 top-1/2 right-1/3" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <div ref={textRef} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4 animate-text-shimmer">
            SAAED IMAM
          </h1>
          <p className="text-muted-foreground text-lg font-light tracking-wide">
            Creative Technologist
          </p>
        </div>

        {/* Progress bar container */}
        <div className="relative">
          <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full progress-bar w-0"
            />
          </div>
          
          {/* Progress percentage */}
          <div className="mt-6 text-center">
            <span className="text-2xl font-light text-neon-primary">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;