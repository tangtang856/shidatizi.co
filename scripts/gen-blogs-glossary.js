import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';
import { blogsBatch1 } from '../data/content/blogs-batch1.js';
import { blogsBatch2 } from '../data/content/blogs-batch2.js';
import { blogsBatch3 } from '../data/content/blogs-batch3.js';
import { blogsBatch4 } from '../data/content/blogs-batch4.js';
import { blogsBatch5 } from '../data/content/blogs-batch5.js';

export function generateBlogsAndGlossary() {
  // 汇总全站 100 篇高质量博客文章
  const blogs = [
    ...blogsBatch1,
    ...blogsBatch2,
    ...blogsBatch3,
    ...blogsBatch4,
    ...blogsBatch5
  ];

  console.log(`[Blog Generator] 正在生成全站 ${blogs.length} 篇深度技术博文...`);

  // 1. 生成 100 篇具体博客文章落地页
  blogs.forEach((blog, index) => {
    const filePath = `blog/${blog.slug}/index.html`;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.h1,
      "description": blog.metaDesc,
      "datePublished": blog.date,
      "dateModified": blog.date,
      "author": {
        "@type": "Organization",
        "name": "十代梯子技术评测组"
      },
      "publisher": {
        "@type": "Organization",
        "name": "十代梯子",
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_DOMAIN}/css/style.css`
        }
      },
      "mainEntityOfPage": `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`
    };

    const breadcrumbs = [
      { name: "深度博客", path: "blog/index.html" },
      { name: blog.h1, path: filePath }
    ];

    // 侧边栏推荐相关文章 (按同分类优选，或取就近文章)
    const relatedBlogs = blogs
      .filter(b => b.slug !== blog.slug && (b.category === blog.category || Math.random() > 0.5))
      .slice(0, 8);

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'blog/index.html')}">深度博客</a>
          <span class="breadcrumbs-separator">/</span>
          <span>${blog.h1}</span>
        </nav>

        <div class="content-layout">
          <article class="prose">
            <div style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.75rem;">
              <span class="status-badge" style="background:#f0fdf4; color:#166534; font-weight:700;">${blog.category || '深度技术'}</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">预计阅读：${blog.readTime || '8 分钟'}</span>
            </div>

            <h1>${blog.h1}</h1>

            <div class="article-meta">
              <span>📅 发布日期：${blog.date}</span>
              <span>✍️ 作者：十代梯子技术研究小组</span>
              <span>🔒 原创保护：转载请注明出处</span>
            </div>

            ${blog.body}

            <div style="background:#f8fafc; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; margin-top:2.5rem;">
              <h3 style="margin-top:0; font-size:1.1rem; color:var(--text-main);">🎯 延伸推荐与工具导航</h3>
              <ul style="padding-left:1.25rem; margin-bottom:0;">
                <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">查看 2026 年度翻墙梯子全网综合排行榜 🏆</a></li>
                <li><a href="${getRelPath(filePath, 'compare/index.html')}">使用在线参数对比工具横向比对多家候选品牌 ⚖️</a></li>
                <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">Windows 电脑客户端配置与排错教程 💻</a></li>
                <li><a href="${getRelPath(filePath, 'guides/index.html')}">全平台 30 篇保姆级配置手册中心 📚</a></li>
              </ul>
            </div>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">📌 核心专题推荐</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 便宜平价低预算机场</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端商业IEPL专线</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">🤖 ChatGPT/Claude专属节点</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/streaming/index.html')}">🎬 4K流媒体原生解锁</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">📚 相关专题推荐</div>
              <ul class="widget-list">
                ${relatedBlogs.map(b => `
                  <li><a href="${getRelPath(filePath, `blog/${b.slug}/index.html`)}">${b.h1}</a></li>
                `).join('')}
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">🏆 权威排行榜单</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🏆 2026综合总榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/value/index.html')}">💰 每GB单价性价比榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/stable/index.html')}">🛡️ 晚高峰稳定性榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/budget/index.html')}">🪙 平价低门槛榜</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    writePage(filePath, layout({
      filePath,
      title: blog.title,
      description: blog.metaDesc,
      keywords: blog.keywords,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: blog.h1,
      breadcrumbs,
      schema: articleSchema,
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    }));
  });

  // 2. 生成博客索引总览页 blog/index.html
  const blogIndexPath = 'blog/index.html';
  const blogCategories = [...new Set(blogs.map(b => b.category || '技术博文'))];

  const blogIndexContent = `
    <div class="container" style="padding-top:2.5rem; padding-bottom:3rem;">
      <nav class="breadcrumbs" aria-label="面包屑导航">
        <a href="${getRelPath(blogIndexPath, 'index.html')}">首页</a>
        <span class="breadcrumbs-separator">/</span>
        <span>深度博客</span>
      </nav>

      <div style="margin-bottom:2.5rem;">
        <div class="hero-pill" style="margin-bottom:0.75rem;">
          <span>📝</span>
          <span>十代梯子技术研究室 · 100 篇原创深度技术与选型全解</span>
        </div>
        <h1 style="font-size:2rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
          翻墙技术、协议剖析与机场防坑深度专栏
        </h1>
        <p style="color:var(--text-muted); font-size:1.05rem; line-height:1.6; max-width:850px;">
          汇聚 <strong>100 篇</strong> 原创高质量技术文章。涵盖代理协议底层（Shadowsocks/Trojan/VLESS/Hysteria 2）、跨境专线物理架构、机场价格猫腻揭秘、流媒体与海外 AI 大模型解锁、网络隐私安全及各类疑难杂症排查。
        </p>
      </div>

      <!-- 分类总览 -->
      ${blogCategories.map(cat => {
        const catBlogs = blogs.filter(b => (b.category || '技术博文') === cat);
        return `
          <div style="margin-bottom:3rem;">
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem; border-bottom:2px solid var(--border-color); padding-bottom:0.5rem;">
              <h2 style="margin:0; font-size:1.4rem; color:var(--text-main);">${cat} 专栏</h2>
              <span style="font-size:0.85rem; background:var(--primary-light); color:var(--primary); padding:2px 8px; border-radius:12px; font-weight:700;">
                ${catBlogs.length} 篇
              </span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:1.25rem;">
              ${catBlogs.map(b => `
                <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between; transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow='none'">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                      <span style="font-size:0.75rem; color:#15803d; background:#dcfce7; padding:2px 6px; border-radius:4px; font-weight:600;">
                        ${b.category}
                      </span>
                      <span style="font-size:0.75rem; color:var(--text-muted);">${b.date}</span>
                    </div>
                    <h3 style="font-size:1.1rem; margin-bottom:0.5rem; line-height:1.4;">
                      <a href="${getRelPath(blogIndexPath, `blog/${b.slug}/index.html`)}" style="color:var(--text-main); font-weight:700;">
                        ${b.h1}
                      </a>
                    </h3>
                    <p style="font-size:0.85rem; color:var(--text-body); line-height:1.5; margin-bottom:1rem;">
                      ${b.metaDesc}
                    </p>
                  </div>
                  <div>
                    <a href="${getRelPath(blogIndexPath, `blog/${b.slug}/index.html`)}" class="btn btn-outline btn-sm" style="width:100%; text-align:center;">
                      阅读全文 (${b.readTime || '8分钟'}) →
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  writePage(blogIndexPath, layout({
    filePath: blogIndexPath,
    title: "翻墙技术、协议剖析与机场防坑深度专栏 (100篇深度博文) - shidatizi.co",
    description: "十代梯子技术研究室原创专栏。收录100篇关于Shadowsocks/Trojan协议、IEPL专线内幕、低价机场跑路陷阱、ChatGPT解锁与科学上网安全的深度技术文章。",
    keywords: "翻墙博客, 机场知识, 协议分析, 专线技术, 科学上网教程, 梯子避坑指南, 机场选购经验",
    canonical: `${BASE_DOMAIN}/blog/index.html`,
    h1: "翻墙技术、协议剖析与机场防坑深度专栏",
    breadcrumbs: [{ name: "深度博客", path: blogIndexPath }],
    bodyContent: blogIndexContent,
    isArticle: false
  }));

  // 3. 术语百科配置
  const glossaries = [
    {
      slug: "iplc-iepl",
      title: "什么是IPLC与IEPL专线？ - 翻墙术语百科 - shidatizi.co",
      h1: "什么是IPLC与IEPL专线？",
      metaDesc: "全面解读IPLC（国际私有租用线路）与IEPL（国际以太网专线）的定义、物理工作原理、与公网中转的区别及优缺点分析。",
      keywords: "IPLC定义, IEPL专线原理, 专线名词解释, 翻墙百科, 点对点内网",
      body: `
        <p><strong>IPLC (International Private Leased Circuit，国际私有租用线路)</strong> 与 <strong>IEPL (International Ethernet Private Line，国际以太网专线)</strong>，是跨国电信运营商在物理层为企业客户提供的点对点封闭式通信链路。</p>
        <h2>一、核心技术特征</h2>
        <p>与公共互联网最大的区别在于：专线的数据传输<strong>完全不经过国家公网防火墙 (GFW) 所在的公共国际关口局</strong>。数据在国内机房直接进入运营商的封闭内网，通过铺设的海底光缆或陆地光缆直接穿透至境外机房。</p>
        <h2>二、优缺点评估</h2>
        <ul>
          <li><strong>优势：</strong>物理级隔离，晚高峰零丢包、延迟恒定、完全免疫特殊时期的网络波动；</li>
          <li><strong>劣势：</strong>带宽成本极其高昂，因此配备纯专线的机场套餐单价通常较高。</li>
        </ul>
      `
    },
    {
      slug: "node-multiplier",
      title: "什么是节点倍率？ - 翻墙术语百科 - shidatizi.co",
      h1: "什么是节点倍率？",
      metaDesc: "通俗解读机场节点倍率的含义与计算公式。教你识别0.1倍率到10倍率背后的扣费逻辑，避免流量被无故扣光。",
      keywords: "节点倍率解释, 机场倍率计算, 翻墙流量扣除, 真实流量折算, 机场术语",
      body: `
        <p><strong>节点倍率</strong> 是翻墙机场用来平衡不同线路服务器成本的计费调节系数。</p>
        <h2>一、计算公式</h2>
        <p><code>实际扣除流量 = 产生的数据流量 × 节点倍率</code></p>
        <p>例如：你购买了 100GB 套餐。如果你连接 1.0 倍率节点下载了 10GB 文件，后台扣除 10GB；如果连接的是 5.0 倍率高成本专线节点，下载 10GB 文件将扣除 50GB 流量！</p>
      `
    },
    {
      slug: "bgp-tunnel",
      title: "什么是BGP中转与隧道？ - 翻墙术语百科 - shidatizi.co",
      h1: "什么是BGP中转与隧道？",
      metaDesc: "解读边界网关协议（BGP）多线接入与国内加密隧道中转的工作原理。分析为什么BGP中转能大幅提升全国不同运营商的连接体验。",
      keywords: "BGP中转定义, 国内隧道原理, 多线接入, 跨网优化, 翻墙中转机房",
      body: `
        <p><strong>BGP (Border Gateway Protocol，边界网关协议)</strong> 是互联网核心路由器之间交换路由信息的动态路由协议。</p>
        <h2>一、在机场中的应用</h2>
        <p>所谓的 BGP 中转入口，是指机场在国内部署的服务器同时接入了中国电信、中国联通、中国移动等多家运营商的骨干光纤。电信用户走电信路由，移动用户走移动路由，从根源上消除了跨网访问的高延迟与丢包问题。</p>
      `
    },
    {
      slug: "rules-routing",
      title: "什么是规则分流与GEOIP？ - 翻墙术语百科 - shidatizi.co",
      h1: "什么是规则分流与GEOIP？",
      metaDesc: "详细解释现代代理客户端的规则分流、GEOIP数据库与域名分流机制。告别全局代理导致的国内网站访问变慢与定位错误。",
      keywords: "规则分流定义, GEOIP解释, 分流模式, 国内直连国外代理, 客户端规则",
      body: `
        <p><strong>规则分流</strong> 是指代理客户端（如 Clash、Shadowrocket、Sing-box）根据数据包的目标域名或目标 IP 地址，自动决定其流向的智能分流系统。</p>
        <h2>一、三种常见工作模式</h2>
        <ul>
          <li><strong>规则模式 (Rule)：</strong>国内流量直连，海外受限网站走代理节点；</li>
          <li><strong>全局模式 (Global)：</strong>电脑或手机所有网络连接强制全部走代理；</li>
          <li><strong>直连模式 (Direct)：</strong>所有流量不走代理，直接使用本地宽带访问。</li>
        </ul>
      `
    },
    {
      slug: "dns-leak-pollution",
      title: "什么是DNS污染与阻断？ - 翻墙术语百科 - shidatizi.co",
      h1: "什么是DNS污染与阻断？",
      metaDesc: "解析GFW防火墙实施域名阻断的核心手段：DNS投毒污染、明文UDP劫持与SNI阻断的底层网络原理与防范手段。",
      keywords: "DNS污染原理, DNS投毒, 假IP注入, SNI阻断, 加密DNS防污染",
      body: `
        <p><strong>DNS 污染 (DNS Cache Poisoning，又称 DNS 投毒)</strong> 是网络审查系统在公网国际关口局实施的主要技术手段之一。</p>
        <h2>一、工作原理</h2>
        <p>当用户的电脑向海外公共 DNS 服务器（如 8.8.8.8）发送未经加密的 UDP 53 端口查询请求时，防火墙的旁路监听设备会抢在真正的海外服务器之前，向用户伪造返回一个错误的虚假 IP 地址（通常指向不可达或空地址），导致用户浏览器无法建立正确连接。</p>
      `
    }
  ];

  // 生成百科索引页 `glossary/index.html`
  const glossaryIndexPath = 'glossary/index.html';
  const glossaryIndexContent = `
    <div class="container" style="padding-top:2rem;">
      <nav class="breadcrumbs" aria-label="面包屑导航">
        <a href="${getRelPath(glossaryIndexPath, 'index.html')}">首页</a>
        <span class="breadcrumbs-separator">/</span>
        <span>术语百科</span>
      </nav>

      <div style="margin-bottom:2rem;">
        <h1 style="font-size:1.875rem; font-weight:800; color:var(--text-main); margin-bottom:0.5rem;">
          翻墙与网络代理专业术语百科
        </h1>
        <p style="color:var(--text-muted); font-size:1rem; line-height:1.6;">
          深入浅出解析科学上网中的核心专有名词。打破信息差，看懂商家宣传术语背后的真实技术与物理链路。
        </p>
      </div>

      <div class="airport-grid" style="grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));">
        ${glossaries.map(g => `
          <div class="airport-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h3 style="font-size:1.2rem; margin-bottom:0.5rem;">
                <a href="${getRelPath(glossaryIndexPath, `glossary/${g.slug}/index.html`)}" style="color:var(--text-main);">
                  ${g.h1}
                </a>
              </h3>
              <p style="font-size:0.875rem; color:var(--text-body); line-height:1.6; margin-bottom:1rem;">
                ${g.metaDesc}
              </p>
            </div>
            <div>
              <a href="${getRelPath(glossaryIndexPath, `glossary/${g.slug}/index.html`)}" class="btn btn-outline btn-sm" style="width:100%; text-align:center;">
                查阅完整词条释义 →
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  writePage(glossaryIndexPath, layout({
    filePath: glossaryIndexPath,
    title: "翻墙与网络代理专业术语百科 - shidatizi.co",
    description: "全面解读IPLC/IEPL专线、节点倍率、BGP中转、规则分流、DNS污染等翻墙核心概念的专业术语词典。",
    keywords: "翻墙百科, 机场术语, 专线解释, 节点倍率, 翻墙原理, 代理名词",
    canonical: `${BASE_DOMAIN}/glossary/index.html`,
    h1: "翻墙与网络代理专业术语百科",
    breadcrumbs: [{ name: "术语百科", path: glossaryIndexPath }],
    bodyContent: glossaryIndexContent,
    isArticle: false
  }));

  // 生成 5 篇具体词条
  glossaries.forEach(glossary => {
    const filePath = `glossary/${glossary.slug}/index.html`;

    const breadcrumbs = [
      { name: "术语百科", path: "glossary/index.html" },
      { name: glossary.h1, path: filePath }
    ];

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'glossary/index.html')}">术语百科</a>
          <span class="breadcrumbs-separator">/</span>
          <span>${glossary.h1}</span>
        </nav>

        <div class="content-layout">
          <article class="prose">
            <h1>${glossary.h1}</h1>

            <div class="article-meta">
              <span>📚 知识分类：网络代理基础架构</span>
              <span>📅 核验更新：2026年3月</span>
              <span>✅ 校验：技术专家审校</span>
            </div>

            ${glossary.body}

            <h2>三、相关词条与推荐阅读</h2>
            <ul>
              <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">查看2026年翻墙机场全网综合排行榜</a></li>
              <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">查看高端IEPL/IPLC专线机场推荐专题</a></li>
              <li><a href="${getRelPath(filePath, 'compare/index.html')}">使用机场横向参数比对工具</a></li>
              <li><a href="${getRelPath(filePath, 'guides/index.html')}">返回客户端新手教程中心</a></li>
            </ul>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">📚 核心术语百科词条</div>
              <ul class="widget-list">
                ${glossaries.map(g => `
                  <li><a href="${getRelPath(filePath, `glossary/${g.slug}/index.html`)}">${g.h1}</a></li>
                `).join('')}
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">💡 选型避坑专题</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'blog/cheap-airport-traps/index.html')}">为什么低价机场总容易跑路？</a></li>
                <li><a href="${getRelPath(filePath, 'blog/protocol-comparison/index.html')}">Shadowsocks与Trojan协议深度对比</a></li>
                <li><a href="${getRelPath(filePath, 'blog/ai-airport-guide/index.html')}">ChatGPT与Claude专用节点选型</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    writePage(filePath, layout({
      filePath,
      title: glossary.title,
      description: glossary.metaDesc,
      keywords: glossary.keywords,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: glossary.h1,
      breadcrumbs,
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    }));
  });
}
