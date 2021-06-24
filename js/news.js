(function(){
    let carouselDatas = [
        {
        link:
            "https://lolm.qq.com/m/news_detail.html?docid=8584324486918752329&amp;e_code=492513&amp;idataid=279688",
        image:
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1048139790,3786911039&fm=26&gp=0.jpg"
        },
        {
        link:
            "https://lolm.qq.com/m/news_detail.html?docid=13355407427466544705&amp;e_code=492506&amp;idataid=279689",
        image:
            "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3409558993,650306857&fm=26&gp=0.jpg",
        },
        {
        link:
            "https://lolm.qq.com/m/news_detail.html?docid=15384999930905072890&amp;e_code=492507&amp;idataid=279690",
        image:
            "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2453398919,3408790812&fm=26&gp=0.jpg",
        },
    ];
    createCarousel('newsCarousel',carouselDatas);
    let newsList=$('.news_list');
    let data;
    function createNewsList(){
        ajax( "https://apps.game.qq.com/cmc/cross?serviceId=166&source=web_pc&filter=channel&chanid=4897&typeids=1&limit=4&start=0&sortby=sIdxTime")
        .then(resp=>{
            data=resp.data.items;
            let html=''
            for(let i=0;i<data.length;i++){
                let span=data[i].sTagInfo.split(',')[0].split('|')[1];
                html+=`<li>
                <span>${span}</span>
                <a href="">${data[i].sDesc}</a>
                <p>${data[i].sIdxTime}</p>
            </li>`;
            }
            newsList.innerHTML=html;
        });
    }   
    createNewsList();
})();