/**
* initExperimentVariables()
* Sets the page timer variables
*/

function initExperimentVariables() {
	firstDate = new Date();
	firstMinute = firstDate.getMinutes();
	firstSeconds = firstDate.getSeconds();
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

/** 
* clickCounter();
* adds an event listner toall a tags
* increments var count every click
*/

function clickCounter() {
	
	count = 0;

	$('a').click(function () {
		count += 1;  
		$("#clicks").val(count);
	});
}

/* 
* Create event lister for when dom is being closed
*/

window.onbeforeunload = function() {
 /*
 * submitExperimentData()
 * method of submitting the experiment data to the database
 */
 	function submitExperimentData() {
	
	/*
	* Build URI for ajax request tomake sure its in a unified format
	*/	
		var  baseUrl = "http://ui.local"
			 pathToDataPhp = "/experiment/system.php"
			 siteDir = window.location.href.toString()
			 .replace(baseUrl, "")
			 .replace(pathToDataPhp, "");
	
	/*
	* since this event is fired on browser close we can assume 
	* its the end of the vistiors interaction with the test
	* so grab the end time
	*/
		 lastDate = new Date();
		 lastMinute = lastDate.getMinutes();
		 lastSeconds = lastDate.getSeconds();	
	/*
	* minus initial page time by final page time to get timeSpent
	*/ 
		 pageMinute = (lastMinute - firstMinute);
		 pageSeconds = (lastSeconds - firstSeconds);
		 timeSpent = pageMinute + pageSeconds;
	
	/*
	* set timeSpent to hidden form time value
	*/	 
		 $('#time').val(timeSpent);	
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
				url: baseUrl + pathToDataPhp + siteDir,
				data: serializedData,
				beforeSend: function(response){alert('Sending');},
				success: function(response){ alert('success');},
				error: function(response){alert('failed');},
				complete: function(response){alert('finished');},
			})
	}	
	/* 
	* JEEZ these next two lines literally cost me a whole saturday
	* trying to get all the data from the ui experiment to be sent onbeforeunload was hard
	* this binds a click event to the #submitButton that has the fuction submitExperimentData() attached to the click event
	* remeber this is all being ran in window.onbeforeunload = function()
	* So when the visitor closes the page the window.onbeforeunload = function() is run which is firing $("#submitButton").bind
	* This being attached to a click event is clicking the button and firing the submitExperimentData() fuction which is sending the data
	*/
	$("#submitButton").bind('click',submitExperimentData());	
	/*
	* i found that using a return here toforce a dialog box up kept the dom and page active allowing
	* time for the ajax request to be comple and vie console.log() data for debugging the window.onbeforeunload = function() 
	*/
  return "thanks for participating";
 }	
$(document).ready(function(){
/*
* bring varibles into the dom
*/
  initExperimentVariables()
/*
* bring the click counter into the dom
*/  
  clickCounter();
/*
* bring the form into the dom
*/  
  buildExperimentHiddenForm();
})
	 

