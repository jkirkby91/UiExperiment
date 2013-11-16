/**
*
* Set click count variable
*
*/

var count = 0;

/**
*
* listen on all click functions and increment counter
*
*/

$(document).ready(function() {
  $('a').click(function () {
  
    count += 1;
 console.log(count); 
  });
});

/**
*
* Get session start date and assign to variable
*
*/
 
var startTime = new Date();  
 
 console.log(startTime); 

/**
*
* Build uri to ensure ajax call is correct
*
*/

var baseUrl = "http://ui.local",
    pathToDataPhp = "experiment/system.php",
    siteDir = window.location.href.toString()
              .replace(baseUrl, "")
              .replace(pathToDataPhp, "");

 console.log(baseUrl + siteDir + pathToDataPhp); 

/**
*
* bind before unload event to browser window
* this should send all data in an ajax call when the browser is closed
*
*/

window.onbeforeunload = function(){
 
/*
*
* Get end date from when user closes the browser add to variable
* minus end date and start date to get duration on page
*/           	  
      var endTime = new Date();  
      var timeSpent = (endTime - startTime);

/*
 * Send data to php file via ajax
 *
 */      
 
      $.ajax({ 
        url: baseUrl + siteDir + pathToDataPhp,
        type: "POST",
        datatype: "html",
        async: false,
        data: 'time=' + timeSpent + '&clicks=' + count,
        })
        

        console.log(      $.ajax({ 
        url: baseUrl + siteDir + pathToDataPhp,
        type: "POST",
        datatype: "html",
        async: false,
        data: 'time=' + timeSpent + '&clicks=' + count,
        }))
        
    return "Thank You For Participating";
}   