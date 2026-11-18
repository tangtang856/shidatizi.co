/**
 * shidatizi.co - 全站核心交互逻辑
 * 纯原生JS · 无外部依赖 · 秒开加载 · 兼容本地 file:// 协议与线上运行
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 移动端菜单切换
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const expanded = mobileNav.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', expanded);
    });
  }

  // 2. FAQ 折叠手风琴交互
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = answer.style.display !== 'none';
      
      // 切换当前项
      answer.style.display = isOpen ? 'none' : 'block';
      const icon = btn.querySelector('.faq-icon');
      if (icon) {
        icon.textContent = isOpen ? '+' : '−';
      }
    });
  });

  // 3. 搜索弹窗逻辑
  const searchModal = document.getElementById('searchModal');
  const searchTriggers = document.querySelectorAll('.search-btn');
  const searchClose = document.querySelector('.search-close-btn');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 50);
      }
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
    }
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        closeSearch();
      }
    });
  }

  // 快捷键 / 打开搜索, Esc 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
      closeSearch();
    }
    if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && (!searchInput || document.activeElement !== searchInput)) {
      e.preventDefault();
      openSearch();
    }
  });
});
