<?php 
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
	header("Cache-Control: no-cache"); 
/**
* Connect to database
*/
	require_once("connect.php");       
/**
* Check to see if $_GET data was set if not kill the script
*/	
	if (!isset($_GET['time'])) {
		print("post data not set");	
		die();
	}
/**
* Insert $_GET values into database
* First the save Experiment sql query
* then get the last inserted id which will be the experiment just submitted
* if sucessfully added to database write to the sucessfull experiment log
* elese the sql query didnt complete send a error response back to the ajax call
* log the 
*/
	$saveExperiment = "INSERT INTO `uiExperiment`.`experiment` (`idexperiment`, `time_spent`, `page_clicks`) VALUES (NULL, '".$_GET['time']."', '".$_GET['clicks']."')";
	
	mysql_query($saveExperiment);
	
	$insert_id = mysql_insert_id();
	
	if(success){
		$myFile = "logs/experimentSuccessLog.txt";
		$fh = fopen($myFile, 'a') or die("can't open file");
		
		$stringData = "experimentID '$insert_id' \n ";
		fwrite($fh, $stringData);

		fclose($fh);

	}
	else if(fail){
		header('HTTP', true, 500);
		
		$myFile = "logs/experimentErrorLog.txt";
		$fh = fopen($myFile, 'a') or die("can't open file");
		
		$stringData = "experimentID: '$insert_id' - timeSpent: '".$_GET['time']."' - clicks: '".$_GET['clicks']."' \n ";
		fwrite($fh, $stringData);

		fclose($fh);
	}		
/**
* Close database connection
*/
	mysql_close($db_handle);		
?>