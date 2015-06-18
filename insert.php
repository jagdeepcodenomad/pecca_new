<?php
$dt = $_POST['calend'];
$tim = $_POST['tim'];
$date = new DateTime($dt.' '.$tim);
//echo $date->format('Y-m-d H:i:s'); die;
$value = $_POST['value'];

?>

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

 /*$count_query="SELECT COUNT(*) FROM `calend` WHERE `calend`='".$date->format('Y-m-d H:i:s')."'";
  $count_result = mysql_query($count_query);  
  $count_fetch = mysql_fetch_array($count_result);
  //print_r($count_fetch);
 if($count_fetch[0] == 0) { */
  $statement = "INSERT INTO calend(calend,value)VALUES('".$date->format('Y-m-d H:i:s')."','$value')";			
							
	$result = mysql_query($statement);
	
	 if($result)	 
	 { 
		  $min_date = new DateTime($dt.' 00:00:00');
		  $max_date = new DateTime($dt.' 23:59:59');
		 // print_r($min_date->format('Y-m-d H:i:s')); die;
		  $count_query="SELECT COUNT(*)  FROM `calend` WHERE `calend` BETWEEN '".$min_date->format('Y-m-d H:i:s')."' AND '".$max_date->format('Y-m-d H:i:s')."'";
		  //echo $count_query; die;
		  $count_result = mysql_query($count_query);  
		  $count_fetch = mysql_fetch_array($count_result);
		  echo 	'Total Posted ADS '.$count_fetch[0];
	 } else {
            echo "Error in inserting the value";
         }
	 
	echo "////";
	
	$dat = explode("-", $dt);
	$start_month_date =  new DateTime("01-".$dat[1]."-".$dat[2]);
	$month_click_date = $date;
	$start_day = $start_month_date->format("w");
	$current_week = 1;
	
	$number_of_days = $date->format('t');
	for($i = 1; $i <= $dat[0]; $i++){
		
		if($start_day == 7){
			$start_day = 0;
			$current_week++;
		}
		$start_day++;
	}
	$min_dat = $dat[0] - $start_day + 1;
	if($min_dat < 0){
		$min_dat = 1;
	}
	$diff = 7 - $start_day;
	$max_dat = $dat[0] + $diff;
	IF($max_dat > $number_of_days){
		$max_dat = $number_of_days;
	}
	$minimum_date = new DateTime("$min_dat-".$dat[1]."-".$dat[2]." 00:00:00");
	$maximum_date = new DateTime("$max_dat-".$dat[1]."-".$dat[2]." 23:59:59");
	
	$query="SELECT SUM(value)  FROM `calend` WHERE `calend` BETWEEN '".$minimum_date->format('Y-m-d H:i:s')."' AND '".$maximum_date->format('Y-m-d H:i:s')."'";
	$result = mysql_query($query);  
    $fetch = mysql_fetch_array($result);
	echo $fetch[0]." ".$current_week;
	
	
 /*} else {
      	echo "Value already exist";
  }*/
?>
						