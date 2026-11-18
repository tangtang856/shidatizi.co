/**
 * 全站快速本地索引搜索
 * 零外部依赖，极速匹配，根据当前页面层级自动调整相对跳转路径
 */

const SEARCH_INDEX = [
  { title: "2026优质机场推荐与VPN梯子节点评测指南", desc: "首页核心枢纽，涵盖精选高性价比、高端专线及稳定节点", path: "index.html" },
  { title: "高性价比机场推荐排行榜", desc: "深度测算每GB流量单价，便宜好用的VPN梯子月付推荐", path: "ranking/value/index.html" },
  { title: "最稳定机场专线排行榜", desc: "高可用SLA商业IEPL/IPLC专线，晚高峰不卡顿节点推荐", path: "ranking/stable/index.html" },
  { title: "平价低预算机场排行榜", desc: "10元以内超便宜机场梯子，穷鬼套餐与高性价比大流量盘点", path: "ranking/budget/index.html" },
  { title: "综合翻墙VPN与机场推荐榜", desc: "全维度综合评分，适合新手到进阶用户的精选榜单", path: "ranking/overall/index.html" },
  { title: "平价低预算机场推荐专题", desc: "便宜实惠的月付机场推荐与防跑路避坑指南", path: "recommend/budget/index.html" },
  { title: "高端专线IPLC/IEPL机场推荐", desc: "晚高峰4K秒开、低延迟海外游戏与国际会议专线精选", path: "recommend/premium/index.html" },
  { title: "新手入门VPN机场推荐专题", desc: "小白零基础上手，一键导入订阅，简单好用的梯子服务", path: "recommend/beginner/index.html" },
  { title: "稳定优先抗封锁机场推荐", desc: "敏感期高可用、多线中转与内网专线节点精选", path: "recommend/stable/index.html" },
  { title: "ChatGPT与Claude专用AI机场推荐", desc: "原生住宅IP、解除地区限制、不降智、不弹人机验证码", path: "recommend/ai/index.html" },
  { title: "Netflix与Disney+流媒体解锁机场推荐", desc: "支持4K杜比视界、原生解锁YouTube Premium与各大流媒体", path: "recommend/streaming/index.html" },
  { title: "机场横向参数对比工具", desc: "多品牌价格、流量、协议、专线类型一键在线PK对比", path: "compare/index.html" },
  { title: "Windows电脑翻墙客户端配置教程", desc: "Clash Verge Rev、Sing-box与v2rayN电脑端详细图文教程", path: "guides/windows/index.html" },
  { title: "安卓手机翻墙客户端配置教程", desc: "Clash Meta for Android与v2rayNG手机端安装与导入指南", path: "guides/android/index.html" },
  { title: "苹果iOS手机Shadowrocket小火箭教程", desc: "iPhone与iPad配置小火箭、Stash及节点订阅教程", path: "guides/ios/index.html" },
  { title: "Mac苹果电脑翻墙客户端配置教程", desc: "macOS系统配置Clash Verge与Sing-box深度优化指引", path: "guides/macos/index.html" },
  { title: "客户端选型与配置总览", desc: "主流操作系统客户端下载与选型指南", path: "guides/index.html" },
  // 14 家品牌评测
  { title: "隐形人 机场深度评测", desc: "IEPL纯专线架构，144GB月付起，晚高峰零丢包保障，券码: yxr888", path: "review/invisible/index.html" },
  { title: "微风网络 Breezenet 深度评测", desc: "¥8/月超低起步价，享200GB充沛流量，IEPL专线与VLESS协议，券码: weifeng90", path: "review/breezenet/index.html" },
  { title: "浪网 WaveNet 深度评测", desc: "自研客户端优化线路，150GB高品质大流量，9.4分超清流媒体利器", path: "review/wavenet/index.html" },
  { title: "闪跃 FlashLeap 深度评测", desc: "IPLC纯专线外服电竞低延迟，150GB大流量，券码: shanyue", path: "review/flashleap/index.html" },
  { title: "暮光网络 深度评测", desc: "专线节点网络架构，120GB/月充足配额，全面支持VLESS先进协议", path: "review/muguang/index.html" },
  { title: "飞猫云 深度评测", desc: "IEPL/IPLC与优质中转混合调度，年付折算约¥7/月，券码: flycat888", path: "review/flycat/index.html" },
  { title: "无忧 深度评测", desc: "IPLC高速专线，20元以内提供扎实专线保障，券码: wuyou666", path: "review/wuyou/index.html" },
  { title: "灵猫 深度评测", desc: "全IPLC专线覆盖，150GB极速流媒体利器，4K超清秒开", path: "review/lingmao/index.html" },
  { title: "跨界 (跨界云) 深度评测", desc: "全专线架构，120GB月付20元，跨境电商与多设备办公首选", path: "review/kuajie/index.html" },
  { title: "萤火虫 (Firefly) 深度评测", desc: "¥8/月超低起步价，60GB轻量入门神器，券码: firefly", path: "review/firefly/index.html" },
  { title: "梯子云 LadderCloud 深度评测", desc: "优化中转与专线混合，125GB大流量分享，多设备兼容性好", path: "review/laddercloud/index.html" },
  { title: "灵动云 深度评测", desc: "优化节点，100GB简单省心，20元月付门槛适中", path: "review/lingdong/index.html" },
  { title: "全球云 深度评测", desc: "中转优化，120GB日常网络与音视频高性价比，券码: tt88", path: "review/globalcloud/index.html" },
  { title: "飞V 深度评测", desc: "¥4.9超低起步价，100GB大流量与罕见不限时套餐，穷鬼套餐天花板", path: "review/flyv/index.html" },
  // 14 家品牌资料库档案
  { title: "隐形人 机场档案资料库", desc: "隐形人 详细套餐资费与规格参数", path: "airport/invisible/index.html" },
  { title: "微风网络 Breezenet 档案资料库", desc: "微风网络 详细套餐资费与规格参数", path: "airport/breezenet/index.html" },
  { title: "浪网 WaveNet 档案资料库", desc: "浪网 WaveNet 详细套餐资费与规格参数", path: "airport/wavenet/index.html" },
  { title: "闪跃 FlashLeap 档案资料库", desc: "闪跃 FlashLeap 详细套餐资费与规格参数", path: "airport/flashleap/index.html" },
  { title: "暮光网络 档案资料库", desc: "暮光网络 详细套餐资费与规格参数", path: "airport/muguang/index.html" },
  { title: "飞猫云 档案资料库", desc: "飞猫云 详细套餐资费与规格参数", path: "airport/flycat/index.html" },
  { title: "无忧 档案资料库", desc: "无忧链接 详细套餐资费与规格参数", path: "airport/wuyou/index.html" },
  { title: "灵猫 档案资料库", desc: "灵猫 详细套餐资费与规格参数", path: "airport/lingmao/index.html" },
  { title: "跨界云 档案资料库", desc: "跨界 详细套餐资费与规格参数", path: "airport/kuajie/index.html" },
  { title: "萤火虫 档案资料库", desc: "萤火虫 Firefly 详细套餐资费与规格参数", path: "airport/firefly/index.html" },
  { title: "梯子云 档案资料库", desc: "梯子云 LadderCloud 详细套餐资费与规格参数", path: "airport/laddercloud/index.html" },
  { title: "灵动云 档案资料库", desc: "灵动云 详细套餐资费与规格参数", path: "airport/lingdong/index.html" },
  { title: "全球云 档案资料库", desc: "全球云 详细套餐资费与规格参数", path: "airport/globalcloud/index.html" },
  { title: "飞V 档案资料库", desc: "飞V 详细套餐资费与规格参数", path: "airport/flyv/index.html" },
  // 博客
  { title: "Shadowsocks/Trojan/Hysteria2协议对比", desc: "2026主流翻墙协议底层原理、加密与抗封锁能力解析", path: "blog/protocol-comparison/index.html" },
  { title: "为什么便宜机场总跑路？低价梯子防坑指南", desc: "揭秘超低价机场背后的5大营销陷阱与安全防坑守则", path: "blog/cheap-airport-traps/index.html" },
  { title: "IEPL专线与中转隧道有什么区别？", desc: "物理专线与国内BGP中转的底层区别与晚高峰不卡顿原理", path: "blog/iepl-iplc-relay/index.html" },
  { title: "挑选ChatGPT与Claude专用节点的硬性指标", desc: "原生住宅IP、DNS泄漏防护与解决Access Denied实用指南", path: "blog/ai-airport-guide/index.html" },
  { title: "机场订阅转换安全使用指南", desc: "防止订阅链接泄露、保护节点隐私与自建转换后端指南", path: "blog/subconverter-security/index.html" },
  // 百科
  { title: "百科：什么是IPLC与IEPL专线？", desc: "国际点对点专线技术原理、内网跳过GFW机制详解", path: "glossary/iplc-iepl/index.html" },
  { title: "百科：什么是机场节点倍率？", desc: "节点计费倍率、流量折算公式与扣费套路识别", path: "glossary/node-multiplier/index.html" },
  { title: "百科：什么是BGP中转与隧道加速？", desc: "多线入口中转、内网隧道加密与降低延迟的实现方式", path: "glossary/bgp-tunnel/index.html" },
  { title: "百科：什么是规则分流与GEOIP？", desc: "国内直连与国外代理智能分流机制与规则集设置", path: "glossary/rules-routing/index.html" },
  { title: "百科：什么是DNS污染与SNI阻断？", desc: "防火墙常见封锁手段与DoH/DoT加密防污染方案", path: "glossary/dns-leak-pollution/index.html" },
  // 政策
  { title: "关于我们 - shidatizi.co", desc: "网站宗旨、测试原则与团队理念说明", path: "about/index.html" },
  { title: "联系我们", desc: "读者反馈、数据纠错与商务合作渠道", path: "contact/index.html" },
  { title: "编辑政策与评测独立性说明", desc: "恪守客观事实、拒绝虚假测速与商业赞助隔离声明", path: "editorial-policy/index.html" },
  { title: "隐私政策", desc: "严格保护访问隐私、零敏感日志收集说明", path: "privacy-policy/index.html" },
  { title: "免责声明", desc: "合规声明与网络工具技术中立免责", path: "disclaimer/index.html" }
];

document.addEventListener('DOMContentLoaded', () => {
  const rootPrefix = document.body.getAttribute('data-root') || './';
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (!searchInput || !searchResults) return;

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<div style="padding:1rem; text-align:center; color:var(--text-muted); font-size:0.875rem;">输入关键词，如“微风”、“隐形人”、“专线”、“便宜”、“小火箭”...</div>';
      return;
    }

    const matches = SEARCH_INDEX.filter(item => {
      return item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    }).slice(0, 8);

    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.875rem;">未找到与“${query}”相关的页面</div>`;
      return;
    }

    searchResults.innerHTML = matches.map(item => {
      const targetUrl = rootPrefix + item.path;
      return `
        <a href="${targetUrl}" class="search-item">
          <div class="search-item-title">${item.title}</div>
          <div class="search-item-desc">${item.desc}</div>
        </a>
      `;
    }).join('');
  }

  searchInput.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  // 初始提示
  renderResults('');
});
