function constructHome(){
    
    $("#content").html(
    "<h3 class=\"descriptionHeader\">A website to make and play Mad Libs</h3><br><br>" +
    "<button type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Do a Mad Lib</button>" +
    "<button type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Make a Mad Lib</button>" );
    
}


$(document).ready(constructHome);
