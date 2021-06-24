(function(){
let mySwitch=$('.menu_switch');
let myNav=$('.menu_nav');
function togNav(){
    mySwitch.classList.toggle('menu_switch--expend');
    myNav.classList.toggle('menu_nav--expend');
}
mySwitch.onclick=togNav;
})();