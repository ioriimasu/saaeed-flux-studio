# Futuristic Enhancement Pack (Non-Destructive) for "ioriimasu"

## Goal
Add a layer of futuristic polish to the existing "ioriimasu" website without changing the current layout or visual hierarchy. All changes must be optional, performant, accessible, and easy to toggle. The default experience should remain familiar; enhancements should feel premium and subtle.

## Hard Constraints

- Do not alter page structure, layout, or existing content order
- No breaking changes to existing CSS variables, class names, or component APIs
- All enhancements gated by a single config object and per-feature toggles
- Respect user preferences: prefers-reduced-motion, prefers-color-scheme
- Keep bundle size impact minimal; lazy-load heavier modules; zero jQuery
- Provide a clean rollback path and isolate all code in /enhance and /styles/enhance

## Deliverables

A) `/enhance/enhance.config.ts` (or .js) with feature toggles and safe defaults
B) `/enhance/init.ts` that mounts enhancements after DOMReady/hydration
C) Modular features in `/enhance/features/*` each exported as mount/unmount functions
D) `/styles/enhance.css` (use CSS variables + data attributes; no global resets)
E) Optional assets: SVGs, small audio files (<30KB each), and textures in /public/enhance
F) A11y + perf guardrails: auto-disable heavy animation under low FPS or reduced-motion
G) Readme snippet added to root README under "Enhancement Pack" with usage, toggles, and removal steps
H) Unit smoke tests for key utilities; simple FPS degradation detection

## Tech Stack Detection

The system will auto-detect the stack and use appropriate entry points:

- **React/Next**: lazy import in _app or a client-only enhancer component
- **Vanilla/Vite**: import in main.ts after DOMContentLoaded
- **Vue**: plugin-style enhancer mounting after app mount

## Feature Set (All Optional via Config)

### 1. Magnetic Cursor + Custom Cursor
- Custom ring cursor with subtle pulse; magnetic pull toward interactive elements
- Keyboard users unaffected. Disable on touch devices
- Config: intensity, friction, size, hideNative: boolean
- A11y: if reduced-motion, cursor uses static ring with focus-visible only

### 2. 3D Tilt / Parallax on Cards
- Perspective hover tilt with gentle shadow shift, clamped to small angles
- Config: selector list, maxTiltDeg, glare: boolean (CSS only, no WebGL)
- Auto-disable on low FPS and reduced-motion

### 3. Aurora/Liquid Gradient Background Layer
- A behind-content gradient canvas using CSS paint or minimal canvas
- Config: enabled by route, hue range by time-of-day, low-power mode switches to static gradient

### 4. Particle Net / Starfield (very subtle)
- GPU-friendly canvas with sparse particles reacting to pointer; idle connections animate slowly
- Config: density, linkDistance, opacity cap, mobileDisabled: boolean

### 5. Section Reveal + Text Scanner
- IntersectionObserver-driven reveal that respects reduced-motion
- Text scanner effect for H1/H2 with gradient shimmer; pauses on hover
- Config: thresholds, animation duration, easing presets

### 6. Sound micro-FX (opt-in)
- Click/hover UI sfx (2–3 ultra-light WAV/MP3 files < 12KB); stereo pan on desktop
- Hard off by default; user toggle persisted in localStorage
- Respect prefers-reduced-motion and "sound=false" in config

### 7. Command Palette (Ctrl/Cmd+K)
- Palette lists site sections, actions (theme toggle, scroll to, contact, copy email)
- Fuzzy search, keyboard-first, accessible roles/aria, trap focus
- Config: registerRoutes: [{label, href, hotkey?}], actions

### 8. Scroll & Route Transitions
- Top scroll progress bar + radial indicator; page transition fade with masked "holo" wipe
- Config: minimal mode (fade only), heavy mode (mask + particles), disabled on reduced-motion

### 9. Neon Focus Rings + Glass Panels
- Replace default outlines with accessible neon rings (WCAG contrast)
- Optional glassmorphism overlays for modals/menus via data attributes
- Config: ringColor, ringThickness, enableGlass: boolean

### 10. System Status Card (fake telemetry)
- Small widget showing "systems online", rolling digits for latency/uptime
- Pure front-end; no tracking; random but plausible values; updates every 4–8s
- Config: mount selector, frequency, pauseWhenHidden: boolean

### 11. Easter Eggs (konami, devtools banner)
- Konami code triggers tasteful confetti or quick glow surge
- DevTools open prints a styled ASCII banner with a hidden command
- Config: enableKonami, enableDevToolsBanner

