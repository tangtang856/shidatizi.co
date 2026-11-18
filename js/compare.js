/**
 * 机场横向参数对比核心交互
 * 支持动态多选 2-4 家机场进行对比，移动端横向滑动，响应式切换
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('compareApp');
  if (!container) return;

  const rootPrefix = document.body.getAttribute('data-root') || './';
  const airports = window.AIRPORTS_DATA || [];
  if (!airports.length) {
    container.innerHTML = '<div class="alert alert-warning">未能加载机场数据，请刷新重试。</div>';
    return;
  }

  // 默认选中前两家
  let selectedSlugs = ['tag-internet', 'flyingbird', 'kuromis'];

  function render() {
    // 1. 渲染选择器
    const selectorHtml = `
      <div class="compare-selector-wrap" style="margin-bottom:1.5rem;">
        <div style="font-weight:700; margin-bottom:0.6rem; color:var(--text-main); font-size:0.95rem;">
          选择参与对比的品牌（支持多选 2 ~ 4 家，点击勾选或取消）：
        </div>
        <div class="compare-selector">
          ${airports.map(a => {
            const isSelected = selectedSlugs.includes(a.slug);
            return `
              <div class="chip-select ${isSelected ? 'selected' : ''}" data-slug="${a.slug}">
                <span>${isSelected ? '✓' : '+'}</span>
                <strong>${a.name}</strong>
              </div>
            `;
          }).join('')}
        </div>
        ${selectedSlugs.length < 2 ? '<div style="color:var(--danger); font-size:0.85rem; margin-top:0.5rem;">请至少选择 2 家机场进行对比</div>' : ''}
        ${selectedSlugs.length > 4 ? '<div style="color:var(--warning); font-size:0.85rem; margin-top:0.5rem;">最多同时对比 4 家机场，已自动截取前 4 家</div>' : ''}
      </div>
    `;

    const activeList = airports.filter(a => selectedSlugs.includes(a.slug)).slice(0, 4);

    if (activeList.length < 2) {
      container.innerHTML = selectorHtml + `
        <div style="text-align:center; padding:3rem 1rem; background-color:var(--bg-subtle); border:1px dashed var(--border-color); border-radius:var(--radius-md);">
          <p style="color:var(--text-muted); font-size:0.95rem;">请在上方的标签中至少勾选 2 个机场品牌，系统将自动生成参数对比表格。</p>
        </div>
      `;
      bindEvents();
      return;
    }

    // 2. 渲染矩阵表格
    const tableHtml = `
      <div class="table-responsive">
        <table class="data-table" style="min-width: 800px;">
          <thead>
            <tr>
              <th style="width: 140px; background-color:var(--bg-muted);">对比维度</th>
              ${activeList.map(a => `
                <th style="text-align:center; min-width:180px;">
                  <div style="font-size:1.1rem; font-weight:700; color:var(--text-main);">${a.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">${a.lineType}</div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:600;">起步门槛</td>
              ${activeList.map(a => `
                <td style="text-align:center;">
                  <strong style="color:var(--primary); font-size:1.15rem;">¥${a.startingPrice}</strong> / ${a.billingCycle}
                  <div style="font-size:0.75rem; color:var(--text-muted);">折合约 ¥${a.effectiveMonthlyPrice}/月</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">起步套餐流量</td>
              ${activeList.map(a => `
                <td style="text-align:center;">
                  <strong>${a.plans[0].bandwidthGB} GB</strong>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${a.plans[0].cycle}</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">每GB单价 (基础包)</td>
              ${activeList.map(a => `
                <td style="text-align:center;">
                  <span class="status-badge status-tested">¥${a.plans[0].pricePerGB} / GB</span>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">线路类型与SLA</td>
              ${activeList.map(a => `
                <td style="text-align:center;">
                  <div>${a.lineType}</div>
                  <small style="color:var(--success); font-weight:600;">SLA ${a.sla}</small>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">支持协议</td>
              ${activeList.map(a => `
                <td style="text-align:center; font-size:0.8rem;">
                  ${a.protocols.map(p => `<span style="display:inline-block; margin:2px; padding:2px 6px; background:#f1f5f9; border-radius:4px;">${p}</span>`).join('')}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">节点地区覆盖</td>
              ${activeList.map(a => `
                <td style="text-align:center; font-size:0.8rem;">
                  ${a.regions.slice(0, 5).join(' · ')}
                  ${a.regions.length > 5 ? `<br><small style="color:var(--text-muted);">等共 ${a.regions.length} 个地区</small>` : ''}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">并发设备限制</td>
              ${activeList.map(a => `
                <td style="text-align:center; font-weight:600;">
                  ${a.deviceLimit}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">AI大模型解锁</td>
              ${activeList.map(a => `
                <td style="text-align:center; font-size:0.8rem;">
                  ${a.aiSupport.join(' · ')}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">流媒体解锁</td>
              ${activeList.map(a => `
                <td style="text-align:center; font-size:0.8rem;">
                  ${a.streamingSupport.slice(0, 3).join(' · ')}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">核心优势</td>
              ${activeList.map(a => `
                <td style="font-size:0.8rem; vertical-align:top;">
                  <ul style="padding-left:1.2rem; margin:0;">
                    ${a.advantages.slice(0, 3).map(adv => `<li style="margin-bottom:4px; color:#065f46;">${adv}</li>`).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">主要劣势</td>
              ${activeList.map(a => `
                <td style="font-size:0.8rem; vertical-align:top;">
                  <ul style="padding-left:1.2rem; margin:0;">
                    ${a.disadvantages.slice(0, 2).map(dis => `<li style="margin-bottom:4px; color:#991b1b;">${dis}</li>`).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight:600;">详细页面</td>
              ${activeList.map(a => `
                <td style="text-align:center;">
                  <a href="${rootPrefix}review/${a.slug}/index.html" class="btn btn-outline btn-sm" style="display:block; margin-bottom:4px;">查看深度评测</a>
                  <a href="${rootPrefix}airport/${a.slug}/index.html" class="btn btn-secondary btn-sm" style="display:block;">资料库档案</a>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = selectorHtml + tableHtml;
    bindEvents();
  }

  function bindEvents() {
    const chips = container.querySelectorAll('.chip-select');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const slug = chip.getAttribute('data-slug');
        if (selectedSlugs.includes(slug)) {
          if (selectedSlugs.length > 2) {
            selectedSlugs = selectedSlugs.filter(s => s !== slug);
          } else {
            // 最少保留2个
            alert('请至少保留 2 家机场进行对比！');
            return;
          }
        } else {
          if (selectedSlugs.length >= 4) {
            alert('最多同时对比 4 家机场，请先取消勾选其中一家！');
            return;
          }
          selectedSlugs.push(slug);
        }
        render();
      });
    });
  }

  render();
});
