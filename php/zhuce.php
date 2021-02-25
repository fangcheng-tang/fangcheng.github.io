<?php
  header("content-type:text/html;charset=utf-8");
  // 连接数据库
  $ul=$_GET["user1"];
  $pl=$_GET["pass"];
  $link=mysqli_connect("localhost","root","","shoplist");
  // 设置编码
  mysqli_set_charset($link,"utf8");
  $sql="insert into logins (username,password) values('$ul',$pl)";
  $result=mysqli_query($link,$sql);
  if($result){
      echo"1";
  }else{
      echo"0";
  }
?>