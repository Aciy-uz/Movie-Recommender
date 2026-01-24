    // 复用原移动端菜单切换逻辑
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    });

    const typeFilterTags = document.querySelectorAll('#typeFilterTags .filter-tag');
    const filterContents = document.querySelectorAll('.filter-content');

    // 绑定电影类型筛选标签点击事件
    typeFilterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        typeFilterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const currentFilter = tag.getAttribute('data-filter');
        filterContents.forEach(content => content.classList.remove('active'));
        document.getElementById(currentFilter).classList.add('active');
      });
    });

    

'use strict';

// 防抖函数
const debounce = (fn, delay = 150) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
    };
};

// 导航栏滚动样式
function initScrollHandler() {
    const heroVideoWrap = document.querySelector(".hero-video-wrap");
    const siteHeader = document.querySelector(".site-header");
    const mainContent = document.querySelector(".main-content");
    const navHeight = 62;

    const handleNavScroll = debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > 0) {
            heroVideoWrap.style.top = "-100vh";
            siteHeader.style.top = "0";
            siteHeader.style.backgroundColor = "rgba(15, 15, 15, 0.95)";
            mainContent.style.top = `calc(-100vh + ${navHeight}px)`;
        } else {
            heroVideoWrap.style.top = "0";
            siteHeader.style.top = "100vh";
            siteHeader.style.backgroundColor = "rgba(15, 15, 15, 0.9)";
            mainContent.style.top = "0";
        }
    });
    
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initScrollHandler();
});