// 内置模块导入
const express = require('express');
const path = require('path');
const process = require('process');
const fs = require('fs');

//  第三方依赖导入
const cors = require('cors');
//自定义包导入
const { excelToJsonObj } = require('./MovieJson/MovieJson.js');
const excelToJsonObj2 = require('./MovieJson/MovieJson2.js');

const fuzzySearchJson = require('./src/index.js');
const { log } = require('console');
const e = require('express');



const APP_CONFIG = {
  PORT: 3000,
  STATIC_PAGE_DIR: 'Web page',
  // STATIC_RESOURCE_DIR: 'D:/系统/桌面/搜索测试',
  STATIC_RESOURCE_ALIAS: '/static',
  BASE_URL: 'http://localhost:3000'
};

const app = express();
app.use(cors()); // 跨域中间件
app.use(express.static(path.resolve(__dirname, APP_CONFIG.STATIC_PAGE_DIR)));
// app.use('/static', express.static(APP_CONFIG.STATIC_RESOURCE_DIR));

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/movieData', (req, res) => {
  const keyword = req.query.tag;
  // console.log(keyword);
  if(keyword != '全部'){
    console.log(keyword);
    const searchResult = fuzzySearchJson(keyword, movieData);
    res.json(searchResult);
  }else{
    res.json(movieData);  // 全部数据返回
  }
});

app.get('/movieData2', (req, res) => {
  const keyword = req.query.tag;
  if(keyword == '热门'){
    // console.log(keyword + '2222');
    // console.log(movieData2);
    res.json(movieData2)
  }
})
//  作用：接收关键词 → 模糊搜索 → 返回完整电影结果列表给前端

app.get('/search', (req, res) => {
  try {
    let { keywords } = req.query;
    console.log('【请求日志】GET /search - 搜索关键词：', keywords);

    if (!keywords) keywords = '';
    const searchKey = keywords.trim();
    const searchResult = fuzzySearchJson(searchKey, movieData);

    res.json({
      code: 200,
      msg: `搜索到 ${searchResult.length} 条相关数据`,
      data: searchResult, // 这个就是【需要渲染的电影列表】，返回给前端
      searchKeyword: searchKey
    });
  } catch (err) {
    console.error('【搜索接口异常】', err.message);
    res.status(500).json({
      code: 500,
      msg: '搜索失败，请稍后重试',
      data: [],
      error: err.message
    });
  }
});


app.post('/search-result', (req, res) => {
  try {
    // 接收前端传过来的 搜索关键词 + 需要渲染的电影列 
    const { searchKey, movieList } = req.body;
    console.log('=============================================');
    console.log('✅ 后端 /search-result 路由 成功接收数据：');
    console.log('🔍 搜索关键词：', searchKey);
    console.log('🎬 接收的电影列表总数：', movieList.length);
    console.log('📋 电影列表详情：', movieList);
    console.log('=============================================');

    const isLegal = searchKey && Array.isArray(movieList);
    if (!isLegal) {
      return res.status(400).json({
        code: 400,
        success: false,
        msg: '接收失败：数据格式错误，缺少关键词/电影列表不是数组'
      });
    }

    

    // 给前端返回成功响应
    res.json({
      code: 200,
      success: true,
      msg: `后端成功接收【${searchKey}】的搜索结果，共${movieList.length}条电影数据`,
      receiveData: { searchKey, movieCount: movieList.length }
    });

  } catch (err) {
    console.error('❌ 后端 /search-result 路由异常：', err.message);
    res.status(500).json({
      code: 500,
      success: false,
      msg: '后端接收电影列表失败，服务端处理异常',
      error: err.message
    });
  }
});


//翻译电影名
const MovieTitle = path.resolve(__dirname, 'MovieTitle.json');
const movieTitlePath = path.resolve(__dirname, 'MovieTitle.json');


app.get('/movieTitle', (req, res) => {
  // const title = JSON.stringify(data, null, 2);
  // res.json(data);
})
async function startServer() {
  try {
    movieData = await excelToJsonObj();
    movieData = JSON.parse(JSON.stringify(movieData));

    movieData2 = await excelToJsonObj2.excelToJsonObj2();
    movieData2 = JSON.parse(JSON.stringify(movieData2));
    
    console.log('=============================================');
    console.log('✅ 服务初始化成功 - 日志详情');
    console.log(`✅ 电影数据加载完成 | 共 ${movieData.length} 条有效数据`);
    console.log(`✅ 静态页面地址：${APP_CONFIG.BASE_URL}`);
    console.log(`✅ 搜索接口：${APP_CONFIG.BASE_URL}/search?keywords=关键词`);
    console.log(`✅ ✅ ✅ 接收电影列表路由(POST)：${APP_CONFIG.BASE_URL}/search-result`);
    console.log('=============================================');

    app.listen(APP_CONFIG.PORT, () => {
      console.log(`✅ 服务已成功启动，监听端口：${APP_CONFIG.PORT}`);
    });

  } catch (err) {
    console.error('=============================================');
    console.error('❌ 服务启动失败 ❌');
    console.error(`❌ 失败原因：${err.message}`);
    console.error('=============================================');
    process.exit(1); 
  }
}

// 执行服务启动
startServer();