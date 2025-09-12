import path from "path";

import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          animation: ["framer-motion", "gsap"],
          swiper: ["swiper"],
        },
      },
    },
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 2048,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "gsap"],
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
