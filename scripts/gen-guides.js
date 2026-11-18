import { layout, writePage, getRelPath, BASE_DOMAIN } from './layout.js';

export function generateGuides() {
  const guidePages = [
    {
      slug: "index",
      path: "guides/index.html",
      title: "VPN与翻墙机场基础指南 - 新手客户端配置与选型全解 - shidatizi.co",
      h1: "VPN与翻墙机场基础入门指南与客户端选型中心",
      metaDesc: "全平台科学上网客户端新手配置中心。覆盖Windows电脑、安卓手机、苹果iPhone/iPad及Mac电脑主流开源代理客户端下载、选型与图文教程。",
      keywords: "翻墙教程, 客户端配置, Clash教程, 小火箭教程, v2ray教程, 翻墙入门, 梯子软件",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          购买了机场套餐之后，你需要一个成熟、安全的客户端软件来加载机场提供的订阅链接，并将网络流量导向优质节点。
          本文档中心汇聚了各大主流操作系统的权威配置流程与排错指南。
        </p>

        <div class="alert alert-note">
          <strong>💡 客户端选择基本原则：</strong>
          只使用开源且经社区审计的客户端，坚决不下载来路不明的破解版或含有后门的“一键加速器”！
        </div>

        <h2>一、各主流操作系统推荐客户端一览</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>操作系统</th>
                <th>首选推荐客户端</th>
                <th>备选方案</th>
                <th>主要特点</th>
                <th>教程入口</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Windows 电脑</strong></td>
                <td>Clash Verge Rev</td>
                <td>v2rayN / Sing-box</td>
                <td>现代化UI界面、支持Tun虚拟网卡、自动分流</td>
                <td><a href="windows/index.html" class="btn btn-outline btn-sm">Windows教程</a></td>
              </tr>
              <tr>
                <td><strong>Android 安卓手机</strong></td>
                <td>Clash Meta for Android (CMFA)</td>
                <td>v2rayNG / Sing-box</td>
                <td>开屏自启、分应用代理（绕过国内APP）、省电优化</td>
                <td><a href="android/index.html" class="btn btn-outline btn-sm">Android教程</a></td>
              </tr>
              <tr>
                <td><strong>iOS (iPhone/iPad)</strong></td>
                <td>Shadowrocket (小火箭)</td>
                <td>Stash / Loon / Quantumult X</td>
                <td>功能全面、性价比高（美区$2.99）、按需连接</td>
                <td><a href="ios/index.html" class="btn btn-outline btn-sm">iOS教程</a></td>
              </tr>
              <tr>
                <td><strong>macOS 苹果电脑</strong></td>
                <td>Clash Verge Rev (Mac版)</td>
                <td>Surge / Sing-box</td>
                <td>原生兼容Apple Silicon芯片、支持增强模式代理终端</td>
                <td><a href="macos/index.html" class="btn btn-outline btn-sm">macOS教程</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>二、新手配置通用三部曲</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li><strong>获取订阅地址：</strong>登录你购买的机场用户后台，在“仪表盘”或“订阅中心”点击复制订阅链接（通常为包含Token的URL）；</li>
          <li><strong>客户端下载与导入：</strong>在对应设备上下载安装官方推荐的客户端，新建配置并粘贴订阅地址，点击保存并下载节点；</li>
          <li><strong>开启系统代理：</strong>在客户端内选择一个延迟较低的节点（如香港或日本），然后将“系统代理”开关打开即可实现顺畅翻墙。</li>
        </ol>

        <h2>三、新手常见报错与自查清单</h2>
        <ul>
          <li><strong>所有节点测速均为 Timeout：</strong>90%是因为本地电脑/手机系统时间误差超过30秒，导致TLS证书握手失效。先开启“自动同步互联网时间”；</li>
          <li><strong>国内网页打不开（如百度、微信转圈）：</strong>检查客户端分流模式是否误设成了“全局代理 (Global)”。将其切回“规则模式 (Rule)”即可；</li>
          <li><strong>浏览器打不开，微信等直连能用：</strong>检查浏览器是否有安装第三方代理扩展（如SwitchyOmega）冲突，建议排查后重试。</li>
        </ul>
      `
    },
    {
      slug: "windows",
      path: "guides/windows/index.html",
      title: "Windows电脑翻墙客户端配置教程 - Clash Verge Rev与v2rayN指南 - shidatizi.co",
      h1: "Windows电脑翻墙客户端配置与使用教程",
      metaDesc: "详细图文指引Windows 10/11系统配置Clash Verge Rev与v2rayN客户端。涵盖订阅导入、系统代理、Tun虚拟网卡游戏代理与常见报错解决。",
      keywords: "Windows梯子教程, Clash Verge教程, v2rayN配置, 电脑翻墙, Windows翻墙软件",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          在 Windows 10 与 Windows 11 环境下，<strong>Clash Verge Rev</strong> 是目前最受推崇的现代代理图形化客户端。
          它拥有现代化的美观界面，深度集成了 Mihomo (Clash.Meta) 核心，并完美支持 Tun 虚拟网卡接管系统全局流量。
        </p>

        <h2>一、下载与安装 Clash Verge Rev</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>访问 Clash Verge Rev 官方 GitHub Releases 仓库（认准开源原版）；</li>
          <li>根据你的电脑CPU架构选择安装包：64位Intel/AMD芯片请下载 <code>Clash.Verge_x64-setup.exe</code>；</li>
          <li>双击运行安装程序，按默认步骤完成安装并启动软件。</li>
        </ol>

        <h2>二、导入机场订阅链接</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>登录你在 <a href="../../index.html">shidatizi.co 推荐的机场</a> 后台，复制你的专属 Clash 订阅链接；</li>
          <li>打开 Clash Verge Rev，在左侧导航栏点击 <strong>订阅 (Profiles)</strong>；</li>
          <li>在顶部的输入框中粘贴刚才复制的订阅 URL，随后点击 <strong>导入 (Import)</strong> 按钮；</li>
          <li>导入成功后，列表会出现对应的配置卡片，右键该卡片点击“选择使用”使之高亮显示。</li>
        </ol>

        <h2>三、选择节点与开启代理</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>点击左侧导航栏的 <strong>代理 (Proxies)</strong> 菜单；</li>
          <li>确保顶部代理模式选择为 <strong>规则模式 (Rule)</strong>（此模式下国内网站直连不耗流量，海外网站走代理）；</li>
          <li>在“节点选择”分组中，展开节点列表，点击右上角的闪电图标进行批量测速，选择一个延迟较低的节点（如香港专线、日本节点）；</li>
          <li>在软件左下角或者“设置”页面，打开 <strong>系统代理 (System Proxy)</strong> 开关；</li>
          <li>打开浏览器访问 Google 或 YouTube，测试是否秒开加载。</li>
        </ol>

        <div class="alert alert-tip">
          <strong>💡 开启 Tun 模式解决外服联机与终端报错：</strong>
          如果你需要打外服游戏、使用Git命令行或某些不遵循Windows系统代理设置的软件，请在 Clash Verge 的“设置”中开启 <strong>Tun 模式 (Tun Mode)</strong>。
          系统会自动安装虚拟网卡，接管电脑所有底层TCP/UDP流量。
        </div>

        <h2>四、Windows 常见疑难杂症</h2>
        <ul>
          <li><strong>关掉软件后电脑连不上网：</strong>这是由于退出软件时未正确关闭“系统代理”。打开 Windows 设置 -> 网络和Internet -> 代理，关闭“使用代理服务器”开关即可立即恢复；</li>
          <li><strong>UWP 应用（如微软商店）无法连接：</strong>在 Clash Verge 设置中点击“Windows UWP 回环代理免疫工具”，全选并保存即可解除微软对本地代理的沙盒限制。</li>
        </ul>
      `
    },
    {
      slug: "android",
      path: "guides/android/index.html",
      title: "安卓手机翻墙客户端配置教程 - Clash Meta与v2rayNG图文指南 - shidatizi.co",
      h1: "安卓手机翻墙客户端配置与节点导入指南",
      metaDesc: "全面讲解Android安卓手机配置Clash Meta for Android (CMFA) 与 v2rayNG。支持分应用代理、绕过国内App、省电白名单与一键测速设置。",
      keywords: "安卓翻墙教程, 手机梯子教程, Clash Meta安卓, v2rayNG教程, 安卓手机科学上网",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          在 Android 设备上，推荐使用 <strong>Clash Meta for Android (CMFA)</strong> 或 <strong>v2rayNG</strong>。
          本教程以支持现代协议最好、分应用代理极其完善的 Clash Meta 为例进行演示。
        </p>

        <h2>一、安装 Clash Meta for Android</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>通过官方 GitHub Releases 下载最新的 <code>.apk</code> 安装包（一般推荐 <code>arm64-v8a</code> 版本）；</li>
          <li>在安卓系统设置中允许安装未知来源应用，完成安装并打开应用。</li>
        </ol>

        <h2>二、配置机场订阅链接</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>登录你在 <a href="../../recommend/budget/index.html">推荐机场</a> 的后台，复制 Clash 订阅地址；</li>
          <li>进入 CMFA 应用主界面，点击 <strong>配置 (Profiles)</strong>；</li>
          <li>点击右上角加号 <code>+</code>，选择 <strong>URL导入</strong>；</li>
          <li>名称随意填写（如“我的专线机场”），URL粘贴你的订阅地址，自动更新间隔建议设置为 1440 分钟（24小时）；</li>
          <li>点击右上角保存图标，软件会自动下载节点列表。下载完成后点击该配置使其生效。</li>
        </ol>

        <h2>三、启用分应用代理（绕过国内App防耗电）</h2>
        <div class="alert alert-note">
          <strong>📌 强烈建议设置：</strong>
          国内很多金融类、社交类APP检测到VPN代理连接时可能报错或增加耗电。
          进入 CMFA -> 设置 -> 网络 -> <strong>分应用代理 (Access Control)</strong>：
          选择“仅允许选中的应用走代理”（勾选 Chrome、YouTube、Twitter、Telegram、ChatGPT等），国内APP则完全不受影响。
        </div>

        <h2>四、启动与测速</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>返回应用主界面，点击中央的 <strong>启动 (Stopped)</strong> 按钮；</li>
          <li>系统会弹窗提示“是否允许建立VPN连接”，点击“确定”；</li>
          <li>点击 <strong>代理 (Proxy)</strong> 页面，点击右下角测速图标，挑选延迟低于100ms的绿色节点；</li>
          <li>顶部状态栏出现钥匙/VPN图标，即代表科学上网连接成功。</li>
        </ol>
      `
    },
    {
      slug: "ios",
      path: "guides/ios/index.html",
      title: "iPhone苹果手机翻墙客户端教程 - Shadowrocket小火箭与Stash配置 - shidatizi.co",
      h1: "iPhone与iPad苹果客户端Shadowrocket配置教程",
      metaDesc: "详细指引苹果iOS设备（iPhone与iPad）安装使用Shadowrocket（小火箭）客户端。美区Apple ID获取、一键扫码导入订阅与按需连接设置。",
      keywords: "小火箭教程, Shadowrocket配置, 苹果手机翻墙, iOS翻墙教程, iPhone梯子",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          在 iOS 生态下，<strong>Shadowrocket（俗称“小火箭”）</strong> 是最经典、普及度最高且维护最频繁的科学上网客户端。
          由于众所周知的政策原因，Shadowrocket 在中国大陆区 App Store 已下架，需使用非国区（如美区、港区）Apple ID 购买下载。
        </p>

        <h2>一、准备工作：非国区 Apple ID</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>准备一个美区或港区 Apple ID（可自行在苹果官网注册，或在第三方可信平台购买礼品卡兑换）；</li>
          <li>打开 iPhone 自带的 <strong>App Store</strong>，退出当前国区账号，登录你的非国区账号；</li>
          <li>搜索 <code>Shadowrocket</code>（注意认准开发者为 <strong>PanGu GmbH</strong>，图标为一个发射的小火箭，售价为 $2.99 美元，切勿下载盗版山寨应用）；</li>
          <li>下载安装完成后，退出外区ID并换回你平时使用的国区ID，已下载的小火箭仍可正常永久使用。</li>
        </ol>

        <h2>二、一键导入机场订阅</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>用手机自带 Safari 浏览器登录你的 <a href="../../ranking/overall/index.html">机场后台</a>；</li>
          <li>点击“一键导入 Shadowrocket”或复制专属订阅链接；</li>
          <li>若点击一键导入，系统会自动唤醒小火箭并自动填充保存；</li>
          <li>若是手动复制，打开小火箭，点击右上角加号 <code>+</code>，类型选择 <strong>Subscribe</strong>，在 URL 中粘贴链接并保存。</li>
        </ol>

        <h2>三、路由设置与启动</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>在小火箭主界面，将“全局路由”设定为 <strong>配置 (Config)</strong>（相当于规则分流，绝不能选“全局”）；</li>
          <li>在节点列表中勾选一个节点，最上方开启连接开关；</li>
          <li>首次启动会弹出 iOS 系统权限提示：“Shadowrocket 想要添加 VPN 配置”，点击“允许”并输入手机锁屏密码；</li>
          <li>屏幕右上角出现 <strong>VPN</strong> 小方块图标，打开 Safari 浏览海外网站即可。</li>
        </ol>

        <div class="alert alert-tip">
          <strong>💡 开启按需连接（息屏省电）：</strong>
          进入小火箭 -> 设置 -> 按需连接，开启此选项后，手机在息屏或休眠时不会保持持续心跳，能极大延长iPhone电池续航。
        </div>
      `
    },
    {
      slug: "macos",
      path: "guides/macos/index.html",
      title: "Mac苹果电脑翻墙客户端教程 - Clash Verge与Sing-box指南 - shidatizi.co",
      h1: "macOS系统翻墙客户端配置与优化教程",
      metaDesc: "专为苹果Mac电脑（M1/M2/M3芯片与Intel机型）打造的Clash Verge Rev客户端配置指南。图文拆解订阅导入、增强模式、终端终端命令行代理与DNS优化。",
      keywords: "Mac翻墙教程, Clash Verge Mac, macOS科学上网, 苹果电脑梯子, Mac代理软件",
      body: `
        <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
          对于搭载 Apple Silicon (M1/M2/M3/M4) 系列芯片或 Intel 处理器的 macOS 系统，
          <strong>Clash Verge Rev (Mac版本)</strong> 是目前体验最优秀的客户端，完美兼容系统暗黑模式并具备低功耗特性。
        </p>

        <h2>一、下载与安装指南</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>访问 Clash Verge Rev 官方发布页，下载 <code>.dmg</code> 镜像包：
            <ul>
              <li>M系列芯片（Apple Silicon）：下载 <code>Clash.Verge_aarch64.dmg</code>；</li>
              <li>老款 Intel 芯片：下载 <code>Clash.Verge_x64.dmg</code>。</li>
            </ul>
          </li>
          <li>打开 dmg 镜像，将 Clash Verge 图标拖入 <strong>Applications（应用程序）</strong> 文件夹中；</li>
          <li>若首次打开提示“开发者无法验证”，在系统设置 -> 隐私与安全性 中点击“仍要打开”即可。</li>
        </ol>

        <h2>二、配置订阅与代理</h2>
        <ol style="padding-left:1.25rem; line-height:1.8;">
          <li>打开软件，点击左侧 <strong>订阅 (Profiles)</strong>；</li>
          <li>粘贴你在 <a href="../../recommend/premium/index.html">专线机场推荐</a> 中获取的订阅链接并点击导入；</li>
          <li>在 <strong>代理 (Proxies)</strong> 页面选择 <strong>规则 (Rule)</strong> 模式并选定节点；</li>
          <li>打开“系统代理”开关即可生效。</li>
        </ol>

        <div class="alert alert-note">
          <strong>💡 开发者必备：如何给终端 (Terminal/iTerm2) 加速：</strong>
          默认情况下，Mac 终端命令行中运行 <code>git clone</code> 或 <code>npm install</code> 不会走系统代理。
          你可以进入 Clash Verge 设置，开启 <strong>Tun 模式</strong>，软件会自动接管系统网络栈；或者在终端中运行导出临时代理变量：
          <pre><code>export http_proxy="http://127.0.0.1:7897"
export https_proxy="http://127.0.0.1:7897"</code></pre>
        </div>
      `
    }
  ];

  guidePages.forEach(guide => {
    const filePath = guide.path;
    const isIndex = guide.slug === 'index';

    const breadcrumbs = isIndex 
      ? [{ name: "使用教程", path: "guides/index.html" }]
      : [
          { name: "使用教程", path: "guides/index.html" },
          { name: guide.h1, path: filePath }
        ];

    const bodyContent = `
      <div class="container" style="padding-top:2rem;">
        <nav class="breadcrumbs" aria-label="面包屑导航">
          <a href="${getRelPath(filePath, 'index.html')}">首页</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="${getRelPath(filePath, 'guides/index.html')}">使用教程</a>
          ${!isIndex ? `<span class="breadcrumbs-separator">/</span><span>${guide.h1}</span>` : ''}
        </nav>

        <div class="content-layout">
          <article class="prose">
            <h1>${guide.h1}</h1>

            <div class="article-meta">
              <span>📅 更新时间：2026年3月</span>
              <span>💻 适配系统：${guide.slug.toUpperCase()}</span>
              <span>✅ 校验状态：实机测试通过</span>
            </div>

            ${guide.body}

            <h2>五、相关技术与百科延伸阅读</h2>
            <ul>
              <li><a href="${getRelPath(filePath, 'glossary/rules-routing/index.html')}">百科：什么是规则分流与GEOIP？</a></li>
              <li><a href="${getRelPath(filePath, 'glossary/dns-leak-pollution/index.html')}">百科：什么是DNS污染与SNI阻断？</a></li>
              <li><a href="${getRelPath(filePath, 'blog/subconverter-security/index.html')}">进阶：机场订阅转换安全防泄露使用指南</a></li>
              <li><a href="${getRelPath(filePath, 'ranking/overall/index.html')}">排行榜：查看2026全网综合翻墙机场推荐排名</a></li>
            </ul>
          </article>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <div class="widget">
              <div class="widget-title">💻 全平台配置教程导航</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'guides/windows/index.html')}">💻 Windows 客户端配置教程</a></li>
                <li><a href="${getRelPath(filePath, 'guides/android/index.html')}">📱 Android 手机配置教程</a></li>
                <li><a href="${getRelPath(filePath, 'guides/ios/index.html')}">🍏 iOS 小火箭 Shadowrocket 教程</a></li>
                <li><a href="${getRelPath(filePath, 'guides/macos/index.html')}">🖥️ macOS 苹果电脑配置教程</a></li>
                <li><a href="${getRelPath(filePath, 'guides/index.html')}">📖 全平台客户端选型中心</a></li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">⭐ 精选机场推荐</div>
              <ul class="widget-list">
                <li><a href="${getRelPath(filePath, 'recommend/budget/index.html')}">🪙 平价低预算机场推荐</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/premium/index.html')}">💎 高端IEPL专线推荐</a></li>
                <li><a href="${getRelPath(filePath, 'recommend/ai/index.html')}">🤖 ChatGPT/Claude专用节点</a></li>
                <li><a href="${getRelPath(filePath, 'compare/index.html')}">⚖️ 在线横向对比工具</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    const html = layout({
      filePath,
      title: guide.title,
      description: guide.metaDesc,
      keywords: guide.keywords,
      canonical: `${BASE_DOMAIN}/${filePath.replace(/index\.html$/, '')}`,
      h1: guide.h1,
      breadcrumbs,
      bodyContent,
      isArticle: true,
      sidebarLinks: true
    });

    writePage(filePath, html);
  });
}
