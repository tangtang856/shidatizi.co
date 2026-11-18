/**
 * 全局机场数据定义
 * 同时支持普通浏览器脚本标签直接引用 (window.AIRPORTS_DATA) 与 ES Module 导入
 */
(function(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    var exp = factory();
    root.AIRPORTS_DATA = exp.airports;
    root.getRankedAirports = exp.getRankedAirports;
    root.getAirportBySlug = exp.getAirportBySlug;
  }
})(typeof self !== 'undefined' ? self : this, function() {
  const airports = [
    {
      id: "tag-internet",
      name: "TAG Internet",
      slug: "tag-internet",
      tagline: "全球覆盖最广的标杆级IEPL专线机场",
      description: "TAG Internet 是一家运营多年的知名老牌高端IEPL内网专线机场，以拥有全球90多个国家和地区的冷门小众节点著称。全节点原生IP支持，流媒体与AI服务解锁率极高。",
      officialUrl: "https://tag-internet.com",
      startingPrice: 160,
      currency: "CNY",
      billingCycle: "季付起",
      effectiveMonthlyPrice: 53.3,
      plans: [
        { name: "个人轻量季付", price: 160, cycle: "季付", bandwidthGB: 250, effectiveMonthlyGB: 83.3, pricePerGB: 0.64, note: "全专线节点，不限速" },
        { name: "个人标准年付", price: 600, cycle: "年付", bandwidthGB: 1200, effectiveMonthlyGB: 100, pricePerGB: 0.50, note: "畅享全球90+地区" },
        { name: "团队特选年付", price: 1400, cycle: "年付", bandwidthGB: 3600, effectiveMonthlyGB: 300, pricePerGB: 0.39, note: "支持多设备高并发" }
      ],
      protocols: ["Shadowsocks", "Trojan"],
      regions: ["香港", "台湾", "日本", "新加坡", "美国", "英国", "德国", "全球90+小众地区"],
      lineType: "IEPL商业内网专线",
      sla: "99.9%",
      deviceLimit: "5台设备",
      aiSupport: ["ChatGPT", "Claude", "Gemini", "Midjourney", "Sora"],
      streamingSupport: ["Netflix", "Disney+", "YouTube 4K/8K", "HBO Max", "BBC iPlayer", "Hulu"],
      advantages: [
        "全球节点覆盖国家超过90个，涵盖大量独家小众地区",
        "全IEPL商业级内网专线，晚高峰时段稳定性极佳",
        "绝大多数节点具备纯净住宅/原生IP属性，AI大模型不易触发风控",
        "运营超5年，口碑成熟，跑路风险相对极低"
      ],
      disadvantages: [
        "不支持月付套餐，起步必须季付或年付，门槛较高",
        "价格在行业中处于高阶梯队，不适合低预算轻度用户",
        "工单响应通常在数小时内，无实时7x24网页即时客服"
      ],
      suitableFor: ["跨境电商与海外外贸从业者", "AI开发者与重度大模型使用者", "海外冷门地区网络需求者", "追求绝对稳定不折腾的用户"],
      sources: ["官方官网公开资费公告", "2026年Q1网络可用性抽检", "用户社群真实工单反馈"],
      lastVerified: "2026-03-01",
      testStatus: "tested",
      overallScore: 9.6,
      valueScore: 8.5,
      stabilityScore: 9.8,
      speedScore: 9.7
    },
    {
      id: "flyingbird",
      name: "FlyingBird (飞鸟机场)",
      slug: "flyingbird",
      tagline: "全BGP中转与IPLC专线平衡之选",
      description: "FlyingBird（飞鸟机场）采用国内多线BGP入口中转以及精选IPLC国际专线，在价格亲民度与线路稳定性之间取得了良好平衡。套餐流量充沛，支持月付且无套路倍率。",
      officialUrl: "https://flyingbird.com",
      startingPrice: 15,
      currency: "CNY",
      billingCycle: "月付",
      effectiveMonthlyPrice: 15,
      plans: [
        { name: "基础月付", price: 15, cycle: "月付", bandwidthGB: 100, effectiveMonthlyGB: 100, pricePerGB: 0.15, note: "1倍率通用中转节点" },
        { name: "进阶月付", price: 30, cycle: "月付", bandwidthGB: 250, effectiveMonthlyGB: 250, pricePerGB: 0.12, note: "含高优先级IPLC专线" },
        { name: "旗舰年付", price: 320, cycle: "年付", bandwidthGB: 3600, effectiveMonthlyGB: 300, pricePerGB: 0.089, note: "年付立省两月资费" }
      ],
      protocols: ["Shadowsocks", "Vmess"],
      regions: ["香港", "台湾", "日本", "新加坡", "美国", "韩国", "英国"],
      lineType: "BGP隧道中转 + IPLC专线",
      sla: "99.5%",
      deviceLimit: "3台设备（可加购）",
      aiSupport: ["ChatGPT", "Claude", "Gemini"],
      streamingSupport: ["Netflix", "Disney+", "YouTube 4K", "Bilibili港澳台"],
      advantages: [
        "支持15元起步的月付模式，新手试错成本极低",
        "全节点大多采用1.0x倍率，不存在暗中偷跑流量扣费",
        "自建国内BGP多线入口，晚高峰电信/联通/移动互通流畅",
        "提供傻瓜式一键客户端订阅支持，小白用户上手快"
      ],
      disadvantages: [
        "极端敏感时期偶尔出现部分热门节点延迟波动",
        "节点国家集中于主流亚太和欧美，小众国家较少",
        "基础套餐设备限制3台，家庭多设备共享需升级更高套餐"
      ],
      suitableFor: ["新手第一次接触翻墙机场的用户", "日常办公查资料与刷社交网络", "预算有限的学生党与中度使用群体"],
      sources: ["官方公开价目表", "编辑实测月度网络监控", "TG官方通知群公告"],
      lastVerified: "2026-03-01",
      testStatus: "tested",
      overallScore: 9.1,
      valueScore: 9.5,
      stabilityScore: 9.0,
      speedScore: 9.1
    },
    {
      id: "kuromis",
      name: "Kuromis (黑猫机场)",
      slug: "kuromis",
      tagline: "专为大模型AI与跨境办公定制的精品专线",
      description: "Kuromis黑猫机场定位于中高端生产力工具，全线采用高冗余IEPL专线，针对OpenAI、Claude、Anthropic等AI平台部署了独立专属住宅IP解锁池，保证不跳验证码、不降智。",
      officialUrl: "https://kuromis.net",
      startingPrice: 35,
      currency: "CNY",
      billingCycle: "月付",
      effectiveMonthlyPrice: 35,
      plans: [
        { name: "微风月付套餐", price: 35, cycle: "月付", bandwidthGB: 150, effectiveMonthlyGB: 150, pricePerGB: 0.23, note: "纯IEPL专线，AI全解锁" },
        { name: "极光月付套餐", price: 68, cycle: "月付", bandwidthGB: 350, effectiveMonthlyGB: 350, pricePerGB: 0.19, note: "含专属低延迟游戏专线" },
        { name: "星空年付套餐", price: 380, cycle: "年付", bandwidthGB: 2400, effectiveMonthlyGB: 200, pricePerGB: 0.158, note: "赠送家庭5设备授权" }
      ],
      protocols: ["Shadowsocks", "Trojan", "Vless"],
      regions: ["香港", "台湾", "日本", "新加坡", "美国", "英国", "澳大利亚", "德国"],
      lineType: "IEPL商业专线",
      sla: "99.8%",
      deviceLimit: "4台设备",
      aiSupport: ["ChatGPT-4o", "Claude 3.7", "Midjourney", "Cursor", "Copilot"],
      streamingSupport: ["Netflix", "Disney+", "YouTube 4K", "Spotify", "Amazon Prime"],
      advantages: [
        "AI专属解锁优化，OpenAI与Claude访问极度丝滑，无Cloudflare死循环盾",
        "全IEPL不过GFW商业专线，对网络封锁免疫力极强",
        "晚高峰丢包率控制在0.5%以内，视频会议与Zoom不掉线",
        "支持现代轻量协议，省电抗干扰"
      ],
      disadvantages: [
        "月付起步35元，相较纯低价廉价中转机场略贵",
        "节点列表按功能分组较细，新手初次使用需要看一眼使用提示",
        "不提供免费试用"
      ],
      suitableFor: ["深度依赖ChatGPT、Claude写代码/做研究的工程师与学者", "跨国远程办公人员", "对网络抖动极其敏感的专业用户"],
      sources: ["服务商公开规格书", "编辑团队连续30天AI接口调用监控", "官方服务状态页"],
      lastVerified: "2026-03-01",
      testStatus: "tested",
      overallScore: 9.4,
      valueScore: 8.9,
      stabilityScore: 9.7,
      speedScore: 9.5
    },
    {
      id: "xixi",
      name: "西西机场 (Xixi Network)",
      slug: "xixi",
      tagline: "极具竞争力的平价大流量备用梯子方案",
      description: "西西机场专注于为大流量消耗用户和低预算群体提供平价网络加速服务。采用大带宽BGP中转与高并发优化，适合看4K超清长视频、大文件同步下载以及作为主力专线之后的第二备用梯子。",
      officialUrl: "https://xixiairport.com",
      startingPrice: 9.9,
      currency: "CNY",
      billingCycle: "月付",
      effectiveMonthlyPrice: 9.9,
      plans: [
        { name: "超值体验款", price: 9.9, cycle: "月付", bandwidthGB: 100, effectiveMonthlyGB: 100, pricePerGB: 0.099, note: "百兆保障，大流量入口" },
        { name: "畅享进阶款", price: 19.9, cycle: "月付", bandwidthGB: 300, effectiveMonthlyGB: 300, pricePerGB: 0.066, note: "含千兆高速节点" },
        { name: "不限时海量包", price: 79, cycle: "一次性", bandwidthGB: 800, effectiveMonthlyGB: 0, pricePerGB: 0.098, note: "按量计费，用完为止" }
      ],
      protocols: ["Shadowsocks", "Trojan", "Hysteria2"],
      regions: ["香港", "日本", "美国", "新加坡", "台湾"],
      lineType: "高带宽BGP隧道中转",
      sla: "98.5%",
      deviceLimit: "2台设备",
      aiSupport: ["ChatGPT（基础版）", "Gemini"],
      streamingSupport: ["YouTube 4K", "Netflix（非自制剧）", "Bilibili海外版"],
      advantages: [
        "起步9.9元/月超低门槛，性价比拉满，适合学生党与预算敏感者",
        "提供不限时按量计费包，适合偶尔出海使用的人士作为备用应急",
        "支持现代Hysteria2协议，在弱网环境下能暴力拉升吞吐量",
        "流量单价低至0.066元/GB，下载大文件不心疼"
      ],
      disadvantages: [
        "重大封锁期或网络高峰期可能出现短暂丢包与线路切换",
        "流媒体解锁偶有漂移，Claude等严控风控的大模型容易提示地区不支持",
        "设备连接数限制较严，超过数量限制会自动切断老连接"
      ],
      suitableFor: ["寻找10元以内超便宜机场的学生与轻度爱好者", "需要备用梯子以防主力专线偶发故障的用户", "大流量YouTube/下载需求者"],
      sources: ["官方官网公开产品清单", "真实月度套餐充值实测", "公开网络路由测绘"],
      lastVerified: "2026-03-01",
      testStatus: "tested",
      overallScore: 8.6,
      valueScore: 9.8,
      stabilityScore: 8.2,
      speedScore: 8.7
    },
    {
      id: "speedcat",
      name: "SpeedCAT (闪电猫)",
      slug: "speedcat",
      tagline: "全专线低延迟电竞与超清流媒体利器",
      description: "SpeedCAT（闪电猫）主打全节点华为云专线与金融级内网低延迟直连。节点针对Steam、外服主机游戏、Twitch以及Netflix 4K杜比视界进行了端到端优化，延迟抖动极低。",
      officialUrl: "https://speedcat.io",
      startingPrice: 28,
      currency: "CNY",
      billingCycle: "月付",
      effectiveMonthlyPrice: 28,
      plans: [
        { name: "闪电灵动月付", price: 28, cycle: "月付", bandwidthGB: 150, effectiveMonthlyGB: 150, pricePerGB: 0.186, note: "全专线千兆直连" },
        { name: "闪电疾速月付", price: 50, cycle: "月付", bandwidthGB: 350, effectiveMonthlyGB: 350, pricePerGB: 0.142, note: "含游戏电竞超低延迟节点" },
        { name: "闪电至尊年付", price: 280, cycle: "年付", bandwidthGB: 2000, effectiveMonthlyGB: 166.6, pricePerGB: 0.14, note: "年付赠额外并发设备" }
      ],
      protocols: ["Shadowsocks", "Trojan"],
      regions: ["香港", "台湾", "日本", "新加坡", "美国", "韩国", "英国", "德国"],
      lineType: "华为云/腾讯云跨境专线",
      sla: "99.7%",
      deviceLimit: "3台设备",
      aiSupport: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
      streamingSupport: ["Netflix 4K", "Disney+ 4K", "YouTube Premium", "Twitch 1080p60", "Dazn"],
      advantages: [
        "专线物理延迟极低，华南地区至香港低至15ms，华东至日本低至35ms",
        "全节点流媒体原生解锁能力强，支持4K秒开与拖动无缓冲",
        "节点在线率高，自动化运维巡检快速剔除故障节点",
        "界面美观，网站及文档指引清晰"
      ],
      disadvantages: [
        "高流量消耗下费用较平价中转略高",
        "年付优惠幅度中等，无超长周期巨幅打折",
        "未提供Clash定制专属客户端，需使用通用开源客户端"
      ],
      suitableFor: ["外服联机游戏玩家与Twitch主播", "4K HDR超清流媒体发烧友", "重视节点Ping延迟与响应速度的用户"],
      sources: ["官方官网实时状态", "编辑游戏联机与ping监控实测", "官方运维频道更新记录"],
      lastVerified: "2026-03-01",
      testStatus: "tested",
      overallScore: 9.3,
      valueScore: 9.0,
      stabilityScore: 9.6,
      speedScore: 9.8
    }
  ];

  function getAirportBySlug(slug) {
    return airports.find(a => a.slug === slug);
  }

  function getRankedAirports(criteria) {
    const list = airports.slice();
    if (criteria === "value") {
      return list.sort((a, b) => b.valueScore - a.valueScore);
    } else if (criteria === "budget") {
      return list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (criteria === "stable") {
      return list.sort((a, b) => b.stabilityScore - a.stabilityScore);
    } else {
      return list.sort((a, b) => b.overallScore - a.overallScore);
    }
  }

  return {
    airports: airports,
    getAirportBySlug: getAirportBySlug,
    getRankedAirports: getRankedAirports
  };
});
