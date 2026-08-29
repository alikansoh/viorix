import { POSTS } from '../blogs/posts';

const BASE_URL = 'https://viorix.co.uk';

const staticPages = [
  { url: '', changefreq: 'weekly', priority: 1.0 },
  { url: 'about', changefreq: 'monthly', priority: 0.8 },
  { url: 'projects', changefreq: 'weekly', priority: 0.9 },
  { url: 'contact', changefreq: 'monthly', priority: 0.7 },
  { url: 'web-quote', changefreq: 'monthly', priority: 0.9 },
  { url: 'services', changefreq: 'monthly', priority: 0.9 },
  { url: 'services/web-development', changefreq: 'monthly', priority: 0.8 },
  { url: 'services/mobile-development', changefreq: 'monthly', priority: 0.8 },
  { url: 'services/ui-ux-design', changefreq: 'monthly', priority: 0.8 },
  { url: 'services/digital-marketing', changefreq: 'monthly', priority: 0.8 },
  { url: 'blogs', changefreq: 'weekly', priority: 0.9 },
  { url: 'privacy', changefreq: 'yearly', priority: 0.5 },
  { url: 'terms', changefreq: 'yearly', priority: 0.5 },
  { url: 'cookies', changefreq: 'yearly', priority: 0.5 },
];

function generateSiteMap(posts) {
  const today = new Date().toISOString().split('T')[0];

  const urls = staticPages
    .map(page => `
  <url>
    <loc>${BASE_URL}/${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `)
    .join('');

  const blogUrls = posts
    .map(post => `
  <url>
    <loc>${BASE_URL}/blogs/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
${blogUrls}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSiteMap(POSTS);
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
