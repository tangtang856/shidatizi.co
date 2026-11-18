import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';
import { airports } from '../data/airports.js';

export function generateRecommendations() {
  const topics = [
    {
      slug: "budget",
      title: "便宜低预算机场推荐 - 平价高性价比翻墙梯子节点精选",
      h1: "平价低预算机场推荐与防坑指南",
      metaDesc: "盘点2026年适合学生党与轻度用户的便宜平价低预算与高性价比机场。精选高性价比VPN梯子节点推荐，涵盖微风网络、飞猫云、萤火虫、隐形人等超值选择。",
      keywords: "便宜机场, 低预算机场, 性价比机场, 10元机场, 穷鬼套餐, 便宜梯子, 平价节点",
      intro: "对于日常仅用于查阅维基百科、学术文献、偶尔浏览推特与YouTube视频的用户来说，本文专门聚焦于起步门槛亲民、支持灵活月付、流量单价实惠且晚高峰稳定的平价高性价比翻墙机场推荐，包含微风网络、飞猫云、萤火虫与隐形人等精选方案，同时给出防坑保本的核心实用技巧。",
      filterFn: a => ['breezenet', 'flycat', 'firefly', 'invisible'].includes(a.slug),
      tips: [
        "坚持按月付费：哪怕年付打5折，初次购买也强烈建议先月付体验。只要服务商能撑过3个月且网络稳定，再考虑按季或年付。",
        "记得使用优惠码：微风网络可使用专属券码 weifeng90，飞猫云使用 flycat888，萤火虫使用 firefly，隐形人使用 yxr888 享受额外立减福利。",
        "准备备用节点：建议购买一个平价大流量包搭配专线后备，确保任何突发封锁时期网络畅通。"
      ],
      faqs: [
        { q: "10元以内的便宜机场，网速能看YouTube 4K视频吗？", a: "在非晚高峰时段，只要是正常的BGP中转机场，看4K视频完全可以流畅跑满百兆；但在晚上8点~11点的高峰期，建议选配具备纯专线通道的品牌（如微风网络或隐形人）。" },
        { q: "有没有永久免费的翻墙VPN梯子？", a: "天下没有免费的午餐。绝大多数所谓的免费VPN要么充斥着大量弹窗恶意广告，要么在后台偷偷收集并倒卖用户的上网隐私甚至劫持电商返利Cookie，极不安全。建议选择正规平价机场。" }
      ]
    },
    {
      slug: "premium",
      title: "高端专线VPN节点推荐 - IPLC与IEPL晚高峰4K秒开机场精选",
      h1: "高端专线IPLC与IEPL机场VPN节点推荐",
      metaDesc: "精选2026顶级商业级IEPL/IPLC内网专线机场。隐形人、闪跃、微风网络、灵猫等专线晚高峰4K秒开不卡顿，适合跨境电商、外贸办公与深度AI研究者。",
      keywords: "高端机场, 专线机场, IPLC专线, IEPL专线, 晚高峰不卡, 4K秒开, 外贸梯子, 跨境专线",
      intro: "普通公网中转节点在国际出口高峰期时常发生拥塞丢包，而商业级IEPL（国际以太网专线）和IPLC（国际私有租用线路）通过内网物理光纤直连，全程不过GFW公网防火墙，享有最高优先级的QoS保障。本文精选全专线覆盖的高端机场节点。",
      filterFn: a => a.lineType.includes('专线') && a.startingPrice >= 18,
      tips: [
        "确认是否为纯专线：很多低劣机场拿公网隧道冒充专线。真正的专线Ping值极其平稳（华南到香港通常15~20ms），且在敏感封锁期几乎完全不掉线。",
        "关注原生IP质量：高端专线通常会为节点配置纯净双ISP住宅原生IP，对流媒体和外贸网站风控有着极佳的通过率。",
        "适合高生产力场景：如果你靠网络出海工作、远程办公、视频会议，专线省下的折腾时间远超过其几十元的套餐月费。"
      ],
      faqs: [
        { q: "IEPL专线和IPLC专线到底有什么区别？", a: "两者在翻墙体验上几乎一致，都是内网物理光缆。IPLC是传统的端到端租用电路，IEPL则是基于以太网技术的升级版专线，协议配置更灵活、延迟抖动更小。两者都具备“不过GFW公网”的核心优势。" },
        { q: "高端专线机场适合打外服游戏吗？", a: "非常适合。专线节点物理延迟极低且没有跳ping现象，搭配Clash的Tun模式或游戏加速器，可顺畅游玩Steam美服、日服Apex、外服LOL等游戏。" }
      ]
    },
    {
      slug: "beginner",
      title: "新手小白VPN机场推荐 - 一键导入与简单好用的梯子节点指南",
      h1: "适合新手的优质VPN机场推荐指南",
      metaDesc: "专为初次接触翻墙与科学上网的新手小白量身打造。推荐操作简单、具备详尽图文教程、支持一键导入订阅的靠谱稳定VPN机场服务，告别复杂配置。",
      keywords: "新手机场, 小白梯子, 一键导入, 翻墙教程, 简单好用VPN, 翻墙入门, 机场推荐",
      intro: "对于刚开始接触海外网络的用户来说，复杂的订阅转换、内核分流、规则集设定往往让人望而生畏。新手挑选机场的第一原则是：文档完善、后台支持一键复制导入、客服响应及时、提供傻瓜式客户端配置指引。本文推荐最适合新手起步的稳定服务。",
      filterFn: a => a.suitableFor.some(s => s.includes('新手') || s.includes('小白') || s.includes('学生')),
      tips: [
        "避开复杂自定义客户端：先使用成熟主流的开源工具（Windows用Clash Verge Rev，安卓用CMFA，苹果用Shadowrocket），教程丰富容易排错。",
        "先看后台知识库：优秀的服务商都会在后台提供针对各个操作系统的手把手截图指南，按步骤复制粘贴即可在3分钟内连通。",
        "遇到连不上先测延迟：客户端内点击“测速”，如果所有节点均为Timeout，通常是系统代理权限或电脑时间同步问题，先检查本地设置。"
      ],
      faqs: [
        { q: "新手买了机场后，是不是就可以直接打开Google了？", a: "购买机场后获得的是“订阅链接”。你需要在手机或电脑上下载对应的客户端（如Clash），将订阅链接粘贴进客户端下载节点列表，然后开启“系统代理”开关，即可正常访问Google。" },
        { q: "电脑和手机可以共用同一个机场账号吗？", a: "可以。只要在套餐允许的“设备并发数量”（通常为2~4台）范围内，你可以在手机、平板、电脑上同时导入同一个订阅链接并发使用。" }
      ]
    },
    {
      slug: "stable",
      title: "2026稳定机场节点推荐 - 低延迟专线与高可用翻墙节点精选",
      h1: "稳定抗封锁机场节点精选与专线推荐",
      metaDesc: "抗封锁能力强、SLA保障在99.5%以上的稳定机场节点推荐。多入口智能容灾，即使在敏感期也能保障跨国连接不中断，办公科研必备。",
      keywords: "稳定机场, 机场节点, 抗封锁机场, SLA保障, 专线梯子, 不掉线机场, 高可用代理",
      intro: "在每年特定的网络敏感时期，防火墙往往会加强流量特征探测与IP封禁，导致大量普通公网机场大面积瘫痪。真正的“稳定”依赖于双重技术支柱：一是底层的物理内网专线，二是分布于全国多地的BGP入口智能热备容灾机制。",
      filterFn: a => parseFloat(a.sla) >= 99.5,
      tips: [
        "看节点在线率SLA承诺：正规服务商会在状态页公示各节点在线历史记录，99.5%以上意味着每月故障停机时间不超过3.6小时。",
        "多协议热备：除了Shadowsocks外，备选支持VLESS或Trojan协议的节点能在极端恶劣环境下提供更强的伪装性。",
        "选用负载均衡或自动故障转移：在客户端设置中开启Fallback（故障回退）组，一旦主节点无响应自动切换至备选可用节点。"
      ],
      faqs: [
        { q: "为什么同一个节点有时候延迟很低，有时候突然卡住？", a: "常见原因有两个：一是当地宽带运营商对国际出口实施了突发限速；二是该节点并发连接数瞬间爆满。专线机场由于带宽池充足且实行限速限流保障，极少出现此类现象。" },
        { q: "节点超时（Timeout）是什么意思？是节点死掉了吗？", a: "测速超时通常说明该节点的入口IP或落地IP被阻断，或者客户端本地DNS解析出错。如果群聊里大家都能用只有你不行，请优先检查本地杀毒软件或网络防火墙设置。" }
      ]
    },
    {
      slug: "ai",
      title: "ChatGPT与Claude专用机场节点推荐 - 原生IP不降智梯子精选",
      h1: "AI生产力专用机场节点与解锁指南",
      metaDesc: "专为ChatGPT-4o、Claude 3.7、Midjourney、Perplexity等大模型定制的专属机场节点。隐形人、闪跃、浪网等解锁纯净住宅原生IP，杜绝Access Denied与频繁人机验证码。",
      keywords: "AI机场, ChatGPT节点, Claude梯子, OpenAI节点, 不降智梯子, 住宅IP机场, 跨境AI代理",
      intro: "随着OpenAI、Anthropic将反爬虫与地域风控级别提至最高，使用劣质机房IP访问大模型经常遭遇：页面白屏报错‘Access Denied’、陷入Cloudflare死循环验证码、账号被静默降智乃至封禁。AI生产力需要专门优化的原生住宅IP分流节点。",
      filterFn: a => a.aiSupport.length >= 3,
      tips: [
        "认准纯净原生/住宅IP：机房广播IP容易被OpenAI标记为高危风险，原生住宅IP可以伪装成正常海外家庭宽带访问。",
        "检查DNS防泄漏：如果节点IP在美国，但客户端发送的DNS请求走到了国内的DNS服务器，AI平台会立即识别并拒绝服务。",
        "首选美区和日区专线：ChatGPT对美西节点支持最好，Claude对美东与英国节点兼容极佳。"
      ],
      faqs: [
        { q: "为什么我连上了美国节点，ChatGPT仍然提示“Not Available in your country”？", a: "这通常是因为浏览器Cookie缓存了之前的地区信息，或者是你的节点IP已经被OpenAI加入黑名单。请在客户端更换为标注了“AI专属”的节点，开启浏览器无痕模式后再试。" },
        { q: "什么是ChatGPT‘降智’？如何判断？", a: "OpenAI对可疑IP会偷偷降低模型回答质量（例如无法联网搜索、无法生图、强制调用旧版小型轻量模型）。使用纯净住宅专线节点可以彻底解决降智问题。" }
      ]
    },
    {
      slug: "streaming",
      title: "Netflix与Disney+流媒体解锁机场推荐 - 4K无缓冲节点精选",
      h1: "4K流媒体解锁专线机场与梯子节点推荐",
      metaDesc: "精选原生解锁Netflix非自制剧、Disney+、YouTube Premium、HBO Max的高速机场节点。浪网、隐形人、闪跃、灵猫等千兆带宽，4K杜比视界秒开拖动不缓冲。",
      keywords: "流媒体机场, Netflix解锁, 奈飞梯子, Disney+节点, YouTube 4K, 4K秒开, 奈飞专线",
      intro: "看海外4K流媒体有两个硬性门槛：第一是**流媒体原生版权解锁**（许多普通机房IP在Netflix上只能看自制剧，无法看各地区版权大片）；第二是**充足的单线程下行带宽**（4K高码率视频要求持续稳定的25Mbps以上突发吞吐量）。本文推荐流媒体解锁能力强劲的服务。",
      filterFn: a => a.streamingSupport.some(s => s.includes('Netflix') || s.includes('Disney')),
      tips: [
        "分清‘自制剧’与‘全解锁’：Netflix自制剧（如《怪奇物语》）全球均可看，只有能搜出《绝命毒师》等第三方版权剧，才代表真正解锁了该地区版权库。",
        "香港与新加坡看中文影视最全：香港、台湾和新加坡节点均自带繁简中文原生字幕与界面，是流媒体追剧首选地区。",
        "高码率视频带宽建议：观看4K高规格杜比视界长视频，建议挑选标称峰值带宽在300Mbps以上的专线节点。"
      ],
      faqs: [
        { q: "看4K流媒体一个月需要多少流量？", a: "Netflix 4K HDR单小时消耗流量约7GB，1080P约3GB。如果你每天看2小时4K视频，每月建议选购200GB以上的大流量套餐（如微风网络200G、浪网150G）。" },
        { q: "为什么节点显示支持Netflix，我打开却提示使用代理工具被阻止？", a: "流媒体服务商会定期封杀已知代理机房IP段。优秀机场通常会在24小时内自动切换备用解锁IP池。如果偶发报错，可以在客户端刷新订阅并切换至标注流媒体专用的另一备用节点。" }
      ]
    }
  ];

  topics.forEach(topic => {
    const filePath = `recommend/${topic.slug}/index.html`;
    const matchedAirports = topic.slug === 'budget'
      ? ['breezenet', 'flycat', 'firefly', 'invisible'].map(slug => airports.find(a => a.slug === slug)).filter(Boolean)
      : airports.filter(topic.filterFn);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": topic.faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    const breadcrumbs = [
      { name: "机场推荐专题", path: "recommend/budget/index.html" },
      { name: topic.h1, path: filePath }
    ];

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'recommend/budget/index.html')}">精选推荐</a>
          <span class="breadcrumbs-separator">/</span>
          <span>${topic.h1}</span>
        </nav>

        <div class="content-layout">
          <article class="prose">
            <h1>${topic.h1}</h1>
            
            <div class="article-meta">
              <span>📅 更新时间：2026年3月</span>
              <span>🔍 评测标准：技术实测与公开资费核算</span>
              <span>🛡️ 独立立场：公开客观测评</span>
            </div>

            <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
              ${topic.intro}
            </p>

            <div class="alert alert-note">
              <strong>📌 本专题核心遴选原则：</strong>
              本页面筛选的所有推荐品牌均经过底层路由追踪与晚高峰丢包测试，杜绝虚构节点与空头承诺。
            </div>

            <h2>一、${topic.h1} 精选服务商横向概览</h2>
            <p>
              以下是我们针对该场景重点核验并精选的服务商列表。所有套餐价格均转换为实际折算月费以供客观参考：
            </p>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>机场品牌与优惠</th>
                    <th>线路架构</th>
                    <th>起步资费</th>
                    <th>起步流量</th>
                    <th>每GB成本</th>
                    <th>直达选购</th>
                    <th>详情评测</th>
                  </tr>
                </thead>
                <tbody>
                  ${matchedAirports.map(a => `
                    <tr>
                      <td>
                        <strong>${a.name}</strong>
                        ${a.coupon ? `<div style="font-size:0.75rem; color:#b45309; font-weight:600;">券: ${a.coupon}</div>` : ''}
                      </td>
                      <td>${a.lineType}</td>
                      <td>¥${a.startingPrice} / ${a.billingCycle}</td>
                      <td>${a.plans[0].bandwidthGB} GB</td>
                      <td><strong style="color:var(--primary);">¥${a.plans[0].pricePerGB}/GB</strong></td>
                      <td>
                        <a href="${a.affiliateUrl || a.officialUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">直达 🚀</a>
                      </td>
                      <td>
                        <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" class="btn btn-outline btn-sm">深度评测</a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <h2>二、入围机场深度规格与适配分析</h2>
            <div style="display:flex; flex-direction:column; gap:1.5rem; margin:1.5rem 0;">
              ${matchedAirports.map(a => `
                <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.5rem; box-shadow:var(--shadow-sm);">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                    <div>
                      <h3 style="margin:0 0 0.25rem 0; font-size:1.3rem; color:var(--text-main);">${a.name}</h3>
                      <div style="font-size:0.825rem; color:var(--text-muted);">${a.tagline}</div>
                    </div>
                    <span class="status-badge status-tested">核验评分：${a.overallScore}分</span>
                  </div>

                  <p style="font-size:0.9rem; color:var(--text-body); line-height:1.6; margin-bottom:0.75rem;">
                    ${a.description}
                  </p>

                  ${a.coupon ? `
                    <div style="margin-bottom:0.75rem; font-size:0.85rem; color:#92400e; background:#fef3c7; padding:4px 10px; border-radius:4px; font-weight:700; display:inline-block;">
                      🎁 官方专属优惠券：<code style="background:#fff; padding:1px 6px; border-radius:3px;">${a.coupon}</code>
                    </div>
                  ` : ''}

                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; background:var(--bg-subtle); padding:0.75rem; border-radius:var(--radius-sm); margin-bottom:1rem; font-size:0.85rem;">
                    <div><strong>起步价格：</strong>¥${a.startingPrice} / ${a.billingCycle}</div>
                    <div><strong>起步流量：</strong>${a.plans[0].bandwidthGB} GB/月</div>
                    <div><strong>线路类型：</strong>${a.lineType}</div>
                    <div><strong>SLA可用性：</strong>${a.sla}</div>
                  </div>

                  <div style="margin-bottom:1rem; font-size:0.875rem;">
                    <div style="font-weight:700; color:var(--success); margin-bottom:0.35rem;">核心优势：</div>
                    <ul style="padding-left:1.25rem; margin-bottom:0.75rem;">
                      ${a.advantages.map(adv => `<li style="margin-bottom:0.25rem;">${adv}</li>`).join('')}
                    </ul>
                    <div style="font-weight:700; color:var(--danger); margin-bottom:0.35rem;">注意事项：</div>
                    <ul style="padding-left:1.25rem; margin:0;">
                      ${a.disadvantages.map(dis => `<li style="margin-bottom:0.25rem;">${dis}</li>`).join('')}
                    </ul>
                  </div>

                  <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                    <a href="${a.affiliateUrl || a.officialUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">官网直达选购 🚀</a>
                    <a href="${getRelPath(filePath, `review/${a.slug}/index.html`)}" class="btn btn-secondary btn-sm">查看 ${a.name} 完整评测</a>
                    <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-outline btn-sm">加入在线对比</a>
                  </div>
                </div>
              `).join('')}
            </div>

            <h2>三、选购核心秘籍与防坑指南</h2>
            <div style="display:flex; flex-direction:column; gap:1rem; margin:1.25rem 0;">
              ${topic.tips.map((tip, idx) => `
                <div style="background:var(--bg-subtle); border-left:4px solid var(--primary); padding:1rem; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                  <strong style="color:var(--text-main);">技巧 ${idx + 1}：</strong>
                  <span style="font-size:0.925rem; color:var(--text-body);">${tip}</span>
                </div>
              `).join('')}
            </div>

            <h2>四、常见问题解答 (FAQ)</h2>
            <div class="faq-list" style="margin:1.5rem 0;">
              ${topic.faqs.map(item => `
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

            <h2>五、相关技术与教程导航</h2>
            <p>为了获得最极致稳定的使用体验，建议配合以下教程与工具使用：</p>
            <ul>
              <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">Windows客户端配置教程 (Clash Verge Rev)</a></li>
              <li><a href="${getRelPath(filePath, 'guides/android/index.html')}">安卓手机客户端安装与节点测速教程</a></li>
              <li><a href="${getRelPath(filePath, 'guides/ios/index.html')}">iPhone与iPad Shadowrocket小火箭图文指南</a></li>
              <li><a href="${getRelPath(filePath, 'compare/index.html')}">使用在线参数对比工具对比多款候选机场</a></li>
              <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">查看2026年度翻墙梯子全网综合排行榜</a></li>
            </ul>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">📌 其他分类专题</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 平价低预算精选</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端IEPL专线</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/beginner/index.html')}">🔰 新手小白上手</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/stable/index.html')}">🛡️ 高可用稳定抗封锁</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">🤖 ChatGPT与AI专用</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/streaming/index.html')}">🎬 4K流媒体解锁</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">🏆 权威排行榜</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">🥇 综合总榜单</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/value/index.html')}">💰 每GB单价性价比榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/budget/index.html')}">🪙 穷鬼低预算榜</a></li>
                <li><a href="${getRelPath(filePath, 'ranking/stable/index.html')}">⚡ 专线SLA稳定性榜</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">⚖️ 交互式对比神器</div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
                不知道该选哪个？一次性挑选最多 4 家品牌进行同台竞技。
              </p>
              <a href="${getRelPath(filePath, 'compare/index.html')}" class="btn btn-outline btn-sm" style="display:block; text-align:center;">
                打开对比工具 →
              </a>
            </div>
          </aside>
        </div>
      </div>
    `;

    const html = layout({
      filePath,
      title: `${topic.title} - shidatizi.co`,
      description: topic.metaDesc,
      keywords: topic.keywords,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: topic.h1,
      breadcrumbs,
      schema: faqSchema,
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    });

    writePage(filePath, html);
  });
}
