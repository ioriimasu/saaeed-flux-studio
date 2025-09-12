import { useEffect, useRef } from 'react';
import { FocusTrap } from './FocusTrap';
import { navConfig } from './config';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkClick: (href: string) => void;
}

export const NavOverlay = ({ isOpen, onClose, onLinkClick }: NavOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
      
      {/* Content */}
      <FocusTrap active={isOpen} onEscape={onClose}>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h2 id="nav-title" className="sr-only">Navigation Menu</h2>
          
          {/* Logo */}
          <div className="mb-16">
            <div className="text-4xl md:text-6xl font-light tracking-wider">
              <span className="text-neon-primary">S</span>
              <span className="text-foreground">AAED</span>
            </div>
            <div className="text-lg text-muted-foreground mt-2">
              Platform Architect · RFID · SaaS
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6" role="menu">
            {navConfig.links.map((link, index) => (
              <button
                key={link.href}
                onClick={() => onLinkClick(link.href)}
                className="
                  block w-full text-3xl md:text-4xl font-light
                  text-muted-foreground hover:text-foreground
                  transition-all duration-300 hover:scale-105
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                  rounded-lg px-6 py-4
                "
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                } as React.CSSProperties}
                role="menuitem"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Hire Me Button */}
            <div className="mt-12">
              <button
                onClick={() => onLinkClick('#contact')}
                className="
                  btn-neon text-primary-foreground text-xl px-12 py-4
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                  transition-all duration-300 hover:scale-105
                "
                role="menuitem"
                aria-label="Navigate to contact section to hire me"
              >
                Hire Me
              </button>
            </div>
          </nav>

          {/* Close hint */}
          <div className="mt-16 text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 bg-muted/30 rounded text-xs">ESC</kbd> to close
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};