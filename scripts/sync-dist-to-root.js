import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

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

console.log('=== 同步 dist/ 静态构建产物至根目录 ===');
copyDirRecursive(DIST_DIR, ROOT_DIR);

// Copy sitemap-index.xml to sitemap.xml for legacy compatibility
if (fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml'))) {
  fs.copyFileSync(path.join(DIST_DIR, 'sitemap-index.xml'), path.join(ROOT_DIR, 'sitemap.xml'));
}

console.log('✅ 同步完成！根目录已与 dist/ 保持 100% 同步！');
