# "芯影" 智能电影推荐引擎

<p align="center">
  <img src="Web page/img/logo.png" alt="芯影 Logo" width="200">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v16+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?logo=pytorch&logoColor=white" alt="PyTorch">
  <img src="https://img.shields.io/badge/Flask-2.3+-000000?logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
</p>

## 项目简介

"芯影" 是一款智能电影推荐引擎，针对 **观影选片难、信息茧房、推荐冰冷无解释** 三大痛点打造。项目融合 NLP、深度学习与多模型集成技术，基于 MovieLens-100k 数据集（含 2000 部电影、10 万条评分）构建，采用三层系统架构，API 平均响应时间 < 300ms。

### 核心亮点

- **四阶段推荐算法** — 集成矩阵分解（MF）、神经协同过滤（NCF）、混合模型三大推荐模型
- **打破信息茧房** — 高权重内容匹配算法，避免推荐结果单一化
- **冷启动解决** — 利用 NLP 技术分析电影元数据，解决新用户/新电影的冷启动问题
- **透明化推荐** — 生成人性化推荐理由，让用户了解 "为什么推荐这部电影"
- **高性能** — 模型 RMSE 达到 0.0902，API 平均响应 < 300ms

## 项目架构

```
Movie-Recommender/
├── Web page/                  # 前端页面
│   ├── index.html             # 主页面
│   ├── 第二个页面.html         # 电影详情页
│   ├── css/                   # 样式文件
│   │   ├── index.css
│   │   ├── category-filter.css
│   │   ├── popular-charts.css
│   │   └── ranking-list.css
│   ├── js/                    # 交互逻辑
│   │   ├── index.js           # 主入口
│   │   ├── Ajax.js            # Axios 请求封装
│   │   ├── Aiapi.js           # AI 推荐接口
│   │   ├── Filter.js          # 电影筛选
│   │   ├── Search.js          # 搜索功能
│   │   ├── tuijian.js         # 推荐模块
│   │   ├── category-filter.js # 分类过滤
│   │   ├── popular-charts.js  # 热门图表
│   │   ├── ranking-list.js    # 排行榜
│   │   └── Navigation bar.js  # 导航栏
│   ├── img/                   # 静态资源
│   └── pages/                 # 子页面
├── server.js                  # Node.js 后端服务入口
├── src/                       # 后端工具模块
│   └── index.js               # 模糊搜索逻辑
├── MovieJson/                 # 数据转换工具
│   ├── MovieJson.js           # Excel → JSON (主数据)
│   └── MovieJson2.js          # Excel → JSON (热门数据)
├── xytjfinal/                 # Python 推荐引擎
│   ├── api.py                 # Flask API 服务
│   ├── main.py                # 推荐系统主逻辑
│   ├── train.py               # 模型训练脚本
│   ├── index.html             # 推荐结果展示页
│   ├── index.js               # 前端交互
│   ├── models/                # 训练好的模型
│   │   ├── hybrid_best.pth    # 混合模型（最优）
│   │   ├── mf_best.pth        # 矩阵分解模型
│   │   ├── ncf_best.pth       # 神经协同过滤模型
│   │   ├── movie_encoder.pkl  # 电影编码器
│   │   ├── user_encoder.pkl   # 用户编码器
│   │   └── rating_scaler.pkl  # 评分归一化器
│   ├── data/ml-100k/          # MovieLens-100k 数据集
│   ├── figures/               # 训练可视化图表
│   └── requirements.txt.txt   # Python 依赖
├── MovieTitle.json            # 电影名称翻译映射
├── movie.xlsx                 # 电影数据源
├── top100.xlsx                # Top100 电影数据
├── demo.html                  # 演示页面
└── package.json               # Node.js 依赖配置
```

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | HTML5 + CSS3 + JavaScript + Font Awesome + Axios |
| **后端服务** | Node.js + Express.js + CORS + serve-favicon |
| **推荐引擎** | Python + Flask + Flask-CORS |
| **机器学习** | PyTorch + scikit-learn + pandas + NumPy + SciPy |
| **数据可视化** | Matplotlib |
| **数据集** | MovieLens-100k（2000 部电影，10 万条评分） |

## 快速开始

### 环境要求

- Node.js >= 16
- Python >= 3.8
- pip

### 1. 克隆项目

```bash
git clone https://github.com/Aciy-uz/Movie-Recommender.git
cd Movie-Recommender
```

### 2. 启动 Node.js 后端服务

```bash
# 安装依赖
npm install

# 启动服务（默认端口 3000）
node server.js
```

服务启动后访问 `http://localhost:3000`

### 3. 启动 Python 推荐引擎

```bash
cd xytjfinal

# 创建虚拟环境（推荐）
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt.txt

# 启动 Flask API
python api.py
```

### 4. （可选）重新训练模型

```bash
cd xytjfinal
python train.py
```

## API 接口文档

### Node.js 服务（端口 3000）

| 方法 | 路径 | 参数 | 说明 |
|------|------|------|------|
| GET | `/movieData` | `tag` - 电影分类标签 | 按标签筛选电影，传 `全部` 返回全部数据 |
| GET | `/movieData2` | `tag` - 传 `热门` | 获取热门电影数据 |
| GET | `/search` | `keywords` - 搜索关键词 | 模糊搜索电影 |
| POST | `/search-result` | Body: `{ searchKey, movieList }` | 接收搜索结果 |

### Python 推荐引擎

详见 `xytjfinal/api.py`，提供基于 MF、NCF、Hybrid 三种模型的推荐接口。

## 推荐算法

项目采用 **四阶段推荐流程**，集成三大模型：

| 模型 | 说明 | 最优 RMSE |
|------|------|-----------|
| **MF（矩阵分解）** | 经典协同过滤，捕捉用户-物品潜在因子 | 0.0902 |
| **NCF（神经协同过滤）** | 深度学习建模非线性用户-物品交互 | — |
| **Hybrid（混合模型）** | 融合内容特征与协同信号 | — |

推荐流程：
1. **内容匹配** — 高权重匹配用户偏好与电影元数据
2. **协同过滤** — 基于用户行为的相似度计算
3. **模型融合** — 多模型加权集成
4. **理由生成** — NLP 生成可解释的推荐理由

## 项目演示

<p align="center">
  <em>电影浏览与筛选</em>
</p>

<p align="center">
  <em>智能搜索</em>
</p>

<p align="center">
  <em>个性化推荐 + 推荐理由</em>
</p>

## 开发周期

本项目采用 **9 天敏捷开发** 模式完成。

## 团队分工

| 成员 | 职责 |
|------|------|
| **我** | 前端交互逻辑开发、Axios 请求封装、跨域通信、Node.js + Express 后端搭建 |
| 成员 B | 推荐算法设计与模型训练 |
| 成员 C | 数据处理与分析 |

> 我的详细职责：负责前端交互逻辑开发，封装 Axios 请求工具，处理跨域通信与请求异常，实现电影轮播、筛选等核心动态交互效果；搭建 Node.js + Express 后端服务，配置跨域规则与全局异常处理机制，保障前后端数据高效互通。

## License

[MIT](LICENSE)
