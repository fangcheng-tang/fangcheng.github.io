class Large{
    constructor(){
    this.sBox = document.querySelector(".s_box");
    this.sImg = document.querySelector(".s_box img");
    this.sSpan = document.querySelector(".s_box span");
    this.bBox = document.querySelector(".b_box");
    this.bImg = document.querySelector(".b_box img");
    // 点击小图切换大图的按钮
    this.li = document.querySelectorAll(".list li");
    }
    addEvent(){
    var that = this;
    this.sBox.onmouseover = function(){
    that.over();
    }
    this.sBox.onmousemove = function(eve){
    var e = eve || window.event;
    that.move(e);
    }
    this.sBox.onmouseout = function(){
    that.out();
    }
    // 切换图片按钮的点击事件：根据布局做出调整
    for(var i=0;i<this.li.length;i++){
    this.li[i].onclick = function(){
     that.sImg.src = this.children[0].src;
     that.bImg.src = this.children[0].src;
    }
    }
    }
    over(){
    this.sSpan.style.display = "block";
    this.bBox.style.display = "block";
    }
    move(e){
    // 计算遮罩层跟随鼠标移动时的left和top
    var l = e.pageX - this.sBox.offsetLeft - this.sSpan.offsetWidth/2;
    var t = e.pageY - this.sBox.offsetTop - this.sSpan.offsetHeight/2;
    // 边界限定
    if(l<0) l=0;
    if(t<0) t=0;
    if(l > this.sBox.offsetWidth - this.sSpan.offsetWidth){
    l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
    }
    if(t > this.sBox.offsetHeight - this.sSpan.offsetHeight){
    t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
    }
    // 设置遮罩层的位置
    this.sSpan.style.left = l + "px";
    this.sSpan.style.top = t + "px";
    // 根据遮罩层移动的距离计算比例
    var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
    var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
    // 根据上一步得到的比例，计算右侧大图要移动的当前值
    this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
    this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
    }
    out(){
    this.sSpan.style.display = "none";
    this.bBox.style.display = "none";
    }
}
var search=location.search
var box=document.querySelector(".main_inner")
var dt
if(search){
    console.log(1)
     var ids=search.split("=")[1]
     var show=async function(){
         dt=await $.ajax({
             url:"../php/xianqing.php",
             data:{id:ids},
             dataType:'json'
         })
         var str=""
         str+=`
         <div class="main_lt">
                    <div class="fangda">
                        <div class="s_box">
                            <img src="${dt.img}" alt="">
                            <span></span>
                            <div class="b_box">
                                <img src="${dt.img}" alt="">
                            </div>
                        </div>
                         <ul class="list">
                            <li><img src="https://image.360kad.com/group2/M00/F2/D9/CgAgFV5y2iuAPFprAAG8Sl7gS6c598.jpg" alt=""></li>
                            <li><img src="https://image.360kad.com/group2/M00/F2/D9/CgAgFF5y2jCAbMd-AAEkiDkzJOw631.jpg" alt=""></li>
                            <li><img src="https://image.360kad.com/group2/M00/F2/D9/CgAgFV5y2jWAKDMzAAFnHsCo0Ro229.jpg" alt=""></li>
                            <li><img src="https://image.360kad.com/group2/M00/F2/D9/CgAgFF5y2jWAaw9YAAHN3BrQEhI206.jpg" alt=""></li>
                            <li><img src="https://image.360kad.com/group2/M00/F2/D9/CgAgFV5y2jWASE1-AAGynKzdkMQ585.jpg" alt=""></li>
                        </ul>
                    </div>
                    <p><span>温馨提示 :</span> 图片均为康爱多对原品的真实拍摄，仅供参考﹔如遇新包装上市可能存在上新滞后，请以实物为准。
                    </p>
                </div>
                <div class="main_gt">
                    <h1>${dt.name}</h1>
                    <div class="gt_center">
                    <p class="chunjie">【春节不打烯】低至21.5元，清热利湿，行气。用于湿热蕴结胃肠所致的腹泻，小儿儿消化不良。关爱健康，呵护胃肠道，详情点击</p>
                    <p class="vip clearfix"><strong>会员价</strong> <span>￥${dt.dazhe}</span></p>
                    <p class="huodo clearfix"><strong>活动</strong> <span>满1件加19.90元，即可获得价值39.90元的万孚幽门螺杆菌(HP)抗原检测试剂盒(胶体金法)卡型1人份1件; <br> 加169.00元，即可获得价值298.00元的生命需宝益生菌粉45a(1.5a*30线)1仕
                    </span></p>
                    <p class="p1 clearfix"><strong>主用名批</strong><span>肠炎宁片</span></p>
                    <p class="p2 clearfix"><strong>准文生产</strong><span>国药准字Z36020518（国家药品监督管理局)</span></p>
                    <p class="p3 clearfix"><strong>企业</strong><span>江西康恩贝中药有限公司</span></p>
                    </div>
                    <div>
                        <img src="../images/img10.png" alt="">
                    </div>
                    <div class="num clearfix">
                        <div>数量</div>
                        <div class="clearfix">
                            <span class="span1">-</span>
                            <span class="span3">${dt.number}</span>
                            <span class="span2">+</span>
                        </div>
                    </div>
                    <a  href="./cart.html" class="btn">加入购物车</a> 
                </div>
         `
         box.innerHTML=str
         // 启动
         var l = new Large();
         l.addEvent();
     }
    show()//调用不能写在赋值式函数前面  不然会报错
}else{
    alert("你还没有选购商品")
    location.href="./shoplist.html"
}
var cartlist=localStorage.getItem("cartlist")
cartlist=JSON.parse(cartlist)

box.onclick=function(e){
    e=e||window.event
    var target=e.target||e.srcElement
    var inp=document.querySelector(".span3")  
    if(target.innerHTML=='-'){
        var aa=document.querySelector(".span3")
        var num=aa.innerHTML
        num=Number(num)
        num--
        if(num<=1){
            aa.innerHTML=1
            cartlist.forEach(function(item){
                if(item.id==dt.id){
                     item.number=1
                }
            })
        }else{
            aa.innerHTML=num
            cartlist.forEach(function(item){
                if(item.id==dt.id){
                     item.number=num
                }
            })
        }   
       
        localStorage.setItem("cartlist",JSON.stringify(cartlist))
    }
    if(target.innerHTML=='+'){
        var aa=document.querySelector(".span3")
        var num=aa.innerHTML
        num=Number(num)
        num++
        if(num>=10){
            aa.innerHTML=10
            cartlist.forEach(function(item){
                if(item.id==dt.id){
                     item.number=10
                }
            })
        }else{
            aa.innerHTML=num
            cartlist.forEach(function(item){
                if(item.id==dt.id){
                     item.number=num
                }
            })
        }   
       
        localStorage.setItem("cartlist",JSON.stringify(cartlist))
    }
    if(target.innerHTML=="加入购物车"){
        if(cartlist){
            var a=0
           cartlist.forEach(function(item){
               if(item.id==dt.id){
                   a++
               }
           })
           if(a==0){
               dt["number"]=1
               cartlist.push(dt)
           }
           localStorage.setItem("cartlist",JSON.stringify(cartlist))
        }else{
            dt["number"]=1
            localStorage.setItem("cartlist",JSON.stringify([dt]))
        }
    }
}
