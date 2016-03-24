///Holds all the Ajax calls for storing information back to the database. 
///Always return raw HTML that will be loaded into the content div on the index.html
///All PHP scripts are used as navigation between the webpages.

//Load links to all the mad libs
//Each link will call the php script getMadLibById.php
function getAllMadLibs ()
{
    $.ajax({
        type: "GET",
        url: '/scripts/php/getMadLibs.php',
        success: function (data) {
            $('#content').html(data);
        },
        error: function (data) {
            $.Jgrowl("An Error occured loading mad libs.");
        }
    });
}

//Return the HTML for filling out the mad lib
//Includes a form with labels, fields, and a submit button
//submit button can use javascript to display the completed MadLib
function getMadlibById(id)
{
    $.ajax({
        type: "GET",
        url: '/scripts/php/getMadLibById.php',
        success: function (data) {
            $('#content').html(data);
        },
        error: function(data)
        {
            $.jGrowl('An error occured loading madlib id: ' + id);
        }
    });
}

//Return the HTML for displaying the homepage text. 
//Include a bit about our group and what the website will do
//TODO do we need an ajax call to do this? I think we could just do some javascript for this
function getHome() {
    $.ajax({
        type: "GET",
        url: '/scripts/php/getHome.php',
        success: function (data) {
            $('#content').html(data);
        },
        error: function (data) {
            $.jGrowl('An error occured loading the home page');
        }
    });
}


//Send a stringified JSON object back to the php file. 
//JSON object should be parsed on reciept and saved to the database.
function saveMadLib(madLib)
{
    $.ajax({
        type: "POST",
        url: 'scripts/php/saveMadLib.php',
        data: JSON.stringify(madLib),
        contentType: 'application/json',
        success: function(data)
        {
            $.jGrowl('Mad Lib Saved');
        },
        error: function(data)
        {
            $.jGrowl('Error saving Mad Lib');
        }
    });
}

