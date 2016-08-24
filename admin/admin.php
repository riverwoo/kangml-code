<?php
require_once ("head.php");
$title = '主界面 / 后台管理';
if ($row['active'] != 1) {
    msg("权限不足！", "/user");
}
$uid = is_numeric($_GET['uid']) ? $_GET['uid'] : '0';
$page = is_numeric($_GET['page']) ? $_GET['page'] : '1';
if ($_GET['do'] == 'del') {
    $users = $DB->get_row("select * FROM " . DBQZ . "_user where uid ='$uid' limit 1");
    if ($users['active'] != 1) {
        $DB->query("delete from " . DBQZ . "_user where uid='$uid'");
        msg("删除用户名为" . $users['user'] . "成功", "admin.php");
    } else {
        msg("不能删除系统默认管理员", "admin.php");
    }
}
$pagein = $page + 8;
$pagesize = 20;
$start = ($page - 1) * $pagesize;
if ($_GET['do'] == 'search' && $content = $_GET['content']) {
    $pagedo = 'seach';
    $rows = $DB->query("select * from " . DBQZ . "_user where uid='{$content}' or user like'%{$content}%' or ip like'%{$content}%' order by (case when uid='{$content}' then 8 else 0 end)+(case when user like '%{$content}%' then 3 else 0 end)+(case when ip like '%{$content}%' then 3 else 0 end) desc limit 20");
} else {
    $pages = ceil($DB->count("select count(uid) as count from " . DBQZ . "_user where 1=1") / $pagesize);
    $rows = $DB->query("select * from " . DBQZ . "_user order by uid desc limit $start,$pagesize");
}
if ($pagein > $pages) $pagein = $pages;
if ($page == 1) {
    $prev = 1;
} else {
    $prev = $page - 1;
}
if ($page == $pages) {
    $next = $page;
} else {
    $next = $page + 1;
}
?>
<section id="content">
<section class="vbox">
<section class="scrollable padder">
<ul class="breadcrumb no-border no-radius b-b b-light pull-in">
	<li><a href="#"><i class="fa fa-home"></i> <?php echo $title ?></a></li>
</ul>
			<div class="col-lg-2-4 navbar-right">
                  			<form action="?" method="GET">
			<div class="input-group">
				<input type="hidden" name="do" value="search">
				<input type="text" name='content' class="form-control" placeholder="Search">
				<span class="input-group-btn">
                  <button type="submit" class="btn btn-info btn-icon"><i class="fa fa-search"></i></button>
                </span>
				</div>
			</form>
              </div>
			<h3 class="page-header">用户列表</h3>
			<div class="table-responsive">
				<table class="table table-striped m-b-none" data-ride="datatables">
				<thead>
				<tr>
					<th>#UID</th>
					<th>用户名</th>
					<th>ip地址</th>
					<th>最后登录</th>
					<th>操作</th>
				</tr>
				</thead>
				<tbody>
				<?php
while ($user = $DB->fetch($rows)) { ?>
				<tr>
					<td><?php echo $user['uid'] ?></td>
					<td><?php echo $user['user'] ?></td>
					<td><?php echo $user['ip'] ?>[<?php echo get_ip_city($user['ip']) ?>]</td>
					<td><?php echo $user['lasttime'] ?></td>
					<td><a href="userset.php?uid=<?php echo $user[uid] ?>" class="dropdown-toggle"><i class="fa fa-pencil"></i></a>&nbsp;<a href="?do=del&p=<?php echo $p ?>&uid=<?php echo $user[uid] ?>" onClick="if(!confirm('确认删除？')){return false;}" class="dropdown-toggle"><i class="fa fa-times"></i></a></td>
				</tr>
<?php
} ?>
				</tbody>
				</table>
			</div>
			<?php
if ($pagedo != 'seach') { ?>
			<div class="row" style="text-align:center;">
				<ul class="pagination pagination-lg">
					<li <?php
    if ($page == 1) {
        echo 'class="disabled"';
    } ?>><a href="?page=1">首页</a></li>
					<li <?php
    if ($prev == $page) {
        echo 'class="disabled"';
    } ?>><a href="?page=<?php echo $prev ?>">&laquo;</a></li>
					<?php
    for ($i = $page; $i <= $pagein; $i++) { ?>
					<li <?php
        if ($i == $page) {
            echo 'class="active"';
        } ?>><a href="?page=<?php echo $i ?>"><?php echo $i ?></a></li>
					<?php
    } ?>
					<li <?php
    if ($next == $page) {
        echo 'class="disabled"';
    } ?>><a href="?page=<?php echo $next ?>">&raquo;</a></li>
					<li <?php
    if ($page == $pages) {
        echo 'class="disabled"';
    } ?>><a href="?page=<?php echo $pages ?>">末页</a></li>
				</ul>
			</div>
			<?php
} ?>
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
