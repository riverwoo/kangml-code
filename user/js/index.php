<?php
//decode by QQ:270656184 http://www.yunlu99.com/
$mod='blank';
include("../api.inc.php");

$u = daddslashes($_GET['user']);
$p = daddslashes($_GET['pass']);
$res=$DB->get_row("SELECT * FROM `openvpn` where `iuser`='$u' && `pass`='$p' limit 1");
if(!$res){
	header('location: login.php');
	exit;
}
if($_POST['km']){
	$km = daddslashes($_POST['km']);
	$myrow=$DB->get_row("select * from auth_kms where kind=1 and km='$km' limit 1");
	if(!$myrow){
		exit("<script language='javascript'>alert('此激活码不存在');history.go(-1);</script>");
	}elseif($myrow['isuse']==1){
		exit("<script language='javascript'>alert('此激活码已被使用');history.go(-1);</script>");
	}else{
		$duetime = ($res['endtime'] < time() ? time() : $res['endtime']) + $myrow['value']*24*60*60;
		$addll = $myrow['values']*1024*1024*1024;
		if($res['endtime'] < time()){//已到期
			$sql="update `openvpn` set `isent`='0',`irecv`='0',`maxll`='{$addll}',`endtime`='{$duetime}',`dlid`='{$myrow['daili']}',`i`='1' where `iuser`='{$u}' && `pass`='{$p}'";
			if($DB->query($sql)){
				$DB->query("update `auth_kms` set `isuse` ='1',`user` ='$u',`usetime` ='$date' where `id`='{$myrow['id']}'");
				wlog('账号激活','用户'.$u.'使用激活码'.$km.'开通账号['.$date.']');
				exit("<script language='javascript'>alert('开通成功！');history.go(-1);</script>");
			}else{
				exit("<script language='javascript'>alert('开通失败！');history.go(-1);</script>");
			}
		}else{
			$sql="update `openvpn` set `maxll`=`maxll` + '{$addll}',`endtime`='{$duetime}',`dlid`='{$myrow['daili']}',`i`='1' where `iuser`='{$u}' && `pass`='{$p}'";
			if($DB->query($sql)){
				$DB->query("update `auth_kms` set `isuse` ='1',`user` ='$u',`usetime` ='$date' where `id`='{$myrow['id']}'");
				wlog('账号激活','用户'.$u.'使用激活码'.$km.'续费账号['.$date.']');
				exit("<script language='javascript'>alert('续费成功！');history.go(-1);</script>");
			}else{
				exit("<script language='javascript'>alert('续费失败！');history.go(-1);</script>");
			}
		}
		//$duetime = ($res['endtime'] < time() ? time() : $res['endtime']) + $myrow['value']*24*60*60;
		//$addll = ($res['endtime'] < time() ? $myrow['values'] : $res['endtime']) + $myrow['values'];
		//$sql="update `openvpn` set `maxll`=`maxll` + '0',`endtime`='{$duetime}' where `iuser`='{$u}' && `pass`='{$p}'";
		
	}
	//if($DB->query("update `openvpn` set `pass`='$pass',`maxll`='$maxll',`i`='$state',`endtime`='$endtime' where iuser='$user'"))
}

$title='用户中心';
include './css1.php';

$config = $DB->get_row("SELECT * FROM auth_config");
$gonggao=$config['ggs'];//公告获取
?>

