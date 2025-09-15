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
      id="nav-overlay"
      className="nav-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-title"
    >
      {/* Backdrop */}
      <div className="nav-backdrop" />
      
      {/* Content */}
      <FocusTrap active={isOpen} onEscape={onClose}>
        <div className="nav-panel">
          <h2 id="nav-title" className="sr-only">Navigation Menu</h2>
          
          {/* Logo */}
          <div className="nav-logo">
            <div className="nav-logo-text">
              <span className="text-neon-primary">S</span>
              <span className="text-foreground">AAED</span>
            </div>
            <div className="nav-logo-subtitle">
              Platform Architect · RFID · SaaS
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="nav-menu" role="menu">
            {navConfig.links.map((link, index) => (
              <button
                key={link.href}
                onClick={() => onLinkClick(link.href)}
                className={`nav-link nav-item-delay-${index}`}
                role="menuitem"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Hire Me Button */}
            <div className="nav-cta">
              <button
                onClick={() => onLinkClick('#contact')}
                className="nav-cta-button"
                role="menuitem"
                aria-label="Navigate to contact section to hire me"
              >
                Hire Me
              </button>
            </div>
          </nav>

          {/* Close hint */}
          <div className="nav-close-hint">
            Press <kbd>ESC</kbd> to close
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};