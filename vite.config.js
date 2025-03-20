import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL || "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  // tanstack goes before react
  plugins: [TanStackRouterVite(), react()],
});
