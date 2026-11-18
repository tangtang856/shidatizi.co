import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';
import { guidesData } from '../data/content/guides-data.js';

export function generateGuides() {
  // 1. 生成 30 篇独立教程落地页
  guidesData.forEach(guide => {
    const filePath = `guides/${guide.slug}/index.html`;

    const breadcrumbs = [
      { name: "教程中心", path: "guides/index.html" },
      { name: guide.h1, path: filePath }
    ];

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": guide.h1,
      "description": guide.metaDesc,
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "CNY",
        "value": "0"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "翻墙客户端 (Clash / Sing-box / Shadowrocket)"
        },
        {
          "@type": "HowToTool",
          "name": "高速专线机场订阅链接"
        }
      ]
    };

    const relatedAirportsHtml = `
      <div style="background:#f8fafc; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; margin-top:2.5rem;">
        <h3 style="margin-top:0; font-size:1.1rem; color:var(--text-main);">🎯 教程配套高品质专线机场推荐</h3>
        <p style="font-size:0.875rem; color:var(--text-body); margin-bottom:1rem;">
          工欲善其事，必先利其器。优秀的客户端需要搭配延迟稳定、抗封锁且具备真实 IEPL/IPLC 专线的节点方能发挥最大效能：
        </p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
          <div style="background:#fff; border:1px solid var(--border-color); border-radius:6px; padding:0.875rem;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">微风网络 Breezenet</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">起步¥8/月 · 200GB超大流量 · VLESS/专线支持</div>
            <a href="${getRelPath(filePath, 'review/breezenet/index.html')}" class="btn btn-outline btn-sm" style="display:block; text-align:center;">查看微风网络实测评测 →</a>
          </div>
          <div style="background:#fff; border:1px solid var(--border-color); border-radius:6px; padding:0.875rem;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">隐形人</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">纯IEPL专线 · 144GB无视晚高峰 · 4K与AI原生解锁</div>
            <a href="${getRelPath(filePath, 'review/invisible/index.html')}" class="btn btn-outline btn-sm" style="display:block; text-align:center;">查看隐形人深度评测 →</a>
          </div>
          <div style="background:#fff; border:1px solid var(--border-color); border-radius:6px; padding:0.875rem;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">无忧 (无忧链接)</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">IPLC专线 · ¥19/月百吉字节 · 券码立减</div>
            <a href="${getRelPath(filePath, 'review/wuyou/index.html')}" class="btn btn-outline btn-sm" style="display:block; text-align:center;">查看无忧专线评测 →</a>
          </div>
        </div>
      </div>
    `;

    const fullBody = `
      <article class="article-content">
        <header class="article-header">
          <div style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.75rem;">
            <span class="status-badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">${guide.category}</span>
            <span style="font-size:0.8rem; color:var(--text-muted);">更新日期：${guide.date} · 预计阅读：${guide.readTime}</span>
          </div>
          <h1 class="article-title">${guide.h1}</h1>
          <p class="article-lead" style="font-size:1.05rem; color:var(--text-muted); line-height:1.6; border-left:4px solid var(--primary); padding-left:1rem; margin-top:0.75rem;">
            ${guide.metaDesc}
          </p>
        </header>

        <div class="article-body">
          ${guide.body}
          ${relatedAirportsHtml}
        </div>

        <footer style="margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <a href="${getRelPath(filePath, 'guides/index.html')}" style="font-weight:600; color:var(--primary);">
            ← 返回全平台教程中心
          </a>
          <a href="${getRelPath(filePath, 'ranking/overall/index.html')}" class="btn btn-primary btn-sm">
            查看2026优质机场排行榜 🏆
          </a>
        </footer>
      </article>
    `;

    const html = layout({
      filePath,
      title: guide.title,
      description: guide.metaDesc,
      keywords: guide.keywords,
      h1: guide.h1,
      breadcrumbs,
      schema: howToSchema,
      bodyContent: fullBody,
      isArticle: true,
      sidebarLinks: true
    });

    writePage(filePath, html);
  });

  // 2. 生成全能教程中心落地页 guides/index.html
  const indexFilePath = 'guides/index.html';
  const categories = [...new Set(guidesData.map(g => g.category))];

  const indexBody = `
    <section class="hero" style="padding:2.5rem 0 2rem;">
      <div class="container">
        <div class="hero-pill">
          <span>📚</span>
          <span>全平台科学上网客户端新手配置与进阶实战手册 (共收录 30 篇教程)</span>
        </div>
        <h1 class="hero-title" style="margin-top:0.75rem;">
          翻墙客户端配置中心 · 30 篇全平台保姆级教程指南
        </h1>
        <p class="hero-subtitle">
          覆盖 <strong>Windows 电脑</strong>、<strong>Android 安卓手机</strong>、<strong>iOS 苹果设备</strong>、<strong>macOS 苹果电脑</strong>、<strong>软硬路由器网关</strong> 及 <strong>Apple TV / 游戏主机</strong> 等全场景网络接入与排错方案。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- 专题分类卡片网格 -->
        ${categories.map(cat => {
          const list = guidesData.filter(g => g.category === cat);
          return `
            <div style="margin-bottom:3rem;">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem; border-bottom:2px solid var(--border-color); padding-bottom:0.5rem;">
                <h2 style="margin:0; font-size:1.4rem; color:var(--text-main);">${cat} 平台配置教程</h2>
                <span style="font-size:0.85rem; background:var(--primary-light); color:var(--primary); padding:2px 8px; border-radius:12px; font-weight:700;">
                  ${list.length} 篇
                </span>
              </div>

              <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:1.25rem;">
                ${list.map(guide => `
                  <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between; transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow='none'">
                    <div>
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                        <span style="font-size:0.75rem; color:#0369a1; background:#e0f2fe; padding:2px 6px; border-radius:4px; font-weight:600;">
                          ${guide.category}
                        </span>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${guide.readTime}</span>
                      </div>
                      <h3 style="font-size:1.1rem; margin-bottom:0.5rem; line-height:1.4;">
                        <a href="${getRelPath(indexFilePath, `guides/${guide.slug}/index.html`)}" style="color:var(--text-main); font-weight:700;">
                          ${guide.h1}
                        </a>
                      </h3>
                      <p style="font-size:0.85rem; color:var(--text-body); line-height:1.5; margin-bottom:1rem;">
                        ${guide.metaDesc}
                      </p>
                    </div>
                    <div>
                      <a href="${getRelPath(indexFilePath, `guides/${guide.slug}/index.html`)}" class="btn btn-outline btn-sm" style="width:100%; text-align:center;">
                        阅读完整图文教程 →
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;

  const indexHtml = layout({
    filePath: indexFilePath,
    title: "VPN与翻墙机场基础指南 - 新手客户端配置与选型全解 - shidatizi.co",
    description: "全平台科学上网客户端新手配置中心。覆盖Windows电脑、安卓手机、苹果iPhone/iPad及Mac电脑主流开源代理客户端下载、选型与30篇图文保姆级教程。",
    keywords: "翻墙教程, 客户端配置, Clash教程, 小火箭教程, v2ray教程, 翻墙入门, 梯子软件, 路由器翻墙",
    h1: "VPN与翻墙机场基础入门指南与客户端选型中心",
    breadcrumbs: [{ name: "教程中心", path: "guides/index.html" }],
    bodyContent: indexBody,
    isArticle: false,
    sidebarLinks: false
  });

  writePage(indexFilePath, indexHtml);
}
