// File: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access from mobile
    port: 5173,       // Optional, specify the port if you need a custom one
  },
});
