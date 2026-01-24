    // 等待页面所有DOM元素加载完成后执行所有逻辑
document.addEventListener('DOMContentLoaded', function() {
  // ===================== 【全局常量 统一配置 - 方便后期修改】 =====================
  const baseUrl = 'http://localhost:3000'; // 后端接口基础地址
  const searchResultPage = '../第二个页面.html'; // 搜索结果页跳转地址

  // ===================== 【功能1：移动端菜单展开/收起 核心必加】 =====================
  // 匹配HTML中的移动端菜单按钮和菜单容器
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden'); // 点击切换 显示/隐藏 菜单
    });
  }

  // ===================== 【功能2：热门榜单切换 本页面核心功能 ✅ 重点】 =====================
  // 匹配HTML：标签按钮 .rank-tag  |  榜单内容 .rank-content
  const rankTags = document.querySelectorAll('.rank-tag');
  const rankContents = document.querySelectorAll('.rank-content');
  
  // 为所有榜单标签绑定点击切换事件
  rankTags.forEach(tag => {
    tag.addEventListener('click', function() {
      // 1. 切换标签的选中样式：移除所有标签的active，给当前点击的标签添加active
      rankTags.forEach(item => item.classList.remove('active'));
      this.classList.add('active');

      // 2. 获取当前点击标签对应的榜单ID (data-rank 属性 对应 内容div的id)
      const currentRank = this.dataset.rank;

      // 3. 切换对应的榜单内容：显示匹配的榜单，隐藏其他所有榜单
      rankContents.forEach(content => {
        if (content.id === currentRank) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ===================== 【功能3：获取页面所有搜索相关元素 适配桌面+移动端】 =====================
  const searchInputs = document.querySelectorAll('.search-input'); // 所有搜索输入框
  const searchIcons = document.querySelectorAll('.search-icon');   // 所有搜索图标按钮

  // ===================== 【功能4：核心搜索请求函数 完整保留你的业务逻辑】 =====================
  function sendSearchRequest(keywords) {
    // 前端非空校验
    if (!keywords) keywords = '';
    const searchKey = keywords.trim();
    if (searchKey === '') {
      alert('请输入电影/演员/导演关键词进行搜索');
      return;
    }

    // 发送GET请求到后端搜索接口
    fetch(`${baseUrl}/search?keywords=${encodeURIComponent(searchKey)}`, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) throw new Error(`请求失败，状态码：${response.status}`);
      return response.json();
    })
    .then(res => {
      console.log('✅ 搜索接口返回数据：', res);
      if (res.code === 200) {
        // alert(res.msg);
        const searchResultList = res.data;
        const currSearchKey = res.searchKeyword;

        // 把搜索结果和关键词传给后端 /search-result 路由
        sendMovieListToServer(currSearchKey, searchResultList);
        // 跳转到搜索结果页并携带关键词
        window.location.href = `${searchResultPage}?query=${encodeURIComponent(currSearchKey)}`;
      }
    })
    .catch(err => {
      console.error('❌ 搜索请求异常：', err);
      // alert('搜索失败，请稍后重试！');
    });
  }

  // ===================== 【功能5：传递搜索结果到后端】 =====================
  async function sendMovieListToServer(searchKey, movieList) {
    try {
      const response = await fetch(`${baseUrl}/search-result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ searchKey, movieList })
      });
      if (!response.ok) throw new Error(`数据传递失败，状态码：${response.status}`);
      const res = await response.json();
      console.log('✅ 电影列表传递结果：', res);
    } catch (err) {
      console.error('❌ 电影列表传递失败：', err);
    }
  }

  // ===================== 【功能6：绑定所有搜索触发事件 桌面+移动端全兼容】 =====================
  // ① 所有搜索框：回车键触发搜索
  searchInputs.forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) sendSearchRequest(this.value);
    });
  });

  searchIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input && input.classList.contains('search-input')) {
        sendSearchRequest(input.value);
      }
    });
  });
});