let pages=$$('.page_container .page');
let pageContainer=$('.page_container');
let mySwitch=$('.menu_switch');
let myNav=$('.menu_nav');
let pageIndex=0,nextIndex=null;
let popVideo=$('#popVideo');
let play=$('.attend_slogan .attend_play');
let close=$('#popVideo .pop_close');
let video=$('#popVideo video');
function setStatic(){
    for(let i=0;i<pages.length;i++){
       let page=pages[i];
     if(i===pageIndex){
         page.style.zIndex=1;
     }else{
         page.style.zIndex=10;
     }
       page.style.top=(i-pageIndex)*(height()+49)+'px';
    }
}
setStatic();

function move(dis){
    for(let i=0;i<pages.length;i++){
        if(i!==pageIndex){
            pages[i].style.top=(i-pageIndex)*height()+dis+'px';
        }
    }
    if(dis>0 && pageIndex>0){
        nextIndex=pageIndex-1;
    }
    else if(dis<0 && pageIndex<pages.length-1){
        nextIndex=pageIndex+1;
    }else{
        nextIndex=null;
    }
}
function finishMove(){
    if(nextIndex===null){
        return;
    }
    pageIndex=nextIndex;
    pages[pageIndex].style.top=0;
    pages[pageIndex].style.transition='.5s';
    setTimeout(function(){
        pages[pageIndex].style.transition='';
        setStatic();
    },500);
}
function handle(e){
    let dis=e.touches[0].clientY-y1;
    if(Math.abs(dis)<20){
        dis=0;
    }
    move(dis);
    if(e.cancelable){
        e.preventDefault();
    }
}
pageContainer.ontouchstart=function(e){
    let y1=e.touches[0].clientY;
    pageContainer.addEventListener('touchmove',handle,{passive:false}
    )
    pageContainer.ontouchend=function(e){
        finishMove();
        pageContainer.removeEventListener('touchmove',handle)
    }
}
function showPage(index){
    if(index<pageIndex){
        pages[index].style.top=-height()+"px";
    }else if(index>pageIndex){
        pages[index].style.top=height()+"px";
    }else{
        if(pageIndex===0){
            pageIndex++;
        }else{
            pageIndex--;
        }
        setStatic();
    }
    pages[index].clientHeight;
    nextIndex=index;
    finishMove();
    mySwitch.click();
}
play.addEventListener('click',function(){
    video.play();
})
close.addEventListener('click',function(){
    video.pause();
})

