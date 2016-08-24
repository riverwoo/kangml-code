<?php
require_once ("head.php");
$title = '后台管理 / 监控列表';
if ($row['active'] != 1) {
    msg("权限不足！", "/user");
}
?>
<section id="content">
<section class="vbox">
<section class="scrollable padder">
<ul class="breadcrumb no-border no-radius b-b b-light pull-in">
	<li><a href="#"><i class="fa fa-home"></i> <?php echo $title ?></a></li>
</ul>
			<div class="col-sm-12">
			<h3 class="page-header">监控列表</h3>
			<div class="table-responsive">
				<table class="table table-striped">
				<thead>
				<tr>
					<th>监控项目</th>
					<th>监控频率</th>
					<th>监控地址</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>监控</td>
					<td>频率随意</td>
					<td>http://<?=$_SERVER['HTTP_HOST']?>/job/job.php?key=<?=$conf['cronrand']?></td>
				</tr>
				</tbody>
				</table>
			</div>
		</div>
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
