<?php
define('ROOT', '../');
require_once (ROOT . 'includes/common.php');
if (!iflogin(DBQZ,$userrow['cookie'])) {
    msg("请先登录", "/login.php");
}
if(!$userrow['uid']){
	setcookie(DBQZ . "_cookie", "", -1, '/');
	msg("请先登录", "/login.php");
}
?>
