import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js core — loads first, cached aggressively
          'three': ['three'],

          // R3F ecosystem — separate chunk so it doesn't block Three
          'r3f': [
            '@react-three/fiber',
            '@react-three/drei',
          ],

          // Rapier physics + WASM — heaviest chunk, isolated so others
          // don't wait for it. Rapier's WASM compiles async anyway.
          'rapier': ['@react-three/rapier'],

          // meshline — tiny, separate so it doesn't pollute main bundle
          'meshline': ['meshline'],

          // Framer Motion — large, keep away from 3D chunks
          'motion': ['framer-motion'],

          // React Router
          'router': ['react-router-dom'],
        },
      },
    },

    // Raise chunk warning limit — Three.js is legitimately large
    chunkSizeWarningLimit: 2000,
  },

  // Optimize deps pre-bundling — Vite processes these on first dev server
  // start so they're ready immediately rather than on first import
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/rapier',
      'meshline',
      'framer-motion',
      'react-router-dom',
    ],
  },
})