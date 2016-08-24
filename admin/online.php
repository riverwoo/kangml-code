<?php
$mod='blank';
include("../api.inc.php");
$title='当前在线用户';
include './head.php';
if($islogin2==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");
include './nav.php';
if(isset($_GET['id'])){
	$id = $_GET['id'];
	$rs = $DB->get_row("SELECT * FROM `auth_fwq` WHERE `id`='$id' limit 1");
	if(!$rs){
		echo "此服务器不存在";
	}else{
		$file = 'http://'.$rs['ipport'].'/res/openvpn-status.txt';
	}
}else{
	$file = '../res/openvpn-status.txt';
}

?><?php
require_once ("head.php");

?>
<section id="content">
<section class="vbox">
<section class="scrollable padder">
<ul class="breadcrumb no-border no-radius b-b b-light pull-in">
	<li><a href="#"><i class="fa fa-home"></i> <?php echo $title ?></a></li>
</ul>
<section class="panel panel-default">
              <header class="panel-heading font-bold"> 在线人数 </header>
              <div class="panel-body">

<table class="table table-bordered">
   <thead>
      <tr>
	   <th>ID</th>
         <th>用户名</th>
         <th>上传</th>
	<th>下载</th>
      </tr>
   <tbody>
<?php


$str=file_get_contents($file);
$num=(substr_count($str,date('Y'))-1)/2;
$fp=fopen($file,"r");
fgets($fp);
fgets($fp);
fgets($fp);
for($i=0;$i<$num;$i++){
$j=$i+1;
echo "<tr>";
	$line=fgets($fp);
	$arr=explode(",",$line);
	$recv=round($arr[2]/1024)/1000;
	$sent=round($arr[3]/1024)/1000;
	echo "<td>".$j."</td>";
echo "<td>".$arr[0]."</td>";
echo "<td>".$recv."MB</td>";
echo "<td>".$sent."MB</td>";
echo "</tr>";
}
?>
     </tbody>
   </thead>
</table>
      </div>
    </div>
  </div>
                  
              </div>
            </section>
</section>
</section>

<a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a></section>
<aside class="bg-light lter b-l aside-md hide" id="notes">
<div class="wrapper">
	Notification
</div>
</aside>
<!-- end -->
<?php
require_once ("foot.php");
?>


</body>
</html>