///Holds all the Ajax calls for storing information back to the database. 

function getAllMadLibs ()
{
    $.ajax({
        type: "GET",
        url: 'getMadLibs.php',
        success: function (data) {
            $('#container').html(data);
        },
        error: function (data) {
            $.Jgrowl("An Error occured loading mad libs.");
        }
    });
}

function getMadlibById(id)
{
    $.ajax({
        type: "GET",
        url: 'getMadLibById.php',
        success: function (data) {
            $('#container').html(data);
        },
        error: function(data)
        {
            $.jGrowl('An error occured loading madlib id: ' + id);
        }
    });
}

function saveMadLib(madLib)
{
    $.ajax({
        type: "POST",
        url: 'saveMadLib.php',
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

