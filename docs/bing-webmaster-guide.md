# Bing Webmaster Tools (必应网站管理员工具) 完整操作指南

**域名：** `https://shidatizi.co`  
**目标搜索引擎：** Microsoft Bing  
**文档版本：** 2026.1  

---

## 一、前置准备与人工登录步骤

Bing Webmaster Tools 的大多数配置需要网站拥有者通过浏览器进行人工授权与操作。请按照以下步骤完成注册与登录：

1. 打开浏览器访问官方门户：[https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. 点击右上角 **登录 (Sign in)**，推荐使用你的 Microsoft 账户或 Google 账户登录。
3. 登录成功后进入管理控制台。

---

## 二、网站所有权验证 (Site Verification)

在控制台左上角点击“添加网站 (Add a site)”。Bing 提供两种主要方式：

### 方式 A：从 Google Search Console 导入（最推荐、免人工验证）
如果你已经在 Google Search Console 中验证了 `shidatizi.co`，直接点击 **Import from GSC**，授权后 Bing 会自动同步所有验证状态、Sitemap 与基本权限，10秒内即可完成。

### 方式 B：手工添加 URL（DNS 或 HTML 文件验证）
若手动输入 `https://shidatizi.co`，请选择以下任一方式：
1. **HTML 文件验证（最简单）：**
   - Bing 会提供一个类似 `BingSiteAuth.xml` 的文件；
   - 将该文件放置在网站根目录下，部署上线后点击控制台中的“Verify (验证)”；
   - 验证成功后即可激活全部站点功能。
2. **DNS CNAME 或 TXT 记录验证：**
   - 在你的域名解析服务商（如 Cloudflare / 腾讯云 / 阿里云）中添加一条 Bing 给出的 TXT 记录或 CNAME 解析；
   - 等待 DNS 解析生效后点击验证。

---

## 三、提交站点地图 (Sitemaps)

本站已通过自动化脚本生成了规范的 XML Sitemap，地址如下：

- **主地图：** `https://shidatizi.co/sitemap.xml`
- **索引地图：** `https://shidatizi.co/sitemap-index.xml`

### 操作步骤：
1. 在 Bing Webmaster Tools 左侧菜单点击 **站点地图 (Sitemaps)**；
2. 点击右上角 **提交站点地图 (Submit sitemap)**；
3. 分别输入 `https://shidatizi.co/sitemap.xml` 和 `https://shidatizi.co/sitemap-index.xml`，点击提交；
4. 提交后状态会显示为“处理中 (Processing)”，通常在数小时内变为“成功 (Success)”，并展示已发现的 URL 数量（应为 39 个正式页面，已自动排除 404.html）。

---

## 四、IndexNow 配置与验证

IndexNow 是微软 Bing 与 Yandex 联合推出的实时内容发现协议。

本站已完成的 IndexNow 基础设施：
- **API Key：** `c6e5a428d9b3431f91b72e096417d4fa`
- **Key 验证文件：** `https://shidatizi.co/c6e5a428d9b3431f91b72e096417d4fa.txt`
- **提交脚本：** `npm run indexnow`

### 验证与监控步骤：
1. 网站部署上线后，用浏览器访问 `https://shidatizi.co/c6e5a428d9b3431f91b72e096417d4fa.txt`，确保能直接看到 32 位 Key 文本；
2. 在 Bing Webmaster Tools 左侧菜单中找到 **IndexNow** 模块；
3. 系统会自动检测到已提交的变动记录，并展示提交历史（URL 列表与提交时间）；
4. 本地运行 `npm run indexnow` 时，将自动向 Bing 官方端点推送核心页面的更新通知。

> **重要认知：** IndexNow 提交成功（HTTP 200/202）只代表搜索引擎已接收到通知排队，不代表 Bing 已经立即爬取或建立索引，Bing 爬虫仍会根据自身抓取配额与页面质量评估决定最终收录时间。

---

## 五、URL 检查工具 (URL Inspection)

在网站刚上线或发布重点页面时，可使用 URL 检查工具强制触发实时抓取测试：

1. 在左侧菜单点击 **URL 检查 (URL Inspection)**；
2. 在顶部搜索框输入你想要检查的页面，例如：
   - 首页：`https://shidatizi.co/index.html`
   - 核心排行榜：`https://shidatizi.co/ranking/overall/index.html`
   - 测评页：`https://shidatizi.co/review/tag-internet/index.html`
3. 点击 **检查 (Inspect)**，Bing 会展示该 URL 当前在索引库中的状态；
4. 如果显示“URL 未在必应上 (URL is not on Bing)”，点击右上角的 **请求建立索引 (Request Indexing)**，这会将该页面放入 Bingbot 的高优先级抓取队列中。

---

## 六、搜索表现监控 (Search Performance)

在站点上线 1~2 周后，搜索表现面板将开始产出真实自然搜索数据：

1. **核心监控指标：**
   - **展示次数 (Total Impressions)：** 网站在 Bing 搜索结果中出现的总次数；
   - **点击次数 (Total Clicks)：** 用户通过 Bing 点击进入网站的次数；
   - **平均点击率 (Average CTR)：** 搜索结果点击转化率；
   - **平均排名 (Average Position)：** 主攻关键词在搜索结果中的平均排位。
2. **关键词监控：**
   - 在“查询 (Queries)”标签下，检查主攻关键词（`机场推荐`、`机场节点`、`性价比机场`、`梯子推荐` 等）的曝光与排位表现；
   - 针对有曝光但排名在第 2 页（11~20位）的关键词，可对对应落地页的内容进行针对性增补与内链加权。

---

## 七、索引覆盖与抓取问题排查 (Index Coverage & Crawl Issues)

1. **站点资源管理器 (Site Explorer)：**
   - 查看 Bingbot 对全站目录（`/ranking/`、`/recommend/`、`/guides/`、`/blog/` 等）的爬行深度与状态；
   - 确认无重定向链（Redirect Chains）或意外的 4xx 状态。
2. **抓取问题 (Crawl Issues)：**
   - 查看是否存在 DNS 失败、连接超时、被 Robots 阻止等技术报错；
   - 本站纯静态 HTML 架构已完全排除了客户端 JavaScript 渲染失败的风险。
3. **移动端友好度与 SEO 报告 (SEO Reports)：**
   - 定期查看 Bing 自动生成的 SEO Reports，排查是否有标签缺失或视口配置错误。本站自动化验收机制已保障了基础规范 100% 达标。
