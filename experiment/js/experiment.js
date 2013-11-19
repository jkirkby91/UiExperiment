/*
* Author @james_kirkby
*/

/** cleanExperimentEnviroment()
* Simply sets all values to 0 cleans all cookies
* good for dev work and clearing experimentEnviroment after test is complete
* i want to try and attach this to the sucess ajax call
* would be perfect but haven't got it right yet
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
/**
* pageCounter()
* Creates the page timer in seconds
*/
function pageCounter(){
   
     $timeSpent = 0;    
     setInterval( "$timeSpent++", 1000);
}

/**
* buildExperimentHiddenForm()
* Builds the hidden form used to submit test data to the database
* then appends it to the body
*/

function buildExperimentHiddenForm() {
 
  $('body').append("<form id='experimentForm'></form>");
  $('#experimentForm').css("display", "none");
  $('#experimentForm').append("<input type='text' name='clicks' id='clicks' value='' /><br>");
  $('#experimentForm').append("<input type='text' name='time' id='time' value='' /><br>");
  $('#experimentForm').append("<input type='button' id='submitButton'>");

}

/*
* set timeSpent to hidden form time value
*/		 
function updateTimeForm() {
	$('#time').val($timeSpent);
}

function updateClickForm() {
	$("#clicks").val($clicks);
}

/** 
* clickCounter();
* adds an event listner toall a tags
* increments var count every click
*/
function clickCounter() {

	$clicks = 0;

	$('a').click(function () {
	
	 	window.onbeforeunload = null;
		
		$clicks += 1;  		
		updateClickForm();
		
	});
}

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

/* setCookieDate()
* Required when experiment is across multiple plages
* stores clicks and timeSpent var data in cookie
* when each page runs experiment() experimentEnviroment() initialises the experiment
* which checks to see if the experimentStatus cookie is set to inProgree
* which is generated here
*/
function setCookieData() {

		buildExperimentData();
			
		$.cookie("experimentStatus", "inProgress", { expires: 1 });
		$.cookie("clickCookie", $clicks, { expires: 1 });
		$.cookie("timeSpentCookie", $timeSpent, { expires: 1 });
}

/*
* windowUnload();
* encapuslating the window.onbeforeunload() function means it doesnt add the listener on dom ready
* so you can use the function in if statments to use the experiment across multiple pages
*/ 

function windowUnload() {
	    
	    /* 
		* Create event lister for when dom is being closed
		*/	
		window.onbeforeunload = function() {
		 /*
		 * submitExperimentData()
		 * method of submitting the experiment data to the database
		 */
		 	function submitExperimentData() {
		 				
			 		 experimentURI();
			 		 
			 		 buildExperimentData();
			 		 
			 		 updateTimeForm()
			 		 
			 		 updateClickForm();
	
			/* 
			* serialize the form data into a string that can be used for ajax
			*/	 
					 var serializedData = $("#experimentForm").serialize();	
			/*
			* Create the ajax request using $_GET
			* disable async which can cause issues stopping ajax request being sent out onbeforeunload
			* the data sent across comes from the serializedData var declared erlier
			* Some status codes so we know whats going on
			*/	 			 
						$.ajax({
	                                type: "GET",
	                                async: false,
	                                url: $experimentSystem,
	                                data: serializedData,
	                                beforeSend: function(response){alert('Sending');},
	                                /* success: function(response){ alert('success');}, */
	                                success: function(){ cleanExperimentEnviroment(); },
	                                error: function(response){alert('failed');},
	                                complete: function(response){alert('finished');},
	                        })
                        }        
			
			/* 
			* trying to get all the data from the ui experiment to be sent onbeforeunload was hard
			* this binds a click event to the #submitButton that has the fuction submitExperimentData() attached to the click event
			* remeber this is all being ran in window.onbeforeunload = function()
			* So when the visitor closes the page the window.onbeforeunload = function() is run which is firing $("#submitButton").bind
			* This being attached to a click event is clicking the button and firing the submitExperimentData() fuction which is sending the data
			*/
			
			$("#submitButton").bind('click',submitExperimentData());	
			
			/*
			* i found that using a return here to force a dialog box up kept the dom and page active allowing
			* time for the ajax request to be comple and vie console.log() data for debugging the window.onbeforeunload = function() 
			*/
			
		  return "thanks for participating";
		 }	

}

/* javascript file importer helper function
* I wanted to add an external.js file for pages to exclude from the windowUnload(); function
* so people don't have to go changing the main experiment.js file
* Thanks to stackoverflow http: //stackoverflow.com/questions/950087/how-to-include-a-javascript-file-in-another-javascript-file
* answer #47 by member - Kipras
*/
(function($)
{
    /*
     * $.import_js() helper (for JavaScript importing within JavaScript code).
     */
    var import_js_imported = [];

    $.extend(true,
    {
        import_js : function(script)
        {
            var found = false;
            for (var i = 0; i < import_js_imported.length; i++)
                if (import_js_imported[i] == script) {
                    found = true;
                    break;
                }

            if (found == false) {
                $("head").append('<script type="text/javascript" src="' + script + '"></script>');
                import_js_imported.push(script);
            }
        }
    });

})(jQuery);

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

/* experiment()
* This is the final experiment function
* it initialises the experimentEnviroment()
* Adds event listeners to all clicks
* checks the href value, if its not listed in the experiment pages the windowUnload function is bind() to the click even
* This allows you to add urls to the expeirmentPages array to  allow the experiment carry on across pages
* Thanks to adeneo {answer #4} //stackoverflow.com/questions/20051666/check-if-value-is-in-array-always-returning-true#
* for helping on the syntax of the inArray() on the experimentPages array
*/

function experiment() {

  experimentEnviroment();
  
  $('a').click(function(){
  
  	reqestedPage = $(this).attr("href");
	  			 
	if ($.inArray(reqestedPage, experimentPages) != -1) {
 
       	setCookieData();
	}else{    
		$(this).bind('click',windowUnload());		
	}	  		
  }); 
}


$(document).ready(function(){

 experiment();
})
	 

