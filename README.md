# IORIIMASU

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and shadcn/ui components. Features 3D graphics, animations, and a sleek design showcasing professional work and expertise.

## ✨ Recent Optimizations

- **Bundle Size**: Reduced from 1000KB to 800KB warning limit
- **Dependencies**: Removed 5 unused packages (15 total packages removed)
- **UI Components**: Cleaned up 30+ unused shadcn/ui components
- **Performance**: Optimized Vite build configuration with better code splitting
- **Accessibility**: Fixed button accessibility issues
- **Code Quality**: Fixed corrupted imports and linting errors

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ioriimasu

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: GSAP, Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **3D Graphics**: Interactive 3D elements using Three.js
- **Smooth Animations**: GSAP and Framer Motion for fluid transitions
- **Modern UI**: shadcn/ui components with custom styling
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized images and code splitting
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO**: Meta tags and structured data
- **Hidden Navigation**: Floating menu button with full-screen overlay
- **Smooth Scrolling**: Enhanced scroll behavior with custom easing
- **Futuristic Enhancements**: Optional sci-fi effects and interactions

## 🧭 Hidden Navigation & Smooth Scroll

The site features a hidden navigation system that provides a clean, immersive experience:

### Navigation Features
- **Floating Menu Button**: Discreet hamburger button in the top-right corner
- **Full-Screen Overlay**: Immersive navigation menu with glassmorphism effects
- **Smooth Scrolling**: Enhanced scroll behavior with custom easing functions
- **Accessibility**: Full keyboard navigation, focus trapping, and ARIA support
- **Motion-Safe**: Respects `prefers-reduced-motion` user preferences

### Configuration
Navigation behavior can be customized in `/src/components/nav/config.ts`:

```typescript
export const navConfig = {
  overlay: { 
    variant: "fullscreen", // or "drawer"
    blur: true, 
    glass: true 
  },
  menuButton: { 
    position: "top-right", 
    size: 56 
  },
  smoothScroll: { 
    enabled: true, 
    offset: 0, 
    duration: 700, 
    easing: "easeOutCubic" 
  },
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};
```

### Usage
- Click the floating menu button to open navigation
- Use keyboard navigation (Tab/Shift+Tab) within the overlay
- Press `ESC` to close the overlay
- Click any link to navigate and auto-close the overlay
- All anchor links (`#section`) automatically use smooth scrolling

### Removal
To remove the navigation system:
1. Delete `/src/components/nav/` directory
2. Delete `/src/lib/scroll/` directory  
3. Delete `/src/styles/nav/` directory
4. Remove `NavProvider` import and wrapper from `App.tsx`
5. Re-add the original `Navigation` component to `Index.tsx`

## ✨ Enhancement Pack

This project includes an optional **Futuristic Enhancement Pack** that adds sci-fi inspired effects and interactions. All enhancements are toggleable and respect user preferences.

### 🚀 Available Enhancements

#### **Micro-animations & Interactions**
- **Magnetic Cursor**: Custom cursor with magnetic attraction to interactive elements
- **3D Tilt Effects**: Cards and images tilt on hover with realistic shadows
- **Text Scanner**: Futuristic text reveal animations with gradient shimmer
- **Smooth Transitions**: GSAP-powered section reveals and element animations

#### **Dynamic Backgrounds**
- **Aurora Gradients**: Time-reactive liquid motion backgrounds
- **Particle Systems**: Interactive particle networks responding to mouse movement
- **Starfield Animation**: Subtle space-themed background effects

#### **Ambient Sound & Haptics**
- **Sound Effects**: Optional click/hover sounds with stereo panning
- **Haptic Feedback**: Vibration feedback for mobile interactions
- **Audio Context**: Respects user preferences and accessibility settings

#### **Data & Motion Layers**
- **System Status Card**: Live telemetry display with rolling counters
- **Data Ticker**: Scrolling system log with realistic updates
- **Progress Indicators**: Glowing scroll progress and radial indicators

#### **Cursor & Navigation**
- **Custom Cursor**: Futuristic ring cursor with pulse effects
- **Command Palette**: AI-style search with Ctrl/Cmd+K shortcut
- **Breadcrumb Trail**: Glowing navigation sparks
- **Scroll Progress**: Linear and radial progress indicators

