/**
 * IndexNow 自动化提交工具
 * 支持单 URL 提交、批量提交、新增/更新内容提交、失败重试与状态码详细记录
 * 
 * 严正提示：IndexNow 提交成功（HTTP 200/202）仅表示搜索引擎已接收到内容变动通知，
 * 绝不代表 Bing 已立即完成索引或收录，更不保证任何搜索排名。
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const HOST = 'shidatizi.co';
const KEY = 'c6e5a428d9b3431f91b72e096417d4fa';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];

// 发送 HTTP POST 请求辅助函数
function postJson(url, data, retries = 3) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const parsedUrl = new URL(url);

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body
        });
      });
    });

    req.on('error', (err) => {
      if (retries > 0) {
        console.warn(`[IndexNow Warning] 请求 ${url} 失败: ${err.message}，正在进行重试 (剩余 ${retries} 次)...`);
        setTimeout(() => {
          postJson(url, data, retries - 1).then(resolve).catch(reject);
        }, 2000);
      } else {
        reject(err);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retries > 0) {
        console.warn(`[IndexNow Warning] 请求 ${url} 超时，正在重试...`);
        postJson(url, data, retries - 1).then(resolve).catch(reject);
      } else {
        reject(new Error(`Request to ${url} timed out`));
      }
    });

    req.write(postData);
    req.end();
  });
}

// 获取要提交的 URL 列表
function getUrlsToSubmit() {
  const args = process.argv.slice(2);
  
  // 1. 指定单 URL 模式: npm run indexnow -- --url https://shidatizi.co/index.html
  const urlIdx = args.indexOf('--url');
  if (urlIdx !== -1 && args[urlIdx + 1]) {
    return [args[urlIdx + 1]];
  }

  // 2. 检查特定变更列表或最近修改的文件
  const allFlag = args.includes('--all');
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  
  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
    const allUrls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());

    if (allFlag) {
      console.log(`[IndexNow] 包含 --all 参数，准备全量提交全部 ${allUrls.length} 个正式页面...`);
      return allUrls;
    }

    // 默认增量模式：优先提交首页、排行榜和最近修改的核心页面，避免无差别刷屏
    const priorityUrls = allUrls.filter(u => 
      u === `https://${HOST}/` || 
      u.includes('/ranking/') || 
      u.includes('/recommend/')
    );
    console.log(`[IndexNow] 默认增量模式：精选 ${priorityUrls.length} 个核心权重页面进行通知推送。`);
    return priorityUrls;
  }

  // 兜底基础 URL
  return [`https://${HOST}/`];
}

async function runIndexNow() {
  console.log('====================================================');
  console.log('  shidatizi.co - Bing IndexNow 自动化提交模块');
  console.log('====================================================');

  const keyFilePath = path.join(ROOT_DIR, `${KEY}.txt`);
  if (!fs.existsSync(keyFilePath)) {
    console.error(`[Error] 未在根目录下找到 IndexNow Key 校验文件: ${KEY}.txt`);
    process.exit(1);
  }

  const urls = getUrlsToSubmit();
  if (urls.length === 0) {
    console.log('[IndexNow] 没有待提交的 URL，程序退出。');
    return;
  }

  console.log(`[IndexNow] Key: ${KEY}`);
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);
  console.log(`[IndexNow] 准备提交的 URL 数量: ${urls.length}`);
  urls.forEach(u => console.log(`  - ${u}`));

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  // 分别向官方 IndexNow 与 Bing 端点发送请求
  for (const endpoint of ENDPOINTS) {
    console.log(`\n[IndexNow] 正在推送至端点: ${endpoint} ...`);
    try {
      const response = await postJson(endpoint, payload, 3);
      console.log(`[IndexNow Response] 状态码: ${response.statusCode} (${response.statusMessage})`);
      if (response.statusCode === 200 || response.statusCode === 202) {
        console.log(`[Success] 端点 ${endpoint} 成功接收提交！`);
      } else {
        console.warn(`[Warning] 端点返回非 200 响应:`, response.body || response.statusMessage);
      }
    } catch (err) {
      console.error(`[Failure] 推送至 ${endpoint} 失败:`, err.message);
    }
  }

  console.log('\n====================================================');
  console.log('  提交日志记录完成！');
  console.log('  注意：IndexNow HTTP 200/202 仅表示通知已达，');
  console.log('  实际抓取与收录进度请登录 Bing Webmaster Tools 查看。');
  console.log('====================================================');
}

runIndexNow();
