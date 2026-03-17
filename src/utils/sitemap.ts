import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

export async function generateSitemap(baseUrl: string): Promise<string> {
  const products = await Product.find({ isActive: true }).select("_id updatedAt").lean();
  const categories = await Category.find({ isActive: true }).select("slug updatedAt").lean();

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
    { loc: baseUrl, lastmod: new Date().toISOString(), changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/categories`, lastmod: new Date().toISOString(), changefreq: "weekly", priority: "0.8" },
    { loc: `${baseUrl}/b2b`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.7" },
    { loc: `${baseUrl}/service`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.6" },
  ];

  for (const cat of categories) {
    urls.push({
      loc: `${baseUrl}/category/${cat.slug}`,
      lastmod: (cat.updatedAt || new Date()).toISOString(),
      changefreq: "weekly",
      priority: "0.8",
    });
  }

  for (const prod of products) {
    urls.push({
      loc: `${baseUrl}/product/${prod._id}`,
      lastmod: (prod.updatedAt || new Date()).toISOString(),
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /account
Disallow: /cart
Disallow: /checkout
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
}
