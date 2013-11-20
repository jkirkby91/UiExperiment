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