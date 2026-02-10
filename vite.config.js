import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
   server: {
    port: 5177,
    strictPort: true,
      allowedHosts: [
      'london-segments-responding-brother.trycloudflare.com', // your tunnel URL
      'localhost'
    ],
  }
  
})

