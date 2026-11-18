/**
 * 30篇全平台客户端与网络配置教程核心数据源
 * 覆盖 Windows, Android, iOS, macOS, 路由器/网关, 电视/主机, 进阶排错
 */

export const guidesData = [
  {
    slug: "windows",
    title: "Windows电脑翻墙客户端配置教程 - Clash Verge Rev与v2rayN指南 - shidatizi.co",
    h1: "Windows 10/11 电脑 Clash Verge Rev 配置与使用完整教程",
    metaDesc: "详细图文指引Windows 10/11系统配置Clash Verge Rev客户端。涵盖订阅导入、系统代理、Tun虚拟网卡接管、游戏低延迟代理与常见报错解决。",
    keywords: "Windows梯子教程, Clash Verge教程, v2rayN配置, 电脑翻墙, Windows翻墙软件, 机场节点配置",
    category: "Windows",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在 Windows 10 与 Windows 11 环境下，<strong>Clash Verge Rev</strong> 是目前最受推崇的现代化代理图形客户端。
        它基于 Tauri 框架打造，内存占用仅几十兆，深度集成了经过社区长期审计的 Mihomo (Clash.Meta) 内核，并原生支持 Tun 虚拟网卡模式。
      </p>

      <div class="alert alert-note">
        <strong>💡 新手前置须知：</strong>
        在配置客户端之前，请先准备好优质的机场节点订阅链接（如
        <a href="../../review/breezenet/index.html">微风网络 Breezenet</a> 或
        <a href="../../review/invisible/index.html">隐形人</a> 等服务商后台获取的 Clash 格式链接）。
      </div>

      <h2>一、软件下载与安装</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>访问官方开源 Releases 页面下载安装包（认准 <code>Clash.Verge_x64-setup.exe</code>）；</li>
        <li>建议右键选择“以管理员身份运行”以确保后续 Tun 网卡驱动能正常安装；</li>
        <li>安装完成后启动软件，首次运行会自动在后台加载内核并释放默认配置。</li>
      </ol>

      <h2>二、导入机场订阅链接</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>点击左侧导航栏的 <strong>「订阅 (Profiles)」</strong> 选项；</li>
        <li>在顶部输入框粘贴你的机场订阅 URL，并在名称处备注机场名称；</li>
        <li>点击右侧 <strong>「保存 (Save)」</strong>，软件将自动发起 HTTP 请求下载最新节点列表；</li>
        <li>右键点击已下载的配置卡片，选择“使用 (Select)”将其设为当前活动配置。</li>
      </ol>

      <h2>三、开启代理与分流模式选择</h2>
      <p>Clash Verge Rev 提供了三种核心运行模式：</p>
      <ul>
        <li><strong>规则模式 (Rule - 推荐)：</strong>自动根据访问的域名分流，国内网站（百度、淘宝、微信）直连不消耗机场流量；国外网站（Google、YouTube、ChatGPT）自动走代理；</li>
        <li><strong>全局模式 (Global)：</strong>电脑上所有流量全部强制走代理节点，可能导致国内 APP 定位异常或速度变慢；</li>
        <li><strong>直连模式 (Direct)：</strong>不走任何代理，相当于直接连公网。</li>
      </ul>

      <h2>四、开启 Tun 虚拟网卡模式（解决游戏与终端不走代理）</h2>
      <p>
        常规系统代理只接管遵循系统 PAC 设置的浏览器等应用，而许多命令行工具（Git、PowerShell）或外服游戏客户端并不走系统代理。
        在左侧点击 <strong>「设置 (Settings)」</strong>，找到 <strong>「Tun 模式 (Tun Mode)」</strong> 并点击安装服务核心，开启开关后，电脑所有网络流量将被虚拟网卡强制接管，实现类似全局 VPN 的极致体验。
      </p>

      <h2>五、常见报错与排查清单</h2>
      <ul>
        <li><strong>节点全部显示 Timeout 超时：</strong>首先校准电脑系统时间。若本地时间与网络时间误差超过30秒，TLS 握手将直接失败；</li>
        <li><strong>开启代理后国内网站打不开：</strong>检查是否误开了“全局模式”，请切换回“规则模式”；</li>
        <li><strong>启动报错 Service Install Failed：</strong>以管理员身份关闭杀毒软件或 Windows Defender 拦截后重新安装服务模式。</li>
      </ul>
    `
  },
  {
    slug: "android",
    title: "安卓手机翻墙客户端配置教程 - Clash Meta for Android指南 - shidatizi.co",
    h1: "Android 安卓手机 Clash Meta for Android (CMFA) 完整配置教程",
    metaDesc: "手把手教你在安卓手机上配置Clash Meta for Android客户端。包含APK下载、订阅导入、分应用代理绕过微信支付宝及省电后台保活设置。",
    keywords: "安卓梯子教程, Android翻墙, Clash安卓教程, CMFA配置, 安卓翻墙软件, 手机科学上网",
    category: "Android",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在 Android 智能手机上，<strong>Clash Meta for Android (简称 CMFA)</strong> 是目前功能最强大、协议支持最全的科学上网工具。
        它基于原版 Clash for Android 深度二次开发，内建了最新的 Mihomo 核心，全面兼容 VLESS、Trojan、Hysteria 2 等前沿协议。
      </p>

      <h2>一、软件获取与安装说明</h2>
      <p>
        由于国内应用商店无法上架代理软件，请务必认准官方 GitHub 开源发布的 APK 安装包（推荐下载 <code>app-universal-release.apk</code> 或 <code>arm64-v8a</code> 版本）。
        安装时若系统提示“来自未知来源应用”，点击允许继续安装即可。
      </p>

      <h2>二、导入订阅与启动连接</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>打开 CMFA 客户端，点击主界面的 <strong>「配置 (Profiles)」</strong>；</li>
        <li>点击右上角 <strong>「+」</strong> 号，选择 <strong>「从 URL 导入 (Import from URL)」</strong>；</li>
        <li>在 URL 栏粘贴机场提供的订阅链接，名称填写机场名（如 <a href="../../review/flycat/index.html">飞猫云</a> 或 <a href="../../review/wuyou/index.html">无忧</a>），设置自动更新间隔为 1440 分钟（每日更新）；</li>
        <li>点击右上角保存图标，返回主界面并选中该配置；</li>
        <li>回到主界面，点击中央的 <strong>「点击启动」</strong> 按钮，在系统弹出的“网络连接请求 (VPN)”窗口中点击确定。</li>
      </ol>

      <h2>三、核心优势：配置“分应用代理”</h2>
      <p>安卓手机最怕翻墙时导致微信断连、支付宝风控或打国内手游延迟高。CMFA 内置了完美的分应用代理机制：</p>
      <ul>
        <li>在软件设置中点击 <strong>「网络 (Network)」→「分应用代理 (Access Control)」</strong>；</li>
        <li>将模式设置为 <strong>「仅代理所选应用」</strong> 或 <strong>「绕过所选应用」</strong>；</li>
        <li>勾选需要走代理的软件（如 YouTube、Chrome、Twitter、Telegram、ChatGPT）；</li>
        <li>其余所有国内 APP 将彻底绕过代理客户端，既省电又绝对不干扰国内生活应用。</li>
      </ul>

      <h2>四、安卓后台保活与省电策略</h2>
      <p>
        部分国产手机系统（如小米 HyperOS、华为 HarmonyOS、vivo OriginOS）后台清理极为激进。
        建议在系统设置中：1. 为 CMFA 开启“自启动权限”；2. 将电池优化设置为“无限制”；3. 在多任务切换界面对 CMFA 卡片进行“加锁”锁定。
      </p>
    `
  },
  {
    slug: "ios",
    title: "苹果手机翻墙客户端配置教程 - Shadowrocket小火箭指南 - shidatizi.co",
    h1: "iOS (iPhone/iPad) 苹果手机 Shadowrocket (小火箭) 完整配置指南",
    metaDesc: "最新iPhone苹果手机Shadowrocket小火箭配置教程。包括美区Apple ID购买下载、扫码/一键导入订阅、分流规则配置与节点延迟测试。",
    keywords: "小火箭教程, Shadowrocket配置, 苹果手机翻墙, iOS梯子教程, iPhone科学上网, 美区Apple ID",
    category: "iOS",
    readTime: "9 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在苹果 iOS 平台上，<strong>Shadowrocket（俗称小火箭）</strong> 是市场占有率最高、操作最友好且性价比最高的网络代理工具。
        它一次性售价为 $2.99 美元，支持全套 Shadowsocks、Trojan、VLESS 以及 Hysteria 协议，是 iPhone 用户的绝对标配。
      </p>

      <div class="alert alert-warning">
        <strong>⚠️ 注意事项：</strong>
        国区 App Store 搜索不到任何代理软件。请切勿直接在 iPhone 系统设置中登录他人给的 iCloud 账号（有锁机风险）！
        <strong>正确方法：仅在 App Store 商店内切换登录海外 Apple ID。</strong>
      </div>

      <h2>一、美区 Apple ID 获取与下载</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>打开系统自带的 <strong>App Store</strong>，点击右上角头像滑到最底部，点击“退出登录”；</li>
        <li>登录准备好的美区/港区 Apple ID（可自行注册或合规购买）；</li>
        <li>搜索 <code>Shadowrocket</code>（注意认准开发者为 Pan Software，图标为浅蓝色小火箭，切勿下载蹭热度的山寨软件）；</li>
        <li>购买并下载完成后，退出海外账号，换回你原本的国内主账号（软件仍可正常使用与更新）。</li>
      </ol>

      <h2>二、导入订阅节点的三种方式</h2>
      <ul>
        <li><strong>方式 1：一键导入（最推荐）：</strong>在 Safari 浏览器中登录你的机场后台（如 <a href="../../review/muguang/index.html">暮光网络</a> 或 <a href="../../review/lingmao/index.html">灵猫</a>），找到“导入到 Shadowrocket”按钮，点击后系统会自动唤醒小火箭并完成节点同步；</li>
        <li><strong>方式 2：扫码导入：</strong>打开小火箭主界面，点击左上角扫码图标，扫描机场后台展示的订阅二维码；</li>
        <li><strong>方式 3：手动添加：</strong>点击小火箭右上角 <strong>「+」</strong>，类型选择 <code>Subscribe</code>，在 URL 处粘贴订阅链接，备注填机场名，点击右上角保存。</li>
      </ul>

      <h2>三、分流模式与开关连接</h2>
      <p>
        在小火箭主界面的 <strong>「全局路由」</strong> 选项中，<strong>强烈建议选择「配置 (Config)」</strong>。
        在配置模式下，小火箭将根据内置的智能分流规则自动识别国内外流量，国内流量直连，海外流量走节点。
        选中延迟最低的节点（点击“连通性测试”可一键测试所有节点 Ping 值），然后打开最顶部的总开关即可开启翻墙！
      </p>
    `
  },
  {
    slug: "macos",
    title: "Mac苹果电脑翻墙客户端配置教程 - Clash Verge Rev Mac版指南 - shidatizi.co",
    h1: "macOS 苹果电脑 Clash Verge Rev 配置与 M 芯片优化指南",
    metaDesc: "专为macOS用户打造的Clash Verge Rev配置指南。针对Apple Silicon M1/M2/M3/M4芯片原生优化，涵盖增强模式、终端代理与菜单栏常驻调优。",
    keywords: "Mac梯子教程, macOS翻墙, Clash Verge Mac, 苹果电脑翻墙, M芯片代理软件, 终端代理配置",
    category: "macOS",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        随着 ClashX 系列进入维护期，<strong>Clash Verge Rev (Mac 版)</strong> 已成为 macOS 平台上的最佳接任者。
        它原生编译支持 Apple Silicon (M1/M2/M3/M4 系列芯片) 与 Intel 架构，界面优美，完美融入 macOS 视窗设计。
      </p>

      <h2>一、软件下载与权限授予</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>访问官方 Releases 页面，M 系列芯片请下载 <code>Clash.Verge_aarch64.dmg</code>；Intel 芯片下载 <code>Clash.Verge_x64.dmg</code>；</li>
        <li>打开 DMG 镜像包，将 Clash Verge 图标拖拽到 <strong>Applications (应用程序)</strong> 文件夹；</li>
        <li>若首次打开提示“无法打开，因为无法验证开发者”，请前往 <strong>系统设置 → 隐私与安全性</strong>，在底部点击“仍要打开”。</li>
      </ol>

      <h2>二、导入配置与开启系统代理</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>启动软件后，在左侧点击 <strong>「订阅」</strong>，粘贴机场提供的 Clash 订阅链接并保存；</li>
        <li>右键激活刚下载的配置，在左侧切换到 <strong>「代理」</strong> 面板，展开节点分组挑选节点；</li>
        <li>在左下角打开 <strong>「系统代理」</strong> 开关，状态变为绿色即代表已成功接管 Safari、Chrome 等浏览器的出海流量。</li>
      </ol>

      <h2>三、macOS 开发者专属：终端 Terminal 走代理</h2>
      <p>日常使用 <code>git clone</code>、<code>brew install</code> 或 <code>npm install</code> 经常遇到 GitHub 连不上的问题。可在 <code>~/.zshrc</code> 中添加以下快捷别名：</p>
      <pre style="background:#1e293b; color:#f8fafc; padding:1rem; border-radius:6px; overflow-x:auto;">
alias proxy="export http_proxy=http://127.0.0.1:7897 https_proxy=http://127.0.0.1:7897 all_proxy=socks5://127.0.0.1:7897"
alias unproxy="unset http_proxy https_proxy all_proxy"
      </pre>
      <p>需要终端走代理时，只需输入 <code>proxy</code> 即可秒级开启，输入 <code>unproxy</code> 即可复原。</p>
    `
  },
  {
    slug: "windows-v2rayn",
    title: "v2rayN 现代版配置全流程与Xray核心深度设置 - Windows电脑教程 - shidatizi.co",
    h1: "Windows 电脑 v2rayN 现代版配置教程与 Xray 核心调优",
    metaDesc: "全面解析Windows系统经典代理利器v2rayN的安装与配置。包含Core核心下载、批量测速、路由规则自定义及开机自启防掉线设置。",
    keywords: "v2rayN教程, Xray核心, Windows科学上网, v2ray订阅, 电脑梯子设置, 代理分流",
    category: "Windows",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>v2rayN</strong> 作为 Windows 生态中历史最悠久、稳定性最高的图形客户端之一，凭借极高的可靠性与强大的手动调试功能，依然深受极客与重度技术用户青睐。
      </p>

      <h2>一、完整软件包获取</h2>
      <p>
        初学者建议下载包含所有 Core 核心的 <code>v2rayN-With-Core.zip</code>。
        解压到非系统盘目录（如 <code>D:\\Software\\v2rayN</code>，注意路径中不要包含中文或空格），双击 <code>v2rayN.exe</code> 启动。
      </p>

      <h2>二、添加订阅与批量 Ping 测速</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>点击顶部菜单栏的 <strong>「订阅分组」→「订阅分组设置」</strong>；</li>
        <li>点击「添加」，备注填写机场名，在「可选地址 (url)」粘贴订阅地址，确认保存；</li>
        <li>回到菜单栏点击 <strong>「订阅分组」→「更新全部订阅 (不通过代理)」</strong>，节点列表瞬间刷新加载；</li>
        <li>按 <code>Ctrl + A</code> 全选所有节点，按下快捷键 <code>Ctrl + R</code> 进行真实网络延迟测速，排查可用节点。</li>
      </ol>

      <h2>三、开启系统代理与路由规则推荐</h2>
      <p>
        在 v2rayN 底部状态栏，找到 <strong>「系统代理」</strong> 下拉框，选择 <strong>「自动配置系统代理」</strong>（右下角托盘图标将由蓝变红）。
        在 <strong>「路由」</strong> 选项中，务必选择 <strong>「绕过大陆 (Whitelist)」</strong> 规则，确保访问国内网络直连。
      </p>
    `
  },
  {
    slug: "windows-singbox",
    title: "Windows电脑Sing-box图形客户端配置与使用指南 - shidatizi.co",
    h1: "Windows 平台 Sing-box 官方图形客户端快速上手指南",
    metaDesc: "Sing-box官方图形客户端在Windows系统的配置教程。体验下一代轻量高性能通用代理平台的极致速度与低内存占用。",
    keywords: "Sing-box教程, Windows Sing-box, 新一代翻墙内核, Singbox配置, 科学上网新协议",
    category: "Windows",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>Sing-box</strong> 作为目前代理协议领域的后起之秀与性能天花板，以纯 Go 语言编写，具备惊人的内存控制能力与超高速的并发吞吐量。
      </p>

      <h2>一、下载安装 Sing-box for Windows</h2>
      <p>
        前往 Sing-box 官方 GitHub 仓库下载预编译好的图形界面安装包 <code>sing-box-windows-amd64.zip</code> 或 Windows MSI 安装包。
        安装完成后启动软件，其界面极其克制优雅。
      </p>

      <h2>二、导入配置与节点选择</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>在机场后台（如 <a href="../../review/flashleap/index.html">闪跃 FlashLeap</a>）获取专门的 Sing-box 订阅链接；</li>
        <li>在客户端 Profiles 面板中点击新建，类型选择 Remote，粘贴订阅链接并完成拉取；</li>
        <li>在 Dashboard 仪表盘选择节点组，开启顶部的「Enable Proxy」即可享受极低开销的出海冲浪。</li>
      </ol>
    `
  },
  {
    slug: "android-v2rayng",
    title: "Android安卓手机v2rayNG基础配置与低内存手机省电分流实战 - shidatizi.co",
    h1: "Android 平台 v2rayNG 基础配置与低内存机型省电实战教程",
    metaDesc: "专为老旧与低配置安卓手机打造的v2rayNG配置教程。详解APK安装、订阅聚合、分流过滤及后台省电策略。",
    keywords: "v2rayNG教程, 安卓轻量梯子, 手机v2ray设置, 安卓省电翻墙, 手机代理软件",
    category: "Android",
    readTime: "6 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        相比功能繁重的 Clash 类软件，<strong>v2rayNG</strong> 的包体积仅有 10MB 左右，运行极为轻巧，是中低端安卓机型与备用机的翻墙不二之选。
      </p>

      <h2>一、订阅配置与节点拉取</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>点击左侧侧边栏 <strong>「订阅分组设置」</strong>，点击右上角「+」号；</li>
        <li>填写备注，粘贴机场 V2Ray 订阅链接，勾选“自动更新”；</li>
        <li>返回主页面，点击右上角三点菜单，选择 <strong>「更新订阅」</strong> 即可刷新全部节点。</li>
      </ol>

      <h2>二、分流模式与连接</h2>
      <p>
        在侧边栏进入 <strong>「设置」</strong>，找到 <strong>「路由设置 (预定义规则)」</strong>，将其更改为 <strong>「绕过局域网及大陆地址 (bypass lan and mainland)」</strong>。
        返回主页，选中一个绿色低延迟节点，点击右下角的圆形 V 标志即可一键连接。
      </p>
    `
  },
  {
    slug: "android-nekobox",
    title: "Android跨协议客户端NekoBox for Android图文配置指南 - shidatizi.co",
    h1: "Android 跨协议全能客户端 NekoBox 配置全攻略",
    metaDesc: "详细介绍NekoBox for Android客户端的配置流程。一套客户端同时完美兼容Sing-box、Xray全协议并支持自定义链式代理。",
    keywords: "NekoBox教程, 安卓全协议代理, 猫盒配置, Hysteria2安卓, 手机跨协议梯子",
    category: "Android",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>NekoBox for Android (猫盒)</strong> 是一款集合了 Sing-box 和 Xray 双核心的强大开源客户端。
        不仅兼容传统的 SS、Trojan，还能原生无损运行 Hysteria 2、TUIC 等新世代 UDP 协议。
      </p>

      <h2>一、配置导入步骤</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>安装 NekoBox 并赋予网络与 VPN 权限；</li>
        <li>点击左上角侧边栏，进入「分组管理」点击添加；</li>
        <li>分组类型选择「订阅」，粘贴机场 URL；</li>
        <li>在主界面长按该分组选择「从网络更新」获取节点。</li>
      </ol>
    `
  },
  {
    slug: "ios-stash",
    title: "iOS平台Stash代理客户端高级分流规则与配置实战指南 - shidatizi.co",
    h1: "iPhone / iPad 平台 Stash 客户端高级分流与配置全景指南",
    metaDesc: "iOS平台Stash（Clash for iOS）完全配置指南。详解美区下载、订阅转换、JavaScript脚本重写与本地覆盖配置。",
    keywords: "Stash教程, Clash for iOS, 苹果Stash配置, 规则分流, iPhone翻墙高级工具",
    category: "iOS",
    readTime: "9 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>Stash</strong> 被广大果粉誉为“iOS 上的 Clash 终极形态”。
        它深度支持 Clash 标准配置文件，界面现代且具备极其丰富的脚本扩展和策略组分流能力。
      </p>

      <h2>一、导入与配置</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>通过美区 App Store 获取 Stash 应用；</li>
        <li>打开 Stash，点击首页「从 URL 下载配置」；</li>
        <li>粘贴机场标准 Clash 订阅链接，保存并命名；</li>
        <li>点击右上方连接开关，享受丝滑分流体验。</li>
      </ol>
    `
  },
  {
    slug: "ios-quantumult-x",
    title: "iOS平台Quantumult X策略组配置、去广告与流媒体重写教程 - shidatizi.co",
    h1: "iOS 平台 Quantumult X (圈X) 策略组配置与重写教程",
    metaDesc: "深度讲解Quantumult X（圈X）的节点订阅、分流策略组、MitM证书安装与去广告脚本配置，打造专属iOS网络利器。",
    keywords: "Quantumult X教程, 圈X配置, 苹果QX教程, 策略组分流, MitM证书配置",
    category: "iOS",
    readTime: "10 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>Quantumult X（圈X）</strong> 是 iOS 平台上最具可玩性的专业网络调试与代理利器。
        通过其强大的分流矩阵与 JavaScript 重写引擎，你可以精准控制每一条网络请求的流向。
      </p>

      <h2>一、添加服务器资源</h2>
      <p>点击右下角风车图标，在「节点」栏目点击「引用 (订阅)」，点击右上角「+」号，粘贴机场提供的专用 QX 订阅链接并保存更新。</p>

      <h2>二、配置策略组</h2>
      <p>在策略组中可自由创建“流媒体”、“海外AI”、“国内直连”等自定义组，将不同地区的专线节点分配给对应的服务，实现全自动分流。</p>
    `
  },
  {
    slug: "ios-loon",
    title: "iOS平台Loon代理客户端入门：极简UI与高效节点分流管理 - shidatizi.co",
    h1: "iOS 平台 Loon 客户端快速入门与实用分流指南",
    metaDesc: "图文介绍苹果iPhone平台Loon代理客户端的使用方法。兼顾极简操作逻辑与专业分流能力，适合注重交互体验的用户。",
    keywords: "Loon教程, iOS Loon配置, 苹果小气球, 机场订阅导入, iPhone轻量代理",
    category: "iOS",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>Loon（俗称小气球）</strong> 凭借极其简洁优雅的 UI 设计与极其稳定的后台表现，在 iOS 代理工具中赢得了极高口碑。
      </p>
      <h2>一、订阅配置流程</h2>
      <p>点击主界面下方「配置」，选择「订阅」，点击右上角添加按钮，粘贴机场订阅地址并保存即可一键拉取所有节点并按地区归类。</p>
    `
  },
  {
    slug: "macos-surge",
    title: "macOS平台Surge for Mac高级网络调试与系统级网关代理配置 - shidatizi.co",
    h1: "macOS 平台 Surge for Mac 深度配置与网关代理教程",
    metaDesc: "面向专业开发者与网络工程师的Surge for Mac使用指南。涵盖增强模式接管、局域网设备代理网关与深度抓包调试。",
    keywords: "Surge Mac教程, macOS专业代理, 网关接管, Surge增强模式, 苹果Mac梯子",
    category: "macOS",
    readTime: "11 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>Surge for Mac</strong> 是 macOS 上公认的技术天花板级别网络工具。
        不仅能够接管本机所有网络协议，还能将你的 Mac 瞬间转变为整个局域网的透明代理网关。
      </p>
      <h2>一、安装与增强模式</h2>
      <p>安装 Surge 后，务必在菜单栏勾选「Enhanced Mode (增强模式)」，系统将安装虚拟网卡无缝劫持所有进程的网络握手。</p>
    `
  },
  {
    slug: "macos-singbox",
    title: "macOS平台Sing-box官方图形客户端配置指南 - shidatizi.co",
    h1: "macOS 平台 Sing-box 官方客户端图文上手指南",
    metaDesc: "详解Mac电脑安装与运行Sing-box官方图形界面程序。轻巧高效无广告，完美支持苹果M芯片与最新加密协议。",
    keywords: "Mac Singbox教程, macOS轻量客户端, 苹果电脑Singbox, 下一代翻墙软件",
    category: "macOS",
    readTime: "6 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在 macOS 平台上，Sing-box 官方提供了纯原生的 App 包，资源占用微乎其微，即便在老款 MacBook Air 上也毫无卡顿。
      </p>
    `
  },
  {
    slug: "router-openwrt-passwall",
    title: "OpenWrt路由器安装PassWall插件实现全屋无感翻墙 - shidatizi.co",
    h1: "OpenWrt 软路由 PassWall 插件安装与全屋智能分流全指南",
    metaDesc: "手把手教你在OpenWrt固件上配置PassWall科学上网插件。涵盖节点订阅自动更新、DNS防污染分流与电视主机全屋无感翻墙。",
    keywords: "PassWall教程, OpenWrt翻墙, 软路由科学上网, 路由器梯子插件, 全屋代理网关",
    category: "路由器/网关",
    readTime: "12 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        想要让家里的 iPhone、安卓、电视盒子（Apple TV）、游戏机（Switch/PS5）全部免装客户端就能自动翻墙？
        在 <strong>OpenWrt 软路由</strong> 上部署 <strong>PassWall</strong> 是最成熟、最稳定的解决方案。
      </p>

      <h2>一、安装与节点订阅</h2>
      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li>登录 OpenWrt 后台，进入 <strong>「服务」→「PassWall」</strong>；</li>
        <li>点击「节点订阅」，添加机场提供的 SSR / V2Ray / Trojan 格式订阅；</li>
        <li>点击「保存并更新」，所有海外节点自动同步。</li>
      </ol>

      <h2>二、主开关与 DNS 分流</h2>
      <p>
        在「基本设置」中将 TCP 节点与 UDP 节点指定为所选专线节点。
        DNS 解析建议使用 Chinadns-NG 进行境内外分流，彻底消除 DNS 投毒与泄漏。
      </p>
    `
  },
  {
    slug: "router-openwrt-openclash",
    title: "OpenWrt安装OpenClash插件与内核升级深度教程 - shidatizi.co",
    h1: "OpenWrt 路由器 OpenClash 插件配置与 Meta 内核调优实战",
    metaDesc: "全面深入OpenClash插件的配置细节。详解Fake-IP模式与Redir-Host区别、Meta内核升级、自建分流规则与全屋低延迟网络优化。",
    keywords: "OpenClash教程, 路由器Clash, OpenWrt软路由, Fake-IP设置, 全屋科学上网",
    category: "路由器/网关",
    readTime: "13 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        <strong>OpenClash</strong> 是 OpenWrt 平台上图形化程度最高、功能最完善的 Clash 客户端移植版。
      </p>

      <h2>一、模式选择：Fake-IP vs Redir-Host</h2>
      <p>
        强烈推荐选择 <strong>Fake-IP (增强模式)</strong>。
        路由器本地直接返回一个虚拟 IP 并在内部完成域名转发，大幅消除了客户端发起 DNS 解析的往返延迟，网页秒开体验极其明显。
      </p>
    `
  },
  {
    slug: "router-merlin",
    title: "华硕梅林固件(Merlin)路由器安装科学上网插件完整指引 - shidatizi.co",
    h1: "华硕硬路由梅林固件 (Merlin) 安装科学上网插件完整教程",
    metaDesc: "华硕路由器刷入梅林固件后安装科学上网插件的实操教程。免买软路由，直接利用硬路由实现全屋出国与分流。",
    keywords: "梅林固件翻墙, 华硕路由器科学上网, Merlin插件安装, 路由器出国教程",
    category: "路由器/网关",
    readTime: "10 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        手头有一台华硕（ASUS）路由器（如 RT-AX86U、AX88U）？
        刷入 Koolshare 或 F大梅林改版固件后，通过软件中心即可快速安装科学上网插件，省去额外购置软路由的开销。
      </p>
    `
  },
  {
    slug: "router-bypass",
    title: "旁路由(透明网关)网络架构搭建与全屋设备免客户端翻墙教程 - shidatizi.co",
    h1: "旁路由 (透明网关) 组网实战：全屋设备免客户端翻墙全流程",
    metaDesc: "图解主路由+旁路由双网关组网方案。不动主路由器，低成本让指定电脑、电视与游戏机享受无感科学上网与智能分流。",
    keywords: "旁路由教程, 透明网关搭建, 双路由科学上网, 软路由旁路设置, 全屋翻墙架构",
    category: "路由器/网关",
    readTime: "11 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        “旁路由”（官方标准术语为透明网关）是目前家庭网络中最优雅的改造方案：
        主路由负责 PPPoE 拨号与 DHCP 分发，旁路由负责特定流量分流。即便旁路由重启或升级，全屋断网风险几乎为零！
      </p>

      <h2>一、网络拓扑与 IP 规划</h2>
      <ul>
        <li>主路由 IP：<code>192.168.1.1</code>（开启 DHCP）；</li>
        <li>旁路由 IP：<code>192.168.1.2</code>（关闭 DHCP，网关与 DNS 指向 <code>192.168.1.1</code>）；</li>
        <li>需要翻墙的设备：手动将其网关与 DNS 改为 <code>192.168.1.2</code> 即可！</li>
      </ul>
    `
  },
  {
    slug: "browser-switchyomega",
    title: "Chrome与Edge安装SwitchyOmega(ZeroOmega)独立代理插件教程 - shidatizi.co",
    h1: "浏览器独立代理插件 SwitchyOmega / ZeroOmega 使用教程",
    metaDesc: "教你如何仅在Chrome或Edge浏览器中开启翻墙代理，而不影响电脑其他软件。附规则列表配置与Socks5端口设置。",
    keywords: "SwitchyOmega教程, ZeroOmega配置, 浏览器独立代理, Chrome科学上网, 单独浏览器翻墙",
    category: "浏览器/扩展",
    readTime: "6 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        很多时候我们只希望在浏览器查资料时翻墙，不希望电脑后台的微信、钉钉受任何影响。
        使用 <strong>ZeroOmega (原 SwitchyOmega)</strong> 扩展插件是实现精准浏览器级分流的利器。
      </p>
    `
  },
  {
    slug: "browser-firefox",
    title: "Firefox火狐浏览器独立代理设置与防追踪隐私实战 - shidatizi.co",
    h1: "Firefox 火狐浏览器独立代理设置与反指纹追踪指南",
    metaDesc: "利用Firefox内置网络代理设置实现浏览器独立出海，结合防指纹隐私保护打造高安全性涉外办公环境。",
    keywords: "Firefox代理设置, 火狐独立翻墙, 浏览器隐私防追踪, 火狐Socks5设置",
    category: "浏览器/扩展",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        Firefox 原生提供了独立于操作系统的网络代理设置面板。在设置中直接配置 Socks5 端口 <code>127.0.0.1:7890</code>，即可拥有专属出海窗口。
      </p>
    `
  },
  {
    slug: "appletv",
    title: "Apple TV 7代安装Sing-box/Shadowrocket电视翻墙教程 - shidatizi.co",
    h1: "Apple TV 7代安装代理客户端实现 4K 电视大屏无缝翻墙教程",
    metaDesc: "tvOS 17+系统Apple TV直接安装小火箭或Sing-box客户端教程。客厅大屏直连4K HDR奈飞Netflix与YouTube Premium。",
    keywords: "Apple TV翻墙, tvOS小火箭, 苹果电视科学上网, Apple TV 4K奈飞, 电视梯子教程",
    category: "电视/主机",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        自 tvOS 17 起，苹果官方正式向 Apple TV 开放了 VPN API。
        现在你无需软路由，直接在 Apple TV 的 App Store 下载 Shadowrocket 或 Sing-box 就能让电视大屏畅享 4K HDR 视听盛宴！
      </p>
    `
  },
  {
    slug: "android-tv",
    title: "Android TV(索尼/小米/Chromecast)安装Clash TV版教程 - shidatizi.co",
    h1: "Android TV 智能电视与电视盒子安装配置 Clash TV 指南",
    metaDesc: "适用索尼电视、小米电视盒子、Chromecast及外贸盒子安装Clash for Android TV遥控器优化版教程，轻松解锁海外流媒体。",
    keywords: "电视盒子翻墙, Android TV梯子, 索尼电视科学上网, 电视端Clash教程, Chromecast翻墙",
    category: "电视/主机",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        Android TV 设备屏幕大且依赖遥控器操作。
        本教程教你使用 U盘 侧载安装专为遥控器优化的 <code>Clash for Android (TV UI 版)</code>，轻松使用方向键遥控切换节点。
      </p>
    `
  },
  {
    slug: "gaming-console",
    title: "PS5/Xbox/Switch通过PC局域网共享代理加速联机教程 - shidatizi.co",
    h1: "PS5 / Xbox / Switch 游戏机通过电脑共享代理联机加速教程",
    metaDesc: "主机游戏玩家必看！免买游戏加速盒子，利用电脑客户端开启「允许局域网连接」给主机提供低延迟专线加速教程。",
    keywords: "PS5联机加速, Switch翻墙教程, 主机局域网共享代理, 游戏机梯子加速, 游戏联机低延迟",
    category: "电视/主机",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在电脑端 Clash Verge 中开启「允许局域网连接 (Allow LAN)」，并在 PS5/Switch 的网络设置中将代理服务器指向电脑的内网 IP 与端口，即可实现数十毫秒的电竞级联机体验！
      </p>
    `
  },
  {
    slug: "linux-cli",
    title: "Linux(Ubuntu/Debian)系统终端安装与配置Clash/Sing-box教程 - shidatizi.co",
    h1: "Linux (Ubuntu/Debian) 无桌面服务器配置 Clash / Sing-box 指南",
    metaDesc: "面向后端开发者与运维工程师。教你在Linux VPS或本地Ubuntu终端配置后台守护进程代理，解决Git与Docker拉取超时卡顿。",
    keywords: "Linux终端翻墙, Ubuntu代理配置, Sing-box Linux, systemd守护进程, 终端命令行代理",
    category: "进阶与开发",
    readTime: "9 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在没有图形化界面的 Linux 服务器上，通过配置 <code>systemd</code> 系统守护进程管理 Sing-box 或 Mihomo 核心，是自动化构建与运维集群出海的行业标准操作。
      </p>
    `
  },
  {
    slug: "docker-subconverter",
    title: "使用Docker Compose一键自建私有轻量级订阅转换后端 - shidatizi.co",
    h1: "使用 Docker Compose 一键自建私有订阅转换后端全教程",
    metaDesc: "担心公共订阅转换泄露节点Token和节点IP？教你用轻量Docker容器搭建专属私有Subconverter服务，彻底消除安全隐患。",
    keywords: "自建订阅转换, Docker Subconverter, 订阅防盗用, 私有转换后端, 节点安全防护",
    category: "进阶与开发",
    readTime: "10 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        公共订阅转换网站随时面临后端被脱库或植入恶意审计规则的巨大风险。
        只需一台闲置 VPS 或本地 NAS，用 10 行 Docker Compose 配置文件即可搭建属于你自己的高速私密订阅转换后端！
      </p>
    `
  },
  {
    slug: "clash-rules",
    title: "Clash规则集分流自定义：如何让特定域名走指定节点实战 - shidatizi.co",
    h1: "Clash 自定义规则集与分流策略实战：按域名精准分配节点",
    metaDesc: "深入讲解Clash的Rule Provider机制。教你编写DOMAIN-SUFFIX、IP-CIDR与GEOIP规则，实现OpenAI走美国、Netflix走香港的分流布局。",
    keywords: "Clash自定义规则, 规则集分流, Rule Provider配置, 域名精准分流, 节点策略组",
    category: "进阶与开发",
    readTime: "9 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        掌握了 Clash 规则配置，你就可以实现：让 ChatGPT 强行绑定纯净美国原生节点，让 Netflix 走香港高带宽节点，其余网页根据延迟自动优选！
      </p>
    `
  },
  {
    slug: "troubleshooting-timeout",
    title: "客户端所有节点显示Timeout延迟超时的7大秒解法 - shidatizi.co",
    h1: "翻墙客户端所有节点集体 Timeout 超时？7 步快速诊断与自救清单",
    metaDesc: "遇到客户端节点全红、全部测速超时的突发状况？依次排查系统时间、杀软拦截、端口占用与节点拉取异常，5分钟内恢复正常上网。",
    keywords: "节点Timeout解决, 节点全部超时, 梯子连不上排查, 客户端报错自查, 翻墙故障解决",
    category: "进阶排错",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        打开客户端发现所有节点全红，测速全是 <code>Timeout</code> 或 <code>-1ms</code>？
        先别急着找机场客服，90% 的情况都是本地环境问题。请严格按以下 7 步进行排查：
      </p>

      <ol style="padding-left:1.25rem; line-height:1.8;">
        <li><strong>第 1 步：核对系统时间：</strong>这是最普遍的杀手。本地时间如果快了或慢了 30 秒以上，TLS 握手会因证书有效时间校验失败直接断开；</li>
        <li><strong>第 2 步：检查本地代理端口占用：</strong>确认 7890 端口未被其他下载器或残留进程抢占；</li>
        <li><strong>第 3 步：更新订阅节点：</strong>机场可能刚刚更换了中转机房入口，重新拉取一次订阅即可解决。</li>
      </ol>
    `
  },
  {
    slug: "tun-mode",
    title: "开启Tun虚拟网卡模式让所有不遵守代理的软件全部走代理 - shidatizi.co",
    h1: "深入理解并开启 Tun 虚拟网卡模式：彻底解决应用不走代理难题",
    metaDesc: "解析系统代理与Tun模式的底层差异。教你如何用Tun网卡接管Git命令行、游戏联机平台与UWP应用的所有UDP/TCP流量。",
    keywords: "Tun模式教程, 虚拟网卡接管, Clash Tun配置, 命令行代理解决, 强制全局代理",
    category: "进阶排错",
    readTime: "8 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        为什么开了代理看网页飞快，但在终端里敲 <code>git clone</code> 依然卡死，或者打 Steam 外服依然连不上？
        因为这些软件根本不读操作系统的系统代理设置。开启 Tun 虚拟网卡模式，在网络驱动层实现无差别数据包劫持！
      </p>
    `
  },
  {
    slug: "hysteria2-tuic-config",
    title: "Hysteria 2与TUIC高丢包弱网协议在各大客户端的手动配置指引 - shidatizi.co",
    h1: "Hysteria 2 / TUIC 高抗丢包协议在主流客户端中的配置实操",
    metaDesc: "针对中国移动宽带与校园网等弱网环境，详细介绍基于UDP协议的Hysteria 2与TUIC节点在Clash Verge、NekoBox与Sing-box的手动调试。",
    keywords: "Hysteria2配置, TUIC协议教程, 移动弱网翻墙, 抗QoS代理协议, 歇斯底里协议",
    category: "进阶排错",
    readTime: "9 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        在丢包率高达 30% 的劣质宽带下，传统 TCP 协议会频繁重传陷入死循环。
        通过配置 Hysteria 2 协议的暴力拥塞控制参数，即使在最严苛的弱网环境下也能跑满 4K 视频！
      </p>
    `
  },
  {
    slug: "multi-device-management",
    title: "机场订阅多设备管理、并发限制与自动更新维护指南 - shidatizi.co",
    h1: "机场订阅多设备管理攻略：避免设备超限与订阅冲突方案",
    metaDesc: "家庭与多办公设备共用翻墙套餐必看。详解机场设备数限制判定机制、路由器统一分流及多设备并发防封指南。",
    keywords: "多设备翻墙, 机场设备限制, 订阅多端同步, 梯子合租管理, 防并发封号",
    category: "进阶排错",
    readTime: "7 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        大多数高品质机场（如 <a href="../../review/invisible/index.html">隐形人</a> 或 <a href="../../review/flashleap/index.html">闪跃 FlashLeap</a>）均设有并发设备数量限制（通常为 3~4 台）。
        了解服务商如何通过同一时刻 IP 并发连接数检测超额，合理分配主力设备与路由器网关。
      </p>
    `
  },
  {
    slug: "config-migration",
    title: "更换新手机与电脑后一键备份与迁移所有代理配置教程 - shidatizi.co",
    h1: "更换新电脑与新手机：代理配置、自定义规则与订阅无缝迁移指南",
    metaDesc: "详细介绍如何将旧电脑与旧手机上的Clash规则、小火箭配置与节点订阅无损迁移至新设备，告别反复重新配置的烦恼。",
    keywords: "配置迁移, 梯子数据备份, Clash配置导出, 小火箭配置迁移, 换新手机翻墙设置",
    category: "进阶排错",
    readTime: "6 分钟",
    date: "2026-03-01",
    body: `
      <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); font-weight:500;">
        买新电脑或新手机最麻烦的就是重新配置梯子规则与分流名单。
        利用客户端内置的“配置导出”或 iCloud 自动同步功能，只需 10 秒即可实现所有配置的原汁原味复刻。
      </p>
    `
  }
];
