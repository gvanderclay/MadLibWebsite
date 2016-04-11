///Holds all the Ajax calls for storing information back to the database. 
///Always return raw HTML that will be loaded into the content div on the index.html
///All PHP scripts are used as navigation between the webpages.

//Load links to all the mad libs
//Each link will call the php script getMadLibById.php
function getAllMadLibs ()
{
    $.ajax({
        type: "GET",
        url: 'scripts/php/getMadLibs.php',
        beforeSend: function () { $('#loading').show(); },
        success: function (data) {
            processMadLibsJson(data);
        },
        error: function (data) {
           $.jGrowl("An Error occured loading mad libs.");
        },
        complete: function () { $('#loading').hide(); }
    });
}

//Return the HTML for filling out the mad lib
//Includes a form with labels, fields, and a submit button
//submit button can use javascript to display the completed MadLib
function getMadlibById(id)
{
    $.ajax({
        type: "GET",
        url: 'scripts/php/getMadLibById.php',
        data: {"id": id},
        beforeSend: function(){$('#loading').show();},
        success: function (data) {
            doMadLib(data);
        },
        error: function(data)
        {
            $.jGrowl('An error occured loading madlib id: ' + id);
        },
        complete: function () { $('#loading').hide(); }
    });
}

//Return the HTML for displaying the homepage text. 
//Include a bit about our group and what the website will do
function getHome() {
    $.ajax({
        url: 'resources/homepagetext.html',
        beforeSend: function(){$('#loading').show();},
        success: function (data) {
            $('#content').html(data);
        },
        error: function (data) {
            $.jGrowl('An error occured loading the home page');
        },
        complete: function () { $('#loading').hide(); }
    });
}


//Send a stringified JSON object back to the php file. 
//JSON object should be parsed on reciept and saved to the database.
function saveMadLib()
{
    $.ajax({
        type: "POST",
        url: 'scripts/php/saveMadLib.php',
        data: prepMadLib(),
        dataType:'JSON',
        // contentType: 'application/json',
        async:false,
        beforeSend: function(){$('#saving').show();},
        success: function(data)
        {
            $('#saving').hide();
            $.jGrowl('Mad Lib Saved');
            $('input').val('');
            $('textarea').val('');
            
        },
        error: function(data)
        {
            $('#saving').hide();
            $.jGrowl('Error saving Mad Lib');
        }
    });
}

function prepMadLib()
{
    var d = new Date();
    var madLib = Object();
    madLib.Title = $('#title').val();
    madLib.Category = $('#category option:selected').text();
    madLib.Contents = $('#madlibcontents').val();
    madLib.TimeStamp = d.getYear() + '-' + d.getMonth() + '-' + d.getDay() +
        ' ' + d.toTimeString().substr(0, 8);

    return madLib;
}

$(document).ready(getHome);
