<?php
require_once ("head.php");
$title = '主界面 / 会员资料修改';
if($_POST['do']=='user'){
			$qq=$_POST['qq'];
			$set.="qq='{$qq}'";
			if($_POST['pwd']){
			$pwd=md5($_POST['pwd']);
			$set.=",pwd='{$pwd}'";
	}
	$DB->query("update ".DBQZ."_user set {$set} where uid='{$userrow['uid']}'");
	msg("系统信息修改成功！","dataset.php");
}
?>
<section id="content">
<section class="vbox">
<section class="scrollable padder">
<ul class="breadcrumb no-border no-radius b-b b-light pull-in">
	<li><a href="#"><i class="fa fa-home"></i> <?php echo $title ?></a></li>
</ul>
<section class="panel panel-default">
              <header class="panel-heading font-bold"> 资料修改 </header>
              <div class="panel-body">
				<form action="?" class="form-horizontal" method="post">
				<input type="hidden" name="do" value="user">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">uid</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control rounded" name="uid" value="<?=$userrow['uid']?>" readonly="readonly">
                    </div>
                  </div>
                  <div class="line line-dashed line-lg pull-in"></div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">用户名/账号</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="user" value="<?=$userrow['user']?>" readonly="readonly">
					  </div>
                  </div>
                  <div class="line line-dashed line-lg pull-in"></div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label" for="input-id-1">我的QQ</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="qq" value="<?=$userrow['qq']?>">
                    </div>
                  </div>
				  <div class="line line-dashed line-lg pull-in"></div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">注册时间</label>
                    <div class="col-sm-10">
					  <input type="text" class="form-control" name="regtime" value="<?=$userrow['regtime']?>" readonly="readonly">
                    </div>
                  </div>
				  <div class="line line-dashed line-lg pull-in"></div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">修改密码</label>
                    <div class="col-sm-10">
					  <input type="password" class="form-control" name="pwd">
                    </div>
                  </div>
                  <div class="line line-dashed line-lg pull-in"></div>
                  <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-2">
                      <button type="submit" class="btn btn-primary">保存设置</button>
                    </div>
                  </div>
                </form>
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
