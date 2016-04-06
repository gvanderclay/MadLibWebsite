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

var makeMadLibList = function(html, madLibs){
    var madLibsJSON = jQuery.parseJSON(madLibs);
    html = '<div>' + html + '</div>';
    var jHtml = $(html);
    if(madLibsJSON.length == 0){
        showNoMadLibs();
        return;
    }
    for(var madLibIndex in madLibsJSON){
        var madLib = madLibsJSON[madLibIndex];
        jHtml.find("div#madLibList").append($('<button type="button" class="list-group-item">' + madLib +'</button>')).html();
    }
    $("#content").html(jHtml);
}

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

var categories = ["College", "Food", "Politics", "Pop Culture", "Sports", "Outdoors"];

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
