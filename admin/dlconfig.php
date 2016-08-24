<?php @eval("//Encode by  phpjiami.com,Free user."); ?><?php
/**
 * 代理管理
**/
$mod='blank';
include("../api.inc.php");
$title='代理页面管理';
include './head.php';
$rs=$DB->get_row("SELECT * FROM auth_config");
$regok=$rs['regok'];
$member_reg=$rs['member_reg'];
$activeok=$rs['activeok'];
$dl0=$rs['dl0'];
$dl1=$rs['dl1'];
$dl2=$rs['dl2'];
$dl3=$rs['dl3'];
$dl4=$rs['dl4'];
$dl5=$rs['dl5'];
$dls0=$rs['dls0'];
$dls1=$rs['dls1'];
$dls2=$rs['dls2'];
$dls3=$rs['dls3'];
$dls4=$rs['dls4'];
$dls5=$rs['dls5'];
$gongg=$rs['gg'];
$gonggs=$rs['ggs'];
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
              <header class="panel-heading font-bold"> 代理页面设置 </header>
              <div class="panel-body">
				

<?php

$my=$_POST['my'];
if($my=='config'){
echo '<div class="panel panel-primary">

<div class="panel-body box">';
$ak=$_POST['ak'];
$rk=$_POST['rk'];
$dl00=$_POST['dl0'];
$dl01=$_POST['dl1'];
$dl02=$_POST['dl2'];
$dl03=$_POST['dl3'];
$dl04=$_POST['dl4'];
$dl05=$_POST['dl5'];
$dls00=$_POST['dls0'];
$dls01=$_POST['dls1'];
$dls02=$_POST['dls2'];
$dls03=$_POST['dls3'];
$dls04=$_POST['dls4'];
$dls05=$_POST['dls5'];
$member_reg = $_POST['member_reg'];
$gg=daddslashes($_POST['gongg']);
$ggs=daddslashes($_POST['gonggs']);
$sql=$DB->query("update `auth_config` set  `gg`='$gg',`ggs`='$ggs',`activeok`='$ak',`regok`='$rk',`dl1`='$dl01',`dl2`='$dl02',`dl3`='$dl03',`dl4`='$dl04',`dl5`='$dl05',`dl0`='$dl00',`dls1`='$dls01',`dls2`='$dls02',`dls3`='$dls03',`dls4`='$dls04',`dls5`='$dls05',`dls0`='$dls00',`member_reg`='$member_reg' where 1");
	
if($sql){echo '保存成功！';}
else{echo '保存失败！';}
echo '<hr/><a href="./dlconfig.php">>>返回代理页面设置</a></div></div>';
exit;
}

 ?>


        <div class="panel-body">
          <form action="./dlconfig.php" method="post" class="form-horizontal" role="form">
            <div class="form-group">
            	<input type="hidden" name="my" value="config"/>
              <label class="col-sm-2 control-label">代理公告</label><br>
			<div class="col-sm-10"><textarea class="form-control" name="gongg" rows="5" cols="50" required><?php echo $gongg;?></textarea></div>
            </div>
            <div class="form-group">
            	<input type="hidden" name="my" value="config"/>
              <label class="col-sm-2 control-label">用户公告</label><br>
			<div class="col-sm-10"><textarea class="form-control" name="gonggs" rows="5" cols="50" required><?php echo $gonggs;?></textarea></div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">代理注册</label><br>
                <div class="col-sm-10"><select name="rk" class="form-control">
                <?php 
					if($regok==1){
						echo '<option value="0">开放注册</option><option value="1" selected="selected">关闭开放注册</option>';
					}else{echo '<option value="0" selected="selected">开放注册</option><option value="1" >关闭开放注册</option>';}
                ?>
              </select></div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">普通用户注册</label><br>
                <div class="col-sm-10"><select name="member_reg" class="form-control">
                <?php 
          if($member_reg==1){
            echo '<option value="0">开放注册</option><option value="1" selected="selected">关闭开放注册</option>';
          }else{echo '<option value="0" selected="selected">开放注册</option><option value="1" >关闭开放注册</option>';}
                ?>
              </select></div>
            </div>
			<div class="form-group">
            <label class="col-sm-2 control-label">注册默认开通</label><br>
                 <div class="col-sm-10"><select name="ak" class="form-control">
                  <?php 
					if($activeok==1){
						echo ' <option value="0">默认开通账号</option><option value="1" selected="selected">默认关闭账号</option>';
					}else{ echo ' <option value="0" selected="selected" >默认开通账号</option><option value="1" >默认关闭账号</option>';}
                  ?>
              </select></div>
			 </div>
			 <div class="form-group">
             <label class="col-sm-2 control-label">普通代理价格</label>
             	<div class="col-sm-2">时间(元/天):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dl0" value="<?php echo $dl0;?>"/></div>
             	<div class="col-sm-2">流量(元/GB):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dls0" value="<?php echo $dls0;?>"/></div>
			 </div>
			 <div class="form-group">
             <label class="col-sm-2 control-label">铜牌代理价格</label>
             	<div class="col-sm-2">时间(元/天):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dl1" value="<?php echo $dl1;?>"/></div>
             	<div class="col-sm-2">流量(元/GB):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dls1" value="<?php echo $dls1;?>"/></div>
			 </div>
			 <div class="form-group">
             <label class="col-sm-2 control-label">银牌代理价格</label>
             	<div class="col-sm-2">时间(元/天):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dl2" value="<?php echo $dl2;?>"/></div>
             	<div class="col-sm-2">流量(元/GB):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dls2" value="<?php echo $dls2;?>"/></div>
			 </div>
			 <div class="form-group">
             <label class="col-sm-2 control-label">金牌代理价格</label>
             	<div class="col-sm-2">时间(元/天):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dl3" value="<?php echo $dl3;?>"/></div>
             	<div class="col-sm-2">流量(元/GB):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dls3" value="<?php echo $dls3;?>"/></div>
			 </div>
			 <div class="form-group">
             <label class="col-sm-2 control-label">钻石代理价格</label>
             	<div class="col-sm-2">时间(元/天):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dl4" value="<?php echo $dl4;?>"/></div>
             	<div class="col-sm-2">流量(元/GB):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dls4" value="<?php echo $dls4;?>"/></div>
			 </div>
			 <div class="form-group">
             <label class="col-sm-2 control-label">至尊代理价格</label>
             	<div class="col-sm-2">时间(元/天):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dl5" value="<?php echo $dl5;?>"/></div>
             	<div class="col-sm-2">流量(元/GB):</div>
				<div class="col-sm-3"><input type="text" class="form-control" name="dls5" value="<?php echo $dls5;?>"/></div>
			 </div>
            <input type="submit" value="保存" class="btn btn-primary form-control"/>
          </form>
           <div class="table-responsive">
        <table class="table table-striped">
</table>
        </div>
		<div class="panel-footer">
          <span class="glyphicon glyphicon-info-sign"></span> 管理员在这里可以管理代理页面的公告和代理拿货价格。
        </div>
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
