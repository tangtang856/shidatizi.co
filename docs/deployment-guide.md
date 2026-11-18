# shidatizi.co - 生产环境部署与上线指南

**正式域名：** `https://shidatizi.co`  
**GitHub 仓库：** `https://github.com/tangtang856/shidatizi.co`  
**架构类型：** 纯原生静态 HTML / CSS / Vanilla JS (零构建器开销，秒开体验)  

---

## 一、本地开发与构建命令说明

项目内置了现代化的检查与验收工具链，可在本地运行以下命令：

```bash
# 1. 重新生成全站静态页面
node scripts/build-all.js

# 2. 生成最新 XML 站点地图 (sitemap.xml 与 sitemap-index.xml)
npm run build

# 3. 运行全站自动化测试 (链接检查、内容合规性检查、SEO技术审计)
npm test

# 4. 单独检查站内相对链接与静态资源是否存在 404
npm run check-links

# 5. 单独运行 Bing SEO 技术审计并生成 docs/final-audit.md
npm run audit

# 6. 向 Bing / IndexNow 提交新页面通知
npm run indexnow
```

---

## 二、部署方案：Cloudflare Pages (强烈推荐)

由于本项目已经完全转换为纯静态 HTML + 原生 CSS 文件，且所有站内页面跳转、样式表和脚本均使用严格标准的**相对路径**，因此 Cloudflare Pages 能够为其提供全球顶级的 Anycast CDN 加速与秒开体验。

### 部署步骤：

1. **登录 Cloudflare 控制台：**
   - 访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)；
   - 在左侧菜单点击 **Workers 和 Pages (Workers & Pages)** -> **创建应用程序 (Create application)** -> 选择 **Pages**。

2. **连接 GitHub 仓库：**
   - 点击 **连接到 Git (Connect to Git)**；
   - 授权并选择仓库：`tangtang856/shidatizi.co`；
   - 分支选择：`main`。

3. **构建设置 (Build Settings)：**
   - **Framework preset (框架预设)：** 选择 `None` (或者无需配置)；
   - **Build command (构建命令)：** 可留空，或者填写 `npm run build`（用于在每次提交时自动刷新 sitemap 并跑检查）；
   - **Build output directory (构建输出目录)：** 填写 `/` (或者 `.` 即根目录，因为所有 HTML/CSS 文件直接位于根目录，无需编译)。

4. **保存并部署 (Save and Deploy)：**
   - 点击部署，Cloudflare 将在 15~30 秒内完成全网 CDN 边缘节点分发。

5. **绑定自定义正式域名：**
   - 部署完成后，进入该 Pages 项目的 **Custom domains (自定义域)** 标签；
   - 点击 **设置自定义域 (Set up a custom domain)**；
   - 输入 `shidatizi.co` 并根据提示添加 DNS CNAME 解析；
   - Cloudflare 会自动配置免费的 Universal SSL 证书（HTTPS）。

---

## 三、部署方案：GitHub Pages (备用方案)

如果你想直接使用 GitHub Pages：
1. 进入 GitHub 仓库设置：`https://github.com/tangtang856/shidatizi.co/settings/pages`；
2. 在 **Build and deployment -> Source** 选择 **Deploy from a branch**；
3. Branch 选择 `main`，目录选择 `/ (root)`，点击保存；
4. 在 Custom domain 中填入 `shidatizi.co`，勾选 **Enforce HTTPS**。

---

## 四、本地离线浏览特性说明

本网站严格遵循了以下规范：
> “所有 CSS、JS、图片及站内页面跳转链接，必须严格使用标准的相对路径（如 css/style.css 或 ../css/style.css），严禁使用以 / 开头的根绝对路径，确保在本地直接双击（file:// 协议）和上线后均能完美加载与跳转。”

在任何 Windows、Mac 或 Linux 电脑上，你无需启动任何 HTTP 本地服务器，直接在文件管理器中**双击打开 `index.html`**，所有字体样式、交互菜单、横向对比工具与页面跳转均能 100% 完美加载与跳转！
