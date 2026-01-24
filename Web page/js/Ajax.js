// ranking-list.html
// 注意：把这段代码放在页面底部（axios引入之后）
axios({
  url: 'http://localhost:3000/movieData2',
  params: {
    tag: '热门'
  }
}).then(response => { // 注意：then的第一个参数是成功回调，参数是response不是err！
  console.log('请求成功：', response);
  let matchData = response.data; // 这里是response.data，不是err.data
  let html = '';

  // 循环渲染，用索引区分每个元素的唯一标识
  for (let i = 0; i < matchData.length; i++) {
    // 给每个简介容器和按钮设置唯一的ID（用索引区分）
    html += `
      <div class="ranking-item"> <!-- 建议添加这个父容器，方便样式控制 -->
        <div class="ranking-number">${matchData[i].排名}</div>
        <div class="ranking-poster">
          <a href='https://www.sogou.com/web?query=${matchData[i].电影名称}' style="color:#fff;"  target="_blank" >
            <img src="${matchData[i].poster_url}" alt="${matchData[i].电影名称}">
          </a>
          <div class="ranking-score">${matchData[i].猫眼评分}</div>
        </div>
        <div class="ranking-info">
          <h3 class="ranking-title">${matchData[i].电影名称}</h3>
          <div class="ranking-meta">
            <span>${matchData[i].上映时间}年</span>
            <span>票房：${matchData[i].票房}</span>
          </div>
          <div class="ranking-tags">
            ${matchData[i].类型}
          </div>
          <div class="ranking-tags-content">
            <div class="movie-intro">
              <!-- 用索引生成唯一ID -->
              <div class="intro-content" id="introText_${i}">
                ${matchData[i].introduction}
              </div>
              <!-- 按钮绑定点击事件，传递索引 -->
              <button class="toggle-btn" onclick="toggleIntro(${i})">展开全文</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 渲染到页面
  document.querySelector('.ranking-list').innerHTML = html;
}).catch(error => { // 错误回调单独写在catch里
  console.error('请求失败：', error);
});

// 定义全局的折叠/展开函数
function toggleIntro(index) {
  // 根据索引获取当前的简介容器（唯一ID）
  const introText = document.getElementById(`introText_${index}`);
  const toggleBtn = document.querySelector(`button[onclick="toggleIntro(${index})"]`);

  // 切换展开/收起状态
  introText.classList.toggle('expanded');

  // 切换按钮文字
  if (introText.classList.contains('expanded')) {
    toggleBtn.textContent = '收起全文';
  } else {
    toggleBtn.textContent = '展开全文';
  }
}