'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { destroySmoothScroll, initSmoothScroll } from '../../lib/scroll/smooth';
import { navConfig } from './config';
import { MenuButton } from './MenuButton';
import { NavOverlay } from './NavOverlay';

interface NavContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleNav: () => void;
  closeNav: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const useNav = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};

interface NavProviderProps {
  children: React.ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Initialize smooth scroll
  useEffect(() => {
    if (navConfig.smoothScroll.enabled) {
      initSmoothScroll({
        offset: navConfig.smoothScroll.offset,
        duration: navConfig.smoothScroll.duration,
        easing: navConfig.smoothScroll.easing,
      });
    }

    return () => {
      destroySmoothScroll();
    };
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const handleLinkClick = (href: string) => {
    // Use the smooth scroll API if available
    if (typeof window !== 'undefined' && (window as any).IORI_SCROLL) {
      (window as any).IORI_SCROLL.scrollTo(href);
    } else {
      // Fallback to native smooth scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeNav();
  };

  const contextValue: NavContextType = {
    isOpen,
    setIsOpen,
    toggleNav,
    closeNav,
  };

  return (
    <NavContext.Provider value={contextValue}>
      {children}
      
      {/* Hidden Navigation Components */}
      <MenuButton 
        isOpen={isOpen} 
        onToggle={toggleNav}
        size={navConfig.menuButton.size}
        position={navConfig.menuButton.position}
      />
      
      <NavOverlay 
        isOpen={isOpen} 
        onClose={closeNav}
        onLinkClick={handleLinkClick}
      />
    </NavContext.Provider>
  );
};