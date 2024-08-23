import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows external access (e.g., via your local network IP)
    port: 3000,  // Set the port you want to use
    strictPort: true, // Ensure the server fails if the port is already in use
  },
});
