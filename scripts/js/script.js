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
