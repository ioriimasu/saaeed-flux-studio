import smoothScrollAPI from '@/lib/scroll/smooth';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FocusTrap } from './FocusTrap';
import { navConfig } from './config';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavOverlay = ({ isOpen, onClose }: NavOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { overlay, links } = navConfig;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      smoothScrollAPI.scrollTo(href);
    } else if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const contentVariants = {
    closed: { 
      scale: 0.9, 
      opacity: 0,
      y: 20,
    },
    open: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const containerClass = overlay.variant === 'drawer' 
    ? 'fixed inset-y-0 right-0 w-full max-w-md z-50'
    : 'fixed inset-0 z-50';

  const panelClass = overlay.variant === 'drawer'
    ? 'h-full w-full bg-background/95 backdrop-blur-xl border-l border-border'
    : 'absolute inset-0 flex items-center justify-center';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className={containerClass}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={handleBackdropClick}
        >
          {overlay.variant === 'fullscreen' && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
          )}
          
          <FocusTrap active={isOpen} onEscape={onClose}>
            <motion.div
              className={panelClass}
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="w-full max-w-4xl mx-auto px-8 py-16">
                <nav role="navigation" aria-label="Main navigation">
                  <ul className="space-y-8">
                    {links.map((link, index) => (
                      <li key={link.label}>
                        <motion.button
                          onClick={() => handleLinkClick(link.href)}
                          className="group w-full text-left"
                          variants={linkVariants}
                          initial="closed"
                          animate="open"
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-6xl md:text-8xl font-light text-foreground group-hover:text-primary transition-colors duration-300 block">
                            {link.label}
                          </span>
                          <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors duration-300 block mt-2">
                            {link.href.startsWith('#') 
                              ? `Navigate to ${link.label.toLowerCase()} section`
                              : `Open ${link.label} in new tab`
                            }
                          </span>
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Additional content for fullscreen variant */}
                {overlay.variant === 'fullscreen' && (
                  <motion.div
                    className="mt-16 pt-8 border-t border-border"
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: links.length * 0.1 }}
                  >
                    <div className="text-center">
                      <p className="text-muted-foreground text-lg">
                        Press <kbd className="px-2 py-1 bg-muted rounded text-sm">ESC</kbd> to close
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
