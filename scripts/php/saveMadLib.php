<?php
require('functions.php');

//insert madlib 

$conn = connectToSQL();

sleep(2);

$cmdText = 'INSERT INTO MadLibs(TITLE, CATEGORY, MADLIB_TEXT, RATING)
VALUES('.$_POST['Title'] . ',' .$_POST['Category'] .', '.$_POST['MADLIB_TEXT'].','.$_POST['Rating'] . ');';



$result = mysql_query($cmdText);

if (!$result) {
    die('Invalid query: ' . mysql_error() );
}


?>

