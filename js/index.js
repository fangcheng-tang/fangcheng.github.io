// 轮播图
var lunbo=document.querySelector("#lunbo")
function swiper(){
    var mySwiper = new Swiper ('#lunbo', {
        effect : 'fade',
        autoplay:true,
        loop: true, // 循环模式选项      
        // 如果需要分页器
        pagination: {
        el: '.swiper-pagination',
        clickable :true,
        },      
        // 如果需要前进后退按钮
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
      }) ;
      lunbo.onmouseenter=function(){
        mySwiper.autoplay.stop(); 
      };
      lunbo.onmouseleave=function(){
        mySwiper.autoplay.start();
      }
}     
swiper()
// 固定搜索栏
var fixs=document.querySelector(".fixs")
window.onscroll=function(){
    var distance=document.documentElement.scrollTop
    if(distance>=550){
        fixs.className="fixr"
    }else if(distance<550){
        fixs.className='fixs'
    }
}
//  倒计时
var spans=document.querySelectorAll(".second_center>p>span")
conntDwon()
setInterval(conntDwon,1000)
function conntDwon(){
    var time1=new Date()
    var time2=new Date(2021,3,28)
    var times=(time2-time1)/1000

    var h=parseInt(times/60/60%24)
    if(h<10){
        spans[0].innerHTML="0"+h
    }else{
       spans[0].innerHTML=h
    }
    var m=parseInt(times/60%60)
    if(m<10){
        spans[1].innerHTML="0"+m
    }else{
       var m1=parseInt(m/10)
       var m2=parseInt(m%10)
       spans[1].innerHTML=m1+""+m2
    }
    var s=parseInt(times%60)
    if(s<10){
        spans[2].innerHTML="0"+h
    }else{
        var s1=parseInt(s/10)
        var s2=parseInt(s%10)
        spans[2].innerHTML=s1+""+s2
    }
}

// 列表按钮
var prev=document.querySelector(".prev")
var next=document.querySelector(".next")
var uls=document.querySelectorAll(".second_inner ul")
prev.onclick=function(){
    console.log(1)
     uls[0].style.display="none"
     uls[1].style.display="flex"
}
next.onclick=function(){
    uls[1].style.display="none"
    uls[0].style.display="flex"
}
// 点击那个商品就跳转商品列表
var secondInner=document.querySelector(".second_inner")


// 家庭轮播图
var mySwipe = new Swiper ('#jia_center', {
    effect : 'fade',
    autoplay:true,
    loop: true, // 循环模式选项      
    // 如果需要分页器
    pagination: {
    el: '.swiper-pagination',
    clickable :true,
    },      
  })    
  var li=document.querySelectorAll(".second_inner>ul>li")
  for(var i=0;i<li.length;i++){
      li[i].onclick=function(){
          location="./shoplist.html"
      }
  }