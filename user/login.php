<?php
$mod='blank'; include("../api.inc.php"); $title='用户登录'; include './css.php'; ?>

  		<div class="middle-box text-center loginscreen  animated fadeInDown">
			<div>
				<div>
					<h1>K°</h1>
				</div>
                   <form action="./index.php" method="get" class="form-horizontal" role="form">
					<div class="form-group">
						<input type="text" class="form-control" name="user" placeholder="用户名" >
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="pass" placeholder="密码" >
					</div>
					<button  class="btn btn-primary block full-width m-b" type="submit" >登 录</button>
					<p class="text-muted text-center"><a href="reg.php"><small>立即注册</small></a> | <a href="../goumai.php/"><small>在线购买</small></a>
					</p>
                    </form>
			</div>
		</div>

	<hr width="50%" />
	<p class="text-center">Copyright ©2016 <a class href="http://kangml.com">kangml.com</a>
		 康免流™ 大鼻象™ </p>

		<script src="./js/jquery.min.js?v=2.1.4"></script>
		<script src="./js/bootstrap.min.js?v=3.3.6"></script>
		<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>

<?php footer();?><?php 