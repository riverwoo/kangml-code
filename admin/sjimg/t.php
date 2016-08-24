<html>
<body>
<?php
 srand( microtime() * 1000000 );
 $num = rand( 1, 4 );
   
 switch( $num )
 {
 case 1: $image_file = "/sjimg/1.jpg";
     break;
 case 2: $image_file = "/sjimg/2.jpg";
     break;
 case 3: $image_file = "/sjimg/3.jpg";
     break;
 case 4: $image_file = "/sjimg/4.jpg";
     break;
 }
 echo "Random Image : <img src=$image_file />";
?>
</body>
</html>
