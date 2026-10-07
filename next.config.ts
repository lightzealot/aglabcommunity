import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Las acciones del servidor aceptan 1 MB por defecto; las subidas (imágenes y
    // archivos de lecciones, máx. 25 MB) necesitan más margen.
    serverActions: { bodySizeLimit: "26mb" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
