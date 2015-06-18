

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
  
         $query=mysql_query("SELECT value from calend");
		  while($row=mysql_fetch_array($query))
		  {  
			$result= $row['value'];
			  
			  echo "$result";
		 }
		
?>