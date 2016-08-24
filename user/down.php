<!DOCTYPE html>
<html lang="zh">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="renderer" content="webkit">
    <title><?=$title?></title>
    <link href="./index/css/bootstrap.min.css" rel="stylesheet">
    <link href="./index/css/client.css" rel="stylesheet">
    <script src="./index/js/jquery-1.11.3.min.js"></script>
    <script src="./index/js/bootstrap.min.js"></script>
    <script src="./index/js/retina.min.js"></script>
    <!--[if lt IE 9]>
      <script src="./index/js/html5shiv-3.7.2.min.js"></script>
      <script src="./index/js/respond-1.4.2.min.js"></script>
      <script src="./index/js/ie9-warning.js"></script>
    <![endif]-->
    <script src="./index/js/client.js"></script>
    <script>$(function() {
        os = fn_detect_os();
        $(".os-" + os).css("display", "block");
        $('#more-downloads').on('show.bs.collapse',
        function() {
          $(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        });
        $('#more-downloads').on('hide.bs.collapse',
        function() {
          $(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        });
      })</script>
  </head><body { background-color: #f6f4cb; } h1 { margin: 30px 0px; } .sw-row { display: none; }</style>