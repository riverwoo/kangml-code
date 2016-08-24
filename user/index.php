<?php
$mod='blank'; include("../api.inc.php"); $u = daddslashes($_GET['user']); $p = daddslashes($_GET['pass']); $res=$DB->get_row("SELECT * FROM `openvpn` where `iuser`='$u' && `pass`='$p' limit 1"); if(!$res){ header('location: login.php'); exit; } if($_POST['km']){ $km = daddslashes($_POST['km']); $myrow=$DB->get_row("select * from auth_kms where kind=1 and km='$km' limit 1"); if(!$myrow){ exit("<script language='javascript'>alert('此激活码不存在');history.go(-1);</script>"); }elseif($myrow['isuse']==1){ exit("<script language='javascript'>alert('此激活码已被使用');history.go(-1);</script>"); }else{ $duetime = ($res['endtime'] < time() ? time() : $res['endtime']) + $myrow['value']*24*60*60; $addll = $myrow['values']*1024*1024*1024; if($res['endtime'] < time()){ $sql="update `openvpn` set `isent`='0',`irecv`='0',`maxll`='{$addll}',`endtime`='{$duetime}',`dlid`='{$myrow['daili']}',`i`='1' where `iuser`='{$u}' && `pass`='{$p}'"; if($DB->query($sql)){ $DB->query("update `auth_kms` set `isuse` ='1',`user` ='$u',`usetime` ='$date' where `id`='{$myrow['id']}'"); wlog('账号激活','用户'.$u.'使用激活码'.$km.'开通账号['.$date.']'); exit("<script language='javascript'>alert('开通成功！');history.go(-1);</script>"); }else{ exit("<script language='javascript'>alert('开通失败！');history.go(-1);</script>"); } }else{ $sql="update `openvpn` set `maxll`=`maxll` + '{$addll}',`endtime`='{$duetime}',`dlid`='{$myrow['daili']}',`i`='1' where `iuser`='{$u}' && `pass`='{$p}'"; if($DB->query($sql)){ $DB->query("update `auth_kms` set `isuse` ='1',`user` ='$u',`usetime` ='$date' where `id`='{$myrow['id']}'"); wlog('账号激活','用户'.$u.'使用激活码'.$km.'续费账号['.$date.']'); exit("<script language='javascript'>alert('续费成功！');history.go(-1);</script>"); }else{ exit("<script language='javascript'>alert('续费失败！');history.go(-1);</script>"); } } } } $title='用户中心'; include './index_css.php'; $config = $DB->get_row("SELECT * FROM auth_config"); $gonggao=$config['ggs'];?>

<div class="container-fluid">
      <div class="row">
        <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12">
          <div class="row" style="margin: 1em auto;">
            <div class="col-md-12">
              <img src="/user/images/logo.png" class="img-responsive center-block" alt="Flipwalls Logo" width="257" height="77"></div>
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
              </div>
              <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav">
                  <li class="active">
                    <a href="#">会员信息</a></li>
                  <li>
                    <a href="#" target="view_window">在线购买</a></li>
                   <form  role="form" method="POST" class="navbar-form navbar-left"  >
					<div class="form-group">
					<input type="text" class="form-control" name="km" placeholder="请输入充值卡密"></div>
					<button type="submit" class="btn btn-default">确定充值</button>
				</form>    
                </ul>
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a href="login.php" target="view_window">
                      <span class="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;退出</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="row visible-lg-block vmargin-15">
            <div class="col-md-12 text-center">
              <ul class="pagination" style="margin: 0px; vertical-align: middle;">
                <li>
                  <span style="color: #bb1e10; background-color: #e7e7e7">
                    <div style="display: inline; margin: 0px 5px; float: left;">用户公告：</div>
                    <div style="display: inline; margin: 0px 5px; float: left;"><?php echo $gonggao;?></div>
                    <div style="display: inline; margin: 0px 5px; float: left;"></div>
                  </span>
                </li>
                
                <li>
                <li class="active">
                  <a href="#" style="cursor: pointer;" target="view_window">更多...</a></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">用户信息</h3></div>
                <div class="panel-body">
                  <p class="text-center">
                    <span class="text-xxlg"><?php echo $res['iuser'];?></span>
                    <span class="text-lg">VIP客户</span></p>
                  <p class="text-center">注册日期:<?php echo date('Y-m-d',$res['starttime']);?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;到期时间:<?php echo date('Y-m-d',$res['endtime']);?></p>
              <div class="progress progress-striped active">
                <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">∞</div></div>
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
                    <a href="goumai.php" class="btn btn-primary btn-xs" target="view_window">续费</a></p>
                  <p class="text-center">流量剩余天数:<span class="label label-danger"><?php echo round(($res['endtime']-$res['starttime'])/86400);?>天</p>
              <div class="progress progress-striped active">
                <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">∞</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">流量信息</h3></div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-xs-12 text-center">
                      <p class="text-lg">发送的流量</p>
                      <p>
                        <span class="text-xlg"><?php echo round($res['isent']/1024/1024);?></span>MB</p></div>
                  </div>

                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">流量信息</h3></div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-xs-12 text-center">
                      <p class="text-lg">接收的流量</p>
                      <p>
                        <span class="text-xlg"><?php echo round($res['irecv']/1024/1024);?></span>MB</p></div>
                  </div>

                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">流量信息</h3></div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-xs-12 text-center">
                      <p class="text-lg">剩余的流量</p>
                      <p>
                        <span class="text-xlg"><?php echo round(($res['maxll']-$res['isent']-$res['irecv'])/1024/1024);?></span>MB</p></div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 text-center footer">
              <small>Copyright ©2016   
	    <a class href="http://kangml.com">kangml.com</a>
		 康免流™ 大鼻象™ </small></div>
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

  </center>
  




<?php 