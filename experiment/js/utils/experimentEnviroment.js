/* experimentEnviroment() 
* initalise the experiment enviroment
* Check to see if there is an experiment in progress
* if not clean the enviroment preparing it for a new test
* if experiment is in progress set the $clicks and $timSpent so experiment can continue
* bring the excluded experiment pages with the custom import_js(); function thanks @Kipras
* bring the experiment experiment elements into the enviroment
*/
function experimentEnviroment() {

  $.import_js('experiment/js/experimentPages.js');
  $.import_js('experiment/js/jquery.cookie.js');
  		
  var experimentStatus = $.cookie("experimentStatus")
  
  if (experimentStatus == null ){
  		
  		cleanExperimentEnviroment();
  		
  }
  else {
  
	   $clicks = $.cookie("clickCookie");
	   $timeSpent = $.cookie("timeSpentDataCookie");
  } 

  pageCounter();
 
  clickCounter();
  
  buildExperimentHiddenForm();
 
  $(this).bind('click',windowUnload());		//dont forget to re-attach the binded window unload function
 
  //enviroment built
  
}