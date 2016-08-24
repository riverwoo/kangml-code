<?php @eval("//Encode by  phpjiami.com,Free user."); ?><?php

$mod='blank';
include("../api.inc.php");
$title='添加账号';
include './head.php';
if($islogin2==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");
include './nav.php';
?>
    <?php
require_once ("head.php");
?>
<section id="content">
<section class="vbox">
<section class="scrollable padder">
<ul class="breadcrumb no-border no-radius b-b b-light pull-in">
	<li><a href="#"><i class="fa fa-home"></i> <?php echo $title ?></a></li>
</ul>
      <section class="panel panel-default">
        <header class="panel-heading font-bold">批量添加账号(自行配置开通日期)</h3></div>
        <div class="panel-body">
<?php		
if($_POST['qz']){
echo '<div class="panel panel-primary">
<div class="panel-heading"><h3 class="panel-title">添加账号结果</h3></div>
<div class="panel-body">';
$qianzhui = $_POST['qz'];
$houzhui  = $_POST['hz'];
$changdu  = $_POST['cd'];
$total = $_POST['total'];

$maxll = daddslashes($_POST['maxll'])*1024*1024;
$state = daddslashes($_POST['state']);
$tian = $_POST['tian'];

function getRandChar($length){
  $str = null;
  $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  $max = strlen($strPol)-1;

  for($i=0;$i<$length;$i++){
    $str.=$strPol[rand(0,$max)];
  }

 return $str;
}

$result = false;

  for($i=0;$i!=$total;$i++){
    $user = $qianzhui.getRandChar($changdu).$houzhui;
    $pass = getRandChar(6);
    $sql  = "insert into `openvpn` (`iuser`,`pass`,`isent`,`irecv`,`maxll`,`i`,`starttime`,`tian`) values ('{$user}','{$pass}',0,0,'{$maxll}','{$state}','".time()."','{$tian}')";
    $result = $DB->query($sql);
  }
  if($result){
    echo "成功添加{$total}个账号";
  }else{
    echo "添加失败";
  }
  
  echo '<hr/><a href="./padd.php">>>返回继续添加</a><br><a href="./qqlist.php">>>返回账号列表</a></div></div>';
  exit();
}


?>

          <form action="./padd.php" method="post" class="form-horizontal" role="form">
            <div class="input-group">
			      <span class="input-group-addon">用户名前缀</span>
              <input type="text" name="qz" value="" class="form-control" required/>
            </div><br/>
             <div class="input-group">
            <span class="input-group-addon">用户名长度</span>
              <input type="text" name="cd" value="" class="form-control" required/>
            </div><br/>
             <div class="input-group">
            <span class="input-group-addon">用户名后缀</span>
              <input type="text" name="hz" value="" class="form-control" required/>
            </div><br/>
            <div class="input-group">
              <span class="input-group-addon">账号状态</span>
			       <select name="state" class="form-control">
              	<option value="0">0_禁用</option>
				        <option value="1">1_开通</option>
              </select>
            </div><br/>
            <div class="input-group">
              <span class="input-group-addon">总流量(M)</span>
			    <input type="text" name="maxll" value="" class="form-control" required>
            </div><br/>
            <div class="input-group">
              <span class="input-group-addon">生成总数</span>
            <input type="text" name="total" value="" class="form-control" required>
            </div><br/>
			    <div class="input-group">
   <span class="input-group-addon">到期日期</span>
			  <input type="text" name="tian" value="" class="form-control Wdate" onClick="WdatePicker({isShowClear:false})" autocomplete="off" required>
            </div><br/>
            <input type="submit" value="添加" class="btn btn-primary form-control"/>
                  </form>
        </div>
      </div>
    </div>
  </div>
  <script src="../datepicker/WdatePicker.js"></script>
                  <div class="line line-dashed line-lg pull-in"></div>
                  <div class="form-group">
                    
                  
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