import { motion } from 'framer-motion';
import { useId } from 'react';
import { navConfig } from './config';

interface MenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MenuButton = ({ isOpen, onToggle }: MenuButtonProps) => {
  const id = useId();
  const { position, size } = navConfig.menuButton;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const buttonVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1.1, rotate: 0 },
  };

  const lineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 0 },
  };

  const line2Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: 0 },
  };

  return (
    <motion.button
      id={`menu-${id}`}
      className={`fixed z-[100] ${positionClasses[position]} h-14 w-14 rounded-full backdrop-blur-md bg-background/80 shadow-lg ring-1 ring-border hover:bg-background/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300`}
      onClick={onToggle}
      aria-controls="iori-nav"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      variants={buttonVariants}
      animate={isOpen ? 'open' : 'closed'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Hamburger lines */}
        <motion.div
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          variants={lineVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ y: -6 }}
        />
        <motion.div
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          variants={lineVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ y: 0 }}
        />
        <motion.div
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          variants={lineVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ y: 6 }}
        />

        {/* X lines */}
        <motion.div
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          variants={line1Variants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ y: 0 }}
        />
        <motion.div
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          variants={line2Variants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ y: 0 }}
        />
      </div>
    </motion.button>
  );
};
