import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.BETTER_AUTH_URL ?? "";
  return {
    // Solo los recursos públicos se indexan; la comunidad y la API quedan fuera.
    rules: [{ userAgent: "*", allow: ["/$", "/recursos", "/api/uploads/"], disallow: ["/api/", "/admin/", "/login", "/registro"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
