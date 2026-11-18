/**
 * 全站链接与静态资源完整性自动化检查脚本
 * 严格校验：
 * 1. 站内所有相对跳转路径与资源引用是否能物理定位到真实文件；
 * 2. 严禁出现以 / 开头的根绝对路径（确保本地双击 file:// 协议与线上均可无缝访问）；
 * 3. 拦截任何 404 失效内链。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function scanHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'scripts', 'docs', 'css', 'js', 'data'].includes(file)) {
        scanHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function checkLinks() {
  console.log('=== [Link Checker] 开始全站链接与静态资源校验 ===');
  const htmlFiles = scanHtmlFiles(ROOT_DIR);
  let totalLinksChecked = 0;
  let brokenLinks = [];
  let absoluteSlashLinks = [];

  const linkRegex = /(?:href|src)=["']([^"']+)["']/g;

  for (const file of htmlFiles) {
    const relHtmlPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const rawTarget = match[1].trim();
      totalLinksChecked++;

      // 跳过纯锚点、外部链接、javascript与mailto
      if (
        rawTarget.startsWith('#') ||
        rawTarget.startsWith('http://') ||
        rawTarget.startsWith('https://') ||
        rawTarget.startsWith('mailto:') ||
        rawTarget.startsWith('javascript:') ||
        rawTarget.startsWith('data:')
      ) {
        continue;
      }

      // 规则检查：严禁以 / 开头的站内路径
      if (rawTarget.startsWith('/')) {
        absoluteSlashLinks.push({
          file: relHtmlPath,
          target: rawTarget
        });
        continue;
      }

      // 剔除 URL 中的 query 和 hash
      const cleanTarget = rawTarget.split('?')[0].split('#')[0];
      if (!cleanTarget) continue;

      // 计算物理目标路径
      const fileDir = path.dirname(file);
      const resolvedTarget = path.resolve(fileDir, cleanTarget);

      if (!fs.existsSync(resolvedTarget)) {
        brokenLinks.push({
          file: relHtmlPath,
          target: rawTarget,
          resolved: path.relative(ROOT_DIR, resolvedTarget).replace(/\\/g, '/')
        });
      }
    }
  }

  console.log(`[Link Checker] 共扫描 ${htmlFiles.length} 个 HTML 页面，累计检查 ${totalLinksChecked} 处资源与页面引用。`);

  let hasError = false;

  if (absoluteSlashLinks.length > 0) {
    hasError = true;
    console.error(`\n❌ [FAIL] 发现 ${absoluteSlashLinks.length} 处违规使用以 / 开头的绝对路径（违反相对路径规范）:`);
    absoluteSlashLinks.forEach(item => {
      console.error(`  - 在 ${item.file} 中发现: ${item.target}`);
    });
  } else {
    console.log('✅ [PASS] 相对路径规范校验通过：全站 0 处违规使用 / 开头绝对路径！');
  }

  if (brokenLinks.length > 0) {
    hasError = true;
    console.error(`\n❌ [FAIL] 发现 ${brokenLinks.length} 处失效断链 (404 Not Found):`);
    brokenLinks.forEach(item => {
      console.error(`  - 在 ${item.file} 中引用不存在的文件: ${item.target} (解析为 ${item.resolved})`);
    });
  } else {
    console.log('✅ [PASS] 页面跳转与资源完整性校验通过：全站 0 处断链！');
  }

  if (hasError) {
    console.error('\n链接校验未完全通过，请修复上述问题！');
    return false;
  }

  console.log('=== [Link Checker] 全站链接与资源完整性校验 100% 通过！===\n');
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const ok = checkLinks();
  process.exit(ok ? 0 : 1);
}