<div class="container-fluid">
      <div class="row">
        <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12">
          <div class="row" style="margin: 1em auto;">
            <div class="col-md-12">
              <img src="https://flipwalls.com.cn/image/logo.png" class="img-responsive center-block" alt="Flipwalls Logo" width="257" height="77"></div>
          </div>
          <nav class="navbar navbar-default">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                  <span class="sr-only">菜单</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                  <small><?php echo $res['iuser'];?></small></a>
              </div>
              <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav">
                  <li class="active">
                    <a href="dashboard.php">会员信息</a></li>
                  <li>
                    <a href="downloads.php">软件下载</a></li>
                  <li>
                    <a href="purchase.php">付费服务</a></li>
                  <li>
                    <a href="affiliate.php">上榜赚金币</a></li>
                  <li>
                    <a href="community.php">社群互助</a></li>
                  <li>
                    <a href="rankings.php">英雄榜</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a href="passwd.php">修改密码</a></li>
                  <li>
                    <a href="login.php">
                      <span class="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;退出</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="row visible-xs-block vmargin-15">
            <div class="col-xs-12 text-center">
              <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-default active" onclick="window.open('dashboard.php','_self');">会员信息</button>
                <button type="button" class="btn btn-default " onclick="window.open('downloads.php','_self');">软件下载</button>
                <button type="button" class="btn btn-default " onclick="window.open('purchase.php','_self');">付费服务</button></div>
            </div>
          </div>
          <div class="row visible-lg-block vmargin-15">
            <div class="col-md-12 text-center">
              <ul class="pagination" style="margin: 0px; vertical-align: middle;">
                <li>
                  <span style="color: #bb1e10; background-color: #e7e7e7">
                    <div style="display: inline; margin: 0px 5px; float: left;">公告</div>
                    <div style="display: inline; margin: 0px 5px; float: left;"><?php echo $gonggao;?></div>
                    <div style="display: inline; margin: 0px 5px; float: left;">
                     
                    </div>
                  </span>
                </li>
                <li class="active">
                  <a href="rankings.php" style="cursor: pointer;">更多...</a></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">用户等级</h3></div>
                <div class="panel-body">
                  <p class="text-center">
                    <span class="text-xxlg">草民</span>
                    <span class="text-lg">Lv.0</span></p>
                  <p class="text-center">&nbsp;</p>
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: 0%;">0%</div></div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">服务类型</h3></div>
                <div class="panel-body">
                  <p class="text-center">
                    <span class="text-xxlg">免费服务</span>
                    <a href="purchase.php" class="btn btn-primary btn-xs">续费</a></p>
                  <p class="text-center">流量长期有效</p>
                  <div class="progress">
                    <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: 100%;">&infin;</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">我的金币 ： 0 枚</h3></div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-xs-12 text-center">
                      <p class="text-lg">可兑换总数</p>
                      <p>
                        <span class="text-xlg">0</span>枚</p></div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12 text-center">
                      <a href="affiliate.php" class="btn btn-primary btn-xs btn-block">教我如何赚金币</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">签到</h3></div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-xs-6 text-center">
                      <p class="text-lg">连续</p>
                      <p class="text-xlg">1</p></div>
                    <div class="col-xs-6 text-center">
                      <p class="text-lg">累计</p>
                      <p class="text-xlg">1</p></div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12 text-center">
                      <button type="button" id="refill-btn" class="btn btn-primary btn-xs btn-block" data-loading-text="加油中..." disabled onclick="refill('1319188427@qq.com');">今日签到 ＋ 获得赠送流量</button></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">剩余流量</h3></div>
                <div class="panel-body">
                  <p class="text-center">
                    <span class="text-xlg">350.0</span>
                    <small>MB</small></p>
                  <p class="text-center text-sm">本月已用付费流量：0 MB</p>
                  <div class="progress" style="margin: 30px 0px 0px 0px;">
                    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: 35%;">35%</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 text-center footer">
              <small>&copy; flipwalls 2016 使用本服务时，请自觉遵守中华人民共和国法律，并一切解释权归 flipwalls 所有</small></div>
          </div>
        </div>
      </div>
    </div>
    <script>(function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] ||
        function() { (i[r].q = i[r].q || []).push(arguments)
        },
        i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
      ga('create', 'UA-68906813-1', 'auto');
      ga('send', 'pageview');</script>
<!--
<div class="container" style="padding-top:40px;">
	<div class="col-xs-12 col-sm-10 col-lg-8 center-block" style="float: none;">
		<div class="panel panel-success" >
			<div class="panel-heading">
				<h3 class="panel-title">
					用户中心
				</h3>
			</div>
			<div class="panel-body">
				公告:<?php echo $gonggao;?>
				<span class="badge">新</span>
			</div>
   <table class="table">
      <tr><td>账号:<span class="label label-success"><?php echo $res['iuser'];?></span></td><td>发送:<span class="label label-info"><?php echo round($res['isent']/1024/1024);?>MB</span></td></tr>
      <tr><td>注册时间:<?php echo date('Y-m-d',$res['starttime']);?></td><td>接收:<span class="label label-info"><?php echo round($res['irecv']/1024/1024);?>MB</span></td></tr>
      <tr><td>到期时间:<?php echo date('Y-m-d',$res['endtime']);?></td><td>总量:<span class="label label-info"><?php echo round($res['maxll']/1024/1024);?>MB</span></td></tr>
    <tr><td>剩余天数:<span class="label label-danger"><?php echo round(($res['endtime']-$res['starttime'])/86400);?>天</span></td><td> 剩余:<span class="label label-danger"><?php echo round(($res['maxll']-$res['isent']-$res['irecv'])/1024/1024);?>MB</span></td></tr>
   </table>
  	<div class="alert alert-success" >
				1.流量有效期以到期时间为准。
				<br />
				2.如果流量数据没有更新请断开VPN连接重新查询！
			</div>
			<form role="form" method="POST" class="form-inline">
				<div class="form-group">
					<input type="text" class="form-control" name="km" placeholder="请输入激活码卡密">
				</div>
				<button type="submit" class="btn btn-success">
					确定输入
				</button>
				<a href="#" class="btn btn btn-danger btn-large">
					购买卡密
				</a>
				<a href="#" class="btn btn btn-warning btn-large">
					联系我们
				</a>
				
				

			</form>
			<br />
			</div>
			</div>
		</div>-->

  </center>
  




