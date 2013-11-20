/*
* Author @james_kirkby
* 
* cleanExperimentEnviroment()
* Sets all values to 0 cleans all cookies
* good for dev work and clearing experimentEnviroment after test is complete
*/
function cleanExperimentEnviroment() {
	
	$.cookie("clickCookie", 0);
	$.cookie("timeSpentCookie", 0);
	$.cookie("experimentStatus", "");
	
	$clicks = 0;
    $timeSpent = 0;
    $experimentSystem = 0;
    $existingClicks = 0;
    $existingTimeSpent = 0 ;
    $existingTimeSpent = 0;
    
    var pathArray = 0;
    var protocol = 0;
    var host = 0;
    var siteUrl = 0;
    var pathToDataPhp = 0;
    var serializedData = 0;
    var experimentStatus = 0;
    var reqestedPage = 0;
}