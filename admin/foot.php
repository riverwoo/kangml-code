    </section>
  </section>
</section>
<?php
$url = $_SERVER['PHP_SELF'];
if ($url == '/user/index.php') {
    echo '<script src="/static/index/js/app.v2.js"></script>';
}else{
    echo '<script src="/static/index/js/app.v3.js"></script>';
}
?>
<!-- Bootstrap -->
<!-- App -->
<script src="/static/index/js/charts/easypiechart/jquery.easy-pie-chart.js" cache="false"></script>
<script src="/static/index/js/charts/sparkline/jquery.sparkline.min.js" cache="false"></script>
<script src="/static/index/js/charts/flot/jquery.flot.min.js" cache="false"></script>
<script src="/static/index/js/charts/flot/jquery.flot.tooltip.min.js" cache="false"></script>
<script src="/static/index/js/charts/flot/jquery.flot.resize.js" cache="false"></script>
<script src="/static/index/js/charts/flot/jquery.flot.grow.js" cache="false"></script>
<script src="/static/index/js/charts/flot/demo.js" cache="false"></script>
<script src="/static/index/js/calendar/bootstrap_calendar.js" cache="false"></script>
<script src="/static/index/js/calendar/demo.js" cache="false"></script>
<script src="/static/index/js/sortable/jquery.sortable.js" cache="false"></script>
</body>
</html>