'use strict';

// ===================== 常量 =====================
const DEFAULT_POSTER = 'https://picsum.photos/300/450';
const API_URL = 'http://localhost:3000/movieData';
const PAGE_SIZE = 12; // 每页显示12条

// ===================== 全局状态 =====================
const state = {
    allMovies: [],
    currentType: 'all',     
    currentYear: 'all',     
    currentScore: 'all',    
    isLoading: false,
    currentPage: 1,         
    isEnd: false            
};

const filterCache = {};

// ===================== DOM 缓存 =====================
const dom = {
    typeFilterBtns: document.querySelectorAll('#typeFilterTags .filter-tag'),
    yearFilterBtns: document.querySelectorAll('#yearFilterTags .filter-tag'),
    scoreFilterBtns: document.querySelectorAll('#scoreFilterTags .filter-tag'),
    filterContent: document.getElementById('all'),
    movieGrid: null,
    errorMsg: null,
    emptyMsg: null,
    endMsg: null
};

// 初始化网格容器
dom.movieGrid = document.createElement('div');
dom.movieGrid.className = 'movie-grid';
dom.filterContent.innerHTML = '';
dom.filterContent.appendChild(dom.movieGrid);

// ===================== 工具函数 =====================
function showError(message) {
    if (!dom.errorMsg) {
        dom.errorMsg = document.createElement('div');
        dom.errorMsg.className = 'error-message';
        dom.errorMsg.style.cssText = 'text-align:center;padding:30px;color:#999;font-size:16px;';
        dom.filterContent.appendChild(dom.errorMsg);
    }
    dom.errorMsg.textContent = message;
    dom.errorMsg.hidden = false;
}

function clearError() {
    if (dom.errorMsg) dom.errorMsg.hidden = true;
}

function showEmptyMessage() {
    clearEndMessage();
    if (dom.filterContent.querySelector('.empty-message')) return;
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'empty-message';
    emptyMsg.style.cssText = 'text-align:center;padding:30px;color:#999;font-size:16px;';
    emptyMsg.textContent = '暂无符合该条件的影片';
    dom.filterContent.appendChild(emptyMsg);
    dom.emptyMsg = emptyMsg;
}

function clearEmptyMessage() {
    if (dom.emptyMsg) {
        dom.emptyMsg.remove();
        dom.emptyMsg = null;
    }
}

function showEndMessage() {
    clearEmptyMessage();
    if (dom.endMsg) return;
    dom.endMsg = document.createElement('div');
    dom.endMsg.className = 'end-message';
    dom.endMsg.style.cssText = 'text-align:center;padding:20px;color:#ccc;font-size:14px;';
    dom.endMsg.textContent = '✨ 已加载全部影片';
    dom.filterContent.appendChild(dom.endMsg);
}

function clearEndMessage() {
    if (dom.endMsg) {
        dom.endMsg.remove();
        dom.endMsg = null;
    }
}

function createMovieCard(movie) {
    let html = '';
    html += `
        <div class="movie-card">
        <a href="https://v.qq.com/x/search/?q=${movie.title}" target="_blank" >
            <div style="position:relative" class="poster-wrap">
                <img 
                    src="${movie.poster_url || DEFAULT_POSTER}" 
                    alt="${movie.title || '电影海报'}" 
                    class="card-poster" 
                    loading="lazy" 
                    onerror="this.src='${DEFAULT_POSTER}'"
                >
                <span class="card-rating">${movie.score || '暂无评分'}</span>
            </div>
            <div class="card-info">
                <h3 class="card-title">${movie.title || '未知影片'}</h3>
                <div class="card-meta">
                    <span>${movie.showtime || '未知年份'}</span>
                    <span>${movie.content || '未知类型'}</span>
                </div>
            </div>
            </a>
        </div>
    `;
    return html;
}

// ===================== 分页渲染 =====================
function renderMovieList() {
    clearEmptyMessage();
    clearError();
    
    const filteredMovies = getFilteredMovies();
    const { currentPage } = state;
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageMovies = filteredMovies.slice(start, end);

    if (currentPage === 1) {
        dom.movieGrid.innerHTML = '';
    }

    if (pageMovies.length > 0) {
        let html = '';
        pageMovies.forEach(movie => {
            html += createMovieCard(movie);
        });
        dom.movieGrid.innerHTML += html;
    }

    // 【爱情片修复】更严谨的结束判断：必须当前页数据为空 且 不是第一页，才判定加载完毕
    state.isEnd = filteredMovies.length > 0 && pageMovies.length === 0;
    state.isLoading = false; 
    
    if (state.isEnd) {
        showEndMessage();
    } else {
        clearEndMessage();
    }

    if (filteredMovies.length === 0) {
        showEmptyMessage();
        state.isEnd = true;
    }
}

