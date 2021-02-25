// 封装一个动画
function animate(box,target,fn1){
     clearInterval(box.times)//清除定时器
     box.times=setInterval(function(){
     var current=parseInt(getStyle(box,"marginLeft"))
     var speed=(target-current)/10
     speed=speed>0?Math.ceil(speed):Math.floor(speed)
     var next=current+speed
     if(next==target){
         clearInterval(box.times)
         fn1()
     }
     box.style.marginLeft=next+"px"
},20)} 
function getStyle(dom,attr){
     if(window.getComputedStyle){
         return window.getComputedStyle(dom,null)[attr]
     }else{
         return dom.current[attr]
     }
}
var span1=document.querySelector("#span1")
var span2=document.querySelector("#span2")
var login=document.querySelector("#login")
var erweima=document.querySelector("#erweima")
span1.onclick=function(){
      login.style.display="none"
      erweima.style.display="block"
}
span2.onclick=function(){
    erweima.style.display="none"
    login.style.display="block"
}
var img1=document.querySelector("#img1")
var img2=document.querySelector("#img2")
var erImg=document.querySelector(".er_img")
console.log(getStyle(img1,"marginLeft"))
erImg.onmouseenter=function(){
     animate(img1,0,function(){
        $("#img2").fadeIn(1000,"linear")
     })
}
erImg.onmouseleave=function(){
    img2.style.display="none"
    animate(img1,80,function(){
        return
    })
}
var inp=document.querySelector("[type=checkbox]")
var user=document.querySelector("[type=text]")
var pass=document.querySelector("[type=password]")
var sub=document.querySelector(".btn")
inp.onclick=function(){
    if(inp.checked){
        sub.disabled=false
    }else{
        sub.disabled=true
    }
}
var serch=location.search
serch=serch.split("=")[1]
sub.onclick=function(){
    var users=user.value
    var passr=pass.value
    $.ajax({
        url:"../php/login.php",
        data:{user1:users,pass:passr},
        success:function(dt){
            if(dt==1){
                if(serch){//如果是从购物车跳转过来的 登录成功后有跳入购物车
                    location.href=serch
              }else{//如果不是从购物车跳转过来的，那么就返回列表页挑选商品
                   location.href="list.html"
              }
                setCookie("user",users)
            }else{
                alert("登陆失败")
            }
        }
    })
    return false
}

