/**
 * Process a JSON string and put it into the html
 * @param madLibs JSON string of mad libs
 */
var processMadLibsJson = function(madLibs){
    $.ajax({
        url: "resources/choosemadlib.html",
        beforeSend: function () { $('#loading').show(); },
        success: function(data){
            makeMadLibList(data, madLibs);
        },
        error: function(data){
            console.log(data);
        },
        complete: function () { $('#loading').hide(); }
    });
}

/**
 * Makes the list of mad libs and puts them into the html
 * @param html html that is being inserted into
 * @param madLibs JSON string of mad libs
 */
var makeMadLibList = function(html, madLibs){
    var madLibsJSON = jQuery.parseJSON(madLibs);
    // wrap the html in a div so it plays nice with jquery
    html = '<div>' + html + '</div>';
    var jHtml = $(html);
    // if there are no mad libs, show the user and exit the function
    if(madLibsJSON.length == 0){
        showNoMadLibs();
        return;
    }

    var buttonHTML = '<div class="btn-group-vertical">';
    // iterate through the madLibs and add the buttons
    for(var madLibIndex in madLibsJSON){
        var madLib = madLibsJSON[madLibIndex];

        var madLibSplit = madLib.toString().split(",");

        //jHtml.find("div#madLibList").append(
        //    '<div class=btn-group" role="group" >' +
        //    '<button id=madlib-"' + madLibSplit[0] +
        //    '" type="button" class="madlib list-group-item dropdown-toggle ' + madLibSplit[2] +
        //    '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        //    '<div class="titleLeft"><strong>' +
        //    madLibSplit[1] + '</strong></div> <div class="categoryRight">' +
        //    madLibSplit[2] + '</div></button><div class="dropdown-menu" aria-labelledby="madlib-' + madLibSplit[0] +
        //    '"><a class="dropdown-item" href="FillMadlib.php">Fill It Out</a><a class="dropdown-item" href="EditMadLib.php">Edit</a></div></div>');

        buttonHTML +=
            '<div class="btn-group madlib-list" role="group"><button id="btnGroupVerticalDrop' + madLibSplit[0] +
            '" type="button" class="btn btn-secondary dropdown-toggle madlib" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            madLibSplit[1] +
            '</button><div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop' + madLibSplit[0] +
            '"><a class="dropdown-item" href="#">Edit</a><br /><a class="dropdown-item" href="#">Fill Out</a></div></div>';
    }
    // $("#content").html(jHtml);
    buttonHTML += '</div>';

    $('#content').html(buttonHTML);
}

/**
 * This function is only called if no mad libs exist in the database
 */
var showNoMadLibs = function(){
    //$.ajax({
    //    url: "resources/noMadLibs.html",
    //    beforeSend: function () {
    //        $('#loading').show();
    //    },
    //    success: function(data){
    //        $("#content").html(data);
    //    },
    //    error: function(data){
    //        console.log(data);
    //    },
    //    complete: function () { $('#loading').hide(); }
    //});

    $('#content').load('resources/noMadLibs.html');
}

/**
 * Load the page that is seen when creating a mad lib
 */
var loadCreatePage = function(){
     $.ajax({
         url: "resources/madlibcreation.html",
         beforeSend: function () {
             $('#loading').show();
         },
        success: function(data){
            loadCategories(data);
        },
        error: function(data){
            console.log(data);
        },
        complete: function () { $('#loading').hide(); }
     });
}

/* Array of categories that can be selected for a mad lib */
var categories = ["College", "Misc", "Political", "Pop-Culture", "Sports", "Outdoors"];

/**
 * Load the categories into html
 * @param html html that the categories are being loaded into
 */
var loadCategories = function(html){
    html = '<div>' + html + '</div>';
    var jHtml = $(html);
    for(var index in categories){
        var category = categories[index];
        jHtml.find('select#category').append(' <option>' + category + '</option>').html();
       // console.log(jHtml.html());
    }
    $("#content").html(jHtml);
}

var testStr = "This is a simple test for my Mad Lib website. [Adjective] ad;fajf;l;akjijcicjijeinamn,nsdf,mn [Noun] a;dlkjbzoeowijrlknakjdf [a game]. a;sdjlzbhoiehoj [that game again].";

var parseMadLib = function(str){
    var regex = /\[(.*?)\]/gm;
    return  str.match(regex);
}

$(document).ready(parseMadLib(testStr));
