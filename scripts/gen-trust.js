import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';

export function generateTrustPages() {
  const pages = [
    {
      slug: "about",
      path: "about/index.html",
      title: "关于我们 - shidatizi.co 独立机场评测与技术指南",
      h1: "关于 shidatizi.co",
      metaDesc: "了解 shidatizi.co 的创建初衷、使命与测试标准。我们是一支专注于全球网络技术、代理协议研究与客观中文评测的独立技术资讯团队。",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          <strong>十代梯子 (shidatizi.co)</strong> 成立于网络审查与跨境通信需求日益复杂的时代。
          我们的使命非常纯粹：<strong>为中文互联网用户提供真实、透明、可复现、无欺诈的翻墙机场与VPN节点资讯。</strong>
        </p>

        <h2>一、我们解决什么痛点？</h2>
        <p>
          当前的中文网络出海环境中，充斥着大量虚假测速截图、不良低价跑路梯子营销、以及拿了商业赞助便违背良心把劣质公网吹成商业专线的“导航站”。
          许多新手在交纳了数额不菲的“学费”后，依然面临断网、卡顿、大模型降智与订阅泄露等诸多困境。
        </p>
        <p>
          shidatizi.co 坚持技术立站。我们通过严谨的底层路由追踪、真实购买套餐后的晚高峰丢包统计、以及科学的每GB单价换算模型，
          让所有参差不齐的网络服务在统一的阳光下接受事实检验。
        </p>

        <h2>二、我们的核心价值观</h2>
        <ul>
          <li><strong>客观实证：</strong>所有性能评测必须有清晰的数据采集来源与日期标注，未核实项如实注明“尚未核实”；</li>
          <li><strong>利益隔离：</strong>排行榜与评测排序绝不实行竞价排名，任何商业赞助均不能改变真实评分；</li>
          <li><strong>技术普及：</strong>坚持产出高质量的开源客户端教程与底层网络原理解析，授人以鱼更授人以渔。</li>
        </ul>
      `
    },
    {
      slug: "contact",
      path: "contact/index.html",
      title: "联系我们 - 读者反馈与纠错合作 - shidatizi.co",
      h1: "联系我们",
      metaDesc: "欢迎向 shidatizi.co 提交技术纠错、参数更新、违规举报与商务交流。我们承诺在 48 小时内核实并回复。",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          保持数据的最新与精准需要社区共同的力量。如果你在阅读我们的评测时发现某家机场调整了套餐资费、节点发生变更，
          或者你是有可靠运营历史的服务商希望申请技术抽检，欢迎随时与我们取得联系。
        </p>

        <h2>一、反馈与联络渠道</h2>
        <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.5rem; margin:1.5rem 0;">
          <p style="margin-bottom:0.75rem;"><strong>📧 官方编辑部电子邮箱：</strong></p>
          <p><code style="font-size:1.1rem; color:var(--primary);">contact@shidatizi.co</code></p>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.5rem;">
            * 邮件请附带具体涉及的页面 URL 及截图证据，以便我们快速定位并核实。
          </p>
        </div>

        <h2>二、纠错与信息更新流程</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>收到读者或品牌方的工单后，编辑部将在 24 小时内进行初审；</li>
          <li>技术测试人员将对反馈的节点路由、套餐变动或 SLA 异常进行重新拨测；</li>
          <li>核实属实后，将在 48 小时内更新页面内容并刷新“最后核验日期”。</li>
        </ol>
      `
    },
    {
      slug: "editorial-policy",
      path: "editorial-policy/index.html",
      title: "编辑政策与评测标准 - 坚持独立客观原则 - shidatizi.co",
      h1: "编辑政策与评测独立性说明",
      metaDesc: "详细公开 shidatizi.co 的内容审核标准、机场测试维度、评分计算模型与联盟推广（Affiliate）商业关系透明化披露。",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          可信度是 shidatizi.co 的生命线。为保障读者的知情权与决策客观性，我们公开本站所有内容创作与商业合作的指导准则。
        </p>

        <h2>一、评测测试与评分原则</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>自费抽样：</strong>所有入围深度测评的品牌，编辑部均使用普通匿名账户自费购买正式在售套餐，不使用服务商定制的“专供媒体线路”；</li>
          <li><strong>公开测算标准：</strong>性价比榜单严格按照【价格 ÷ 可用流量】公式折算，所有倍率水分一律剔除；</li>
          <li><strong>区分事实与宣传：</strong>官方宣传口号（如‘全球首发’、‘顶级专线’）统一归入‘官方资料’，只有实机测速与路由跟踪验证后才标记为‘实测通过’；</li>
          <li><strong>动态下架机制：</strong>任何入选服务商一旦发生连续48小时大面积失联跑路、或证实存在窃取用户隐私行为，本站将第一时间在所有榜单与文章中下架并通报风险。</li>
        </ol>

        <h2>二、商业合作与联盟营销（Affiliate）披露</h2>
        <p>
          为了维持服务器运行、高并发拨测探针的租金以及内容创作支出，本站的部分外链可能包含联盟推广标识（Affiliate Links）。
          当用户通过本站链接前往第三方平台购买服务时，我们可能会获得少许佣金。
        </p>
        <div class="alert alert-note">
          <strong>重要保证：</strong>
          联盟关系绝不影响我们的评测评级或排行榜名次。无论某家服务商给予多高佣金比例，只要其网络不稳定或套餐性价比过低，均不会获得靠前排名。
          我们的立足之本始终是为读者筛选真正好用、可靠的工具。
        </div>
      `
    },
    {
      slug: "privacy-policy",
      path: "privacy-policy/index.html",
      title: "隐私政策 - 保护用户访问隐私承诺 - shidatizi.co",
      h1: "隐私政策",
      metaDesc: "shidatizi.co 承诺严格遵守隐私第一原则，零敏感日志记录，不安装任何侵犯个人隐私的第三方追踪探针。",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          在 shidatizi.co，我们深知在网络加速与隐私安全领域，个人数据保护至关重要。
          本政策向您说明我们如何收集、使用和保护您的信息。
        </p>

        <h2>一、零敏感信息收集原则</h2>
        <ul>
          <li><strong>静态纯净架构：</strong>本站采用现代纯静态 HTML 与原生 CSS 架构，不设强制用户注册系统，不收集您的真实姓名、电话号码或支付账号；</li>
          <li><strong>零第三方分析追踪探针：</strong>我们拒绝安装任何可能将用户浏览轨迹出售给广告商的重型画像脚本；</li>
          <li><strong>本地闭环搜索：</strong>站内搜索与机场横向对比工具完全在您的本地浏览器前端由原生 JavaScript 运算完成，不向服务器发送您的搜索词日志。</li>
        </ul>

        <h2>二、基础服务器访问日志</h2>
        <p>
          与所有部署在 Cloudflare 等主流 CDN 上的网站一样，当您访问本站时，基础网络层可能会记录必要的系统级日志（包括访问时间、请求的网页路径、状态码以及用于防范 DDoS 恶意攻击的 IP 地址）。
          这些数据仅用于保障系统安全与防范恶意爬虫，绝不用于身份关联。
        </p>

        <h2>三、外部链接安全提示</h2>
        <p>
          本站包含前往各大开源软件托管平台（如 GitHub）或第三方机场服务商的外部链接。
          我们对第三方网站的隐私条例和安全防护不承担直接法律责任，建议您在访问任何外部平台时先行阅读其隐私政策。
        </p>
      `
    },
    {
      slug: "disclaimer",
      path: "disclaimer/index.html",
      title: "免责声明与服务协议 - shidatizi.co",
      h1: "免责声明",
      metaDesc: "关于 shidatizi.co 网站内容的技术中立性、第三方服务风险自负与合理合规使用互联网技术的法律免责声明。",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          访问与使用 <strong>shidatizi.co</strong> 即代表您已充分知晓并自愿接受以下免责条款：
        </p>

        <h2>一、技术研究与信息中立</h2>
        <p>
          本站所刊载的全部文章、协议科普、客户端配置指引与机场测评资料，旨在探讨计算机网络通信协议（如 TCP/UDP、TLS、Shadowsocks、QUIC 等）的技术原理与性能测试。
          本站不开发、不销售、不运营任何形式的翻墙代理服务，与本站提及的所有第三方商业品牌之间不存在股权或从属关联。
        </p>

        <h2>二、合规合法使用提醒</h2>
        <p>
          请各位读者在所在国家或地区的法律法规框架内合理、合规使用网络工具。
          严禁利用网络代理工具从事任何侵犯他人权益、危害国家网络安全、传播违法违规内容或从事网络违法犯罪活动。
          因用户自身不当使用网络工具引发的一切民事、行政或刑事法律责任，均由使用者本人独立承担。
        </p>

        <h2>三、第三方商业风险免责</h2>
        <p>
          第三方机场服务商的运营状态、线路质量与经营存续受多种不可抗力因素影响。
          本站所呈现的数据均为测试节点时段的快照结果，不代表对第三方未来服务的持续性承诺或担保。
          用户在向任何第三方购买网络服务时，请审慎评估自身风险承受能力（强烈建议选择月付），本站对第三方商家的跑路、违约或服务中止不承担连带赔偿责任。
        </p>
      `
    },
    {
      slug: "404",
      path: "404.html",
      title: "404 页面未找到 - shidatizi.co",
      h1: "404 - 抱歉，您访问的页面不存在或已被移除",
      metaDesc: "您访问的页面不存在。请返回 shidatizi.co 首页，或通过搜索栏寻找最新的翻墙机场评测与客户端教程。",
      body: `
        <div style="text-align:center; padding:3rem 1rem;">
          <div style="font-size:5rem; font-weight:900; color:var(--primary); line-height:1; margin-bottom:1rem;">404</div>
          <p style="font-size:1.15rem; color:var(--text-body); max-width:540px; margin:0 auto 2rem; line-height:1.6;">
            您所寻找的页面可能已经更名、移动，或者输入了错误的网址。
          </p>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <a href="index.html" class="btn btn-primary">返回网站首页 🏠</a>
            <a href="ranking/overall/index.html" class="btn btn-secondary">查看综合排行榜 🏆</a>
            <a href="compare/index.html" class="btn btn-outline">进入参数对比工具 ⚖️</a>
          </div>
        </div>
      `
    }
  ];

  pages.forEach(p => {
    const filePath = p.path;
    const is404 = p.slug === '404';

    const breadcrumbs = is404 ? [] : [
      { name: p.h1, path: filePath }
    ];

    const bodyContent = `
      <div class="container" style="padding-top:2rem; padding-bottom:3rem;">
        ${!is404 ? `
          <nav class="breadcrumbs" aria-label="面包屑导航">
            <a href="${getRelPath(filePath, 'index.html')}">首页</a>
            <span class="breadcrumbs-separator">/</span>
            <span>${p.h1}</span>
          </nav>
        ` : ''}

        <div style="max-width:860px; margin:0 auto; background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:2.5rem; box-shadow:var(--shadow-sm);">
          <h1 style="font-size:2rem; font-weight:800; color:var(--text-main); margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;">
            ${p.h1}
          </h1>

          <div class="prose" style="max-width:100%;">
            ${p.body}
          </div>
        </div>
      </div>
    `;

    writePage(filePath, layout({
      filePath,
      title: `${p.title}`,
      description: p.metaDesc,
      keywords: "十代梯子, shidatizi.co, 翻墙机场, 网站政策",
      canonical: is404 ? `${BASE_DOMAIN}/404.html` : `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: p.h1,
      breadcrumbs,
      bodyContent,
      isArticle: false
    }));
  });
}
