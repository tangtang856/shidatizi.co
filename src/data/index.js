import { airports, getRankedAirports, getAirportBySlug } from '../../data/airports.js';
import { guidesData } from '../../data/content/guides-data.js';
import { blogsBatch1 } from '../../data/content/blogs-batch1.js';
import { blogsBatch2 } from '../../data/content/blogs-batch2.js';
import { blogsBatch3 } from '../../data/content/blogs-batch3.js';
import { blogsBatch4 } from '../../data/content/blogs-batch4.js';
import { blogsBatch5 } from '../../data/content/blogs-batch5.js';

export const allAirports = airports;
export { getRankedAirports, getAirportBySlug };
export const allGuides = guidesData;
export const allBlogs = [
  ...blogsBatch1,
  ...blogsBatch2,
  ...blogsBatch3,
  ...blogsBatch4,
  ...blogsBatch5
];

export const allGlossaries = [
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
