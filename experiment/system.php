
<?php 
	
	error_reporting(E_ALL);
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
	header("Cache-Control: no-cache"); 

/**
*
* Connect to database
*
*/
	require_once("connect.php");       
/**
*
* Check to see if $_POST data was set if not kill the script
*
*/	
	if (!isset($_GET['time'])) {
		print("post data not set");	
		die();
	}
/**
*
* Insert $_POST values into database
*
*/
	mysql_query("INSERT INTO `uiExperiment`.`experiment` (`idexperiment`, `time_spent`, `page_clicks`) VALUES (NULL, '".$_GET['time']."', '".$_GET['clicks']."')");		
/**
*
* Close database connection
*
*/
	mysql_close($db_handle);		
?>