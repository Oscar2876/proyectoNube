import { defineConfig } from 'vite';

export default defineConfig({
    server: {
    proxy: {
      '/firebase-messaging-sw.js': 'http://localhost:4200/firebase-messaging-sw.js',  // Apunta a tu servicio de worker en el localhost
    },
    allowedHosts: ['localhost:4200'], // Permite tu host de ngrok
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/main.ts',
        // Agrega otras configuraciones según sea necesario
      }
    }
  }
});

