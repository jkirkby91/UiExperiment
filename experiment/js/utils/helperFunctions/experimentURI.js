/*
* Get experiment URL 
*/

function experimentURI() {

	var pathArray = window.location.href.split( '/' );
	var protocol = pathArray[0];
	var host = pathArray[2];
	var siteUrl = protocol + '//' + host;
	var pathToDataPhp = "/experiment/system.php"
			 
	$experimentSystem = siteUrl + pathToDataPhp
}
