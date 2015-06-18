<?php
define('HOSTNAME','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DATABASE','calendar');
if(!mysql_connect(HOSTNAME,USERNAME,PASSWORD)){
		echo "Not connected." .mysql_error();
}

if(!mysql_select_db(DATABASE)){
		echo "No database selected." .mysql_error();
}

?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>jQuery e-calendar Plugin Demo</title>
<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.e-calendar.js"></script>
    <script type="text/javascript" src="index.js"></script>
	<script type="text/javascript" src="index1.js"></script>
	
    <link rel="stylesheet" href="css/jquery.e-calendar.css"/>
	<!--script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script-->
	<script>
		function check_total(min_dat , max_dat){
			
		}
	</script>

</head>
<body>

    <div id="calendar" ></div>
    
</body>
<!--script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script-->

</html>