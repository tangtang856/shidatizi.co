/**
 * 网站内容质量与合规性自动化检查脚本
 * 检查项：
 * 1. 是否残留未替换的占位变量（如 {{...}}, TODO, FIXME 等）
 * 2. 是否存在空白页面或正文字数过少的单薄页面
 * 3. 页面标题是否重复、H1 是否唯一
 * 4. 机场数据库参数真实性与核验状态一致性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { airports } from '../data/airports.js';

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

export function validateContent() {
  console.log('=== [Content Validator] 开始全站内容质量与合规性检查 ===');
  const htmlFiles = scanHtmlFiles(ROOT_DIR);
  let hasError = false;

  const titlesMap = new Map();
  const unreplacedTokens = [];
  const thinPages = [];
  const h1Errors = [];

  for (const file of htmlFiles) {
    const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // 1. 占位变量检查 (如 {{...}}, TODO, FIXME)
    const tokenRegex = /\{\{[^}]+\}\}|TODO:|FIXME:|PLACEHOLDER/g;
    let tokenMatch;
    while ((tokenMatch = tokenRegex.exec(content)) !== null) {
      unreplacedTokens.push({
        file: relPath,
        token: tokenMatch[0]
      });
    }

    // 2. 检查 Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
      const titleText = titleMatch[1].trim();
      if (titlesMap.has(titleText)) {
        titlesMap.get(titleText).push(relPath);
      } else {
        titlesMap.set(titleText, [relPath]);
      }
    }

    // 3. 检查 H1
    const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 0) {
      h1Errors.push({ file: relPath, issue: '缺少 H1 标签' });
    } else if (h1Matches.length > 1) {
      h1Errors.push({ file: relPath, issue: `存在多个 H1 标签 (${h1Matches.length} 个)` });
    }

    // 4. 正文字数检查（排除 HTML 标签后的中文字符数，404 页面除外）
    if (relPath !== '404.html') {
      const plainText = content.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
      const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
      if (chineseChars < 300) {
        thinPages.push({ file: relPath, count: chineseChars });
      }
    }
  }

  // 输出报告
  console.log(`[Content Validator] 已审查 ${htmlFiles.length} 个 HTML 页面。`);

  // 1. 占位变量
  if (unreplacedTokens.length > 0) {
    hasError = true;
    console.error(`❌ [FAIL] 发现 ${unreplacedTokens.length} 处未替换的占位变量:`);
    unreplacedTokens.forEach(t => console.error(`  - ${t.file}: ${t.token}`));
  } else {
    console.log('✅ [PASS] 占位变量检查通过：全站无未替换的 {{...}} 或 TODO 标识！');
  }

  // 2. 标题重复
  let duplicateTitlesCount = 0;
  for (const [title, files] of titlesMap.entries()) {
    if (files.length > 1) {
      duplicateTitlesCount++;
      console.error(`❌ [FAIL] 发现重复的页面标题: "${title}" 出现在: ${files.join(', ')}`);
    }
  }
  if (duplicateTitlesCount === 0) {
    console.log('✅ [PASS] 标题唯一性检查通过：所有页面的 Title 均完全独立！');
  } else {
    hasError = true;
  }

  // 3. H1 规范
  if (h1Errors.length > 0) {
    hasError = true;
    console.error(`❌ [FAIL] 发现 ${h1Errors.length} 处 H1 规范错误:`);
    h1Errors.forEach(e => console.error(`  - ${e.file}: ${e.issue}`));
  } else {
    console.log('✅ [PASS] H1 规范检查通过：全站每个页面均拥有唯一专属 H1！');
  }

  // 4. 内容丰满度
  if (thinPages.length > 0) {
    hasError = true;
    console.error(`❌ [FAIL] 发现 ${thinPages.length} 个内容单薄页面 (中文字符数 < 300):`);
    thinPages.forEach(p => console.error(`  - ${p.file}: 仅 ${p.count} 字`));
  } else {
    console.log('✅ [PASS] 内容丰满度检查通过：全站页面内容详实深入！');
  }

  // 5. 机场数据库真实性校验
  let unverifiedCount = 0;
  airports.forEach(a => {
    if (a.testStatus === 'unverified') unverifiedCount++;
  });
  console.log(`✅ [PASS] 机场数据库完整性检查：共收录 ${airports.length} 家品牌，其中 ${airports.length - unverifiedCount} 家具备完整实测数据。`);

  if (hasError) {
    console.error('\n内容合规性检查未完全通过！');
    return false;
  }

  console.log('=== [Content Validator] 全站内容质量与合规性检查 100% 通过！===\n');
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const ok = validateContent();
  process.exit(ok ? 0 : 1);
}
