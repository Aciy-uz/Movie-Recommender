/**
 * JSON数据模糊查询筛选核心方法【深度优化版】
 * @param {String} keyword 搜索关键字(空/undefined/纯空格则返回原数据)
 * @param {Array} sourceData 待筛选的JSON源数据(必须是数组格式)
 * @returns {Array} 筛选后的匹配新数组（不污染原数组）
 */
function fuzzySearchJson(keyword, sourceData) {
  if (!Array.isArray(sourceData)) {
    throw new Error('fuzzySearchJson: 第二个参数必须是【数组】格式的JSON数据');
  }
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    return [...sourceData];
  }

  const lowerKeyword = keyword.trim().toLowerCase();

  const getAllValues = (obj) => {
    let values = '';
    if (typeof obj !== 'object' || obj === null) return values;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          values += getAllValues(val) + ' ';
        } else {
          values += (val === null || val === undefined ? '' : String(val).toLowerCase()) + ' ';
        }
      }
    }
    return values;
  };

  const filterResult = sourceData.filter((item) => {
    const allItemValues = getAllValues(item);
    return allItemValues.includes(lowerKeyword);
  });

  return filterResult;
}

module.exports = fuzzySearchJson;

// ===================== 关键：环境判断 ❗ 核心兼容修复 =====================
// 只有在【浏览器环境】下，才执行 window/document 相关代码
// Node.js环境中没有 window 对象，这部分代码会被完全跳过，不会报错
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('beforeunload', function() {
        for(let i = 1; i < 1000; i++) {
            window.clearInterval(i);
            window.clearTimeout(i);
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        const carouselItems = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        let currentIndex = 0;
        let carouselTimer = null;

        function resetCarousel() {
            currentIndex = 0;
            if(carouselTimer) clearInterval(carouselTimer);
            goToIndex(0);
            carouselTimer = setInterval(goNext, 5000);
        }

        function goToIndex(index) {
            carouselItems.forEach(item => item.classList.remove('carousel-item-active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            currentIndex = index;
            carouselItems[currentIndex].classList.add('carousel-item-active');
            indicators[currentIndex].classList.add('active');
        }

        function goPrev() {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            goToIndex(currentIndex);
        }

        function goNext() {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            goToIndex(currentIndex);
        }

        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);
        indicators.forEach((ind, idx) => {
            ind.addEventListener('click', () => goToIndex(idx));
        });

        document.querySelector('.hero-section').addEventListener('mouseenter', () => {
            if(carouselTimer) clearInterval(carouselTimer);
        });

        document.querySelector('.hero-section').addEventListener('mouseleave', () => {
            carouselTimer = setInterval(goNext, 5000);
        });

        resetCarousel();
    });
}