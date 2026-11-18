import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

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

export function validateDist() {
  console.log('=== [Dist SEO & Quality Validator] 开始检查 dist/ 输出 ===');
  const htmlFiles = scanHtmlFiles(DIST_DIR);
  console.log(`共扫描 ${htmlFiles.length} 个静态 HTML 页面`);

  let errors = 0;
  const titles = new Map();

  for (const file of htmlFiles) {
    const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // 1. Placeholder check
    const placeholders = content.match(/\{\{[^}]+\}\}|TODO:|FIXME:/g);
    if (placeholders) {
      console.error(`[Error] 占位符残留 ${relPath}:`, placeholders);
      errors++;
    }

    // 2. Single H1 check
    const h1s = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
    if (!h1s || h1s.length === 0) {
      console.error(`[Error] 缺失 H1 标签: ${relPath}`);
      errors++;
    } else if (h1s.length > 1) {
      console.warn(`[Warning] 多个 H1 标签 (${h1s.length}): ${relPath}`);
    }

    // 3. Title uniqueness
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      const title = titleMatch[1].trim();
      if (titles.has(title)) {
        console.warn(`[Warning] 重复 Title: "${title}" 在 ${relPath} 与 ${titles.get(title)}`);
      } else {
        titles.set(title, relPath);
      }
    } else {
      console.error(`[Error] 缺失 Title: ${relPath}`);
      errors++;
    }

    // 4. Canonical check
    if (!content.includes('rel="canonical"')) {
      console.error(`[Error] 缺失 Canonical 标签: ${relPath}`);
      errors++;
    }

    // 5. Meta description
    if (!content.includes('name="description"')) {
      console.error(`[Error] 缺失 Meta Description: ${relPath}`);
      errors++;
    }
  }

  if (errors === 0) {
    console.log(`✅ [Pass] 全站 ${htmlFiles.length} 个页面全部通过质量与 Bing SEO 验证！0 错误！`);
    return true;
  } else {
    console.error(`❌ [Fail] 发现 ${errors} 个严重质量问题，请修复！`);
    return false;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const ok = validateDist();
  if (!ok) process.exit(1);
}
