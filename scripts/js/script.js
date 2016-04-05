var processMadLibsJson = function(madLibs){
    var request = $.ajax({
        url: "resources/choosemadlib.html",
        success: function(data){
           $("#content").html(data);

        },
        error: function(data){
            console.log(data);
        }
    });
}

var makeMadLibList = function(madLibs){
    var madLibsJSON = jQuery.parseJSON(madLibs);
    for(var madLibIndex in madLibsJSON){
        var madLib = madLibsJSON[madLibIndex];
        $().append("<button type=\"button\" class=\"list-group-item\">" + madLib[0] + "</button>");
        console.log($("#madLibList").length);
    }
}

var loadCreatePage = function(){
     $.ajax({
        url: "resources/madlibcreation.html",
        success: function(data){
           $("#content").html(data); 
        },
        error: function(data){
            console.log(data);
        }
    });
}
