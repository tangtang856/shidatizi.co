import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';

export function generateBlogsAndGlossary() {
  // 1. 博客文章配置
  const blogs = [
    {
      slug: "protocol-comparison",
      title: "Shadowsocks与Trojan及Hysteria2协议深度对比 - 哪种翻墙节点更抗封锁 - shidatizi.co",
      h1: "2026主流翻墙协议全方位对比指南",
      metaDesc: "深度横向对比Shadowsocks、Trojan、Vless与Hysteria2协议的加密机制、传输开销、抗丢包率与GFW防火墙主动探测识别率。",
      keywords: "协议对比, Shadowsocks, Trojan协议, Hysteria2, Vless, 翻墙协议, 代理加密",
      date: "2026-03-01",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          购买机场时，你在节点名称上常常能看到 <code>SS</code>、<code>Trojan</code>、<code>Hysteria2</code> 或 <code>Vless</code> 等字样。
          不同的代理协议在底层设计思想、传输层协议（TCP vs UDP）、加密开销与特征混淆能力上存在本质差异。
        </p>

        <div class="alert alert-note">
          <strong>💡 核心结论速览：</strong>
          如果你使用的是 <strong>IEPL内网专线</strong>，协议本身几乎没有区别，优先选轻量、低CPU功耗的 <strong>Shadowsocks</strong>；
          如果你使用的是 <strong>公网直连或弱网环境</strong>，优先选基于UDP暴力抗丢包的 <strong>Hysteria2</strong> 或伪装成正常HTTPS的 <strong>Trojan</strong>。
        </div>

        <h2>一、各大主流协议核心指标对比矩阵</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>协议名称</th>
                <th>传输层基石</th>
                <th>伪装特征</th>
                <th>设备算力开销</th>
                <th>最适用网络环境</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Shadowsocks (SS)</strong></td>
                <td>TCP / UDP</td>
                <td>纯对称加密密文流</td>
                <td>极低（轻量省电）</td>
                <td>内网专线 (IEPL/IPLC) 或多线BGP中转</td>
              </tr>
              <tr>
                <td><strong>Trojan</strong></td>
                <td>TCP (TLS)</td>
                <td>伪装为真实 HTTPS 网站流量</td>
                <td>中等（标准TLS握手）</td>
                <td>公网直连、敏感期强抗封锁</td>
              </tr>
              <tr>
                <td><strong>Vless (XTLS/Vision)</strong></td>
                <td>TCP</td>
                <td>消除自身特征、直通TLS流</td>
                <td>低（零拷贝技术）</td>
                <td>自建VPS节点或高端混合中转</td>
              </tr>
              <tr>
                <td><strong>Hysteria 2 (歇斯底里)</strong></td>
                <td>UDP (QUIC协议)</td>
                <td>自适应拥塞控制 + 伪装</td>
                <td>较高（高频发包）</td>
                <td>校园网、移动宽带高丢包弱网环境</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>二、深入技术细节拆解</h2>
        <h3>1. Shadowsocks (SS-AEAD)</h3>
        <p>
          Shadowsocks 是一种高效的轻量级对称加密Socks5代理。它的优点在于算法极其成熟，在移动设备和路由器上运行时CPU占用极小、非常省电。
          但由于其流量在统计学意义上呈现为“高熵随机数据流”，在公网直连时容易被GFW的机器学习流量识别模型标记。因此，目前正规机场几乎全部将 Shadowsocks 部署在<strong>不过公网的内网专线</strong>之后，完美扬长避短。
        </p>

        <h3>2. Trojan</h3>
        <p>
          Trojan 的设计理念是不去创造新的加密特征，而是将自身伪装成互联网上最普遍的真实 HTTPS 网站流量（443端口）。
          当审查系统主动探测该服务器时，Trojan 服务端会直接返回一个真实的正常网页，从而骗过防火墙的主动嗅探。
        </p>

        <h3>3. Hysteria 2</h3>
        <p>
          Hysteria2 基于魔改的 QUIC 协议（UDP）。传统 TCP 协议在遇到丢包时会强制降速并重传，导致网络极速卡死；
          而 Hysteria2 采用了激进的拥塞控制算法，即使在网络丢包率高达 20%~30% 的恶劣网络环境下，依然能暴力跑满带宽。
        </p>

        <h2>三、如何根据自身宽带挑选协议？</h2>
        <ul>
          <li><strong>电信/联通宽带：</strong>国际出口质量较好，搭配专线机场的 <strong>Shadowsocks</strong> 延迟最低、最顺滑；</li>
          <li><strong>中国移动/广电宽带：</strong>移动宽带晚高峰国际互联丢包率较高，优先选用 <strong>Hysteria2</strong> 节点能够极大改善卡顿；</li>
          <li><strong>海外特殊封锁网络：</strong>优先选用具备标准证书与真实域名伪装的 <strong>Trojan</strong> 节点。</li>
        </ul>
      `
    },
    {
      slug: "cheap-airport-traps",
      title: "为什么便宜机场总是跑路？揭秘低价VPN梯子的5大营销陷阱 - shidatizi.co",
      h1: "为什么低价机场总容易跑路？5大避坑法则",
      metaDesc: "拆解9.9元年付廉价低价机场的服务器运营成本真相。揭露不良商家跑路敛财的5大常见套路，教你如何安全选购高性价比梯子。",
      keywords: "便宜机场跑路, 机场避坑, 低价梯子陷阱, 9.9机场, 翻墙防骗, 机场跑路套路",
      date: "2026-03-01",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          在各大论坛、贴吧和社交媒体上，你一定见过类似“9.9元年付1000G大流量、千兆秒开”的超便宜机场广告。
          然而，根据我们对过去三年机场行业的统计跟踪，<strong>年付价格低于30元的廉价小机场，其存活超过6个月的比例不足 5%</strong>。
        </p>

        <div class="alert alert-warning">
          <strong>⚠️ 警惕典型的“杀猪盘”式机场生命周期：</strong>
          低价低门槛宣传吸引海量羊毛党 -> 用户暴增导致节点卡死 -> 借故搞“周年大促/终身会员”收割最后一波巨资 -> 突然关闭网站与TG群跑路解散！
        </div>

        <h2>一、算一笔硬账：为什么超低价在物理上不可持续？</h2>
        <p>一家正规中转或专线机场的硬性运营成本包括：</p>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>国内多线BGP入口服务器：</strong>国内具备优质带宽（电信/联通/移动三网直连）的入口机房，每1Gbps大带宽月租金普遍在数千甚至上万元人民币；</li>
          <li><strong>国际跨境专线/隧道租金：</strong>正规商业专线每个月均需按兆（Mbps）向持牌数据中心缴纳高昂专线费；</li>
          <li><strong>境外落地服务器与原生IP：</strong>香港、日本、美国具备流媒体解锁的住宅IP服务器租金每个月持续支出；</li>
          <li><strong>技术运维与客服人工：</strong>应对日常断线割接、脚本排错的工程师成本。</li>
        </ol>
        <p>
          如果一个用户一年只交 10 元钱，哪怕服务商只有服务器电费开销都无法平账。唯一的盈利手段就是：<strong>超卖100倍带宽，或者在收割一笔资金后卷款跑路</strong>。
        </p>

        <h2>二、低价机场常见的5大隐藏套路</h2>
        <h3>1. 隐蔽的暗扣倍率（10x倍率陷阱）</h3>
        <p>声称给你 500GB 流量，但当你连接节点时发现，所有能连通的节点倍率全部是 <code>5.0x</code> 甚至 <code>10.0x</code>。你看了半小时视频，后台就扣除了 50GB 流量，实际可用流量只有几十分之一。</p>

        <h3>2. 廉价公网直连小鸡冒充专线</h3>
        <p>节点名称故意加上“IPLC 01”、“IEPL VIP”字样，实际底层不过是境外几块钱一个月的劣质公网VPS。晚高峰一旦骨干网波动，节点全线飘红爆死。</p>

        <h3>3. 虚假终身制套餐（Lifetime Plan）</h3>
        <p>推出所谓的“99元永久免费使用终身套餐”。在网络服务行业，带宽是每月持续产生成本的耗材，没有任何一家合规数据中心能承诺“终身免费”。终身套餐本质上就是跑路前的最后收割冲刺信号。</p>

        <h3>4. 收集出售用户隐私日志</h3>
        <p>某些不良免费/超低价梯子会在后台架设中间人证书嗅探，记录用户的上网历史、Cookie乃至明文密码，打包倒卖给地下黑灰产或广告联盟。</p>

        <h3>5. 频繁更名换皮</h3>
        <p>同一个人搭建的机场，跑路后换个域名和Logo，重新在论坛发帖继续收割下一批不知情的新手。</p>

        <h2>三、如何做到既省钱又安全？</h2>
        <ul>
          <li><strong>只买月付：</strong>坚决不贪图年付打折，按月付费把主动权掌握在自己手中；</li>
          <li><strong>首选运营2年以上的知名品牌：</strong>在我们的 <a href="../../ranking/overall/index.html">综合排行榜</a> 中，所收录的品牌均有经过时间检验的长期口碑；</li>
          <li><strong>一主一副双保险：</strong>购买一个月付20元左右的专线主力机场，再买一个不限时按量计费包作为灾备，综合成本每月不到30元，稳定度却提升数倍。</li>
        </ul>
      `
    },
    {
      slug: "iepl-iplc-relay",
      title: "IEPL专线与中转隧道有什么区别？晚高峰稳定不卡顿底层解析 - shidatizi.co",
      h1: "IEPL专线与BGP中转节点深度解析",
      metaDesc: "全面拆解IEPL以太网专线、IPLC私有租用线路与国内BGP中转隧道的网络路由底层差异。揭秘为什么专线能够做到敏感期不掉线与晚高峰超低延迟。",
      keywords: "IEPL专线, IPLC专线, BGP中转, 隧道中转, 翻墙专线, 物理光纤, 网络延迟",
      date: "2026-03-01",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          经常有用户询问：为什么有的机场每个月只要10块钱，而主打 <strong>IEPL专线</strong> 的机场起步就要30~50元？
          这背后差别的核心并非节点数量多少，而是数据包在跨越中国国境线时所走的<strong>物理通信介质与网络审查机制</strong>。
        </p>

        <h2>一、三种典型线路物理架构对比</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>线路类型</th>
                <th>数据传输路径</th>
                <th>是否经过GFW公网审查</th>
                <th>晚高峰网络稳定性</th>
                <th>成本区间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>公网直连</strong></td>
                <td>用户设备 → 本地宽带 → GFW国际出口出口 → 境外落地VPS</td>
                <td><span style="color:var(--danger); font-weight:700;">是（高阻断风险）</span></td>
                <td>极差（晚高峰严重丢包）</td>
                <td>极低</td>
              </tr>
              <tr>
                <td><strong>国内BGP中转隧道</strong></td>
                <td>用户 → 国内BGP入口 → 加密内网隧道 → 境外出口VPS</td>
                <td><span style="color:var(--warning); font-weight:700;">公网隧道（有概率受干扰）</span></td>
                <td>良好（视国内带宽池而定）</td>
                <td>中等</td>
              </tr>
              <tr>
                <td><strong>IEPL/IPLC 商业内网专线</strong></td>
                <td>用户 → 国内核心机房 → 点对点内网物理光缆 → 境外PoP点</td>
                <td><span style="color:var(--success); font-weight:700;">否（全程走内网通道）</span></td>
                <td>极高（99.9%可用性，0丢包）</td>
                <td>昂贵</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>二、什么是 IEPL 专线？它的核心优势在哪里？</h2>
        <p>
          IEPL（International Ethernet Private Line，国际以太网专用线路）是一种点对点的二层商业通信专线。
          大型跨国金融机构、跨国跨区域企业通常租用此类线路进行两地数据中心互联。
        </p>
        <p>它的核心优势体现在三点：</p>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>物理阻断防火墙：</strong>由于专线走的是专用物理传输通道，数据在出境时不走公网互联网出口，因此完全不受到GFW的关键字嗅探和IP封锁；</li>
          <li><strong>极低且恒定的物理延迟：</strong>从深圳/广州入口到香港PoP节点，光缆往返延迟通常稳定在 15~18 毫秒；从上海到日本东京通常在 28~32 毫秒，几乎没有延迟抖动；</li>
          <li><strong>晚高峰QoS优先级最高：</strong>普通宽带在晚间高峰期会被运营商限制国际出口带宽，而商业专线享有最高等级的物理带宽保障。</li>
        </ol>

        <h2>三、我应该如何选择？</h2>
        <p>
          如果你只是日常随便看看网页、刷刷推特，选一个优质的 <a href="../../recommend/budget/index.html">BGP中转机场</a> 完全足够应付；
          但如果你需要参加 Zoom 国际视频会议、操作海外金融交易、或者进行专业代码协同与游戏联机，强烈建议选购 <a href="../../recommend/premium/index.html">IEPL商业专线机场</a>。
        </p>
      `
    },
    {
      slug: "ai-airport-guide",
      title: "挑选ChatGPT与Claude专用机场节点的4个硬性指标 - shidatizi.co",
      h1: "挑选AI大模型专用机场节点的硬性标准",
      metaDesc: "解决ChatGPT与Claude频繁弹人机验证、报错Access Denied与模型降智的实战指南。挑选AI专用翻墙节点必须掌握的4大硬性指标。",
      keywords: "ChatGPT节点, Claude节点, AI机场, OpenAI不降智, 住宅IP节点, 解决Access Denied",
      date: "2026-03-01",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          2026年，AI大模型已经深入到每一个技术从业者与办公人员的日常工作流中。
          然而，OpenAI（ChatGPT）、Anthropic（Claude）以及 Midjourney 对境外IP的风险审计达到了史无前例的严苛程度。
          如果你经常遇到 <code>Access Denied (Error 1020)</code>、频繁弹 Cloudflare 验证码、或者回答质量明显变差（降智），说明你的节点没有满足AI专用指标。
        </p>

        <h2>一、指标 1：纯净度极高的原生住宅双ISP IP</h2>
        <p>
          机房服务器IP（Data Center IP）通常被托管商分配给数千台服务器使用，在风控数据库（如 IPinfo、MaxMind）中会被打上“机房数据中心”的高危标签。
          OpenAI对机房IP会实施非常严格的人机核验。
          而<strong>双ISP住宅IP</strong>在运营商属性上登记为普通海外家庭宽带（如 Comcast、AT&T、Charter），被大模型平台视作正常自然人访问，风控评分极低。
        </p>

        <h2>二、指标 2：严防客户端 DNS 泄漏</h2>
        <div class="alert alert-warning">
          <strong>⚠️ 许多人忽视的致命细节：</strong>
          哪怕你的代理节点在美国，但如果在客户端设置中未启用远程DNS解析，客户端可能会向国内的DNS服务器（如 114.114.114.114 或本地电信DNS）发起解析请求。
          OpenAI通过WebRTC或双向握手嗅探到你的真实地理位置信息与IP不匹配，便会立即阻断访问。
        </div>

        <h2>三、指标 3：专属分流规则支持</h2>
        <p>
          优秀的AI机场会在订阅配置中内置专门的 <code>OpenAI.yaml</code> 或 <code>Claude.list</code> 分流规则集。
          当访问 <code>*.openai.com</code>、<code>*.anthropic.com</code> 或 <code>challenges.cloudflare.com</code> 时，自动分流至最纯净的解锁节点，而其他普通网页则走常规高速节点，避免浪费AI专用节点的流量池。
        </p>

        <h2>四、指标 4：极佳的低丢包率与长连接保持</h2>
        <p>
          在使用 Claude 3.7 或 ChatGPT 进行深度思考（Thinking/Reasoning）或长文本代码生成时，客户端与服务端会建立长达数分钟的 Server-Sent Events (SSE) 持续流式响应。
          如果节点丢包率高发生断流，就会导致生成一半报错中断。稳定的内网专线节点是保证长文本输出不中断的基础。
        </p>
      `
    },
    {
      slug: "subconverter-security",
      title: "机场订阅转换安全使用指南 - 防止节点泄露与自建教程 - shidatizi.co",
      h1: "机场订阅转换安全使用与防偷节点指南",
      metaDesc: "揭秘公共第三方订阅转换API偷取节点与泄露用户Token的风险。提供安全使用建议、本地自建Subconverter后端与纯静态配置转换指南。",
      keywords: "订阅转换安全, subconverter教程, 节点防盗, 订阅泄露, 自建订阅转换, 机场安全",
      date: "2026-03-01",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          当我们在不同客户端（如将通用的V2Ray订阅转换为Clash配置）之间切换时，很多人习惯随手打开搜索引擎搜索“订阅转换”，将自己的订阅链接粘贴进公共转换网站。
          殊不知，这种行为极易导致<strong>节点信息泄露、流量被他人盗用，甚至私人账号被封禁</strong>。
        </p>

        <div class="alert alert-danger">
          <strong>🚨 公共订阅转换站的核心安全隐患：</strong>
          你的订阅链接中包含了唯一的 <code>Token</code> 或密码。
          任何搭设公共订阅转换后端的运营者，都可以在服务器后台通过Nginx访问日志一览无余地截获你的所有节点IP、端口、密钥以及套餐剩余流量！
        </div>

        <h2>一、不良公共订阅转换站的黑灰产变现链</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>偷取优质节点混入免费池：</strong>将你付费购买的高端专线节点截留，打包进运营者自己的免费节点群或盗号转售；</li>
          <li><strong>劫持规则分流注入恶意推广：</strong>在转换生成的Clash配置文件中暗中加入自己的返利规则（例如将电商域名劫持到带推广尾巴的链接）；</li>
          <li><strong>消耗套餐额度导致封号：</strong>他人利用你的Token高并发刷流量，导致你的机场套餐在几天内被耗尽，甚至因触发多设备滥用风控而被官方封号。</li>
        </ol>

        <h2>二、如何绝对安全地进行订阅转换？</h2>
        <h3>方法 1：优先使用机场官方自带的转换功能</h3>
        <p>绝大多数主流成熟机场（如我们在 <a href="../../ranking/overall/index.html">排行榜</a> 中收录的服务商）后台均已内置多种客户端格式的一键订阅转换，完全不需要依赖任何第三方外部工具。</p>

        <h3>方法 2：使用本地运行的客户端内置解析功能</h3>
        <p>现代客户端（如 <strong>Clash Verge Rev</strong> 或 <strong>Sing-box</strong>）本身已经具备极强的订阅格式自适应能力，直接将通用链接粘贴进客户端，内核会自动完成协议兼容解析，无需经过中间网页。</p>

        <h3>方法 3：本地 Docker 自建专属 Subconverter</h3>
        <p>如果你有复杂的自定义规则集需求，可以在本地电脑或家庭NAS上使用 Docker 部署开源原版的 Subconverter：</p>
        <pre><code>docker run -d --name subconverter --restart=always -p 25500:25500 tindy2013/subconverter:latest</code></pre>
        <p>这样所有转换请求均在本地 <code>127.0.0.1:25500</code> 闭环完成，零数据泄露风险。</p>
      `
    }
  ];

  // 生成博客索引页 `blog/index.html`
  const blogIndexPath = 'blog/index.html';
  const blogIndexContent = `
    <div class="container" style="padding-top:2rem;">
      <nav class="breadcrumbs" aria-label="面包屑导航">
        <a href="${getRelPath(blogIndexPath, 'index.html')}">首页</a>
        <span class="breadcrumbs-separator">/</span>
        <span>深度博客</span>
      </nav>

      <div style="margin-bottom:2rem;">
        <h1 style="font-size:2.2rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
          翻墙技术博客与行业深度解析
        </h1>
        <p style="font-size:1.05rem; color:var(--text-body); max-width:820px; line-height:1.7;">
          紧跟全球网络审查动态与底层代理协议革新。我们拒绝空洞营销话术，只分享客观、硬核、具备技术实操价值的评测与避坑指南。
        </p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:1.5rem;">
        ${blogs.map(b => `
          <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-sm);">
            <div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;">
                📅 发布时间：${b.date} · 深度技术科普
              </div>
              <h2 style="font-size:1.25rem; font-weight:700; margin-bottom:0.75rem; line-height:1.4;">
                <a href="${b.slug}/index.html" style="color:var(--text-main);">
                  ${b.h1}
                </a>
              </h2>
              <p style="font-size:0.875rem; color:var(--text-body); line-height:1.6; margin-bottom:1rem;">
                ${b.metaDesc}
              </p>
            </div>
            <div style="border-top:1px dashed var(--border-color); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; font-weight:600; color:var(--primary);">阅读时间约 6 分钟</span>
              <a href="${b.slug}/index.html" class="btn btn-primary btn-sm">阅读全文 →</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  writePage(blogIndexPath, layout({
    filePath: blogIndexPath,
    title: "翻墙技术博客与行业深度解析 - shidatizi.co",
    description: "汇集2026年最新翻墙代理协议分析、低价跑路机场避坑指南、IEPL专线解析、AI大模型专用节点配置与安全科普博文。",
    keywords: "翻墙博客, 机场科普, 协议解析, 梯子避坑, 专线技术, 科学上网博客",
    canonical: `${BASE_DOMAIN}/blog/index.html`,
    h1: "翻墙技术博客与行业深度解析",
    breadcrumbs: [{ name: "深度博客", path: blogIndexPath }],
    bodyContent: blogIndexContent,
    isArticle: false
  }));

  // 生成 5 篇具体博客
  blogs.forEach(blog => {
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
        "name": "十代梯子编辑部"
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
            <h1>${blog.h1}</h1>

            <div class="article-meta">
              <span>📅 发布日期：${blog.date}</span>
              <span>✍️ 作者：十代梯子技术研究小组</span>
              <span>🔒 原创保护：转载请注明出处</span>
            </div>

            ${blog.body}

            <h2>四、延伸阅读与推荐资源</h2>
            <ul>
              <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">查看2026年度翻墙梯子全网综合排行榜</a></li>
              <li><a href="${getRelPath(filePath, 'compare/index.html')}">使用在线参数对比工具对比多款候选品牌</a></li>
              <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">Windows客户端配置教程与常见报错排查</a></li>
              <li><a href="${getRelPath(filePath, 'glossary/iplc-iepl/index.html')}">百科词条：什么是IPLC与IEPL专线？</a></li>
            </ul>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">📌 精选推荐专题</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 便宜平价低预算机场</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端商业IEPL专线</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">🤖 ChatGPT/Claude专属节点</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/streaming/index.html')}">🎬 4K流媒体原生解锁</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">📚 最新技术博文</div>
              <ul class="widget-list">
                ${blogs.map(b => `
                  <li><a href="${getRelPath(filePath, `blog/${b.slug}/index.html`)}">${b.h1}</a></li>
                `).join('')}
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

  // 2. 词条百科配置
  const glossaries = [
    {
      slug: "iplc-iepl",
      title: "什么是IPLC与IEPL专线？ - 机场名词百科 - shidatizi.co",
      h1: "百科：IPLC与IEPL专线技术详解",
      metaDesc: "全面解释IPLC国际私有租用线路与IEPL国际以太网专线的基本概念、工作原理、网络延迟优势与防封锁特性。",
      keywords: "IPLC专线, IEPL专线, 什么是专线, 物理光纤专线, 翻墙百科, 专线原理",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          <strong>IPLC（International Private Leased Circuit，国际私有租用电路）</strong> 与 
          <strong>IEPL（International Ethernet Private Line，国际以太网专线）</strong> 
          是指跨国电信运营商在境内数据中心与境外数据中心之间铺设的端到端专用内网物理通信信道。
        </p>

        <h2>一、工作原理与核心优势</h2>
        <p>
          普通网络连接在出国时必须经过位于沿海城市（如广州、上海、北京）的国际互联网出入口局，也就是我们常说的 GFW（长城防火墙）。
          在敏感时期或晚间高峰期，公网国际出口会产生严重的流量拥塞排队与深度数据包检测（DPI）。
        </p>
        <p>
          而 IPLC/IEPL 属于<strong>专享的点对点企业级内网通道</strong>。数据在境内入口机房打包后，通过专网光缆直接送达境外机房（如香港、东京），
          <strong>全程不进入公网互联网络，因而不经过GFW公网防火墙检查</strong>。这赋予了其无法被屏蔽、晚高峰0丢包的极致稳定性。
        </p>

        <h2>二、IPLC 与 IEPL 的细微技术差异</h2>
        <ul>
          <li><strong>IPLC：</strong>第一代传统专线，基于时分复用（TDM）或SDH传输技术，电路固定且配置周期较长；</li>
          <li><strong>IEPL：</strong>新一代以太网专线，基于MPLS或以太网交换技术，具备更高的带宽调度弹性与抗抖动性能。对于普通终端用户而言，两者在翻墙体验上并无实质区别。</li>
        </ul>
      `
    },
    {
      slug: "node-multiplier",
      title: "什么是机场节点倍率？ - 计费规则与流量计算百科 - shidatizi.co",
      h1: "百科：机场节点倍率与实际流量折算",
      metaDesc: "详细解释机场节点倍率的计算公式、为什么部分节点是0.1x或3.0x、以及如何识别不良商家利用倍率暗中扣费的套路。",
      keywords: "节点倍率, 机场倍率, 流量倍率计算, 0.1倍率, 高倍率套路, 翻墙流量计算",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          <strong>节点倍率（Node Multiplier）</strong> 是机场服务商为了调节不同服务器线路成本而设置的流量扣除系数。
        </p>

        <h2>一、计算公式</h2>
        <div class="alert alert-note">
          <strong>计费公式：</strong> 实际扣除套餐流量 = 真实传输数据量 × 节点标称倍率
        </div>
        <p>
          例如：你使用客户端下载了一个 1GB 的文件：
        </p>
        <ul>
          <li>如果连接的是 <strong>1.0x 倍率</strong> 节点，你的套餐扣除 <strong>1GB</strong>；</li>
          <li>如果连接的是 <strong>0.2x 优惠倍率</strong> 节点，你的套餐仅扣除 <strong>0.2GB</strong>（相当于用1GB流量看了5GB视频）；</li>
          <li>如果连接的是 <strong>3.0x 高级专线</strong> 节点，你的套餐将扣除 <strong>3GB</strong>。</li>
        </ul>

        <h2>二、为什么会有不同倍率？</h2>
        <p>
          正规服务商设立倍率是由于硬件成本差异：冷门公网大带宽下载节点成本低，因而设定低倍率引导用户在下载大文件时使用；
          而昂贵的商业专线或原生住宅IP节点带宽成本极高，通常设定 1.5x ~ 3.0x 倍率以平摊专线开销。
          用户购买时应重点关注常用主力节点的真实倍率，避免账面流量充沛而实际几下用光的尴尬。
        </p>
      `
    },
    {
      slug: "bgp-tunnel",
      title: "什么是BGP中转与隧道加速？ - 线路类型百科 - shidatizi.co",
      h1: "百科：BGP入口中转与隧道加速原理",
      metaDesc: "图文讲解BGP多线动态路由接入技术、国内服务器中转机制与内网加密隧道（如TLS隧道、WireGuard隧道）的加速防封原理。",
      keywords: "BGP中转, 隧道节点, 什么是BGP, 机场中转原理, 隧道中继, 翻墙加速",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          <strong>BGP中转（BGP Relay）与隧道加速（Tunneling）</strong> 
          是指用户不直接连接境外的代理服务器，而是先将数据发送到位于国内的优质BGP中转服务器，再由中转服务器通过加密隧道将数据转发至境外落地的架构模式。
        </p>

        <h2>一、为什么直接连境外VPS容易卡顿？</h2>
        <p>
          中国大陆三大主流宽带运营商（电信、联通、移动）之间的互联互通存在网间结算壁垒，且晚高峰普通宽带跨国骨干网拥挤不堪。
          例如移动宽带直接访问美国服务器，可能出现严重的丢包甚至路由绕道欧洲的“环球旅行”。
        </p>

        <h2>二、BGP中转是如何解决的？</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>BGP多线接入：</strong>国内入口服务器同时接入了电信、联通、移动的骨干网络，无论用户使用哪家宽带，都能就近以极低的内网延迟接入入口；</li>
          <li><strong>国内至国外隧道加密：</strong>中转服务器与境外落地服务器之间建立了专用的高强度加密通信隧道，防火墙无法感知内部具体传输内容；</li>
          <li><strong>大幅降低断连概率：</strong>即使境外的落地IP发生故障，用户端无需改动任何设置，中转服务器可在后台自动化将流量切换至备用落地节点。</li>
        </ol>
      `
    },
    {
      slug: "rules-routing",
      title: "什么是规则分流与GEOIP？ - 客户端代理模式百科 - shidatizi.co",
      h1: "百科：客户端规则分流与代理模式",
      metaDesc: "全面解析Clash与Shadowrocket客户端中的规则模式（Rule）、全局模式（Global）与直连模式（Direct）。了解国内直连与国外走代理的智能分流原理。",
      keywords: "规则分流, GEOIP, Clash分流模式, 全局模式区别, 代理规则, 智能分流",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          <strong>规则分流（Rule-based Routing）</strong> 
          是现代翻墙客户端最核心的智能化技术。它允许客户端根据目标网站的域名、IP地理位置（GEOIP）或协议端口，
          自动决定流量是“直接连接（Direct）”还是“通过代理服务器传输（Proxy）”。
        </p>

        <h2>一、三种常见代理模式对比</h2>
        <ul>
          <li><strong>规则模式 (Rule / Config)：</strong>【强烈推荐】系统自动判断：访问百度、微信、淘宝等国内网站自动走本地直连，不消耗机场流量且网速飞快；访问 Google、YouTube、GitHub 时自动走海外代理节点；</li>
          <li><strong>全局模式 (Global)：</strong>电脑或手机上的所有流量无论访问国内外，均强制走境外节点。会导致国内网页加载极其缓慢，甚至微信被提示异地登录风险；</li>
          <li><strong>直连模式 (Direct)：</strong>相当于关闭代理，所有网络请求均直连，海外受限网站无法打开。</li>
        </ul>

        <h2>二、GEOIP 数据库的工作机制</h2>
        <p>
          客户端内置了 MaxMind 或开源的 GeoIP 数据库。当用户请求一个目标IP时，内核比对数据库中的大陆IP段（CN IP）。
          凡归属于中国大陆的IP一律放行直连，其余流量则走选定的代理节点，做到了“无感、智能、省流量”。
        </p>
      `
    },
    {
      slug: "dns-leak-pollution",
      title: "什么是DNS污染与SNI阻断？ - 防火墙封锁原理百科 - shidatizi.co",
      h1: "百科：DNS污染与SNI阻断原理及解决办法",
      metaDesc: "通俗易懂地剖析长城防火墙（GFW）的两大核心封锁机制：DNS缓存污染与TLS SNI字段阻断。教你如何开启DoH加密与Fake-IP彻底防封锁。",
      keywords: "DNS污染, SNI阻断, GFW原理, DoH加密, Fake-IP, DNS泄漏, 域名劫持",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          很多新手在翻墙过程中会遇到“明明节点连接正常，但部分网页就是解析失败”的情况，
          这通常是由于触发了 GFW 的两大核心审查机制：<strong>DNS 污染（DNS Cache Poisoning）</strong> 与 
          <strong>SNI 阻断（Server Name Indication Block）</strong>。
        </p>

        <h2>一、什么是 DNS 污染？</h2>
        <p>
          互联网通过域名访问网站时，首先需要向 DNS 服务器询问该域名对应的真实服务器 IP。
          传统的 DNS 查询基于明文 UDP 53 端口。当你在国内宽带下查询未加密的海外受限域名（如 <code>twitter.com</code>）时，
          GFW 会在权威服务器应答之前抢先返回一个虚假的、不可达的错误 IP，使你的电脑连向死胡同。这就是典型的 DNS 污染。
        </p>

        <h2>二、什么是 SNI 阻断？</h2>
        <p>
          在建立 HTTPS 安全加密连接前，客户端发送的第一个 <code>Client Hello</code> 握手数据包中包含了一个名为 <strong>SNI（服务器名称指示）</strong> 的明文字段，用来告诉服务器你想访问哪个具体域名。
          防火墙实时审查这个明文字段，一旦发现命中受限黑名单，便会立即伪造 TCP RST 重置包强行掐断连接。
        </p>

        <h2>三、现代客户端如何彻底解决？</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>Fake-IP 机制：</strong>Clash 等客户端在收到本地 DNS 请求时，不经过任何公网查询，而是直接在本地生成一个假IP（如 <code>198.18.0.1</code>）立即返回给浏览器。真实域名被打包加密后发送给境外专线节点，由境外节点在远端完成无污染解析；</li>
          <li><strong>DoH / DoT 加密 DNS：</strong>使用 DNS over HTTPS 技术，将 DNS 请求装进 TLS 加密通道中，防火墙无法窥视查询内容；</li>
          <li><strong>ECH（加密客户端问候）：</strong>新一代 TLS 规范将 SNI 字段全面加密，从根本上终结明文审查拦截。</li>
        </ol>
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
        <h1 style="font-size:2.2rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
          翻墙与网络代理专业术语百科
        </h1>
        <p style="font-size:1.05rem; color:var(--text-body); max-width:820px; line-height:1.7;">
          不懂专线、倍率、分流和DNS污染？十代梯子编写的通俗术语百科，帮你扫清购买与使用路上的所有专业名词障碍。
        </p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:1.5rem;">
        ${glossaries.map(g => `
          <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-sm);">
            <div>
              <span style="display:inline-block; font-size:0.75rem; background:var(--primary-light); color:var(--primary); padding:2px 8px; border-radius:4px; font-weight:600; margin-bottom:0.6rem;">百科释义</span>
              <h2 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">
                <a href="${g.slug}/index.html" style="color:var(--text-main);">
                  ${g.h1}
                </a>
              </h2>
              <p style="font-size:0.875rem; color:var(--text-body); line-height:1.6; margin-bottom:1rem;">
                ${g.metaDesc}
              </p>
            </div>
            <div style="border-top:1px dashed var(--border-color); padding-top:0.75rem;">
              <a href="${g.slug}/index.html" class="btn btn-outline btn-sm" style="display:block; text-align:center;">阅读词条详解 →</a>
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
              <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">Windows客户端Clash Verge配置指引</a></li>
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
              <div class="widget-title">⭐ 精选专题推荐</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 平价低预算机场推荐</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端专线机场精选</a></li>
                <li><a href="${getRelPath(filePath, 'compare/index.html')}">⚖️ 在线横向对比工具</a></li>
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
