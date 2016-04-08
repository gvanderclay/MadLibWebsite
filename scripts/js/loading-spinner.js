$(function () {
    $('#loading').hide();
    $('#container').ajaxStart(function () { $('#loading').show(); });
    $('#container').ajaxStop(function () { $('#loading').hide(); });
});