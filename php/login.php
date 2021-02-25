<?php
header("content-type=text/html;charset=utf-8");
 $ul=$_GET["user1"];
 $pl=$_GET["pass"];
$link=mysqli_connect("localhost","root",'','shoplist');
mysqli_set_charset($link,"utf8");
// if(mysqli_connect_error($link)){
//     echo"连接失败";
// }else{
//     echo"连接成功";
// }
$sql="select * from logins where username='$ul' AND password=$pl";
$result=mysqli_query($link,$sql);
if(mysqli_fetch_assoc($result)){
    echo"1";
}else{
    echo"0";
}
mysqli_close($link);

?>
