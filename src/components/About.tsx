import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code,
    Cube,
    Database,
    Globe,
    Lightning,
    PaintBrush
} from 'phosphor-react';
import { useEffect, useRef } from 'react';

import { OptimizedImage } from '@/components/ui/optimized-image';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Next.js (TypeScript, Tailwind, App Router)', icon: Globe, level: 95 },
    { name: 'Supabase (auth, real-time)', icon: Database, level: 90 },
    { name: 'Stripe (SaaS billing)', icon: Lightning, level: 85 },
    { name: 'Python (data + IoT integrations)', icon: Code, level: 80 },
    { name: 'Cloud (Vercel, AWS basics)', icon: Cube, level: 75 },
    { name: 'CI/CD (GitHub Actions)', icon: PaintBrush, level: 85 },
  ];

  const timeline = [
    { year: '2020', title: 'Started RFID/IoT development' },
    { year: '2021', title: 'First SaaS platform architecture' },
    { year: '2022', title: 'Factory intelligence systems' },
    { year: '2023', title: 'Multi-tenant platform scaling' },
    { year: '2024', title: 'Mission-critical system deployments' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );

      // Skills animation
      gsap.fromTo(skillsRef.current?.children || [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          }
        }
      );

      // Timeline animation
      gsap.fromTo(timelineRef.current?.children || [],
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="section-margin section-padding relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-2 w-32 h-32 top-1/4 right-1/4 opacity-30" />
        <div className="floating-orb floating-orb-3 w-24 h-24 bottom-1/4 left-1/4 opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            About <span className="text-neon-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse-glow" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/50 glass-card">
                <OptimizedImage
                  src="/lovable-uploads/550a1d39-cbee-4e6a-94dd-a13c432f62e2.png"
                  alt="Saaed Imam"
                  className="w-full h-full hover:scale-110 transition-transform duration-700"
                  priority
                  placeholder="blur"
                  sizes="(max-width: 768px) 200px, 300px"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-3xl font-light text-neon-accent">
              Platform Architect · RFID · SaaS
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Architect and engineer with focus on RFID/IoT systems, scalable SaaS platforms, 
              and industrial analytics. Passionate about clean systems, typed APIs, observability, 
              and building rigorously from day one.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📍 Based in Bangladesh (UTC+6)</p>
              <p>🌐 Languages: English, Bangla</p>
              <p>⚡ Focus: SaaS Architecture, RFID/IoT, Factory Intelligence</p>
              <p>📬 Email: sayedimam.fahim@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-light text-center mb-12">
            <span className="text-neon-secondary">Skills</span> & Technologies
          </h3>
          <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {skills.map((skill, _index) => (
              <div key={skill.name} className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="relative mb-4">
                  <skill.icon size={48} className="mx-auto text-primary group-hover:text-accent transition-colors duration-300" />
                  <div className="absolute -inset-2 rounded-full border border-primary/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="text-lg font-medium mb-2">{skill.name}</h4>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground mt-1 block">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <div>
          <h3 className="text-3xl font-light text-center mb-12">
            Key <span className="text-neon-accent">Expertise</span>
          </h3>
          <div ref={timelineRef} className="space-y-6 max-w-3xl mx-auto">
            {[
              { icon: "🏭", title: "RFID & IoT Systems", desc: "Real-time data collection, device integrations, factory pipelines" },
              { icon: "☁️", title: "SaaS Architecture", desc: "Multi-tenant systems, billing, auth, secure APIs" },
              { icon: "📊", title: "Industrial Analytics", desc: "Dashboards, live metrics, operational intelligence" }
            ].map((item, _index) => (
              <div key={item.title} className="flex items-center space-x-6 glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;