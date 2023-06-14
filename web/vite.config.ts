import { defineConfig } from "vite";

import path from "path";

import react from "@vitejs/plugin-react";
import { createHtmlPlugin as html } from "vite-plugin-html";
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({}),
    svgr({}),
    html({ minify: true }),
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "../core/src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    reportCompressedSize: false,
  },
  base: "./"
});
