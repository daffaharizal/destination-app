import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [react()],
    define: {
      'import.meta.env': {
        VITE_BASE_URL: JSON.stringify(env.VITE_BASE_URL),
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
      },
    },
  }
});
