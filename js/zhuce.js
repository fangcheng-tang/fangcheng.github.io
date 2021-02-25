var btn=document.querySelector(".btn")
var user=document.querySelector("[type=text]")
var pass=document.querySelector("[type=password]")
var regs1=document.querySelector(".regs1")
var regs2=document.querySelector(".regs2")
console.log(btn)
//验证用户名格式
function isname(obj){
    var reg=/^[\u4e00-\u9fa5]{2,4}$/;
    if(!reg.test(obj.value)){
        regs1.innerHTML="请正确填写姓名！姓名为两到四个汉字。"
        obj.value="";
        btn.disabled=true
    }else{
        btn.disabled=false
        regs1.innerHTML=""
    }
}
//电话号码验证
function isnum(obj){
    var reg=/[0-9]{4,10}/;
    if(!reg.test(obj.value)){
        regs2.innerHTML="请输入4-10个数字"
        obj.value="";
        btn.disabled=true
    }else{
        regs2.innerHTML=""
        btn.disabled=false
    }
}
user.onblur=function(){
    isname(this);
}
pass.onblur=function(){
    isnum(this);
}
btn.onclick=function(){
    var users=user.value
    var passr=pass.value
    console.log(1)
    $.ajax({
        url:"../php/zhuce.php",
        data:{user1:users,pass:passr},
        success:function(dt){
            if(dt==1){
                alert("注册成功")
            }else{
                alert("注册失败")
            }
        }
    })
    return false
}