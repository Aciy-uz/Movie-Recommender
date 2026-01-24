// // ************************** 第一步：复用移动端菜单切换逻辑（与原页面一致） **************************
//     const mobileMenuBtn = document.getElementById('mobileMenuBtn');
//     const mobileMenu = document.getElementById('mobileMenu');

//     mobileMenuBtn.addEventListener('click', () => {
//       mobileMenu.classList.toggle('hidden');
//       // 切换菜单图标（汉堡包 ↔ 关闭）
//       const icon = mobileMenuBtn.querySelector('i');
//       if (mobileMenu.classList.contains('hidden')) {
//         icon.classList.remove('fa-times');
//         icon.classList.add('fa-bars');
//       } else {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-times');
//       }
//     });

    const annualRanking = [
      {
        rank: 1,
        title: "流浪地球2",
        year: 2023,
        score: 8.3,
        tags: ["科幻", "灾难", "国产", "硬核"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2910873810.jpg",
        hot: "超高热度"
      },
      {
        rank: 2,
        title: "星际穿越",
        year: 2014,
        score: 9.4,
        tags: ["科幻", "冒险", "亲情", "时空"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2156037258.jpg",
        hot: "超高热度"
      },
      {
        rank: 3,
        title: "我不是药神",
        year: 2018,
        score: 9.0,
        tags: ["剧情", "现实", "温情", "社会"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2546787480.jpg",
        hot: "超高热度"
      },
      {
        rank: 4,
        title: "哪吒之魔童降世",
        year: 2019,
        score: 8.4,
        tags: ["动画", "神话", "热血", "成长"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567413065.jpg",
        hot: "高热度"
      },
      {
        rank: 5,
        title: "满江红",
        year: 2023,
        score: 7.6,
        tags: ["悬疑", "古装", "喜剧", "反转"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2926721380.jpg",
        hot: "高热度"
      },
      {
        rank: 6,
        title: "长津湖",
        year: 2021,
        score: 7.4,
        tags: ["战争", "历史", "爱国", "史诗"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2737788486.jpg",
        hot: "高热度"
      }
    ];

    // 2. 季度榜单（2025 Q4）
    const quarterlyRanking = [
      {
        rank: 1,
        title: "坚如磐石",
        year: 2023,
        score: 6.0,
        tags: ["悬疑", "犯罪", "剧情"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3071678680.jpg",
        hot: "超高热度"
      },
      {
        rank: 2,
        title: "前任4：英年早婚",
        year: 2023,
        score: 5.5,
        tags: ["爱情", "喜剧", "都市"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3067377920.jpg",
        hot: "超高热度"
      },
      {
        rank: 3,
        title: "好像也没那么热血沸腾",
        year: 2023,
        score: 6.2,
        tags: ["喜剧", "运动", "温情"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3070974168.jpg",
        hot: "高热度"
      },
      {
        rank: 4,
        title: "93国际列车大劫案：莫斯科行动",
        year: 2023,
        score: 6.5,
        tags: ["动作", "犯罪", "剧情"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3068645010.jpg",
        hot: "高热度"
      },
      {
        rank: 5,
        title: "贝肯熊：火星任务",
        year: 2023,
        score: 6.7,
        tags: ["动画", "喜剧", "冒险"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3071269480.jpg",
        hot: "中热度"
      },
      {
        rank: 6,
        title: "河边的错误",
        year: 2023,
        score: 7.3,
        tags: ["悬疑", "犯罪", "文艺"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3072182866.jpg",
        hot: "中热度"
      }
    ];

    // 3. 月度榜单（2025 12月）
    const monthlyRanking = [
      {
        rank: 1,
        title: "一闪一闪亮星星",
        year: 2023,
        score: 6.2,
        tags: ["爱情", "奇幻", "青春"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3073259458.jpg",
        hot: "超高热度"
      },
      {
        rank: 2,
        title: "潜行",
        year: 2023,
        score: 5.5,
        tags: ["犯罪", "动作", "警匪"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3073863820.jpg",
        hot: "超高热度"
      },
      {
        rank: 3,
        title: "年会不能停！",
        year: 2023,
        score: 7.9,
        tags: ["喜剧", "职场", "荒诞"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3074347768.jpg",
        hot: "高热度"
      },
      {
        rank: 4,
        title: "蜘蛛侠：纵横宇宙",
        year: 2023,
        score: 8.5,
        tags: ["动画", "科幻", "冒险"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3060389480.jpg",
        hot: "高热度"
      },
      {
        rank: 5,
        title: "保罗斯坦顿",
        year: 2023,
        score: 7.2,
        tags: ["剧情", "传记", "战争"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3072789566.jpg",
        hot: "中热度"
      },
      {
        rank: 6,
        title: "饥饿游戏：鸣鸟与蛇之歌",
        year: 2023,
        score: 6.9,
        tags: ["科幻", "冒险", "动作"],
        poster: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p3069375268.jpg",
        hot: "中热度"
      }
    ];

    // ************************** 第三步：核心工具函数 - 渲染榜单结果 **************************
    function renderRanking(rankingData, rankingType) {
      const rankingResultList = document.getElementById('rankingResultList');
      const currentRankingTitle = document.getElementById('currentRankingTitle');
      const currentRankingDesc = document.getElementById('currentRankingDesc');

      // 更新榜单概览标题和描述
      switch (rankingType) {
        case 'annual':
          currentRankingTitle.textContent = '2025年度影视榜';
          currentRankingDesc.textContent = '基于2025年全年用户评分与播放热度综合排序';
          break;
        case 'quarterly':
          currentRankingTitle.textContent = '2025 Q4 季度影视榜';
          currentRankingDesc.textContent = '基于2025年第4季度用户评分与播放热度综合排序';
          break;
        case 'monthly':
          currentRankingTitle.textContent = '2025 12月 月度影视榜';
          currentRankingDesc.textContent = '基于2025年12月用户评分与播放热度综合排序';
          break;
        default:
          currentRankingTitle.textContent = '2025年度影视榜';
          currentRankingDesc.textContent = '基于2025年全年用户评分与播放热度综合排序';
      }

      // 清空原有列表
      rankingResultList.innerHTML = '';

      // 无结果处理
      if (rankingData.length === 0) {
        rankingResultList.innerHTML = `
          <div class="no-ranking">
            <i class="fa fa-trophy"></i>
            <h3>暂无榜单数据</h3>
            <p>该榜单数据正在统计中，敬请期待</p>
          </div>
        `;
        return;
      }

      // 遍历渲染榜单卡片
      rankingData.forEach(item => {
        const rankingCard = document.createElement('div');
        rankingCard.className = 'ranking-card';

        // 确定排名样式（前3名特殊样式，普通排名默认样式）
        let rankClass = '';
        if (item.rank === 1) rankClass = 'rank-1';
        else if (item.rank === 2) rankClass = 'rank-2';
        else if (item.rank === 3) rankClass = 'rank-3';
        else rankClass = 'rank-other';

        // 构建标签HTML
        const tagHtml = item.tags.map(tag => `<span class="ranking-tag">${tag}</span>`).join('');

        // 填充卡片内容
        rankingCard.innerHTML = `
          <div class="ranking-number ${rankClass}">${item.rank}</div>
          <div class="ranking-poster">
            <img src="${item.poster}" alt="${item.title}">
            <div class="ranking-score">${item.score}</div>
          </div>
          <div class="ranking-info">
            <h3 class="ranking-title">${item.title}</h3>
            <div class="ranking-meta">
              <span>${item.year}年</span>
              <span>${item.hot}</span>
            </div>
            <div class="ranking-tags">
              ${tagHtml}
            </div>
          </div>
        `;

        rankingResultList.appendChild(rankingCard);
      });
    }

    // ************************** 第四步：核心功能 - 榜单切换（标签点击交互） **************************
    function initRankingTab() {
      const rankingTabs = document.querySelectorAll('.ranking-tab');

      rankingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // 1. 移除所有标签的active状态
          rankingTabs.forEach(t => t.classList.remove('active'));
          // 2. 给当前点击标签添加active状态
          tab.classList.add('active');
          // 3. 获取当前榜单类型，渲染对应数据
          const rankingType = tab.getAttribute('data-type');
          switch (rankingType) {
            case 'annual':
              renderRanking(annualRanking, 'annual');
              break;
            case 'quarterly':
              renderRanking(quarterlyRanking, 'quarterly');
              break;
            case 'monthly':
              renderRanking(monthlyRanking, 'monthly');
              break;
          }
        });
      });
    }

    // ************************** 第五步：页面初始化 - 渲染默认榜单（年度） **************************
    window.onload = () => {
      // 1. 渲染年度榜单（默认）
      renderRanking(annualRanking, 'annual');
      // 2. 初始化榜单切换标签
      initRankingTab();
    };