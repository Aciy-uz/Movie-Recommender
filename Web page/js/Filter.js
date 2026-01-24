function XuanRan(leix){
    axios({
            url:'http://localhost:3000/movieData',
            params:{
                tag:leix
            }
        }).then(err =>{
            console.log(err.data);
            let matchData = err.data
            let html = '';
            let n = 30;
            for(let j=0;j< n;j++){
                html += `
                <div class="movie-card content-item" data-category="${matchData[j].content || ''}">
                    <a href="https://v.qq.com/x/search/?q=${matchData[j].title}" target="_blank" >
                        <div style="position: relative;">
                        <img src="${matchData[j].poster_url || DEFAULT_POSTER}" alt="${matchData[j].title || ''}" loading="lazy" onerror="this.src=''">
                        <span class="card-rating">${matchData[j].score || '暂无评分'}</span>
                        </div>
                        <div class="card-info">
                        <h3 class="card-title">${matchData[j].title || '未知片名'}</h3>
                        <div class="card-meta">
                            <span>${matchData[j].showtime || '未知时间'}</span>
                            <span>${matchData[j].content || '暂无分类'}</span>
                        </div>
                        </div>
                    </a>
                </div>
              
                `
            }
            document.querySelector('.Rendering1').innerHTML = html;
        })
}
XuanRan('全部')
const tag = document.querySelectorAll('.tag');
for(let i=0;i<tag.length;i++){
    tag[i].addEventListener('click',function(){
        try{
            for(let j=0;j<tag.length;j++){
                document.querySelector('.active').classList.remove('active');
            }
        }catch(err){
            // console.log(err)
        this.classList.add('active');
        }
        // 添加类名
        console.log(tag[i].innerText);
        XuanRan(tag[i].innerText)
        
    })

    let n = 30;
    document.querySelector('.collapse-btn1').addEventListener('click',function(){
        n += 30;
        XuanRan2(tag[i].innerText,n)
    })
    document.querySelector('.collapse-btn2').addEventListener('click',function(){
        n = 30;
        XuanRan2(tag[i].innerText,30)
    })

}


function XuanRan2(leix,n){
    axios({
        url:'http://localhost:3000/movieData',
        params:{
            tag:leix
        }
    }).then(err =>{
        console.log(err.data);
        let matchData = err.data
        let html = '';
        for(let j=0;j< n;j++){
            html += `
            <div class="movie-card content-item" data-category="${matchData[j].content || ''}">
                <a href="https://v.qq.com/x/search/?q=${matchData[j].title}" target="_blank" >
                    <div style="position: relative;">
                    <img src="${matchData[j].poster_url || DEFAULT_POSTER}" alt="${matchData[j].title || ''}" loading="lazy" onerror="this.src=''">
                    <span class="card-rating">${matchData[j].score || '暂无评分'}</span>
                    </div>
                    <div class="card-info">
                    <h3 class="card-title">${matchData[j].title || '未知片名'}</h3>
                    <div class="card-meta">
                        <span>${matchData[j].showtime || '未知时间'}</span>
                        <span>${matchData[j].content || '暂无分类'}</span>
                    </div>
                    </div>
                </a>
            </div>
            
            `
        }
        document.querySelector('.Rendering1').innerHTML = html;
    })
}