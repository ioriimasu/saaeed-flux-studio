export interface NavConfig {
  overlay: {
    variant: 'fullscreen' | 'drawer';
    blur: boolean;
    glass: boolean;
  };
  menuButton: {
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    size: number;
  };
  smoothScroll: {
    enabled: boolean;
    offset: number;
    duration: number;
    easing: 'easeOutCubic' | 'easeInOutCubic' | 'easeOutQuart';
  };
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export const navConfig: NavConfig = {
  overlay: {
    variant: 'fullscreen',
    blur: true,
    glass: true,
  },
  menuButton: {
    position: 'top-right',
    size: 56,
  },
  smoothScroll: {
    enabled: true,
    offset: 0,
    duration: 700,
    easing: 'easeOutCubic',
  },
  links: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Hire Me', href: '#contact', external: false },
  ],
};
