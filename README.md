UiExperiment
============

experiment.js is used for very sinple user experiance experiment data colelction.
The js counts all clicks a user perfoms on a page, as well as the total page duration

This could be usefull for user task analysis experiments

i.e how many clicks and long does it take a user to complete a certain number of steps
    comparing the data across different websites variants could tell you which variant is easier for a user to complete


initExperimentVariables()
Sets the page timer variables

buildExperimentHiddenForm()
Builds the hidden form used to submit test data to the database
then appends it to the body

clickCounter();
adds an event listner toall a tags
increments var count every click

submitExperimentData()
method of submitting the experiment data to the database

