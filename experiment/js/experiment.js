function initExperimentVariables() {
	firstDate = new Date();
	firstMinute = firstDate.getMinutes();
	firstSeconds = firstDate.getSeconds();
}

function buildExperimentHiddenForm() {
  $('body').append("<form id='experimentForm'></form>");
  $('#experimentForm').css("display", "none");
  $('#experimentForm').attr("action", "experiment/system.php");
  $('#experimentForm').append("<input type='text' name='clicks' id='clicks' value='' /><br>");
  $('#experimentForm').append("<input type='text' name='time' id='time' value='' /><br>");
  $('#experimentForm').append("<input type='button' id='submitButton'>");
}

function clickCounter() {
	
	count = 0;

	$('a').click(function () {
		count += 1;  
		$("#clicks").val(count);
	});
}
	
window.onbeforeunload = function() {
 
	function submitExperimentData() {
	
		var  baseUrl = "http://ui.local"
			 pathToDataPhp = "/experiment/system.php"
			 siteDir = window.location.href.toString()
			 .replace(baseUrl, "")
			 .replace(pathToDataPhp, "");
		
		 lastDate = new Date();
		 lastMinute = lastDate.getMinutes();
		 lastSeconds = lastDate.getSeconds();
		 
		 pageMinute = (lastMinute - firstMinute);
		 pageSeconds = (lastSeconds - firstSeconds);
		 
		 timeSpent = pageMinute + pageSeconds;
		 
		 $('#time').val(timeSpent);
		 
		 var serializedData = $("#experimentForm").serialize();
		 			 
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
	
	$("#submitButton").bind('click',submitExperimentData());
  return "thanks for participating";
 }
		
$(document).ready(function(){

  initExperimentVariables()
  clickCounter();
  buildExperimentHiddenForm();

})
	 

