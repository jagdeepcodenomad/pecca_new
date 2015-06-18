<?php
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

$dte = $_GET['current_date'];

$tim = '00:00:00';
$min_date = new DateTime($dte.' '.$tim);
$max_date = new DateTime($dte.' 23:59:59');
$val = 0;
$query = "SELECT *  FROM `calend` WHERE `calend` BETWEEN '".$min_date->format('Y-m-d H:i:s')."' AND '".$max_date->format('Y-m-d H:i:s')."'";
$result = $conn->query($query);
if ($result->num_rows > 0)
{
	while($row = $result->fetch_assoc()){
		$val++;
	}
}	

echo $val." ".$dte;

?>