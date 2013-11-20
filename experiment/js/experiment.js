require.config({
  paths: {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
    "cookie": "utils/plugins/cookie",
  }
});

require(['utils/helperFunctions/cleanExperimentEnviroment'], function(cleanExperimentEnviroment) {
  cleanExperimentEnviroment.cleanExperimentEnviroment();
});

require(['utils/helperFunctions/pageCounter'], function(pageCounter) {
  pageCounter();
});

require(['utils/helperFunctions/buildHiddenForm'], function(buildHiddenForm) {
  buildHiddenForm.init();
});

require(['utils/helperFunctions/updateTimeForm'], function(updateTimeForm) {
  updateTimeForm.init();
});

require(['utils/helperFunctions/updateClickForm'], function(updateClickForm) {
  updateClickForm.init();
});

require(['utils/helperFunctions/clickCounter'], function(clickCounter) {
  clickCounter.init();
});

require(['utils/helperFunctions/experimentURI'], function(experimentURI) {
  experimentURI.init();
});

require(['utils/helperFunctions/buildExperimentData'], function(buildExperimentData) {
  buildExperimentData.init();
});

require(['utils/helperFunctions/setCookieData'], function(setCookieData) {
  setCookieData.init();
});

require(['utils/helperFunctions/windowUnload'], function(windowUnload) {
  windowUnload.init();
});


define(['cookie','jquery'], function() {

  	function experiment() {
  		
		  var experimentStatus = $.cookie("experimentStatus");
		  
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
		 
		  $(this).bind('click',windowUnload());	
		
		
		  $('a').click(function(){
		  
		  	reqestedPage = $(this).attr("href");
			  			 
			if ($.inArray(reqestedPage, experimentPages) != -1) {
		 
		       	setCookieData();
			}else{    
				$(this).bind('click',windowUnload());		
			}	  		
		  })
}

});

	 

