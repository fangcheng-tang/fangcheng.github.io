var users=getCookie("user")
console.log(users)
var urlr=location.href
var box=document.querySelector(".cart_wrap")
var cartlist=localStorage.getItem("cartlist")
// json对象只能转一次在转要报错 所以定义全局
cartlist=JSON.parse(cartlist)||[]
if(users){
    show()
}else{
    alert("你还没有登录")
    location.href="./login.html?pathUrl="+urlr
}
// 因为每次变化都要渲染 所以封装成函数
function show(){
    // 如果有数据就开始渲染
      if(cartlist.length>0){
        // 只要数据中只有一个不是1 就返回false
        var aa=cartlist.every(function(item){
          return item.is_select==1
        })
        // 调用total渲染商品种类
        var numr=total()
         var str=""
         str+=`
         <div class="cart_header">
                    <p><input type="checkbox" class="quanxuan"  name="quan1" ${aa?"checked":""}><span>全选</span></p>
                    <span class="names">商品名称</span>
                    <span class="vips">会员价</span>
                    <span class="nums">数量</span>
                    <span class="discounts">优惠金额</span>
                    <span class="totals">小计</span>
                    <span class="operation">操作</span>
                </div>
                <div class="cart_center">
                    <p class="th_title">康爱多</p>
                    <ul class="list_box">
         `
       cartlist.forEach(function(item){
           str+=`
           <li class="clearfix">
           <div class="xuan"><input type="checkbox" class="check" name="xuan" ${item.is_select==1?"checked":''} data-id="${item.id}"></div>
           <div class="list_img">
               <img src="${item.img}" alt="">
           </div>
           <div class="list_name">${item.name}</div>
           <div class="list_vip">${item.dazhe}</div>
           <div class="list_num">
               <span class="cut" data-id="${item.id}">-</span>
               <input type="text" value="${item.number}">
               <span class="add" data-id="${item.id}">+</span>
           </div>
           <div class="list_dis">
               <p>省<span style="color: red;">${((item.yujia-item.dazhe)*item.number).toFixed(2)}</span>元</p>
           </div>
           <div class="list_total">
               ￥${item.number*item.dazhe}
           </div>
           <div class="list_delete" data-id="${item.id}">
               删除
           </div>
       </li>
           `
       })
       str+=`
       </ul> 
       <div class="heji">合计:￥${numr[1]}</div>
     
   </div>
   <div class="cart_footer">
       <div class="ter_header clearfix">
          <div class="ter_1">  
              <input type="checkbox" class="ter_quan">
              <span class="quan2">全选</span>
              <span class="ter_delete">批量删除</span>  
          </div>
           <div class="ter_2">
               <span class="ter_dis">共省￥${numr[2]}</span>
               <span class="ter_haicha">还差62.10元包邮</span>
           </div>
       </div>
       <div class="ter_main">
           <a href="./shoplist.html">继续购物</a>
           <div>已选择${numr[0]}件商品</div>
           <div>商品总价(不含运费) : ￥${numr[1]}</div>
           <button>去结算</button>
       </div>
   </div>
       `
       box.innerHTML=str
  // 没有数据就选购
      }else{
        var str1=""
        str1=`
          <div class="jumbotron">
          <h1>你的购物车空空如也</h1>
          <p>点击下方按钮快去选购吧</p>
          <p><a class="btn btn-primary btn-lg" href="./shoplist.html" role="button">去选购吧</a></p>
          </div>
          `
          box.innerHTML=str1
      }
  }
// 事件委托
box.onclick=function(e){
    e=e||window.event
    var target=e.target||e.srcElement
    // 判断是否为加号 是加号就更该数据
    if(target.innerHTML=='+'){
        var id=target.getAttribute("data-id")
        cartlist.forEach(function(item){
            if(item.id==id){
                item.number++
            }
        })
        localStorage.setItem("cartlist",JSON.stringify(cartlist))
        show()
    }
    if(target.innerHTML=='-'){
        var id=target.getAttribute("data-id")
        cartlist.forEach(function(item){
            if(item.id==id){
                 item.number--
            }
        })
        localStorage.setItem("cartlist",JSON.stringify(cartlist))
        show()
    }
    // 判断是不是不要了 不要就过滤掉数据重新设置
    if(target.className=="list_delete"){
        console.log(2)
      var id=target.getAttribute("data-id")
      cartlist=cartlist.filter(function(item){
        return item.id!=id
      })
      localStorage.setItem("cartlist",JSON.stringify(cartlist))
      show()
    }
    // 判断是不是全选，是就个更改is_select的值
    if(target.name=="quan1"){
        console.log(1)
     cartlist.forEach(function(item){
      if(target.checked){
        item.is_select=1
        console.log(item.is_select)
      }else{
        item.is_select=0
      }
     })
     localStorage.setItem("cartlist",JSON.stringify(cartlist));
     show()
    }
    //判断是不是xuan 如果是就点击一下切换一下
    if(target.name=="xuan"){
        console.log(3)
      var id=target.getAttribute("data-id")
      cartlist.forEach(function(item){
         if(item.id==id){
          item.is_select=item.is_select==1?0:1
         }
      })
      localStorage.setItem("cartlist",JSON.stringify(cartlist));
      show()
    }
    if(target.innerHTML=="去结算"){
      if(confirm("你确定要购买？")){
        alert("你需要支付￥"+total()[1])
        cartlist=cartlist.filter(function(item){
          return item.is_select!=1
        })
        localStorage.setItem("cartlist",JSON.stringify(cartlist));
        show()
      }
    }
    
}
function total(){
  var num=0
  var price=0
  var sheng=0
  cartlist.forEach(function(item){
    if(item.is_select==1){
      num+=item.number
      price+=item.number*item.dazhe
      sheng+=((item.yujia-item.dazhe)*item.number)
    }
  })
  sheng=sheng.toFixed(2)
  return [num,price,sheng]
}