// ===================== 核心筛选逻辑（【爱情片修复】重点修改类型匹配规则） =====================
function getFilteredMovies() {
    const { currentType, currentYear, currentScore } = state;
    const cacheKey = `type_${currentType}_year_${currentYear}_score_${currentScore}`; // 【爱情片修复】避免cacheKey重复
    
    if (filterCache[cacheKey]) return filterCache[cacheKey];

    let filteredList = [...state.allMovies];

    if (currentType !== 'all') {
        filteredList = filteredList.filter(movie => {
            if (!movie.content) return false;
            const movieTypeStr = movie.content.trim().toLowerCase();
            const types = movieTypeStr.split(/[\s,，、;/]+/).filter(Boolean);
            return types.includes(currentType.toLowerCase()) || types.some(t => t.includes(currentType.toLowerCase()));
        });
    }

    if (currentYear !== 'all') {
    filteredList = filteredList.filter(movie => {
        const movieYearStr = movie.showtime?.split('-')[0];
        const movieYear = Number(movieYearStr);
        if (isNaN(movieYear)) return false;
        
        switch (currentYear) {
        case '2026': return movieYear === 2026;
        case '2025-2020': return movieYear >= 2020 && movieYear <= 2025;
        case '2019-2010': return movieYear >= 2010 && movieYear <= 2019;
        case '2009-2000': return movieYear >= 2000 && movieYear <= 2009;
        case '1999-below': return movieYear <= 1999;
        default: return true;
        }
    });
    }

    if (currentScore !== 'all') {
        filteredList = filteredList.filter(movie => {
            const movieScore = Number(movie.score);
            if (isNaN(movieScore)) return false;
            
            switch (currentScore) {
                case '9-10': return movieScore >= 9.0;
                case '8-9': return movieScore >= 8.0 && movieScore < 9.0;
                case '7-8': return movieScore >= 7.0 && movieScore < 8.0;
                case '6-7': return movieScore >= 6.0 && movieScore < 7.0;
                default: return true;
            }
        });
    }

    filterCache[cacheKey] = filteredList;
    console.log(`【筛选调试】${currentType}类型共筛选出 ${filteredList.length} 部电影`); // 【爱情片修复】调试日志
    return filteredList;
}

function updateActiveBtn(btnType, activeValue) {
    let btnList = [];
    const dataAttr = btnType === 'type' ? 'filter' : btnType;
    
    switch (btnType) {
        case 'type': btnList = dom.typeFilterBtns; break;
        case 'year': btnList = dom.yearFilterBtns; break;
        case 'score': btnList = dom.scoreFilterBtns; break;
    }

    btnList.forEach(btn => {
        const isActive = btn.dataset[dataAttr] === activeValue;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });
}

function applyFilter() {
    state.currentPage = 1;
    state.isEnd = false; // 【爱情片修复】强制重置为未加载完毕
    state.isLoading = false;
    Object.keys(filterCache).forEach(key => delete filterCache[key]);
    renderMovieList();
}

// ===================== 加载下一页数据 =====================
function loadNextPage() {
    if (state.isLoading || state.isEnd) return;
    state.isLoading = true;
    state.currentPage += 1;
    renderMovieList();
}

// ===================== 滚动触底判断 =====================
function isScrollToBottom() {
    if (!dom.filterContent) return false;
    const container = dom.filterContent;
    const clientHeight = container.clientHeight || 0;
    const scrollTop = container.scrollTop || 0;
    const scrollHeight = container.scrollHeight || 0;
    const threshold = 100;
    return scrollTop + clientHeight >= scrollHeight - threshold;
}

// ===================== 防抖函数 =====================
function debounce(fn, delay = 200) {
    let timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
    }
}

const scrollListener = debounce(() => {
    isScrollToBottom() && loadNextPage();
});

// ===================== 接口请求 =====================
async function fetchMovies() {
    try {
        state.isLoading = true;
        const response = await fetch(API_URL, { signal: AbortSignal.timeout(8000) });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const movieData = await response.json();
        state.allMovies = movieData;
        console.log(`【数据调试】共请求到 ${movieData.length} 部电影`); // 【爱情片修复】调试日志
        
        clearError();
        applyFilter();
    } catch (err) {
        console.error('数据请求失败:', err);
        showError(err.name === 'TimeoutError' ? '请求超时，请检查网络' : '加载失败，请稍后重试');
    } finally {
        state.isLoading = false;
    }
}

// ===================== 事件绑定 =====================
dom.typeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.filter;
        if (state.currentType === type) return;
        state.currentType = type;
        updateActiveBtn('type', type);
        applyFilter();
    });
});

dom.yearFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const year = btn.dataset.year;
        if (state.currentYear === year) return;
        state.currentYear = year;
        updateActiveBtn('year', year);
        applyFilter();
    });
});

dom.scoreFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const score = btn.dataset.score;
        if (state.currentScore === score) return;
        state.currentScore = score;
        updateActiveBtn('score', score);
        applyFilter();
    });
});

// ===================== 滚动事件绑定 =====================
dom.filterContent.addEventListener('scroll', scrollListener);
window.addEventListener('scroll', scrollListener);

// ===================== 初始化 =====================
fetchMovies();