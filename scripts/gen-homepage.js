import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';
import { airports } from '../data/airports.js';

export function generateHomepage() {
  const filePath = 'index.html';

  const faqItems = [
    {
      q: "2026年挑选优质翻墙机场节点，最核心的考量指标是什么？",
      a: "挑选翻墙机场节点或VPN梯子时，最核心的指标不是商家宣传的纸面峰值带宽，而是：1. 线路类型（是否为IEPL/IPLC内网专线或优质多线BGP中转，物理上绕过GFW敏感期波动）；2. SLA可用性与晚高峰丢包率；3. 节点倍率透明度（拒绝10x暗扣流量套路）；4. 套餐支持周期（优先选择支持月付或季付的服务商，规避跑路风险）。"
    },
    {
      q: "传统VPN与现代机场代理协议（Shadowsocks、Trojan、Hysteria2）有什么区别？",
      a: "传统商业VPN（如OpenVPN、WireGuard）主要设计初衷是企业网络加密与数据隧道，其协议流量特征明显，在国内极易受到防火墙主动探测与精准阻断；而现代翻墙机场普遍采用Shadowsocks、Trojan、Vless或Hysteria2协议，具有高度伪装性（如伪装成正常HTTPS网站流量）或基于UDP魔改抗丢包能力，在复杂网络环境下连接成功率与速度远超传统VPN。"
    },
    {
      q: "为什么不建议购买超低价（如年付9.9元）的便宜机场？",
      a: "超低价年付机场绝大多数采用低劣的公网直连NAT小鸡，没有任何内网专线冗余。这类服务商通常靠低价冲量，一旦用户规模增加导致带宽拥堵、或遇敏感期大面积IP被封，其运维成本便难以为继，极易突然跑路失联。建议选择起步价格在10~30元/月、支持月付的平价或专线服务。"
    },
    {
      q: "如何折算机场套餐的真实每GB单价？",
      a: "真实每GB单价 = 实际支付金额 ÷ (标称套餐流量 ÷ 常用节点平均倍率)。例如某套餐月付15元标称100GB，若节点均为1.0倍率，则每GB单价为0.15元；若优质专线节点设定为3.0倍率，则实际可用流量仅为33.3GB，真实单价升至0.45元/GB。本站排行榜已统一将倍率折算计入。"
    },
    {
      q: "使用ChatGPT、Claude等海外AI大模型对机场节点有什么特殊要求？",
      a: "OpenAI与Anthropic实施了极度严格的风控策略。使用AI大模型时，要求机场节点具备纯净的住宅IP或原生机房IP，不能有频繁跳验证码、滥用拉黑记录，且DNS解析不能发生泄露。推荐使用具备专属AI解锁分流的专线机场。"
    },
    {
      q: "新手第一次使用翻墙机场，需要准备什么客户端软件？",
      a: "根据你的操作系统选择经过开源审计的成熟客户端：Windows电脑推荐 Clash Verge Rev 或 v2rayN；安卓手机推荐 Clash Meta for Android (CMFA) 或 v2rayNG；苹果iPhone/iPad推荐在非国区App Store下载 Shadowrocket（小火箭）或 Stash；Mac苹果电脑推荐使用 Clash Verge Rev。只需将机场提供的订阅链接复制到客户端即可一键导入所有节点。"
    }
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

  const bodyContent = `
    <!-- Section 2: Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-pill">
          <span>⚡</span>
          <span>Bing SEO 权威技术指南 · 2026 最新网络评测标准</span>
        </div>
        <h1 class="hero-title">
          2026优质机场推荐与VPN梯子节点评测指南<br>
          <span style="color:var(--primary); font-size:0.9em;">性价比与稳定翻墙节点排行</span>
        </h1>
        <p class="hero-subtitle">
          面对复杂的网络环境与五花八门的翻墙梯子服务，如何挑选速度飞快、晚高峰不卡顿、抗封锁且绝不跑路的靠谱服务？
          <strong>十代梯子 (shidatizi.co)</strong> 坚持技术中立与真实抽样测算，提供客观的<strong>机场推荐</strong>、<strong>VPN节点</strong>评测、每GB单价折算与权威<strong>性价比机场排行榜</strong>。
        </p>

        <div class="hero-tags">
          <a href="${getRelPath(filePath, 'recommend/budget/index.html')}" class="hero-tag">🪙 平价低预算机场</a>
          <a href="${getRelPath(filePath, 'recommend/premium/index.html')}" class="hero-tag">💎 高端IEPL专线</a>
          <a href="${getRelPath(filePath, 'recommend/stable/index.html')}" class="hero-tag">🛡️ 稳定抗封锁节点</a>
          <a href="${getRelPath(filePath, 'recommend/ai/index.html')}" class="hero-tag">🤖 ChatGPT/Claude专用</a>
          <a href="${getRelPath(filePath, 'ranking/overall/index.html')}" class="hero-tag">🏆 综合年度排行榜</a>
          <a href="${getRelPath(filePath, 'compare/index.html')}" class="hero-tag">⚖️ 机场参数在线PK</a>
          <a href="${getRelPath(filePath, 'guides/index.html')}" class="hero-tag">📖 新手客户端配置</a>
        </div>

        <div class="hero-actions">
          <a href="#featured" class="btn btn-primary">查看精选机场推荐 ↓</a>
          <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-secondary">进入横向对比工具 →</a>
        </div>
      </div>
    </section>

    <!-- Section 3: 快速答案 / 核心避坑指引 -->
    <section class="section" style="padding-bottom:1.5rem;">
      <div class="container">
        <div class="quick-answer-card">
          <div class="quick-answer-header">
            <span>💡</span>
            <span>搜索快速答案：3分钟看懂翻墙机场与梯子节点选择框架</span>
          </div>
          <p style="font-size:0.925rem; color:var(--text-body); line-height:1.6;">
            如果你不想花费数小时研究复杂网络协议与服务器路由，请直接参考以下经过实测验证的决策框架：
          </p>
          <div class="quick-answer-grid">
            <div class="quick-answer-item">
              <strong>1. 新手入门最佳实践</strong>
              <p>首选支持“月付”且单价在15~30元左右的中转机场，提供一键导入订阅，试错成本低，避免直接买年付被套牢。</p>
            </div>
            <div class="quick-answer-item">
              <strong>2. 晚高峰卡顿终极解法</strong>
              <p>普通公网中转晚高峰易受骨干网拥塞影响。若需4K超清秒开或游戏联机，认准纯<strong>IEPL/IPLC商业内网专线</strong>。</p>
            </div>
            <div class="quick-answer-item">
              <strong>3. AI大模型解锁标准</strong>
              <p>ChatGPT与Claude严控机房IP。挑选具备“原生住宅IP解锁”与专属分流规则的节点，防止频繁被弹人机验证。</p>
            </div>
            <div class="quick-answer-item">
              <strong>4. 警惕假低价陷阱</strong>
              <p>警惕“几块钱一年几千G”的劣质机场，99%会在大促收割后迅速跑路；重点关注“真实每GB单价”而非虚标带宽。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: 精选推荐卡片 -->
    <section id="featured" class="section section-alt">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>⭐</span>
            <span>2026 精选优质机场推荐</span>
          </div>
          <div class="section-desc">
            根据线路稳定性、晚高峰表现、节点倍率透明度及客服响应综合筛选，所有品牌数据真实核验。
          </div>
        </div>

        <div class="airport-grid">
          ${airports.map(airport => `
            <div class="airport-card">
              <div class="card-top">
                <div class="card-title-group">
                  <h3>${airport.name}</h3>
                  <div class="card-tagline">${airport.tagline}</div>
                </div>
                <span class="status-badge ${airport.testStatus === 'tested' ? 'status-tested' : 'status-official'}">
                  ${airport.testStatus === 'tested' ? '✓ 实测通过' : '官方数据'}
                </span>
              </div>

              <div class="card-price-bar">
                <span class="card-price-num">¥${airport.startingPrice}</span>
                <span class="card-price-cycle">/ ${airport.billingCycle}</span>
                <span class="card-price-calc">折合约 ¥${airport.effectiveMonthlyPrice}/月</span>
              </div>

              <div class="card-specs">
                <div class="spec-item">
                  <span class="spec-label">线路类型</span>
                  <span class="spec-val">${airport.lineType}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">服务 SLA</span>
                  <span class="spec-val" style="color:var(--success);">${airport.sla}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">设备限制</span>
                  <span class="spec-val">${airport.deviceLimit}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">每GB成本</span>
                  <span class="spec-val">约 ¥${airport.plans[0].pricePerGB}/GB</span>
                </div>
              </div>

              <div class="card-pros-cons">
                <div class="pro-item">
                  <span>✔</span>
                  <div>${airport.advantages[0]}</div>
                </div>
                <div class="pro-item">
                  <span>✔</span>
                  <div>${airport.advantages[1]}</div>
                </div>
                <div class="con-item">
                  <span>✕</span>
                  <div>${airport.disadvantages[0]}</div>
                </div>
              </div>

              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem;">
                <strong>适合人群：</strong>${airport.suitableFor.slice(0, 2).join('、')}
              </div>

              <div class="card-footer">
                <a href="${getRelPath(filePath, `review/${airport.slug}/index.html`)}" class="btn btn-primary btn-sm" style="flex:1;">深度评测报告</a>
                <a href="${getRelPath(filePath, `airport/${airport.slug}/index.html`)}" class="btn btn-secondary btn-sm">档案资料</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 5: 综合排行榜 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>🏆</span>
            <span>2026 年度翻墙机场综合排行榜</span>
          </div>
          <div class="section-desc">
            基于线路架构、测算单价、晚高峰SLA与协议适配多维度核算，按综合权重排序。
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 70px; text-align:center;">排名</th>
                <th>品牌与线路</th>
                <th>起步资费</th>
                <th>基础流量</th>
                <th>折算每GB</th>
                <th>SLA可用性</th>
                <th>适合群体</th>
                <th style="text-align:center;">操作</th>
              </tr>
            </thead>
            <tbody>
              ${airports.map((a, idx) => `
                <tr>
                  <td style="text-align:center;">
                    <span class="rank-badge ${idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : 'rank-other'}">
                      ${idx + 1}
                    </span>
                  </td>
                  <td>
                    <div style="font-weight:700; color:var(--text-main);">${a.name}</div>
                    <small style="color:var(--text-muted);">${a.lineType}</small>
                  </td>
                  <td>
                    <strong>¥${a.startingPrice}</strong> / ${a.billingCycle}
                  </td>
                  <td>${a.plans[0].bandwidthGB} GB</td>
                  <td>
                    <span style="font-weight:600; color:var(--primary);">¥${a.plans[0].pricePerGB}</span>
                  </td>
                  <td>
                    <span style="color:var(--success); font-weight:600;">${a.sla}</span>
                  </td>
                  <td style="font-size:0.8rem; max-width:220px;">
                    ${a.suitableFor[0]}
                  </td>
                  <td style="text-align:center;">
                    <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" class="btn btn-outline btn-sm">评测详情</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="text-align:right; margin-top:0.75rem;">
          <a href="${getRelPath(filePath, 'ranking/overall/index.html')}" style="font-weight:600; font-size:0.925rem;">
            查看完整综合排行榜与评分细则 →
          </a>
        </div>
      </div>
    </section>

    <!-- Section 6: 按需求分类专题 -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>🎯</span>
            <span>按不同使用场景与需求精准挑选</span>
          </div>
          <div class="section-desc">
            每个人对网络梯子的核心诉求各不相同。根据你的主要用途选择对应专题落地页：
          </div>
        </div>

        <div class="category-grid">
          <div class="category-card">
            <div class="category-icon">🪙</div>
            <h3>平价低预算专题</h3>
            <p>10元以下超高性价比套餐盘点，适合预算敏感的学生党与轻度网页浏览用户。</p>
            <a href="${getRelPath(filePath, 'recommend/budget/index.html')}" class="category-link">查看低预算推荐 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">💎</div>
            <h3>高端IEPL专线专题</h3>
            <p>金融级商业内网专线，不过GFW公网防火墙，晚高峰4K秒开不卡顿，适合海外外贸与专业开发。</p>
            <a href="${getRelPath(filePath, 'recommend/premium/index.html')}" class="category-link">查看高端专线推荐 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">🔰</div>
            <h3>新手小白入门专题</h3>
            <p>提供详尽图文教程，一键客户端导入，免去复杂节点调配困扰，零门槛轻松上手。</p>
            <a href="${getRelPath(filePath, 'recommend/beginner/index.html')}" class="category-link">查看新手推荐 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">🛡️</div>
            <h3>稳定优先抗封锁专题</h3>
            <p>多地BGP入口智能容灾与高防隧道，在重大网络敏感时期依然保持99.5%以上高可用连接。</p>
            <a href="${getRelPath(filePath, 'recommend/stable/index.html')}" class="category-link">查看稳定节点推荐 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">🤖</div>
            <h3>ChatGPT与AI大模型专题</h3>
            <p>纯净住宅原生IP，有效规避OpenAI、Claude与Midjourney人机盾，杜绝降智与封号风险。</p>
            <a href="${getRelPath(filePath, 'recommend/ai/index.html')}" class="category-link">查看AI专用节点 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">🎬</div>
            <h3>4K超清流媒体专题</h3>
            <p>完美解锁 Netflix、Disney+、YouTube Premium、HBO Max 与各大外服流媒体音视频。</p>
            <a href="${getRelPath(filePath, 'recommend/streaming/index.html')}" class="category-link">查看流媒体解锁推荐 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 7: 机场横向比较系统入口 -->
    <section class="section">
      <div class="container">
        <div class="compare-box" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1.5rem; background:linear-gradient(135deg, #eff6ff, #f8fafc);">
          <div style="max-width:620px;">
            <div style="display:inline-block; padding:0.2rem 0.6rem; background:var(--primary-light); color:var(--primary); font-size:0.8rem; font-weight:700; border-radius:4px; margin-bottom:0.6rem;">
              交互式对比神器
            </div>
            <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
              还在纠结哪家机场更好？使用在线参数对比工具
            </h2>
            <p style="font-size:0.95rem; color:var(--text-body); line-height:1.6;">
              自由选择 2 ~ 4 家机场品牌，系统自动对比价格、流量、每GB单价、专线类型、节点区域、协议以及AI/流媒体解锁支持，一目了然看清差异。
            </p>
          </div>
          <div>
            <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-primary" style="padding:0.85rem 1.75rem; font-size:1.05rem;">
              立即开始横向对比 ⚖️
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 8: 最新独立评测 -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>📝</span>
            <span>最新独立深度评测</span>
          </div>
          <div class="section-desc">
            拒绝千篇一律的商业赞助吹捧，真实剖析每个品牌的实际优劣势与适配人群：
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:1.25rem;">
          ${airports.map(a => `
            <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.35rem;">
                  核验日期：${a.lastVerified} · ${a.lineType}
                </div>
                <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:0.5rem;">
                  <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" style="color:var(--text-main);">
                    ${a.name} 深度评测与真实网络分析
                  </a>
                </h3>
                <p style="font-size:0.85rem; color:var(--text-body); line-height:1.5; margin-bottom:1rem;">
                  ${a.description.substring(0, 85)}...
                </p>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed var(--border-color); padding-top:0.75rem;">
                <span style="font-weight:700; color:var(--primary); font-size:0.95rem;">¥${a.startingPrice} 起</span>
                <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" style="font-size:0.85rem; font-weight:600;">阅读全文 →</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 9: 教程中心 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>📖</span>
            <span>全平台客户端配置教程中心</span>
          </div>
          <div class="section-desc">
            详尽的图文步骤，指引你在各大设备上快速配置成熟的开源翻墙客户端：
          </div>
        </div>

        <div class="category-grid">
          <div class="category-card">
            <div class="category-icon">💻</div>
            <h3>Windows 电脑配置教程</h3>
            <p>图文详解 Clash Verge Rev 与 v2rayN 订阅导入、系统代理启动与Tun模式配置。</p>
            <a href="${getRelPath(filePath, 'guides/windows/index.html')}" class="category-link">查看Windows教程 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">📱</div>
            <h3>Android 安卓手机配置</h3>
            <p>Clash Meta for Android (CMFA) 与 v2rayNG 安装包下载、节点测速与分流规则设定。</p>
            <a href="${getRelPath(filePath, 'guides/android/index.html')}" class="category-link">查看安卓教程 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">🍏</div>
            <h3>iOS 苹果手机配置</h3>
            <p>Shadowrocket（小火箭）美区ID获取、扫码导入订阅与按需连接设置。</p>
            <a href="${getRelPath(filePath, 'guides/ios/index.html')}" class="category-link">查看iOS教程 →</a>
          </div>

          <div class="category-card">
            <div class="category-icon">🖥️</div>
            <h3>macOS 苹果电脑配置</h3>
            <p>Mac版 Clash Verge Rev 与 Sing-box 核心配置，解决终端代理与Git加速问题。</p>
            <a href="${getRelPath(filePath, 'guides/macos/index.html')}" class="category-link">查看Mac教程 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 10: 知识百科 -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>📚</span>
            <span>翻墙与代理核心术语百科</span>
          </div>
          <div class="section-desc">
            弄懂底层原理，买机场不再被专业术语忽悠：
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
          <a href="${getRelPath(filePath, 'glossary/iplc-iepl/index.html')}" style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); display:block;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">什么是IPLC与IEPL专线？</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">跳过公网GFW防火墙的物理跨境专用信道</div>
          </a>
          <a href="${getRelPath(filePath, 'glossary/node-multiplier/index.html')}" style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); display:block;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">什么是节点倍率？</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">流量计算公式与暗中扣除流量的套路</div>
          </a>
          <a href="${getRelPath(filePath, 'glossary/bgp-tunnel/index.html')}" style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); display:block;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">什么是BGP中转与隧道？</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">国内多线网络接入与服务器中继加速</div>
          </a>
          <a href="${getRelPath(filePath, 'glossary/rules-routing/index.html')}" style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); display:block;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">什么是规则分流与GEOIP？</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">国内直连不耗流量、海外走代理的智能机制</div>
          </a>
          <a href="${getRelPath(filePath, 'glossary/dns-leak-pollution/index.html')}" style="background:#fff; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); display:block;">
            <div style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">什么是DNS污染与阻断？</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">域名解析被劫持的原理与DoH加密解决</div>
          </a>
        </div>
      </div>
    </section>

    <!-- Section 11: 最新文章 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>✍️</span>
            <span>深度行业洞察与避坑博文</span>
          </div>
          <div class="section-desc">
            紧跟最新网络封锁动态与技术前沿，提供高价值科普：
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:1.25rem;">
          <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem;">
            <span style="display:inline-block; font-size:0.75rem; background:var(--primary-light); color:var(--primary); padding:2px 8px; border-radius:4px; font-weight:600; margin-bottom:0.5rem;">技术剖析</span>
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">
              <a href="${getRelPath(filePath, 'blog/protocol-comparison/index.html')}" style="color:var(--text-main);">
                Shadowsocks、Trojan与Hysteria2协议深度对比：2026年翻墙选哪个？
              </a>
            </h3>
            <p style="font-size:0.85rem; color:var(--text-body); line-height:1.5;">
              对比主流协议的加密开销、抗丢包率与主动探测识别率，教你在不同网络下搭配最适合的传输协议。
            </p>
          </div>

          <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem;">
            <span style="display:inline-block; font-size:0.75rem; background:var(--warning-light); color:var(--warning); padding:2px 8px; border-radius:4px; font-weight:600; margin-bottom:0.5rem;">避坑指南</span>
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">
              <a href="${getRelPath(filePath, 'blog/cheap-airport-traps/index.html')}" style="color:var(--text-main);">
                为什么便宜机场总是跑路？揭秘低价梯子商家的5大营销套路
              </a>
            </h3>
            <p style="font-size:0.85rem; color:var(--text-body); line-height:1.5;">
              拆解“9块9年付无限流量”背后的真实服务器成本账本，教你一眼识破即将跑路的危险信号。
            </p>
          </div>

          <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem;">
            <span style="display:inline-block; font-size:0.75rem; background:var(--success-light); color:var(--success); padding:2px 8px; border-radius:4px; font-weight:600; margin-bottom:0.5rem;">专线技术</span>
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">
              <a href="${getRelPath(filePath, 'blog/iepl-iplc-relay/index.html')}" style="color:var(--text-main);">
                IEPL专线与中转隧道有什么区别？晚高峰稳定不卡顿底层解析
              </a>
            </h3>
            <p style="font-size:0.85rem; color:var(--text-body); line-height:1.5;">
              详细解释点对点商业内网专线与国内多线中转路由的区别，为何专线在敏感期依然坚如磐石。
            </p>
          </div>
        </div>

        <div style="text-align:right; margin-top:1rem;">
          <a href="${getRelPath(filePath, 'blog/index.html')}" style="font-weight:600; font-size:0.925rem;">
            查看全部博客文章与评测归档 →
          </a>
        </div>
      </div>
    </section>

    <!-- Section 12: 常见问题 FAQ -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <span>❓</span>
            <span>关于翻墙机场与梯子节点的常见问题 (FAQ)</span>
          </div>
          <div class="section-desc">
            汇总用户在购买和使用代理服务过程中最常遇到的真实疑问：
          </div>
        </div>

        <div class="faq-list">
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
      </div>
    </section>
  `;

  const html = layout({
    filePath,
    title: "2026优质机场推荐与VPN梯子节点评测指南 - 性价比与稳定翻墙节点排行",
    description: "十代梯子 (shidatizi.co) 专注2026最新优质翻墙机场推荐、VPN梯子节点评测与性价比排行榜。提供IEPL专线、便宜低预算梯子、ChatGPT与4K流媒体解锁节点横向对比与客户端配置教程。",
    keywords: "机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐, 翻墙梯子, 科学上网, 优质专线机场, 便宜好用梯子",
    canonical: `${BASE_DOMAIN}/index.html`,
    h1: "2026优质机场推荐与VPN梯子节点评测指南",
    schema: faqSchema,
    bodyContent,
    isArticle: false
  });

  writePage(filePath, html);
}
