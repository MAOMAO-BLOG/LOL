(function(){
let gameData=[
    {
        image:
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1048139790,3786911039&fm=26&gp=0.jpg"
    },
    {
      image: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3409558993,650306857&fm=26&gp=0.jpg",
    },
    {
      image: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2453398919,3408790812&fm=26&gp=0.jpg",
    },
  ];
createCarousel('gameCarousel',gameData);
let container=$('.game_container');
container.ontouchstart=function(e){
  if(container.scrollTop>=10){ 
    e.stopPropagation();
  }
}
})();