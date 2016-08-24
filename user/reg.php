<?php
//by;流量VIP免流
/**
 * 注册
**/
$mod='blank';
include("../api.inc.php");
$dlconfig=$DB->get_row("SELECT * FROM auth_config WHERE 1");
if($_POST['user'] && $_POST['pass']){
	$user=daddslashes($_POST['user']);
	$pass=daddslashes($_POST['pass']);
	$verifycode=daddslashes($_POST['verifycode']);
	$row = $DB->get_row("SELECT * FROM `openvpn` WHERE `iuser`='$user' limit 1");
	if(!is_username($user)){
		exit("<script language='javascript'>alert('用户名只能是2~20位的字母数字！');history.go(-1);</script>");
	}elseif($row){
		exit("<script language='javascript'>alert('用户名已被使用！');history.go(-1);</script>");
	}elseif(!$verifycode || $verifycode!=$_SESSION['verifycode']){
			exit("<script language='javascript'>alert('验证码不正确！');history.go(-1);</script>");
	}else{
		$DB->query("insert `openvpn`(`iuser`,`pass`,`isent`,`irecv`,`maxll`,`i`,`starttime`,`endtime`) values('{$user}','{$pass}',0,0,0,0,'".time()."','".time()."')");
		$row = $DB->get_row("SELECT * FROM `openvpn` WHERE `iuser`='$user' limit 1");
		if($row['id']){
			unset($_SESSION['verifycode']);
			exit("<script language='javascript'>alert('注册成功，请使用激活码充值使用！');window.location.href='./index.php?u={$row['iuser']}&p={$row['pass']}';</script>");	
		}else{
			exit("<script language='javascript'>alert('注册失败，请联系管理员！');history.go(-1);</script>");
		}
	}
}
	

$title='用户注册';
include './css.php';
?>


 <div class="middle-box text-center loginscreen   animated fadeInDown">
        <div>
            <div>
              <h1>K°</h1>
            </div>
            <h3>欢迎注册</h3>
            <p>创建一个免流账户</p>
          <form action="./reg.php" method="post" class="form-horizontal" role="form">
                <div class="form-group">
                    <input type="text" class="form-control" name="user"  placeholder="请输入用户名" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="pass" placeholder="请输入密码" required="">
                </div>
                      <div class="form-group">
                    <input type="text" name="verifycode" class="form-control"  placeholder="验证码" required="" style="max-width: 82%;display:inline-block;vertical-align:middle;"/>&nbsp;<img title="点击刷新" src="verifycode.php" onclick="this.src='verifycode.php?'+Math.random();" style="max-height:32px;vertical-align:middle;" class="img-rounded">
                </div>

                
                <button type="submit" class="btn btn-primary block full-width m-b">点 击注 册</button>

                <p class="text-muted text-center"><small>已经有账户了？</small><a href="index.php">点我登陆</a>
                </p>

            </form>
        </div>
    </div>
    	<hr width="50%" />
<p class="text-center">Copyright ©2016 <a class href="http://kangml.com">kangml.com</a>
		 康免流™ 大鼻象™ </p>
	
    <script src="./js/jquery.min.js?v=2.1.4"></script>
    <script src="./js/bootstrap.min.js?v=3.3.6"></script>
    <script src="http://www.zi-han.net/theme/hplus/js/plugins/iCheck/icheck.min.js"></script>
    


  
<?php footer();