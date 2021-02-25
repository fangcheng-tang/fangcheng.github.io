var row=document.querySelector(".imgbox")
var Pagination1=document.querySelector(".pagination")
var show=async function(){//自执行函数上面的代码记得打分号
    var dt=await promiseAjax({
        url:"../php/list.php",
        datatype:"json",
    })
    new Pagination(Pagination1,{
                pageInfo:{
                    pagenum:1, //当前页
                    pagesize:8, //一页显示的条数
                    totalsize:dt.length,//总条数
                    totalpage:Math.ceil(dt.length/8)//总页数
                },
                //页面文本信息的参数
                textInfo:{
                    first:'首页',
                    prev:"上一页",
                    next:"下一页",
                    last:"尾页"
                },cb(m){
                   var arr=dt.slice((m-1)*8,m*8)
                   var str=""
                   arr.forEach(function(item){
                       str+=`
                       <li class="clearfix">
                       <div><img src="${item.img}" alt=""></div>
                       <div>
                           <h3>${item.name}</h3>
                           <p>${item.youhui}</p>
                           <div class="buy">
                               <div class="buy_lt">
                                   <p>￥${item.dazhe}</p>
                                   <p>￥${item.yujia}</p>
                                   <div>已售${item.yishou}%</div>
                               </div>
                               <a href="./xiangqing.html?id=${item.id}" class="buy_gt">立即购买</a>
                           </div>
                       </div>
                   </li>
                       `
                   })
                   row.innerHTML=str
                }
           })
}
show()