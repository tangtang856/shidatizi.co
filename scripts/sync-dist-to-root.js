import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

function scanHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function toRelativePath(fileRelPath, targetUrl) {
  if (!targetUrl.startsWith('/') || targetUrl.startsWith('//')) return targetUrl;
  
  // Split query and hash
  const [urlWithoutHash, hash] = targetUrl.split('#');
  const [pathname, query] = urlWithoutHash.split('?');
  
  const fileDir = path.dirname(fileRelPath);
  const depth = (fileDir === '.' || fileDir === '') ? 0 : fileDir.split(/[\\\/]/).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  
  let relTarget;
  if (pathname === '/') {
    relTarget = prefix + 'index.html';
  } else {
    let clean = pathname.replace(/^\//, '');
    if (clean.endsWith('/')) {
      clean += 'index.html';
    } else if (!path.extname(clean)) {
      clean += '/index.html';
    }
    relTarget = prefix + clean;
  }
  
  if (query) relTarget += '?' + query;
  if (hash) relTarget += '#' + hash;
  return relTarget;
}

function convertLinksToRelative(htmlContent, fileRelPath) {
  return htmlContent.replace(/(href|src)=["'](\/[^"']*)["']/g, (match, attr, targetUrl) => {
    // If it's an absolute URL or external, skip
    if (targetUrl.startsWith('//') || targetUrl.startsWith('/api/')) return match;
    const relUrl = toRelativePath(fileRelPath, targetUrl);
    return `${attr}="${relUrl}"`;
  });
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('=== [1/4] 确保 dist/sitemap.xml 存在 ===');
if (fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml'))) {
  fs.copyFileSync(path.join(DIST_DIR, 'sitemap-index.xml'), path.join(DIST_DIR, 'sitemap.xml'));
}

console.log('=== [2/4] 处理 dist/ 内部所有 HTML 的相对链接转换 ===');
const htmlFiles = scanHtmlFiles(DIST_DIR);
console.log(`共需处理 ${htmlFiles.length} 个 HTML 页面`);

for (const file of htmlFiles) {
  const fileRelPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  let content = fs.readFileSync(file, 'utf8');
  content = convertLinksToRelative(content, fileRelPath);
  fs.writeFileSync(file, content, 'utf8');
}
console.log('✅ dist/ 内链相对化转换完成！');

console.log('=== [3/4] 同步 dist/ 静态构建产物至根目录 ===');
copyDirRecursive(DIST_DIR, ROOT_DIR);

if (fs.existsSync(path.join(DIST_DIR, 'sitemap.xml'))) {
  fs.copyFileSync(path.join(DIST_DIR, 'sitemap.xml'), path.join(ROOT_DIR, 'sitemap.xml'));
}
if (fs.existsSync(path.join(DIST_DIR, 'sitemap-0.xml'))) {
  fs.copyFileSync(path.join(DIST_DIR, 'sitemap-0.xml'), path.join(ROOT_DIR, 'sitemap-0.xml'));
}

console.log('✅ [4/4] 同步完成！根目录已与 dist/ 保持 100% 同步！');
