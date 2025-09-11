import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-card backdrop-blur-xl' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-padding py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-light tracking-wider">
              <span className="text-neon-primary">S</span>
              <span className="text-foreground">AAED</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                  role="menuitem"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-neon text-primary-foreground"
                role="menuitem"
                aria-label="Navigate to contact section to hire me"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
          <div 
            ref={menuRef}
            id="mobile-menu"
            className="relative z-10 h-full flex flex-col items-center justify-center space-y-8"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-3xl text-muted-foreground hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="menuitem"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-neon text-primary-foreground text-xl px-12 py-4 mt-8"
              role="menuitem"
              aria-label="Navigate to contact section to hire me"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;