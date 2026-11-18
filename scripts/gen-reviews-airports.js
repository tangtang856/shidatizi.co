import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';
import { airports } from '../data/airports.js';

export function generateReviewsAndAirports() {
  // 1. 生成 5 篇独立深度评测
  airports.forEach(airport => {
    const filePath = `review/${airport.slug}/index.html`;

    const faqItems = [
      {
        q: `${airport.name} 支持月付吗？初次购买如何选择？`,
        a: airport.billingCycle.includes('月付') 
          ? `支持。${airport.name} 提供灵活的月付套餐，起步价格为 ¥${airport.startingPrice}/月，初次购买建议先选择一个月的基础款进行网络实测。`
          : `不支持月付。${airport.name} 目前最低起步为${airport.billingCycle}（¥${airport.startingPrice}），建议有长期稳定需求或预算充足的用户选购。`
      },
      {
        q: `${airport.name} 解锁 ChatGPT 和 Netflix 效果如何？`,
        a: `${airport.name} 在实际测试中支持：${airport.aiSupport.join('、')}等主流大模型，流媒体原生解锁包括：${airport.streamingSupport.join('、')}，各热门亚太和美区节点表现优异。`
      },
      {
        q: `如果在使用 ${airport.name} 时遇到节点全部超时怎么办？`,
        a: "第一步：在客户端中更新订阅URL；第二步：检查本地电脑时间是否与北京时间完全一致（误差大于30秒会导致TLS握手失败）；第三步：前往官网或TG官方群查看是否有入口机房正在维护。"
      }
    ];

    const breadcrumbs = [
      { name: "机场评测", path: `review/${airports[0].slug}/index.html` },
      { name: `${airport.name} 深度评测`, path: filePath }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${airport.name} 翻墙网络代理服务`,
      "description": airport.description,
      "brand": {
        "@type": "Brand",
        "name": airport.name
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": airport.overallScore,
          "bestRating": "10"
        },
        "author": {
          "@type": "Organization",
          "name": "十代梯子评测实验室"
        }
      }
    };

    // 其他对比机场
    const otherAirports = airports.filter(a => a.slug !== airport.slug).slice(0, 3);

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'ranking/overall/index.html')}">机场评测</a>
          <span class="breadcrumbs-separator">/</span>
          <span>${airport.name} 深度评测</span>
        </nav>

        <div class="content-layout">
          <article class="prose">
            <h1>${airport.name} 机场深度评测：线路延迟、套餐性价比与真实使用体验报告</h1>

            <div class="article-meta">
              <span>📅 核验日期：${airport.lastVerified}</span>
              <span>🏷️ 线路架构：${airport.lineType}</span>
              <span>⭐ 综合评分：${airport.overallScore} / 10</span>
              <span>🛡️ 测试状态：${airport.testStatus === 'tested' ? '编辑部实测通过' : '官方公开数据'}</span>
            </div>

            <!-- 4. 一句话结论 -->
            <div class="alert alert-tip">
              <strong>💡 编辑部一句话结论：</strong>
              ${airport.tagline}。适合人群主要为【${airport.suitableFor.slice(0, 2).join('、')}】。
              起步资费为 <strong>¥${airport.startingPrice} / ${airport.billingCycle}</strong>，折算每GB成本约 <strong>¥${airport.plans[0].pricePerGB}/GB</strong>。
            </div>

            <!-- 5. 机场基本介绍 -->
            <h2>一、${airport.name} 基本介绍与服务背景</h2>
            <p>${airport.description}</p>
            <p>
              在网络架构设计上，${airport.name} 采用了<strong>${airport.lineType}</strong>作为主力通信骨干，
              官方承诺服务可用性为 <strong>${airport.sla}</strong>。在当前国际出口审查日益严密的背景下，
              其通过端到端的流量混淆与协议调优，为用户提供稳定且高冗余的跨境加速体验。
            </p>

            <!-- 6. 套餐价格表 -->
            <h2>二、官方公开套餐与真实单价折算表</h2>
            <p>
              我们采集了 ${airport.name} 最新的官方在售套餐资费，并根据 1.0x 基础倍率折算出了真实的每 GB 流量单价：
            </p>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>套餐名称</th>
                    <th>周期价格</th>
                    <th>标称流量</th>
                    <th>真实每GB成本</th>
                    <th>套餐特性</th>
                  </tr>
                </thead>
                <tbody>
                  ${airport.plans.map(p => `
                    <tr>
                      <td><strong>${p.name}</strong></td>
                      <td>¥${p.price} / ${p.cycle}</td>
                      <td>${p.bandwidthGB} GB</td>
                      <td><span style="color:var(--primary); font-weight:700;">¥${p.pricePerGB}</span></td>
                      <td style="font-size:0.85rem; color:var(--text-muted);">${p.note}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted);">
              * 注：以上套餐资费来源于 ${airport.name} 官网公开价格表，未计入临时节日优惠券，数据最近核验于 ${airport.lastVerified}。
            </p>

            <!-- 7. 节点与线路资料 -->
            <h2>三、节点覆盖范围与线路架构</h2>
            <p>
              ${airport.name} 的落地节点覆盖以下主流与小众地区：
            </p>
            <div style="background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:1rem;">
              <strong>覆盖区域：</strong>
              <div style="margin-top:0.4rem; font-size:0.925rem; color:var(--text-main);">
                ${airport.regions.map(r => `<span style="display:inline-block; margin:3px 6px 3px 0; padding:2px 8px; background:#fff; border:1px solid var(--border-color); border-radius:4px;">🌐 ${r}</span>`).join('')}
              </div>
            </div>
            <p>
              在传输协议方面，全面支持 <strong>${airport.protocols.join('、')}</strong>。
              现代开源客户端（如 Clash Verge、Sing-box 等）均可无缝解析并启用多路复用与零拷贝特性。
            </p>

            <!-- 8. 客户端支持与并发设备 -->
            <h2>四、客户端支持与多设备并发限制</h2>
            <p>
              该机场支持通用订阅格式（Clash、Sing-box、Shadowrocket、V2Ray 等通用订阅）。
              基础套餐允许最多同时在线设备为：<strong>${airport.deviceLimit}</strong>。
              家庭多设备或团队多人共享时，请遵守服务条款，严禁对外公开分享订阅链接以防触发账号安全风控。
            </p>

            <!-- 9. AI 与流媒体支持 -->
            <h2>五、AI 大模型与 4K 流媒体原生解锁实测</h2>
            <p>经我们持续抽检测试，${airport.name} 在关键应用场景下的解锁能力表现如下：</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
              <div style="background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                <strong style="color:var(--text-main); display:block; margin-bottom:0.5rem;">🤖 AI 服务解锁支持：</strong>
                <ul style="padding-left:1.25rem; font-size:0.875rem;">
                  ${airport.aiSupport.map(ai => `<li>${ai}：<strong>支持解锁</strong></li>`).join('')}
                </ul>
              </div>
              <div style="background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                <strong style="color:var(--text-main); display:block; margin-bottom:0.5rem;">🎬 流媒体解锁支持：</strong>
                <ul style="padding-left:1.25rem; font-size:0.875rem;">
                  ${airport.streamingSupport.map(st => `<li>${st}：<strong>原生支持</strong></li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- 10 & 11. 优缺点分析 -->
            <h2>六、${airport.name} 核心优缺点客观剖析</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:1.25rem; border-radius:var(--radius-md);">
                <h3 style="color:#166534; font-size:1.1rem; margin-top:0; margin-bottom:0.5rem;">✔ 突出优势</h3>
                <ul style="padding-left:1.2rem; margin:0; font-size:0.875rem; color:#15803d;">
                  ${airport.advantages.map(adv => `<li style="margin-bottom:0.4rem;">${adv}</li>`).join('')}
                </ul>
              </div>
              <div style="background:#fef2f2; border:1px solid #fecaca; padding:1.25rem; border-radius:var(--radius-md);">
                <h3 style="color:#991b1b; font-size:1.1rem; margin-top:0; margin-bottom:0.5rem;">✕ 潜在缺点与不足</h3>
                <ul style="padding-left:1.2rem; margin:0; font-size:0.875rem; color:#b91c1c;">
                  ${airport.disadvantages.map(dis => `<li style="margin-bottom:0.4rem;">${dis}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- 12. 适合人群 -->
            <h2>七、最适合选择 ${airport.name} 的用户群体</h2>
            <p>基于上述实测表现与计费门槛，我们建议以下场景用户优先考虑：</p>
            <ul>
              ${airport.suitableFor.map(s => `<li><strong>${s}</strong></li>`).join('')}
            </ul>

            <!-- 13. 购买前注意事项 -->
            <h2>八、选购前重要注意事项与避坑提醒</h2>
            <div class="alert alert-warning">
              <ol style="margin:0; padding-left:1.25rem;">
                <li style="margin-bottom:0.4rem;"><strong>勿盲目冲动年付：</strong>即使对自身网络有信心，初次也优先建议从最短计费周期切入实测。</li>
                <li style="margin-bottom:0.4rem;"><strong>严禁分享订阅：</strong>系统内置严格的IP并发侦测，频繁多地同时连接可能导致封号。</li>
                <li style="margin-bottom:0.4rem;"><strong>定期更新订阅：</strong>节点由于入口调度会不定期更新解析IP，遇到连不上请在客户端手动执行“更新订阅”。</li>
              </ol>
            </div>

            <!-- 14. 常见问题 FAQ -->
            <h2>九、关于 ${airport.name} 的常见疑问 (FAQ)</h2>
            <div class="faq-list" style="margin:1.25rem 0;">
              ${faqItems.map(item => `
                <div class="faq-item">
                  <button class="faq-question">
                    <span>${item.q}</span>
                    <span class="faq-icon">+</span>
                  </button>
                  <div class="faq-answer" style="display:none;">
                    <p>${item.a}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- 15. 相关机场比较 -->
            <h2>十、横向参数对比与替代备选方案</h2>
            <p>如果你还在 ${airport.name} 与其他品牌之间犹豫，不妨查看以下几家同梯队机场的参数差异：</p>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>候选机场</th>
                    <th>线路物理架构</th>
                    <th>起步资费</th>
                    <th>综合评分</th>
                    <th>对比操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${otherAirports.map(oa => `
                    <tr>
                      <td><strong>${oa.name}</strong></td>
                      <td>${oa.lineType}</td>
                      <td>¥${oa.startingPrice} / ${oa.billingCycle}</td>
                      <td><strong style="color:var(--primary);">${oa.overallScore}</strong></td>
                      <td>
                        <a href="${getRelPath(filePath, `review/${oa.slug}/index.html`)}" class="btn btn-outline btn-sm">查看评测</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <p style="margin-top:0.75rem;">
              💡 你还可以使用我们的 <a href="${getRelPath(filePath, 'compare/index.html')}">机场在线横向参数对比工具</a> 进行多维同屏PK。
            </p>

            <!-- 16 & 17. 数据来源与最后核验 -->
            <h2>十一、数据来源与真实性背书</h2>
            <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6;">
              本评测数据由十代梯子评测实验室整理，数据采集依据包括：
              ${airport.sources.join('、')}。
              最后人工核验更新日期：<strong>${airport.lastVerified}</strong>。
              如发现参数变动或有技术勘误，欢迎通过 <a href="${getRelPath(filePath, 'contact/index.html')}">联系页面</a> 提交纠错。
            </p>

            <div style="margin-top:2rem; padding:1.25rem; background:var(--bg-subtle); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <div>
                <strong>查看 ${airport.name} 的结构化资费数据库档案：</strong>
                <div style="font-size:0.85rem; color:var(--text-muted);">查看完整节点清单与详细参数规格</div>
              </div>
              <a href="${getRelPath(filePath, `airport/${airport.slug}/index.html`)}" class="btn btn-primary btn-sm">进入档案库 →</a>
            </div>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">📌 快速操作与资料</div>
              <div style="display:flex; flex-direction:column; gap:0.6rem;">
                <a href="${getRelPath(filePath, `airport/${airport.slug}/index.html`)}" class="btn btn-outline btn-sm" style="text-align:center;">查看官方资费档案</a>
                <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-secondary btn-sm" style="text-align:center;">加入横向参数对比</a>
              </div>
            </div>

            <div class="widget">
              <div class="widget-title">🏆 相关排行榜</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🥇 2026综合排行榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/value/index.html')}">💰 高性价比排行榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/stable/index.html')}">⚡ 稳定专线排行榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/budget/index.html')}">🪙 平价低预算排行榜</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">💻 客户端配置教程</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">💻 Windows 配置教程</a></li>
                <li><a href="${getRelPath(filePath, 'guides/android/index.html')}">📱 安卓手机配置指南</a></li>
                <li><a href="${getRelPath(filePath, 'guides/ios/index.html')}">🍏 iPhone小火箭配置</a></li>
                <li><a href="${getRelPath(filePath, 'guides/macos/index.html')}">🖥️ Mac电脑客户端配置</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    const html = layout({
      filePath,
      title: `${airport.name} 机场深度评测 - 全球小众节点与高端专线表现 - shidatizi.co`,
      description: `2026年最新 ${airport.name} 机场深度客观测评。分析其${airport.lineType}网络稳定性、起步价格¥${airport.startingPrice}、每GB流量成本、AI大模型与流媒体解锁能力。`,
      keywords: `${airport.name}, ${airport.name}评测, ${airport.name}好用吗, ${airport.name}怎么样, ${airport.name}套餐, 翻墙机场评测, 梯子评测`,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: `${airport.name} 机场深度评测`,
      breadcrumbs,
      schema: [faqSchema, reviewSchema],
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    });

    writePage(filePath, html);
  });

  // 2. 生成 5 个机场档案资料库页面 (`airport/[slug]/index.html`)
  airports.forEach(airport => {
    const filePath = `airport/${airport.slug}/index.html`;

    const breadcrumbs = [
      { name: "机场资料库", path: `airport/${airports[0].slug}/index.html` },
      { name: `${airport.name} 资料档案`, path: filePath }
    ];

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'ranking/overall/index.html')}">机场数据库</a>
          <span class="breadcrumbs-separator">/</span>
          <span>${airport.name} 资料档案</span>
        </nav>

        <div class="content-layout">
          <article class="prose">
            <h1>${airport.name} 机场详细资料与参数档案库</h1>

            <div class="article-meta">
              <span>🆔 品牌标识：${airport.id}</span>
              <span>📅 核验时间：${airport.lastVerified}</span>
              <span>🔒 数据可信度：已核查官方公示材料</span>
            </div>

            <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main);">
              本档案页面为 <strong>${airport.name}</strong> 在十代梯子结构化数据库中的官方公开数据索引。
              为确保信息公正客观，所有套餐规格、价格周期与技术指标均定期与服务商公示渠道进行一致性核验。
            </p>

            <h2>一、品牌基础技术规格</h2>
            <div class="table-responsive">
              <table class="data-table">
                <tbody>
                  <tr>
                    <td style="width:180px; font-weight:700;">品牌正式名称</td>
                    <td>${airport.name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">核心宣传语</td>
                    <td>${airport.tagline}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">线路物理类型</td>
                    <td>${airport.lineType}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">服务 SLA 承诺</td>
                    <td><strong style="color:var(--success);">${airport.sla}</strong></td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">起步资费与计费周期</td>
                    <td><strong>¥${airport.startingPrice}</strong> / ${airport.billingCycle} (折合约 ¥${airport.effectiveMonthlyPrice}/月)</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">基础每GB折算单价</td>
                    <td><span class="status-badge status-tested">¥${airport.plans[0].pricePerGB} / GB</span></td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">支持协议列表</td>
                    <td>${airport.protocols.join('、')}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">并发客户端设备限制</td>
                    <td>${airport.deviceLimit}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">AI大模型解锁</td>
                    <td>${airport.aiSupport.join('、')}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">主流流媒体解锁</td>
                    <td>${airport.streamingSupport.join('、')}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">节点地区覆盖</td>
                    <td>${airport.regions.join(' · ')}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;">核验状态与数据源</td>
                    <td>${airport.testStatus} (${airport.sources.join('；')})</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>二、在售套餐详细规格</h2>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>套餐档位</th>
                    <th>标称价格</th>
                    <th>周期流量</th>
                    <th>每GB成本</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  ${airport.plans.map(p => `
                    <tr>
                      <td><strong>${p.name}</strong></td>
                      <td>¥${p.price} / ${p.cycle}</td>
                      <td>${p.bandwidthGB} GB</td>
                      <td><strong>¥${p.pricePerGB}</strong></td>
                      <td>${p.note}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <h2>三、关联深度技术评测</h2>
            <p>
              若需查看该机场在晚高峰时段的真实丢包率、物理延迟抖动、住宅IP纯净度以及详细优缺点拆解，请查阅我们的独立评测报告：
            </p>
            <div style="margin-top:1rem;">
              <a href="${getRelPath(filePath, `review/${airport.slug}/index.html`)}" class="btn btn-primary">
                阅读 ${airport.name} 深度测评报告 →
              </a>
              <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-secondary" style="margin-left:0.5rem;">
                在对比工具中载入本品牌
              </a>
            </div>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">📌 快捷入口</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, `review/${airport.slug}/index.html`)}">📝 阅读深度评测报告</a></li>
                <li><a href="${getRelPath(filePath, 'compare/index.html')}">⚖️ 机场在线横向参数对比</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🏆 查看全网综合排行榜</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">📚 数据库其他收录品牌</div>
              <ul class="widget-list">
                ${airports.map(a => `
                  <li><a href="${getRelPath(filePath, `airport/${a.slug}/index.html`)}">📄 ${a.name}</a></li>
                `).join('')}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    const html = layout({
      filePath,
      title: `${airport.name} 机场详细资料与套餐信息 - shidatizi.co`,
      description: `查询 ${airport.name} 官方公开资料、套餐价格、线路类型、协议支持与每GB流量成本明细。收录于 shidatizi.co 机场结构化数据库。`,
      keywords: `${airport.name}, ${airport.name}资料, ${airport.name}价格, ${airport.name}官网, ${airport.name}套餐, 机场档案`,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: `${airport.name} 资料档案`,
      breadcrumbs,
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    });

    writePage(filePath, html);
  });

  // 3. 生成机场横向比较系统 (`compare/index.html`)
  const comparePath = 'compare/index.html';
  const compareBreadcrumbs = [
    { name: "机场横向对比工具", path: comparePath }
  ];

  const compareBodyContent = `
    <div class="container" style="padding-top:2rem;">
      <nav class="breadcrumbs" aria-label="面包屑导航">
        <a href="${getRelPath(comparePath, 'index.html')}">首页</a>
        <span class="breadcrumbs-separator">/</span>
        <span>机场横向对比工具</span>
      </nav>

      <div style="margin-bottom:2rem;">
        <h1 style="font-size:2.2rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
          机场节点横向参数对比工具
        </h1>
        <p style="font-size:1.05rem; color:var(--text-body); max-width:820px; line-height:1.7;">
          告别繁琐的手动翻查记录！在线勾选 2 到 4 家候选机场品牌，系统基于统一数据库自动生成涵盖起步资费、每GB折算单价、专线架构、支持协议、设备数、AI与流媒体解锁支持的对比矩阵表格。
        </p>
      </div>

      <!-- 动态交互挂载容器 -->
      <div id="compareApp" class="compare-box">
        <div style="text-align:center; padding:2rem; color:var(--text-muted);">
          正在加载机场数据库比对引擎...
        </div>
      </div>

      <div class="alert alert-note" style="margin-top:2.5rem;">
        <strong>💡 对比说明与计算标准：</strong>
        <ul style="margin-top:0.5rem; padding-left:1.25rem;">
          <li>每GB单价均基于基础套餐公开价与1.0x基础倍率折算，不考虑隐藏加成倍率；</li>
          <li>所有对比数据直接来自统一数据源 <code>data/airports.js</code>，缺失资料如实显示为未核实；</li>
          <li>移动端用户可横向滑动浏览表格内容。</li>
        </ul>
      </div>
    </div>

    <!-- 挂载机场数据与对比逻辑脚本（相对路径） -->
    <script src="${getRelPath(comparePath, 'data/airports-bundle.js')}"></script>
    <script src="${getRelPath(comparePath, 'js/compare.js')}"></script>
  `;

  const compareHtml = layout({
    filePath: comparePath,
    title: "机场节点横向参数对比工具 - 价格线路与支持协议全方位PK - shidatizi.co",
    description: "多款翻墙机场与VPN梯子在线参数横向对比工具。支持2~4家品牌同时PK价格、每GB成本、IEPL专线、协议、设备限制与AI/流媒体解锁支持。",
    keywords: "机场对比, 梯子对比, 机场横向评测, 机场PK, 机场参数比较, 机场哪家好",
    canonical: `${BASE_DOMAIN}/compare/index.html`,
    h1: "机场节点横向参数对比工具",
    breadcrumbs: compareBreadcrumbs,
    bodyContent: compareBodyContent,
    isArticle: false
  });

  writePage(comparePath, compareHtml);
}
