export const navConfig = {
  overlay: { 
    variant: "fullscreen" as const, 
    blur: true, 
    glass: true 
  },
  menuButton: { 
    position: "top-right" as const, 
    size: 56 
  },
  smoothScroll: { 
    enabled: true, 
    offset: 0, 
    duration: 700, 
    easing: "easeOutCubic" as const 
  },
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type NavConfig = typeof navConfig;