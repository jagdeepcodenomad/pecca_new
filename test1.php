<?php
 
function week_number( $date = '8-05-2015' ) 
{ 
    return ceil( date( 'j', strtotime( $date ) ) / 7 ); 
 
} 
 
?>
 
Usage Example:
 
<?php
$dt = "15";
$date = new DateTime($dt."-05-2015");
$first_date = new DateTime("01-05-2015");

$day =  $date->format("w");


 
?>