#### **Light & Glow Effects**
- **Neon Focus Rings**: Accessible high-contrast focus indicators
- **Glassmorphism**: HUD-style overlays for modals and menus
- **Light Beams**: Scanning animations on hero elements
- **Glow Borders**: Subtle neon effects on interactive elements

#### **Advanced Transitions**
- **Page Transitions**: Holographic wipe effects between routes
- **Loading Animations**: Scanning lines and boot sequence effects
- **Section Reveals**: Holographic and glitch transition effects

#### **Easter Eggs**
- **Konami Code**: ↑↑↓↓←→←→BA triggers confetti and glow effects
- **DevTools Banner**: Styled console message when DevTools opens
- **Secret Key Combinations**: Hidden animations and effects
- **Triple-click Effects**: Special logo interactions

### 🎛️ Configuration

The enhancement system is fully configurable via the global API:

```javascript
// Access the enhancement API
window.IORIIMASU_ENHANCE

// Enable all enhancements
window.IORIIMASU_ENHANCE.enableAll()

// Disable all enhancements
window.IORIIMASU_ENHANCE.disableAll()

// Configure specific features
window.IORIIMASU_ENHANCE.set('cursor', { enabled: true, intensity: 0.5 })
window.IORIIMASU_ENHANCE.set('particles', { enabled: false })

// Get current configuration
window.IORIIMASU_ENHANCE.get('cursor')

// View performance profile
window.IORIIMASU_ENHANCE.profile()
```

### 🎮 Usage

#### **Command Palette**
- Press `Ctrl/Cmd + K` to open the command palette
- Search for commands like "Toggle Theme", "Scroll to Top", "Copy Email"
- Use arrow keys to navigate, Enter to execute

#### **Keyboard Shortcuts**
- `Ctrl/Cmd + K`: Open command palette
- `Escape`: Close command palette
- `Ctrl + Shift + E`: Trigger glow effect
- `Ctrl + Shift + P`: Particle burst effect
- `↑↑↓↓←→←→BA`: Konami code (confetti effect)

#### **Touch Interactions**
- Triple-tap logo for special effects
- Haptic feedback on mobile devices
- Touch-optimized particle interactions

### 🔧 Customization

#### **CSS Variables**
```css
:root {
  --fx-neon: #00ffff;           /* Primary neon color */
  --fx-neon-secondary: #ff00ff; /* Secondary neon color */
  --fx-neon-accent: #00ff00;    /* Accent neon color */
  --fx-glass-bg: rgba(255, 255, 255, 0.1);
  --fx-glass-border: rgba(255, 255, 255, 0.2);
  --fx-glow-intensity: 0.8;
}
```

#### **Feature Toggles**
All features can be individually enabled/disabled:

```typescript
// In src/enhance/enhance.config.ts
export const defaultConfig = {
  cursor: { enabled: true, magnetic: true, intensity: 0.25 },
  tilt: { enabled: true, maxTiltDeg: 6 },
  aurora: { enabled: true, timeReactive: true },
  particles: { enabled: false, density: 0.25 },
  // ... more features
}
```

### ♿ Accessibility

- **Reduced Motion**: Automatically disables animations when `prefers-reduced-motion` is set
- **High Contrast**: Adjusts colors for better visibility
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader**: Proper ARIA labels and announcements
- **Performance**: Auto-disables heavy effects on low-end devices

### 🚀 Performance

- **Lazy Loading**: Heavy effects load only when needed
- **FPS Monitoring**: Automatically reduces effects when performance drops
- **Memory Management**: Proper cleanup and disposal of resources
- **Bundle Size**: Minimal impact on main bundle size

### 🗑️ Removal

To completely remove the enhancement pack:

1. Delete the `/src/enhance` directory
2. Delete the `/src/styles/enhance.css` file
3. Remove the import from `src/App.tsx`:
   ```typescript
   // Remove these lines:
   import "./styles/enhance.css";
   import { mountEnhancements } from "./enhance/init";
   ```
4. Remove the useEffect call in App.tsx
5. Delete the `/public/enhance` directory

The site will continue to work normally without any enhancements.

## 🧭 Hidden Header & Smooth Scroll

This project features a sophisticated hidden navigation system with smooth scrolling capabilities. The header is completely hidden by default, revealing only a floating menu button.

