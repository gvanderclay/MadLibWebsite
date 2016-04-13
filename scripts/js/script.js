/**
 * Process a JSON string and put it into the html
 * @param madLibs JSON string of mad libs
 */
var processMadLibsJson = function (madLibs) {
    $.ajax({
        url: "resources/choosemadlib.html",
        beforeSend: function () { $('#loading').show(); },
        success: function (data) {
            makeMadLibList(data, madLibs);
        },
        error: function (data) {
            console.log(data);
        },
        complete: function () { $('#loading').hide(); }
    });
};

/**
 * Makes the list of mad libs and puts them into the html
 * @param html html that is being inserted into
 * @param madLibs JSON string of mad libs
 */
var makeMadLibList = function (html, madLibs) {
    var madLibsJSON = jQuery.parseJSON(madLibs);
    // wrap the html in a div so it plays nice with jquery
    html = '<div>' + html + '</div>';
    var jHtml = $(html);
    // if there are no mad libs, show the user and exit the function
    if (madLibsJSON.length == 0) {
        showNoMadLibs();
        return;
    }
    // iterate through the madLibs and add the buttons
    for (var madLibIndex in madLibsJSON) {
        var madLib = madLibsJSON[madLibIndex];

        var madLibSplit = madLib.toString().split(",");

        //TODO find a way to put the title on the far left and the category on the far right without it looking fucking stupid
        jHtml.find("div#madLibList").append($('<button id = "madLibBtn' + madLibSplit[0] + '" type="button" class="list-group-item">' + madLibSplit[1] + '</button>')).html();

        jHtml.on('click', '#madLibBtn' + madLibSplit[0], function () {
            var pattern = /madLibBtn(\d*)/g;
            var id = pattern.exec(this.id)[1];
            getMadlibById(id);
        });
    }

    $('#content').html(jHtml);
};

/**
 * This function is only called if no mad libs exist in the database
 */
var showNoMadLibs = function () {
    $('#content').load('resources/noMadLibs.html');
};

/**
 * Load the page that is seen when creating a mad lib
 */
var loadCreatePage = function () {
    $.ajax({
        url: "resources/madlibcreation.html",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            loadCategories(data);
        },
        error: function (data) {
            console.log(data);
        },
        complete: function () { $('#loading').hide(); }
    });
};

/* Array of categories that can be selected for a mad lib */
var categories = ["College", "Misc", "Political", "Pop-Culture", "Sports", "Outdoors"];

/**
 * Load the categories into html
 * @param html html that the categories are being loaded into
 */
var loadCategories = function (html) {
    html = '<div>' + html + '</div>';
    var jHtml = $(html);
    for (var index in categories) {
        var category = categories[index];
        jHtml.find('select#category').append(' <option>' + category + '</option>').html();
    }
    $("#content").html(jHtml);
};

/**
 * Start filling in fields for the mad lib
 * @param madLib An incomplete mad Lib that can be done
 */
var doMadLib = function (madLib) {
    $.ajax({
        url: "resources/doMadLib.html",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var madLibJSON = jQuery.parseJSON(madLib);
            var descriptors = parseMadLib(madLibJSON[1]);
            addMadLibDescriptors(data, descriptors, madLibJSON[1]);
        },
        error: function (data) {
            console.log(data);
        },
        complete: function () { $('#loading').hide(); }
    });
};

/**
 * Add the descriptorTags to the web page
 * @param html The preloaded html
 * @param descriptorTags descriptors that are being added
 * @param madLib The incomplete madLib
 */
var addMadLibDescriptors = function (html, descriptorTags, madLib) {
    html = '<div>' + html + '</div>';
    var jHtml = $(html);
    // insert each descriptor with a text area into the web page
    for (var index in descriptorTags) {
        // remove the square brackets from the descriptorTags
        var pattern = /\[([\w\s]*)\]/g;
        var descriptorTag = descriptorTags[index];
        descriptorTag = pattern.exec(descriptorTag)[1];
        // add text area and label
        var input = '<div class ="form-group"><label for="descriptor' + index + '">' + descriptorTag + '</label><input type="text" class="form-control descriptorInput" id="descriptor' + index + '" required></div>';
        jHtml.find("form#madLibInput").append($(input)).html();
    }
    // add submit button
    jHtml.find("form#madLibInput").append($('<button type="button" id="submitMadLib" class="btn btn-default">Submit</button>')).html();
    // add functionality to submit button
    jHtml.on('click', '#submitMadLib', function () {
        processMadLibFormInput(madLib);
    });
    $("#content").html(jHtml);
};

/**
 * Processes the form input and puts it into the madLib
 * @param madLib
 */
var processMadLibFormInput = function (madLib) {
    var descriptorTags = [];
    var descriptors = [];
    // get the tags and the input
    $('div.form-group').each(function () {
        descriptorTags.push($(this).find("label").text());
        descriptors.push($(this).find("input").val());
    });
    // check if all fields are filled in and display the complete madLib if they are
    if (validateInput()) {
        displayCompleteMadLib(madLib, descriptors, descriptorTags);
    }
};

/**
 * Makes sure all required fields in form are filled out
 * @returns {boolean} Whether or not all fields are filled
 */
var validateInput = function () {
    // used to count blank fields
    var blankInputs = 0;
    // for each required field ...
    $('[required]').each(function () {
        // if the value is empty apply a border and count a blank input
        if ($(this).val().trim() == "") {
            $(this).css('border', '1px solid red');
            $(this).effect("shake");
            blankInputs++;
        }
        else {
            // if not empty then reset the border
            $(this).css('border-color', '');
        }
    });
    var error = blankInputs > 0;
    // display error message if there are blank inputs
    if (error) {
        $.jGrowl("Please complete all required fields");
    }
    return !error;
};

/**
 * Show the completed mad lib on the website
 * @param madLib incomplete madlib
 * @param descriptors descriptors to be added
 * @param descriptorTags tags of the descriptors
 * TODO complete this
 */
var displayCompleteMadLib = function (madLib, descriptors, descriptorTags) {
    var completedMadLib = insertWordsInMadLib(madLib, descriptors, descriptorTags);
    $('#content').html(completedMadLib);
};

/**
 * Inserts the descriptors into the mad lib
 * @param madLib incomplete mad lib
 * @param descriptors descriptors to be put in
 * @param descriptorTags tags of the descriptors
 * @returns {*}
 */
var insertWordsInMadLib = function (madLib, descriptors, descriptorTags) {
    // for each descriptor replace the descriptor in the mad lib.
    for (var index in descriptors) {
        var descriptor = descriptors[index];
        var tag = descriptorTags[index];
        madLib = madLib.replace('[' + tag + ']', '<span class="descriptor">' + descriptor + '</span>');
    }
    return madLib;
};

/**
 * Gets the description words from the mad lib
 * @param str The string containing the mad lib
 * @returns {Array|{index: number, input: string}} Array of descriptor words
 */
var parseMadLib = function (str) {
    var regex = /\[(.*?)\]/gm;
    return str.match(regex);
};


/*
    Disable the functinality of the back button by
    replacing the action with a re-route back to the home page
*/
$(window).unload(function () {
    location.replace(location.href);
});