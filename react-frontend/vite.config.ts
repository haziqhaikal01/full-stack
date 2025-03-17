import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 5173, // or change to 3000
    strictPort: true,
  },
});
