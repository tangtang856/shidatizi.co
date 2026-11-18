import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { airports, getRankedAirports } from '../data/airports.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_DOMAIN = 'https://shidatizi.co';

// 相对路径计算函数
function getRelPath(fromFilePath, toFilePath) {
  const fromDir = path.dirname(fromFilePath);
  let rel = path.relative(fromDir, toFilePath).replace(/\\/g, '/');
  if (!rel.startsWith('.') && !rel.startsWith('/')) {
    // 同级目录
    return rel;
  }
  return rel;
}

// 根目录相对前缀
function getRootPrefix(filePath) {
  const fromDir = path.dirname(filePath);
  if (fromDir === '.' || fromDir === '') return './';
  const parts = fromDir.split(/[\\/]/).filter(Boolean);
  return '../'.repeat(parts.length);
}

// 通用页面布局包装器
function layout({
  filePath,
  title,
  description,
  keywords,
  canonical,
  h1,
  breadcrumbs = [],
  schema = null,
  bodyContent,
  isArticle = false,
  sidebarLinks = null
}) {
  const root = getRootPrefix(filePath);
  const canonicalUrl = canonical || `${BASE_DOMAIN}/${filePath === 'index.html' ? '' : filePath.replace(/index\.html$/, '')}`;

  // 面包屑渲染
  let breadcrumbsHtml = '';
  if (breadcrumbs.length > 0) {
    breadcrumbsHtml = `
      <nav class="breadcrumbs" aria-label="面包屑导航">
        <a href="${getRelPath(filePath, 'index.html')}">首页</a>
        ${breadcrumbs.map((b, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          const targetRel = b.path ? getRelPath(filePath, b.path) : '#';
          return `
            <span class="breadcrumbs-separator">/</span>
            ${isLast ? `<span>${b.name}</span>` : `<a href="${targetRel}">${b.name}</a>`}
          `;
        }).join('')}
      </nav>
    `;
  }

  // 默认 Schema 组织与站点
  const defaultSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "十代梯子 · 优质机场与VPN评测指南",
      "url": `${BASE_DOMAIN}/`,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_DOMAIN}/compare/index.html?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  if (breadcrumbs.length > 0) {
    defaultSchemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "首页",
          "item": `${BASE_DOMAIN}/`
        },
        ...breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          "position": idx + 2,
          "name": b.name,
          "item": b.path ? `${BASE_DOMAIN}/${b.path.replace(/index\.html$/, '')}` : canonicalUrl
        }))
      ]
    });
  }

  if (schema) {
    if (Array.isArray(schema)) {
      defaultSchemas.push(...schema);
    } else {
      defaultSchemas.push(schema);
    }
  }

  const jsonLd = JSON.stringify(defaultSchemas.length === 1 ? defaultSchemas[0] : defaultSchemas, null, 2);

  // 侧边栏
  let sidebarHtml = '';
  if (isArticle && sidebarLinks) {
    sidebarHtml = `
      <aside class="sidebar">
        <div class="widget">
          <div class="widget-title">📌 核心导航专题</div>
          <ul class="widget-list">
            <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">👉 便宜低预算机场精选</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">👉 高端IEPL专线机场</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">👉 ChatGPT/Claude专用节点</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/streaming/index.html')}">👉 4K流媒体解锁专线</a></li>
            <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🏆 2026综合排行榜</a></li>
            <li><a href="${getRelPath(filePath, 'compare/index.html')}">⚖️ 机场在线横向对比</a></li>
          </ul>
        </div>
        <div class="widget">
          <div class="widget-title">📚 新手必看教程</div>
          <ul class="widget-list">
            <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">💻 Windows客户端配置</a></li>
            <li><a href="${getRelPath(filePath, 'guides/android/index.html')}">📱 安卓手机配置指南</a></li>
            <li><a href="${getRelPath(filePath, 'guides/ios/index.html')}">🍏 iPhone小火箭配置</a></li>
            <li><a href="${getRelPath(filePath, 'guides/macos/index.html')}">🖥️ Mac电脑客户端配置</a></li>
          </ul>
        </div>
        <div class="widget">
          <div class="widget-title">🛡️ 评测与可信说明</div>
          <p style="font-size:0.825rem; color:var(--text-muted); line-height:1.5;">
            本站坚持真实抽样与公开测试标准，不接受任何虚假赞助排序。所有测评数据均标注来源与测试日期。
          </p>
          <a href="${getRelPath(filePath, 'editorial-policy/index.html')}" style="font-size:0.825rem; display:inline-block; margin-top:0.5rem; font-weight:600;">阅读独立编辑政策 →</a>
        </div>
      </aside>
    `;
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph -->
  <meta property="og:locale" content="zh_CN">
  <meta property="og:type" content="${isArticle ? 'article' : 'website'}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="十代梯子 · shidatizi.co">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  
  <!-- 原生CSS规范：严格使用相对路径 -->
  <link rel="stylesheet" href="${getRelPath(filePath, 'css/style.css')}">
  
  <!-- 结构化数据 (JSON-LD) -->
  <script type="application/ld+json">
${jsonLd}
  </script>
</head>
<body data-root="${root}">

  <!-- 顶部导航 -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="${getRelPath(filePath, 'index.html')}" class="site-logo">
        <span class="logo-badge">10</span>
        <span>十代梯子</span>
      </a>

      <nav class="site-nav">
        <a href="${getRelPath(filePath, 'index.html')}" class="nav-link ${filePath === 'index.html' ? 'active' : ''}">首页</a>
        <a href="${getRelPath(filePath, 'ranking/overall/index.html')}" class="nav-link ${filePath.startsWith('ranking/') ? 'active' : ''}">机场排行</a>
        <a href="${getRelPath(filePath, 'recommend/budget/index.html')}" class="nav-link ${filePath.startsWith('recommend/') ? 'active' : ''}">精选推荐</a>
        <a href="${getRelPath(filePath, 'compare/index.html')}" class="nav-link ${filePath.startsWith('compare/') ? 'active' : ''}">机场对比</a>
        <a href="${getRelPath(filePath, 'guides/index.html')}" class="nav-link ${filePath.startsWith('guides/') ? 'active' : ''}">配置教程</a>
        <a href="${getRelPath(filePath, 'blog/index.html')}" class="nav-link ${filePath.startsWith('blog/') ? 'active' : ''}">深度博客</a>
        <a href="${getRelPath(filePath, 'glossary/index.html')}" class="nav-link ${filePath.startsWith('glossary/') ? 'active' : ''}">术语百科</a>
      </nav>

      <div class="header-actions">
        <button type="button" class="search-btn" aria-label="全站搜索">
          <span>🔍</span>
          <span>搜索...</span>
        </button>
        <button type="button" class="mobile-menu-btn" aria-label="展开手机菜单">☰</button>
      </div>
    </div>

    <!-- 手机端折叠菜单 -->
    <div class="mobile-nav">
      <a href="${getRelPath(filePath, 'index.html')}">🏠 首页</a>
      <a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🏆 综合排行榜</a>
      <a href="${getRelPath(filePath, 'ranking/value/index.html')}">💰 性价比排行榜</a>
      <a href="${getRelPath(filePath, 'ranking/stable/index.html')}">⚡ 稳定专线排行榜</a>
      <a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 平价低预算推荐</a>
      <a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端专线推荐</a>
      <a href="${getRelPath(filePath, 'recommend/ai/index.html')}">🤖 ChatGPT/Claude AI专用</a>
      <a href="${getRelPath(filePath, 'compare/index.html')}">⚖️ 机场横向对比工具</a>
      <a href="${getRelPath(filePath, 'guides/index.html')}">📖 客户端使用教程</a>
      <a href="${getRelPath(filePath, 'blog/index.html')}">✍️ 翻墙技术博客</a>
      <a href="${getRelPath(filePath, 'glossary/index.html')}">📚 代理名词百科</a>
    </div>
  </header>

  <!-- 主体内容 -->
  <main id="main-content">
    ${bodyContent}
  </main>

  <!-- 页脚 -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h4>十代梯子 · shidatizi.co</h4>
          <p>
            专注全球网络加速、海外开发网络环境、科学上网梯子与机场节点深度客观评测。基于实际网络路由、专线SLA与真实套餐单价测算，拒绝虚构测速。
          </p>
          <div style="font-size:0.8rem; color:var(--text-muted);">
            最新核验更新时间：2026年3月 · 数据每日监测
          </div>
        </div>

        <div class="footer-col">
          <h5>🔥 核心专题</h5>
          <ul class="footer-links">
            <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">平价低预算机场</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">高端IEPL专线</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/stable/index.html')}">高稳定抗封锁节点</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">ChatGPT与AI专用</a></li>
            <li><a href="${getRelPath(filePath, 'recommend/streaming/index.html')}">4K流媒体解锁</a></li>
            <li><a href="${getRelPath(filePath, 'compare/index.html')}">机场在线PK对比</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>📖 客户端教程</h5>
          <ul class="footer-links">
            <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">Windows (Clash/v2rayN)</a></li>
            <li><a href="${getRelPath(filePath, 'guides/android/index.html')}">Android (Clash Meta)</a></li>
            <li><a href="${getRelPath(filePath, 'guides/ios/index.html')}">iOS (Shadowrocket小火箭)</a></li>
            <li><a href="${getRelPath(filePath, 'guides/macos/index.html')}">macOS (Clash Verge)</a></li>
            <li><a href="${getRelPath(filePath, 'blog/protocol-comparison/index.html')}">SS/Trojan/Hysteria2对比</a></li>
            <li><a href="${getRelPath(filePath, 'blog/subconverter-security/index.html')}">订阅转换防泄露教程</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>🛡️ 网站规范与支持</h5>
          <ul class="footer-links">
            <li><a href="${getRelPath(filePath, 'about/index.html')}">关于我们</a></li>
            <li><a href="${getRelPath(filePath, 'contact/index.html')}">联系反馈与纠错</a></li>
            <li><a href="${getRelPath(filePath, 'editorial-policy/index.html')}">编辑政策与评测标准</a></li>
            <li><a href="${getRelPath(filePath, 'privacy-policy/index.html')}">隐私政策</a></li>
            <li><a href="${getRelPath(filePath, 'disclaimer/index.html')}">免责声明</a></li>
            <li><a href="${getRelPath(filePath, 'sitemap.xml')}">Sitemap 网站地图</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 shidatizi.co. 保留所有权利。</div>
        <div style="font-size:0.8rem; color:var(--text-light);">
          免责声明：本站仅提供网络技术研究与客观信息汇总，请在遵循当地法律法规前提下合理使用网络工具。
        </div>
      </div>
    </div>
  </footer>

  <!-- 搜索弹窗 -->
  <div id="searchModal" class="search-modal" role="dialog" aria-modal="true" aria-label="全站内容搜索">
    <div class="search-dialog">
      <div class="search-input-wrap">
        <span>🔍</span>
        <input type="text" id="searchInput" placeholder="搜索机场评测、专线、协议、客户端教程..." autocomplete="off">
        <button type="button" class="search-close-btn" aria-label="关闭搜索">✕</button>
      </div>
      <div id="searchResults" class="search-results"></div>
    </div>
  </div>

  <!-- 原生JS交互：严格使用相对路径 -->
  <script src="${getRelPath(filePath, 'js/main.js')}"></script>
  <script src="${getRelPath(filePath, 'js/search.js')}"></script>
</body>
</html>`;
}

// 确保目录存在
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 写入文件
function writePage(relPath, content) {
  const fullPath = path.join(ROOT_DIR, relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`[Generated] ${relPath}`);
}

export {
  layout,
  writePage,
  getRelPath,
  getRootPrefix,
  BASE_DOMAIN
};
