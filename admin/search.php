<?php @eval("//Encode by  phpjiami.com,Free user."); ?><?php
/**
 * 搜索授权
**/
$mod='blank';
include("../api.inc.php");
$title='搜索卡密';
include './head.php';
if($islogin2==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");
include './nav.php';
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
              <header class="panel-heading font-bold"> 搜索卡密 </header>
              <div class="panel-body">
				
    

        <div class="panel-body">
          <form action="./kmlist.php" method="get" class="form-inline" role="form">
            <div class="form-group">
              <label>类别</label>
              <select name="type" class="form-control">
                <option value="1">卡密</option>
                <option value="2">账号</option>
              </select>
            </div>
            <div class="form-group">
              <label>内容</label>
              <input type="text" name="kw" value="" class="form-control" required/>
            </div>
            <input type="submit" value="查询" class="btn btn-primary form-control"/>
          </form>
        </div>
      </div>
    </div>
  </div>
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
