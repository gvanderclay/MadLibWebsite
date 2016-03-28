<?php
session_start();
//get madlib by ID

$cmdText = 'SELECT TITLE, CATEGORY, RATING FROM MadLibs';

$result = mysql_query($cmdText);
if (!$result) {
    die('Invalid query: ' . mysql_error());
}

json_encode($cmdText);

echo $result;



?>

