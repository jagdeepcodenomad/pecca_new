<?php
$wek = $_GET['wek'];

$min_dat = $_GET['min_dat'];
$max_dat = $_GET['max_dat'];
$min_tim = "00:00:00";
$max_tim = "23:59:59";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calendar";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$value = 0;
$min_date = new DateTime($min_dat." ".$min_tim);
$max_date = new DateTime($max_dat." ".$max_tim);
$query = "SELECT *  FROM `calend` WHERE `calend` BETWEEN '".$min_date->format('Y-m-d H:i:s')."' AND '".$max_date->format('Y-m-d H:i:s')."'";
//$query = "SELECT * FROM `calend` WHERE `calend` BETWEEN '2015-05-01 00:00:00' AND '2015-05-02 11:59:59'";
$result = $conn->query($query);
if ($result->num_rows > 0)
{
	while($row = $result->fetch_assoc()){
		$value = $value + $row['value'];
	}
}	

echo $value." ".$wek;
//echo "$(\"#week-$wek\").html('$'+$value)";
?>