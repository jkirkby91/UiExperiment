/* buildExperimentDate()
* helper function to build experiment data 
* use full for preparing data for cookies and database submission
*/

function buildExperimentData() {
	  	
	  	$existingClicks = parseInt($.cookie("clickCookie"));
  	   	$existingTimeSpent = $.cookie("timeSpentCookie");		
		$existingTimeSpent = parseInt($existingTimeSpent);
				
		$clicks = $clicks+$existingClicks
		$timeSpent = $timeSpent+$existingTimeSpent
}