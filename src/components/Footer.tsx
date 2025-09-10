import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, QrCode } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer slide up animation
      gsap.fromTo(footerRef.current,
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // Floating particles animation
      gsap.to(particlesRef.current?.children || [], {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: GithubLogo, href: 'https://github.com' },
    { name: 'LinkedIn', icon: LinkedinLogo, href: 'https://linkedin.com' },
    { name: 'Email', icon: EnvelopeSimple, href: 'mailto:saaed@example.com' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-card/50 backdrop-blur-xl border-t border-border/30 mt-20"
    >
      {/* Floating Particles Background */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 ${
              i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-accent' : 'bg-secondary'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand & Quote */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-3xl font-light mb-2">
                  <span className="text-neon-primary">S</span>aaed Imam
                </h3>
                <p className="text-muted-foreground">Creative Technologist</p>
              </div>
              
              <blockquote className="text-xl font-light italic text-neon-accent">
                "Code + Creativity = Experience"
              </blockquote>
              
              <p className="text-muted-foreground leading-relaxed">
                Crafting immersive digital experiences through innovative design, 
                cutting-edge technology, and thoughtful user interactions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-medium mb-6 text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & AR */}
            <div>
              <h4 className="text-lg font-medium mb-6 text-foreground">Connect</h4>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                  >
                    <social.icon size={20} className="group-hover:animate-pulse" />
                  </a>
                ))}
              </div>

              {/* AR Business Card */}
              <div className="glass-card p-4 text-center">
                <QrCode size={32} className="mx-auto mb-2 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Scan for AR Business Card
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Saaed Imam. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Built with ❤️ using React + GSAP</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;