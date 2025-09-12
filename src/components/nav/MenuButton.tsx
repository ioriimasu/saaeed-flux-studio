import { useId } from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  size?: number;
  position?: 'top-right' | 'top-left';
}

export const MenuButton = ({ 
  isOpen, 
  onToggle, 
  size = 56, 
  position = 'top-right' 
}: MenuButtonProps) => {
  const id = useId();
  const buttonId = `menu-${id}`;

  const positionClasses = position === 'top-right' 
    ? 'top-4 right-4' 
    : 'top-4 left-4';

  return (
    <button
      id={buttonId}
      aria-controls="iori-nav"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}
      className={`
        fixed ${positionClasses} z-[100] 
        h-14 w-14 rounded-full 
        backdrop-blur-md bg-glass/10 
        shadow-lg ring-1 ring-glass-border/30 
        hover:opacity-90 hover:scale-105
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        transition-all duration-300
        flex items-center justify-center
        group
      `}
      style={{
        minWidth: size,
        minHeight: size,
      } as React.CSSProperties}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Hamburger lines */}
        <div 
          className={`
            absolute w-6 h-0.5 bg-foreground transition-all duration-300
            ${isOpen ? 'rotate-45' : 'translate-y-0'}
          `}
        />
        <div 
          className={`
            absolute w-6 h-0.5 bg-foreground transition-all duration-300
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <div 
          className={`
            absolute w-6 h-0.5 bg-foreground transition-all duration-300
            ${isOpen ? '-rotate-45' : 'translate-y-0'}
          `}
        />
      </div>
      
      {/* Glow effect for neon theme */}
      <div 
        className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${isOpen ? 'bg-primary/20' : 'bg-primary/10'}
        `}
      />
    </button>
  );
};