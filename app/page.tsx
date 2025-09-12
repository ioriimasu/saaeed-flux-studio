'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neon-primary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0">
          <div className="floating-orb floating-orb-1 w-64 h-64 top-1/4 left-1/4" />
          <div className="floating-orb floating-orb-2 w-48 h-48 top-3/4 right-1/4" />
          <div className="floating-orb floating-orb-3 w-56 h-56 top-1/2 right-1/3" />
        </div>
        
        <div className="text-center relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-light mb-6 animate-text-shimmer">
            SAAED IMAM
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light tracking-wide">
            Platform Architect · RFID · SaaS
          </p>
          <p className="text-lg text-accent mb-12">
            Building systems that compound: real-time RFID, mission-critical SaaS, and factory intelligence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-neon text-primary-foreground px-8 py-4 rounded-xl font-medium">
              View Projects
            </button>
            <button className="px-8 py-4 border border-border/30 rounded-xl font-medium hover:border-primary/50 transition-colors">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-neon-primary">
            About Me
          </h2>
          <div className="glass-card p-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in building scalable platforms that handle real-time data processing, 
              RFID/IoT systems, and industrial analytics. My expertise spans across Next.js, 
              Supabase, Stripe, Python, and TypeScript, creating systems that compound value 
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-neon-accent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-3 text-primary">Project {i}</h3>
                <p className="text-muted-foreground">
                  Description of project {i} with key technologies and achievements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-neon-secondary">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ready to discuss your next project? Let's connect and create something extraordinary.
          </p>
          <button className="btn-neon text-primary-foreground px-8 py-4 rounded-xl font-medium">
            Contact Me
          </button>
        </div>
      </section>
    </div>
  );
}