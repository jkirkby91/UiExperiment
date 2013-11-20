/* setCookieDate()
* Required when experiment is across multiple plages
* stores clicks and timeSpent var data in cookie
* uses buildExperimentData() to get values for cookies
* when each page runs experiment() experimentEnviroment() initialises the experiment
* which checks to see if the experimentStatus cookie is set to inProgress
*/
function setCookieData() {

		buildExperimentData();
			
		$.cookie("experimentStatus", "inProgress", { expires: 1 });
		$.cookie("clickCookie", $clicks, { expires: 1 });
		$.cookie("timeSpentCookie", $timeSpent, { expires: 1 });
}