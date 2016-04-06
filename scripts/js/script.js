/**
 * Process a JSON string and put it into the html
 * @param madLibs JSON string of mad libs
 */
var processMadLibsJson = function(madLibs){
    $.ajax({
        url: "resources/choosemadlib.html",
        success: function(data){
            makeMadLibList(data, madLibs);
        },
        error: function(data){
            console.log(data);
        }
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
    // iterate through the madLibs and add the buttons
    for(var madLibIndex in madLibsJSON){
        var madLib = madLibsJSON[madLibIndex];

        var madLibSplit = madLib.toString().split(",");
        console.log(madLibSplit);

        //TODO format the data in the buttons better
        jHtml.find("div#madLibList").append($('<button type="button" class="list-group-item"> <div class ="titleLeft">' + madLibSplit[0] + '</div> <div class="categoryRight">' + madLibSplit[1] + '</div></button>')).html();
    }
    $("#content").html(jHtml);
}

/**
 * This function is only called if no mad libs exist in the database
 */
var showNoMadLibs = function(){
    $.ajax({
        url: "resources/noMadLibs.html",
        success: function(data){
            $("#content").html(data);
        },
        error: function(data){
            console.log(data);
        }
    });
}

/**
 * Load the page that is seen when creating a mad lib
 */
var loadCreatePage = function(){
     $.ajax({
        url: "resources/madlibcreation.html",
        success: function(data){
            loadCategories(data);
        },
        error: function(data){
            console.log(data);
        }
    });
}

/* Array of categories that can be selected for a mad lib */
var categories = ["College", "Food", "Politics", "Pop Culture", "Sports", "Outdoors"];

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
