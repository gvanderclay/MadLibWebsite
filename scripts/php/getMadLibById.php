<?php 
session_start();
//get madlib by ID

$cmdText = 'SELECT TITLE, MADLIB_TEXT, RATING FROM MadLibs
WHERE SEQ_ID = ' . $_POST['ID'];


$result = mysql_query($cmdText);
if (!$result) {
    die('Invalid query: ' . mysql_error());
}

$decode = json_decode($result, true);


echo $decode;

?>
