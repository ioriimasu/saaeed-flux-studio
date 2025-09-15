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
      aria-expanded={isOpen ? "true" : "false"}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}
      className={`menu-button ${positionClasses} group`}
      style={{
        '--button-size': `${size}px`,
      } as React.CSSProperties}
    >
      <div className="menu-button-group">
        {/* Hamburger lines */}
        <div className="menu-line" />
        <div className="menu-line" />
        <div className="menu-line" />
      </div>
      
      {/* Glow effect for neon theme */}
      <div className="menu-glow" />
    </button>
  );
};