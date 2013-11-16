<?php

/********************************
 * Set Variables for database connection
 * username = database user
 * hostname = database server (usually localhost)
 * database = the experiment database
 *******************************/

$user_name = "";	
$password = "";
$server = "localhost"; 
$database = "uiExperiment";

/********************************
 * Create connection
 *******************************/
 
$db_handle = mysql_connect($server, $user_name, $password);

$db_found = mysql_select_db($database, $db_handle);

/********************************
 * Check connection
 *******************************/
 
if ($db_found) {

print "Database Found ";

}
else {

print "Database NOT Found ";
die();
}


?>