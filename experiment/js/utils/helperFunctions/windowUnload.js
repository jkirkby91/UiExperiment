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
	                                error: function(){ windowUnload(); },
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
