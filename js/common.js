function $(selector){
    return document.querySelector(selector);
}
function $$(selector){
    return document.querySelectorAll(selector);
}
function width(){
    return document.documentElement.clientWidth;
}
function height(){
    return document.documentElement.clientHeight;
}
let curIndex=0;
function createCarousel(carouselId,datas){
    let container=$('#'+carouselId);
    let carouselList=container.querySelector('.g_carousel-list');
    let carouselIndicator=container.querySelector('.g_carousel-indicator');
    let prev=container.querySelector('.g-carousel-prev');
    let next=container.querySelector('.g-carousel-next');
    function createCarouselElements(){
        let listHtml='',indicatorHtml='';
        carouselList.style.width=`${datas.length}00%`;
        for(let i=0;i<datas.length;i++){
            if(datas[i].link){
                listHtml+=`<li><a href=${datas[i].link}><img src=${datas[i].image}/></a></li>`;
            }else{
                listHtml+=`<li><img src=${datas[i].image}/></li>`;
            }
            indicatorHtml+=`<li></li>`;
        }
        carouselList.innerHTML=listHtml;
        carouselIndicator.innerHTML=indicatorHtml;
        carouselList.style.marginLeft=-curIndex*width()+'px';
    }
    createCarouselElements();//创建元素
    function setStatus(){
        carouselList.style.marginLeft=-curIndex*width()+'px';
        let beforeSelected=container.querySelector('.g_carousel-indicator .selected');
        if(beforeSelected){
            beforeSelected.classList.remove('selected');
        }
        carouselIndicator.children[curIndex].classList.add('selected');
        if(prev){
            if(curIndex===0){
                prev.classList.add('disabled');
            }else{
                prev.classList.remove('disabled');
            }
        }
        if(next){
            if(curIndex===datas.length-1){
            next.classList.add('disabled');
            }else{
                next.classList.remove('disabled');
            }
        }
    }
    setStatus();
    function toPrev(){
        if(curIndex===0){
            return;
        }
        curIndex--;
        setStatus();
    }
    function toNext(){
        if(curIndex===datas.length-1){
            return;
        }
        curIndex++;
        setStatus();
    }
    if(prev){
        prev.onclick=toPrev;
    }
    if(next){
        next.onclick=toNext;
    }
    let timer=null;
    function start(){
        if(timer){
            return;
        }
        timer=setInterval(()=>{
            curIndex++;
            if(curIndex===datas.length){
                curIndex=0;
            }
            setStatus();
        },2000);
    }
    function stop(){
        clearInterval(timer);
        timer=null;
    }
    start();
    container.ontouchstart=function(e){
        let pressTime=Date.now();
        e.stopPropagation();
        stop();
        let x=e.touches[0].clientX;
        carouselList.style.transition='none';
        container.ontouchmove=function(e){
            let dis=e.touches[0].clientX-x;
            carouselList.style.marginLeft=-curIndex*width()+dis+'px';
        }
        container.ontouchend=function(e){
            let duration=Date.now()-pressTime;
            carouselList.touchmove=null;
            carouselList.style.transition='';
            let dis=e.changedTouches[0].clientX-x;
            if(duration<300){
                if(dis>20 && curIndex>0){
                    toPrev();
                }
                else if(dis<-20 && curIndex<datas.length-1){
                    toNext();
                }  else{
                    setStatus();
                }
            }else{
                if(dis>width()/2 && curIndex>0){
                    toPrev();
                }else if(dis<-width()/2 &&curIndex<datas.length-1){
                }else{
                    setStatus();
                }
            }
            start();
        }
    }
}
async function ajax(url){
    let reg=/http[s]?:\/\/[^/]+/;
    let matches=url.match(reg);
    if(matches.length===0){
        throw new Error('invalid url');
    }
    let target=matches[0];
    let path=url.replace(reg,'');
    return await fetch(`http://proxy.yuanjin.tech${path}`,{
        headers:{
            target,
        }
    }).then(resp=>resp.json());
}
function closePop(){
   let closes=$$('.pop_close');
    for (let i = 0; i < closes.length; i++) {
        const close = closes[i];
        close.onclick=function(){
            let pop=this.parentElement.parentElement;
            pop.style.visibility='hidden';
        }
    }
}
closePop();
function showPop(id){
    console.log(1);
    let container=$("#"+id);
    console.log(container);
    container.style.visibility='visible';
}
    
    