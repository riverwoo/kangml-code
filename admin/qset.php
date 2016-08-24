<?php
//decode by QQ:270656184 http://www.yunlu99.com/
$mod='blank';
include("../api.inc.php");
$title='账号列表';
include './head.php';
if($islogin2==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");

?>
    <div class="col-xs-12 col-sm-10 col-lg-8 center-block" style="float: none;">
<?php
$user = daddslashes($_GET['user']);
if(!$user || !$row = $DB->get_row("select * from `openvpn` where iuser='$user' limit 1")){ exit("账号不存在!");}
if($_POST['type']=="update"){
echo '<div class="panel panel-primary">
<div class="panel-heading"><h3 class="panel-title">修改账号结果</h3></div>
<div class="panel-body">';
$pass = daddslashes($_POST['pass']);
$maxll = daddslashes($_POST['maxll'])*1024*1024;
$state = daddslashes($_POST['state']);
$endtime = strtotime($_POST['enddate']);
	if($DB->query("update `openvpn` set `pass`='$pass',`maxll`='$maxll',`i`='$state',`endtime`='$endtime' where iuser='$user'")){
		echo '修改成功！';
	}else{
		echo '修改失败！'.$DB->error();
	}
echo '<hr/><a href="./qqlist.php">>>返回账号列表</a></div></div>';
exit;
}
?>
<div class="panel panel-primary">
        <div class="panel-heading"><h3 class="panel-title">账号:<?=$user?> 配置</h3></div>
        <div class="panel-body">
          <form action="./qset.php?user=<?=$user?>" method="post" class="form-horizontal" role="form">
          <input type="hidden" name="type" value="update" />
          	<div class="input-group">
              <span class="input-group-addon">密码</span>
			  <input type="text" name="pass" value="<?=$row['pass']?>" class="form-control">
            </div><br/>
            <div class="input-group">
              <span class="input-group-addon">账号状态</span>
			  <select name="state" class="form-control">
              	<option value="0">0_禁用</option>
				<option value="1" <?=$row['i']?"selected":''?>>1_开通</option>
              </select>
            </div><br/>
          	<div class="input-group">
              <span class="input-group-addon">总流量(M)</span>
			  <input type="text" name="maxll" value="<?=round($row['maxll']/1024/1024)?>" class="form-control">
            </div><br/>
			<div class="input-group">
              <span class="input-group-addon">到期日期</span>
			  <input type="text" name="enddate" value="<?=$row['enddate']?>" class="form-control Wdate" onClick="WdatePicker({isShowClear:false})" autocomplete="off" required>
            </div><br/>
            <div class="form-group">
              <div class="col-sm-12"><input type="submit" name="submit" value="修改" class="btn btn-primary form-control"/></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <script src="../datepicker/WdatePicker.js"></script>