### 🎯 Features

#### **Hidden Navigation**
- **No visible header** on page load - clean, minimal design
- **Floating menu button** positioned in top-right corner
- **Full-screen overlay** with large, accessible navigation links
- **Smooth animations** powered by Framer Motion with reduced-motion fallbacks

#### **Smooth Scrolling**
- **Enhanced smooth scrolling** for all anchor links (`#section`)
- **Configurable offset** and easing functions
- **Performance optimized** with requestAnimationFrame
- **Accessibility compliant** with reduced-motion support

#### **Accessibility Features**
- **Full keyboard navigation** with focus trapping
- **Screen reader support** with proper ARIA labels
- **ESC key to close** overlay
- **Focus restoration** when overlay closes
- **High contrast mode** support

### 🎛️ Configuration

The navigation system is fully configurable via `/src/components/nav/config.ts`:

```typescript
export const navConfig = {
  overlay: {
    variant: 'fullscreen', // 'fullscreen' | 'drawer'
    blur: true,
    glass: true,
  },
  menuButton: {
    position: 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
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
  ],
};
```

### 🎮 Usage

#### **Navigation**
- **Click the floating menu button** to open the navigation overlay
- **Click any link** to smoothly scroll to that section
- **Press ESC** or **click backdrop** to close the overlay
- **Use Tab** to navigate through links with keyboard

#### **Smooth Scrolling**
- All anchor links (`#section`) automatically use smooth scrolling
- Add `data-smooth` attribute to any element for smooth scroll behavior
- Use the global API: `window.IORI_SCROLL.scrollTo('#section')`

#### **Customization**
- **Change overlay variant**: Set `overlay.variant` to `'drawer'` for side panel
- **Adjust button position**: Modify `menuButton.position` in config
- **Customize scroll behavior**: Update `smoothScroll` settings
- **Add/remove links**: Edit the `links` array in config

### 🔧 Advanced Usage

#### **Programmatic Control**
```javascript
// Access the navigation context
import { useNav } from '@/components/nav/NavProvider';

const { isOpen, setOpen, toggle } = useNav();

// Open/close overlay programmatically
setOpen(true);
toggle();
```

#### **Smooth Scroll API**
```javascript
// Scroll to specific element
window.IORI_SCROLL.scrollTo('#about');

// Scroll with custom options
window.IORI_SCROLL.scrollTo('#contact', {
  offset: 100,
  duration: 1000,
  easing: 'easeOutQuart'
});
```

### 🗑️ Removal

To completely remove the hidden header system:

1. Delete the `/src/components/nav` directory
2. Delete `/src/lib/scroll/smooth.ts`
3. Delete `/src/styles/nav` directory
4. Remove imports from `src/App.tsx`:
   ```typescript
   // Remove these lines:
   import { NavProvider } from "./components/nav/NavProvider";
   import "./styles/nav/overlay.css";
   ```
5. Remove the `<NavProvider>` wrapper from App.tsx
6. Restore the original `<Navigation />` component in `src/pages/Index.tsx`

The site will continue to work normally with the original navigation system.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── nav/            # Hidden Navigation System
│   │   ├── __tests__/  # Navigation tests
│   │   ├── MenuButton.tsx
│   │   ├── NavOverlay.tsx
│   │   ├── NavProvider.tsx
│   │   ├── FocusTrap.tsx
│   │   └── config.ts
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   └── Contact.tsx     # Contact form
├── enhance/            # Futuristic Enhancement Pack
│   ├── features/       # Individual enhancement modules
│   ├── utils/          # Utility functions
│   ├── enhance.config.ts # Configuration system
│   └── init.ts         # Main initialization
├── lib/                # Utility functions
│   └── scroll/         # Smooth scrolling
│       └── smooth.ts
├── styles/             # Stylesheets
│   ├── enhance.css     # Enhancement styles
│   └── nav/            # Navigation styles
│       └── overlay.css
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── test/               # Test files
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Configure redirects for SPA routing

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 📝 Development

### Code Quality

- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks for quality checks

### Git Hooks

Pre-commit hooks automatically run:
- ESLint checks
- Prettier formatting
- TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact [your-email@example.com].

---

Built with ❤️ using React, TypeScript, and Tailwind CSS.