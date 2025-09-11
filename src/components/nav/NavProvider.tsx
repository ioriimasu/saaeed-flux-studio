import smoothScrollAPI from '@/lib/scroll/smooth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navConfig } from './config';
import { MenuButton } from './MenuButton';
import { NavOverlay } from './NavOverlay';

interface NavContextType {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
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
  children: ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close overlay on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Initialize smooth scrolling
  useEffect(() => {
    if (navConfig.smoothScroll.enabled) {
      smoothScrollAPI.init();
    }

    return () => {
      smoothScrollAPI.destroy();
    };
  }, []);

  const setOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const contextValue: NavContextType = {
    isOpen,
    setOpen,
    toggle,
  };

  return (
    <NavContext.Provider value={contextValue}>
      {children}
      <MenuButton isOpen={isOpen} onToggle={toggle} />
      <NavOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </NavContext.Provider>
  );
};
