var processMadLibsJson = function(madLibs){
    $.ajax({
        url: "resources/choosemadlib.html",
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
           $("#content").html(data); 
        },
        error: function(data){
            console.log(data);
        }
    });
}
