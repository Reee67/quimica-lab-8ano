import { defineConfig } from 'vite'

export default defineConfig({
  base: '/quimica-lab-8ano/',
  optimizeDeps: {
    include: [
      'three',
      'three/examples/jsm/controls/OrbitControls.js',
      'three/examples/jsm/controls/PointerLockControls.js'
    ]
  }
})
