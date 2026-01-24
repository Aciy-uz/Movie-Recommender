    // 移动端菜单切换
    // const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    // const mobileMenu = document.getElementById('mobileMenu');

    // mobileMenuBtn.addEventListener('click', () => {
    //   mobileMenu.classList.toggle('hidden');
    //   // 切换菜单图标
    //   const icon = mobileMenuBtn.querySelector('i');
    //   if (mobileMenu.classList.contains('hidden')) {
    //     icon.classList.remove('fa-times');
    //     icon.classList.add('fa-bars');
    //   } else {
    //     icon.classList.remove('fa-bars');
    //     icon.classList.add('fa-times');
    //   }
    // });

    // 轮播图逻辑
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    let currentIndex = 0;
    const carouselInterval = 5000; // 自动轮播间隔时间

    // 初始化轮播
    function initCarousel() {
      updateCarousel();
      setInterval(autoCarousel, carouselInterval);
    }

    // 更新轮播显示
    function updateCarousel() {
      // 移除所有激活状态
      carouselItems.forEach(item => item.classList.remove('carousel-item-active'));
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
        indicator.style.backgroundColor = 'rgba(255,255,255,0.3)';
      });

      // 添加当前激活状态
      carouselItems[currentIndex].classList.add('carousel-item-active');
      indicators[currentIndex].classList.add('active');
      indicators[currentIndex].style.backgroundColor = 'var(--primary)';
    }

    // 自动轮播
    function autoCarousel() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarousel();
    }

    // 上一张
    function prevCarousel() {
      currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      updateCarousel();
    }

    // 下一张
    function nextCarousel() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarousel();
    }

    // 指示器点击事件
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // 绑定轮播按钮事件
    carouselPrev.addEventListener('click', prevCarousel);
    carouselNext.addEventListener('click', nextCarousel);

    // 页面加载完成后初始化
    window.addEventListener('DOMContentLoaded', initCarousel);