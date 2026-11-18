import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_DOMAIN = 'https://shidatizi.co';

function scanHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'scripts', 'docs', 'css', 'js', 'data'].includes(file)) {
        scanHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html') && file !== '404.html') {
      const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
      fileList.push({
        relPath,
        mtime: stat.mtime.toISOString().split('T')[0]
      });
    }
  }
  return fileList;
}

export function generateSitemap() {
  const files = scanHtmlFiles(ROOT_DIR);

  // 优先级与频率计算
  const urlsXml = files.map(item => {
    let url = `${BASE_DOMAIN}/${item.relPath}`;
    let priority = '0.7';
    let changefreq = 'weekly';

    if (item.relPath === 'index.html') {
      url = `${BASE_DOMAIN}/`;
      priority = '1.0';
      changefreq = 'daily';
    } else if (item.relPath.startsWith('ranking/') || item.relPath.startsWith('recommend/')) {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (item.relPath.startsWith('review/') || item.relPath === 'compare/index.html') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (item.relPath.startsWith('guides/') || item.relPath.startsWith('blog/')) {
      priority = '0.8';
      changefreq = 'monthly';
    } else if (item.relPath.startsWith('glossary/')) {
      priority = '0.6';
      changefreq = 'monthly';
    } else {
      priority = '0.5';
      changefreq = 'monthly';
    }

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${item.mtime}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`[Sitemap] Generated sitemap.xml with ${files.length} URLs.`);

  // 生成 sitemap-index.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_DOMAIN}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  const sitemapIndexPath = path.join(ROOT_DIR, 'sitemap-index.xml');
  fs.writeFileSync(sitemapIndexPath, sitemapIndexXml, 'utf8');
  console.log(`[Sitemap] Generated sitemap-index.xml.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}
