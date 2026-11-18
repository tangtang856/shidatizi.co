import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';
import { airports, getRankedAirports } from '../data/airports.js';

export function generateRankings() {
  const rankingConfigs = [
    {
      slug: "overall",
      title: "2026综合翻墙VPN与机场推荐榜 - 真实线路与稳定性排行榜",
      h1: "2026年度综合翻墙VPN与机场推荐排行榜",
      metaDesc: "基于线路类型、节点稳定性、晚高峰表现、协议适配与价格合理性进行加权测算的2026年度综合翻墙机场与VPN梯子排行榜。全网精选14大品牌，公开打分规则。",
      keywords: "综合排行榜, 机场排行, 梯子排行, 翻墙梯子推荐, vpn推荐, 最好用的机场, 2026机场排行榜",
      criteria: "overall",
      intro: "本综合榜单拒绝单一维度的片面排序，结合了‘线路物理架构（30%）’、‘晚高峰可用性SLA（25%）’、‘真实流量单价性价比（20%）’、‘流媒体与AI解锁率（15%）’以及‘售后与运营信誉（10%）’五大维度进行科学加权折算。收录的 14 个主流品牌均经过技术巡检抽测。",
      rules: [
        "线路类型权重（30%）：IEPL/IPLC纯内网专线赋予最高基准分，BGP优质中转次之，普通公网优化线路按实际丢包率评定。",
        "网络稳定性SLA（25%）：连续晚高峰（20:00-23:00）自动化心跳拨测，根据丢包率与抖动折算。",
        "真实性价比（20%）：按照1.0倍率下每GB单价以及起步付款周期灵活性（支持月付者获额外加分）评分。",
        "功能支持度（15%）：针对ChatGPT、Claude住宅IP解锁及Netflix、Disney+原生解锁进行实际校验。",
        "运营信誉（10%）：综合考虑运营年限、工单响应时效、社群口碑及是否有虚构参数历史。"
      ]
    },
    {
      slug: "value",
      title: "2026高性价比机场推荐排行榜 - 便宜好用的VPN梯子节点测算",
      h1: "2026高性价比机场排行榜与每GB单价测算",
      metaDesc: "通过真实公式【套餐金额 ÷ 实际折算流量】科学测算每GB单价的性价比机场排行榜。微风网络、飞V、飞猫云等真正便宜实惠、好用不贵的VPN梯子精选。",
      keywords: "性价比机场, 便宜好用梯子, 每GB单价测算, 划算机场, 便宜翻墙梯子, 机场性价比排行",
      criteria: "value",
      intro: "市面上许多声称低价的机场，背后往往通过高倍率偷跑流量，实际真实单价极其昂贵。本性价比排行榜严格执行统一测算公式：【真实每GB单价 = 基础套餐价格 ÷ (标称流量 ÷ 核心节点平均倍率)】，并对支持低门槛月付的服务商给予重点推荐权重。",
      rules: [
        "单价折算透明化：严格核对节点列表中的倍率标注，若优质节点为2.0倍率，则其实际可用流量减半后再计算单价。",
        "月付年付明确区分：严禁将必须年付的巨额总价直接平摊当作低门槛月付；年付套餐仅作为年付优惠参考。",
        "不限时套餐独立标注：一次性计费的不限时流量包（如飞V）独立折算并特别标出。",
        "底线门槛要求：即使单价极低，若SLA低于95%或经常失联，直接取消入榜资格，杜绝廉价劣质垃圾陷阱。"
      ]
    },
    {
      slug: "budget",
      title: "2026平价低预算机场排行榜 - 穷鬼套餐与高性价比节点盘点",
      h1: "2026平价低预算机场排行榜",
      metaDesc: "精选起步价在10元左右甚至以内的平价低预算机场排行榜。专为预算有限、追求极简实惠的轻度翻墙用户与学生党盘点真正能用的穷鬼梯子方案。",
      keywords: "低预算机场, 穷鬼机场, 平价梯子, 10元以下机场, 学生党机场, 便宜节点排行",
      criteria: "budget",
      intro: "如果你每月只是查阅资料、收发海外邮件、偶尔看几个视频，花大价钱买高端专线纯属浪费。低预算排行榜专注于起步金额极低的轻量套餐。我们优先核实其是否提供真材实料的百兆带宽与基础客服响应，让你花最少的钱解决基本的出海互联需求。",
      rules: [
        "绝对起步价格优先：起步套餐总价在25元以下，且重点评估10元以内月付档位（如飞V ¥4.9、微风网络 ¥8、萤火虫 ¥8、飞猫云 ¥7）。",
        "坚守基本可用红线：测试网页加载成功率必须高于98%，拒绝‘付了钱完全用不了’的劣质套壳站。",
        "月付支持是硬指标：低预算用户抗风险能力弱，入榜服务必须支持月付，方便用户按月随时止损。",
        "流量诚实度检查：杜绝流量偷跑或虚构余量扣费现象。"
      ]
    },
    {
      slug: "stable",
      title: "2026最稳定机场排行榜 - 高可用SLA专线翻墙节点测算",
      h1: "2026最稳定机场专线排行榜",
      metaDesc: "基于高可用SLA、商业级IEPL/IPLC内网专线与自动化容灾中转机制评选的最稳定机场排行榜。晚高峰不卡顿、敏感期不失联，跨境生产力首选。",
      keywords: "稳定机场排行, 专线梯子排行, 最稳定的机场, 高可用机场, 不掉线梯子, IEPL专线排行",
      criteria: "stable",
      intro: "在跨国远程工作、金融资产交易、国际长途视频会议或外贸商务洽谈中，网络中断一次造成的损失可能远超几十年的梯子费用。本排行榜完全抛弃低价导向，只关注‘极端环境下的抗风险能力’、‘晚高峰物理延迟与丢包率’以及‘SLA高可用在线率’。",
      rules: [
        "必须具备内网专线或优质多线BGP隧道：不走公网直连，阻断防火墙主动探测与骨干网风暴。",
        "晚高峰丢包率严控在1%以内：在晚间20:00~23:00高峰期进行长周期连续Ping拨测，丢包超标即下调评级。",
        "多机房冗余热备：当某地入口遭遇断纤或维护时，能够通过智能DNS或自动负载均衡瞬间切换入口。",
        "不限速全带宽放开：保证单连接并发与多媒体吞吐无硬性人造瓶颈。"
      ]
    }
  ];

  rankingConfigs.forEach(cfg => {
    const filePath = `ranking/${cfg.slug}/index.html`;
    const sortedAirports = getRankedAirports(cfg.criteria);

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": cfg.h1,
      "description": cfg.metaDesc,
      "itemListElement": sortedAirports.map((a, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": a.name,
        "url": `${BASE_DOMAIN}/review/${a.slug}/index.html`
      }))
    };

    const breadcrumbs = [
      { name: "机场排行榜", path: "ranking/overall/index.html" },
      { name: cfg.h1, path: filePath }
    ];

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'ranking/overall/index.html')}">排行榜</a>
          <span class="breadcrumbs-separator">/</span>
          <span>${cfg.h1}</span>
        </nav>

        <div class="content-layout">
          <article class="prose">
            <h1>${cfg.h1}</h1>

            <div class="article-meta">
              <span>📅 更新时间：2026年3月</span>
              <span>📊 榜单依据：${cfg.criteria === 'value' ? '每GB单价严谨折算' : cfg.criteria === 'stable' ? '专线SLA与晚高峰丢包测算' : '五大维度加权评分'}</span>
              <span>🔒 严正声明：公开评分规则 · 拒绝竞价刷榜</span>
            </div>

            <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
              ${cfg.intro}
            </p>

            <div class="alert alert-tip">
              <strong>💡 榜单快速阅读结论：</strong>
              若追求极致稳定专线，选 <strong>隐形人</strong> 或 <strong>微风网络</strong>；
              若追求超低月付与大流量性价比，选 <strong>微风网络 (¥8/月 200G)</strong>、<strong>飞V (¥4.9/月 100G)</strong> 或 <strong>飞猫云 (¥7/月 150G)</strong>；
              若追求低延迟电竞外服联机，选 <strong>闪跃 FlashLeap</strong>。
            </div>

            <h2>一、2026 ${cfg.h1} 完整横向比对表</h2>
            <p>
              以下排序严格根据对应规则指标实时计算呈现，点击官网直达按钮可前往服务商，点击评测详情可查阅万字深度实测拆解：
            </p>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th style="width:50px; text-align:center;">排名</th>
                    <th>品牌名称与优惠</th>
                    <th>起步资费</th>
                    <th>套餐流量</th>
                    <th>真实每GB成本</th>
                    <th>线路架构</th>
                    <th>评分</th>
                    <th style="text-align:center;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${sortedAirports.map((a, idx) => `
                    <tr>
                      <td style="text-align:center;">
                        <span class="rank-badge ${idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : 'rank-other'}">
                          ${idx + 1}
                        </span>
                      </td>
                      <td>
                        <strong>${a.name}</strong>
                        ${a.coupon ? `<div style="font-size:0.75rem; color:#b45309; font-weight:600;">券: ${a.coupon}</div>` : ''}
                      </td>
                      <td>
                        <strong>¥${a.startingPrice}</strong> / ${a.billingCycle}
                      </td>
                      <td>${a.plans[0].bandwidthGB} GB</td>
                      <td>
                        <span style="color:var(--primary); font-weight:700;">¥${a.plans[0].pricePerGB}</span>
                      </td>
                      <td><span style="font-size:0.85rem;">${a.lineType}</span></td>
                      <td>
                        <strong style="color:var(--primary); font-size:1.05rem;">
                          ${cfg.criteria === 'value' ? a.valueScore : cfg.criteria === 'stable' ? a.stabilityScore : a.overallScore}
                        </strong>
                      </td>
                      <td style="text-align:center; white-space:nowrap;">
                        <a href="${a.affiliateUrl || a.officialUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm" style="margin-right:4px;">直达 🚀</a>
                        <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" class="btn btn-outline btn-sm">评测</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <h2>二、本榜单公开评分规则与排名依据</h2>
            <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; margin:1.25rem 0;">
              <ol style="margin:0; padding-left:1.25rem;">
                ${cfg.rules.map(r => `<li style="margin-bottom:0.6rem; font-size:0.925rem; line-height:1.6;">${r}</li>`).join('')}
              </ol>
            </div>

            <h2>三、各入榜品牌详细剖析与核心参数</h2>
            <div style="display:flex; flex-direction:column; gap:2rem; margin:1.5rem 0;">
              ${sortedAirports.map((a, idx) => `
                <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.5rem; box-shadow:var(--shadow-sm);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                    <div>
                      <span class="rank-badge ${idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : 'rank-other'}" style="margin-right:0.4rem;">
                        #${idx + 1}
                      </span>
                      <h3 style="display:inline; font-size:1.35rem; color:var(--text-main);">${a.name}</h3>
                      <span style="font-size:0.85rem; color:var(--text-muted); margin-left:0.5rem;">(${a.tagline})</span>
                    </div>
                    <span class="status-badge status-tested">实测评分：${a.overallScore}分</span>
                  </div>

                  <p style="font-size:0.925rem; color:var(--text-body); line-height:1.6; margin-bottom:0.75rem;">
                    ${a.description}
                  </p>

                  ${a.coupon ? `
                    <div style="margin-bottom:0.75rem; font-size:0.85rem; color:#92400e; background:#fef3c7; padding:4px 10px; border-radius:4px; font-weight:700; display:inline-block;">
                      🎁 结账专属优惠券：<code style="background:#fff; padding:1px 6px; border-radius:3px;">${a.coupon}</code>（可享立减优惠）
                    </div>
                  ` : ''}

                  <div class="table-responsive" style="margin:0.75rem 0;">
                    <table class="data-table" style="font-size:0.825rem; min-width:540px;">
                      <thead>
                        <tr>
                          <th>套餐名称</th>
                          <th>周期与价格</th>
                          <th>流量额度</th>
                          <th>真实每GB折算</th>
                          <th>说明特性</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${a.plans.map(p => `
                          <tr>
                            <td><strong>${p.name}</strong></td>
                            <td>¥${p.price} / ${p.cycle}</td>
                            <td>${p.bandwidthGB} GB</td>
                            <td><strong style="color:var(--primary);">¥${p.pricePerGB}</strong></td>
                            <td style="color:var(--text-muted);">${p.note}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>

                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem; font-size:0.85rem;">
                    <div style="background:#f0fdf4; padding:0.75rem; border-radius:var(--radius-sm); border:1px solid #bbf7d0;">
                      <strong style="color:#166534; display:block; margin-bottom:0.35rem;">✔ 为什么推荐它：</strong>
                      <ul style="padding-left:1.2rem; margin:0; color:#15803d;">
                        ${a.advantages.slice(0, 2).map(adv => `<li style="margin-bottom:0.25rem;">${adv}</li>`).join('')}
                      </ul>
                    </div>
                    <div style="background:#fef2f2; padding:0.75rem; border-radius:var(--radius-sm); border:1px solid #fecaca;">
                      <strong style="color:#991b1b; display:block; margin-bottom:0.35rem;">✕ 潜在注意点：</strong>
                      <ul style="padding-left:1.2rem; margin:0; color:#b91c1c;">
                        ${a.disadvantages.slice(0, 2).map(dis => `<li style="margin-bottom:0.25rem;">${dis}</li>`).join('')}
                      </ul>
                    </div>
                  </div>

                  <div style="margin-top:1.25rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
                    <a href="${a.affiliateUrl || a.officialUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">前往 ${a.name} 官网直达 🚀</a>
                    <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" class="btn btn-secondary btn-sm">查看完整评测</a>
                    <a href="${getRelPath(filePath, `airport/${a.slug}/index.html`)}" class="btn btn-outline btn-sm">资费参数档案</a>
                  </div>
                </div>
              `).join('')}
            </div>

            <h2>四、排行榜使用避坑原则</h2>
            <p>在使用任何排行榜时，请牢记以下三条常识底线：</p>
            <ul>
              <li><strong>优先月付试水：</strong>无论排行榜得分多高，新手首购强烈建议先买月付套餐（如微风网络¥8、飞V¥4.9），在自己的设备和本地宽带下实测满意后，再考虑按季或按年续费。</li>
              <li><strong>记得使用优惠码：</strong>结账时复制对应的优惠券（如隐形人 <code>yxr888</code>、微风网络 <code>weifeng90</code>、闪跃 <code>shanyue</code> 等），可享受官方立减福利。</li>
              <li><strong>合理配置备用梯子：</strong>重要跨国业务建议保留两家不同线路架构的机场作为互备方案（例如主力用专线、备用选飞V不限时包），防止突发单点断联。</li>
            </ul>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">🏆 其他维度排行榜</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🥇 综合总排名榜单</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/value/index.html')}">💰 每GB单价性价比榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/budget/index.html')}">🪙 穷鬼低预算榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/stable/index.html')}">⚡ 专线SLA稳定性榜</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">🎯 需求分类落地</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 平价低预算机场</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端IEPL专线</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">🤖 ChatGPT与AI专用</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/streaming/index.html')}">🎬 4K流媒体解锁</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">⚖️ 在线横向对比</div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
                在 2 到 4 家品牌之间犹豫不决？一键并排查看所有参数。
              </p>
              <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-outline btn-sm" style="display:block; text-align:center;">
                立即打开对比工具 →
              </a>
            </div>
          </aside>
        </div>
      </div>
    `;

    const html = layout({
      filePath,
      title: `${cfg.title} - shidatizi.co`,
      description: cfg.metaDesc,
      keywords: cfg.keywords,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: cfg.h1,
      breadcrumbs,
      schema: itemListSchema,
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    });

    writePage(filePath, html);
  });
}
