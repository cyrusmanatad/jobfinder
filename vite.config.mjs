import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), tailwindcss()],
    server: {
      port: 3001,
      proxy: {
        "/api": {
          target: "http://ec2-50-17-90-79.compute-1.amazonaws.com", // ✅ Use IPv4 explicitly
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
