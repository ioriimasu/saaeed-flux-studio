import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, GithubLogo, Globe, X } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { OptimizedImage } from '@/components/ui/optimized-image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
  category: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "TextileTrack — Realtime RFID Dashboard",
      description: "Live RFID tracking for garment factories with throughput analytics and line efficiency.",
      fullDescription: "Real-time RFID tracking system for garment factories featuring live alerts, throughput analytics, and line efficiency monitoring. Built with Supabase, WebSockets, and Next.js for mission-critical industrial operations.",
      image: "/lovable-uploads/26bd8d3a-1bf7-4a49-8cef-aeb29cb90b6e.png",
      technologies: ["Next.js", "Supabase", "WebSockets", "TypeScript"],
      github: "https://github.com",
      live: "https://example.com",
      category: "RFID/IoT"
    },
    {
      id: 2,
      title: "StitchOS — The Connected Loom",
      description: "SaaS middleware platform for textile manufacturing with event-driven architecture.",
      fullDescription: "Enterprise SaaS middleware platform for textile manufacturing featuring secure multi-tenancy, event-driven architecture, and machine-to-cloud integrations. Focus on scalable industrial connectivity.",
      image: "/lovable-uploads/a08edc0f-567f-4257-bcd5-c015f71bde3d.png",
      technologies: ["Next.js", "Supabase", "Stripe", "PostgreSQL"],
      github: "https://github.com",
      live: "https://example.com",
      category: "SaaS Platform"
    },
    {
      id: 3,
      title: "Kattali Textile Ltd Corporate Site",
      description: "Marketing + CMS site for enterprise textile group with high SEO performance.",
      fullDescription: "Corporate marketing website for enterprise textile group featuring Next.js 14 with App Router, high Lighthouse SEO scores, and full WCAG accessibility compliance. Fully responsive design.",
      image: "/lovable-uploads/3cae342e-a061-4c45-a21b-f09898b8c741.png",
      technologies: ["Next.js 14", "App Router", "Tailwind CSS", "SEO"],
      github: "https://github.com",
      live: "https://example.com",
      category: "Corporate Web"
    },
    {
      id: 4,
      title: "RFID Line Analytics",
      description: "Bottleneck detection using Little's Law with real-time operational graphs.",
      fullDescription: "Advanced analytics system for RFID production lines using Little's Law for bottleneck detection. Delivered 30-40% operational time savings through real-time performance monitoring and predictive analytics.",
      image: "/lovable-uploads/93ae51ee-4ecd-47f7-8fce-cb86d8ed11ac.png",
      technologies: ["Python", "D3.js", "PostgreSQL", "Real-time Analytics"],
      github: "https://github.com",
      live: "https://example.com",
      category: "Industrial Analytics"
    },
    {
      id: 5,
      title: "STRYV — Brand & Shop",
      description: "Headless e-commerce site with sleek minimal UX and commerce backend.",
      fullDescription: "Modern headless e-commerce platform featuring sleek minimal user experience, built with Next.js and integrated commerce backend. Focus on performance and user experience optimization.",
      image: "/lovable-uploads/9b6cca2a-f012-4c7c-a9c6-a6770afab849.png",
      technologies: ["Next.js", "Headless Commerce", "Stripe", "Tailwind CSS"],
      github: "https://github.com",
      live: "https://example.com",
      category: "E-commerce"
    },
    {
      id: 6,
      title: "Iori Systems",
      description: "Personal tooling platform with MCP agents and automation pipelines.",
      fullDescription: "Personal developer productivity platform featuring MCP agents, automation pipelines, and developer productivity stack. Built for internal tooling and workflow optimization.",
      image: "/lovable-uploads/4823644a-6831-4a67-ac9e-d40dd1e91e1e.png",
      technologies: ["Python", "MCP Agents", "Automation", "Developer Tools"],
      github: "https://github.com",
      live: "https://example.com",
      category: "Developer Tools"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(sectionRef.current?.querySelector('h2'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Desktop grid animation
      if (window.innerWidth >= 1024) {
        gsap.fromTo(gridRef.current?.children || [],
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedProject && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedProject]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        onComplete: () => setSelectedProject(null)
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="section-margin section-padding relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-1 w-40 h-40 top-1/4 left-1/4 opacity-20" />
        <div className="floating-orb floating-orb-3 w-32 h-32 bottom-1/4 right-1/4 opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Featured <span className="text-neon-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* Desktop Grid Layout */}
        <div 
          ref={gridRef}
          className="hidden lg:grid grid-cols-3 gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`glass-card p-6 group cursor-pointer hover:scale-105 transition-all duration-500 ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => openProject(project)}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 group-hover:scale-110 transition-transform duration-700"
                  width={400}
                  height={192}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={24} className="text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-sm text-accent font-medium">{project.category}</span>
                <h3 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-muted/30 rounded-md text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="lg:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            className="mb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div
                  className="glass-card p-6 cursor-pointer group"
                  onClick={() => openProject(project)}
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 group-hover:scale-110 transition-transform duration-700"
                      width={400}
                      height={192}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="space-y-3">
                    <span className="text-sm text-accent font-medium">{project.category}</span>
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-muted/30 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
          <div 
            ref={modalRef}
            className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-sm text-accent font-medium">{selectedProject.category}</span>
                <h3 className="text-3xl font-light text-neon-primary">{selectedProject.title}</h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted/30 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full rounded-xl mb-4"
                />
              </div>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
                
                <div>
                  <h4 className="text-lg font-medium mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-muted/30 rounded-lg text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <GithubLogo size={20} />
                      <span>Code</span>
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-neon inline-flex items-center space-x-2"
                    >
                      <Globe size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;