### 12. Motion-Safe + FPS Guard
- A central utility that:
  - Reads prefers-reduced-motion and disables relevant animations
  - Samples FPS for 3s; if low (<30fps), throttles effects and disables heavy modules

## Configuration Example

```typescript
// /enhance/enhance.config.ts
export default {
  cursor: { 
    enabled: true, 
    magnetic: true, 
    intensity: 0.25, 
    friction: 0.12, 
    size: 28, 
    hideNative: true 
  },
  tilt: { 
    enabled: true, 
    selector: ".card, .tile, .btn", 
    maxTiltDeg: 6, 
    glare: false 
  },
  aurora: { 
    enabled: true, 
    timeReactive: true, 
    lowPowerStatic: true 
  },
  particles: { 
    enabled: false, 
    density: 0.25, 
    linkDistance: 120, 
    mobileDisabled: true 
  },
  reveal: { 
    enabled: true, 
    textScan: true, 
    threshold: 0.15 
  },
  sfx: { 
    enabled: false, 
    volume: 0.28, 
    stereo: true 
  },
  palette: { 
    enabled: true 
  },
  transitions: { 
    enabled: true, 
    mode: "minimal" 
  },
  focus: { 
    enabled: true, 
    neonColor: "var(--fx-neon)" 
  },
  status: { 
    enabled: true, 
    selector: "[data-status-anchor]", 
    intervalMs: [4000, 8000] 
  },
  easter: { 
    konami: true, 
    devtoolsBanner: true 
  }
}
```

## File Structure

```
/enhance/
├── enhance.config.ts
├── init.ts
├── utils/
│   ├── dom.ts
│   ├── perf.ts
│   └── a11y.ts
└── features/
    ├── cursor.ts
    ├── tilt.ts
    ├── aurora.ts
    ├── particles.ts
    ├── reveal.ts
    ├── sfx.ts
    ├── palette.ts
    ├── transitions.ts
    ├── status.ts
    └── easter.ts

/styles/
└── enhance.css

/public/enhance/
├── sfx/
│   ├── click.mp3
│   └── hover.mp3
└── textures/
    └── scanlines.png
```

## Implementation Notes

- Use CSS variables for colors: `--fx-neon`, `--fx-glass-bg`, `--fx-glass-border`, etc.
- Prefer CSS-driven effects; use JS only for control/physics
- Lazy-load any canvas/three-like modules; keep them <30KB each if possible
- For audio, create AudioContext on user gesture only; never autoplay without a click
- Provide a one-line API: `import { mountEnhancements, unmountEnhancements } from "/enhance/init"`
- All modules return a disposer for cleanup: `const dispose = feature.mount(); dispose()` for page changes

## Accessibility Requirements

- Never hide the native focus for keyboard users
- Announce command palette open/close via aria-live polite
- Ensure color contrast ≥ 4.5:1 for text; >= 3:1 for UI icons
- Provide "Reduce Effects" quick action in the command palette

## Performance Requirements

- Add a micro "PerfSentinel" that measures frame time and toggles lowPower mode when needed
- Prefer requestIdleCallback for non-critical work
- Defer non-essential scripts and inline only critical CSS for new components
- Avoid layout thrashing; batch reads/writes with rAF

## Mounting

Auto-mount enhancements on client after the app mounts/hydrates.

Expose `window.IORIIMASU_ENHANCE` with methods: `enableAll()`, `disableAll()`, `set(key, value)`, `profile()`.

## Testing and Verification

- Add a route (`/enhance-demo`) or dev-only mode to preview all effects together
- Add smoke tests for the utils and for feature enabling/disabling
- Validate that disabling all features restores the original UX

## Documentation

A small section that shows how to toggle features, how to remove the pack (delete /enhance and /styles/enhance; remove import), and how to add new modules.

## Rollback

All changes are additive. Provide a single import line to remove. Ensure site builds without /enhance. No edits to existing components other than the one import and a minimal anchor element if needed.

## Usage

```typescript
// In your main.tsx or _app.tsx
import { mountEnhancements } from './enhance/init';

// Mount enhancements after app initialization
mountEnhancements();

// Or with custom config
import { mountEnhancements } from './enhance/init';
import config from './enhance/enhance.config';

mountEnhancements(config);
```

## Browser Support

- Modern browsers with ES2020+ support
- Graceful degradation for older browsers
- Mobile-first responsive design
- Touch-friendly interactions

## License

This enhancement pack is provided under the same license as the main project.

---

**Note**: This enhancement pack is designed to be completely optional and non-destructive. It can be easily removed without affecting the core functionality of the website.
