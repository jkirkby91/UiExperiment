UiExperiment
============

experiment.js is used for very sinple user experiance experiment data colelction.
The js counts all clicks a user perfoms on a page, as well as the total page duration

This could be usefull for user task analysis experiments

i.e how many clicks and long does it take a user to complete a certain number of steps
    comparing the data across different websites variants could tell you which variant is easier for a user to complete


cleanExperimentEnviroment()

Sets all values to 0 cleans all cookies

pageCounter()
Creates the page timer in seconds

buildExperimentHiddenForm()
Builds the hidden form used to submit test data to the database
then appends it to the body

updateTimeForm()
set timeSpent hidden form value

updateClickForm()
set clicks hidden form value

clickCounter();
adds an event listner toall a tags
increments var count every click

experimentURI()
gets experiment system.php url

buildExperimentDate()
helper function to build experiment data 
use full for preparing data for cookies and database submission

setCookieDate()
Required when experiment is across multiple plages
stores clicks and timeSpent var data in cookie
uses buildExperimentData() to get values for cookies
when each page runs experiment() experimentEnviroment() initialises the experiment
which checks to see if the experimentStatus cookie is set to inProgress

submitExperimentData()
method of submitting the experiment data to the database

windowUnload();
method of adding functions to an event listener onbeforeunload()
this event fires when a user exits the page

experimentEnviroment() 
initalise the experiment enviroment 
this is where you start to build your test/experiment
You need to set your enviroment varibles such as helper functions descibed above
you can load up various external libraries and varibles with the $_import function

experiment()
This is the final experiment function
this is where you program how you want your experiment enviroment to work


in the main distibution of this script so far i've built it with a simple useability test for an interface,
specifically the test its written for is for a user to use 3 different interfaces with different navigation methods to see how easy it is for a user to complete pre defined tasks
in the distribution so far it mesures clicks and time spent on a set of allowed pages until a user exits the page and data is submitted.


Future..
As soon as i submit this read me update im going to tryy get this working really modular, drupalesc you might say, with help of require.js

say hello
@james_kirkby
me@jameskirkby.com

Visit me
www.jameskirkby.com

say thanks
Bitcoin:18h34EUFt4A9xEeNW3euAexLrmZ5RQ5pL5
