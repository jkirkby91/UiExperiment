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