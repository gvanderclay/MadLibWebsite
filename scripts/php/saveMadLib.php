<?php


//insert madlib 


json_encode($_POST['MADLIB_TEXT']);

$cmdText = 'INSERT INTO MadLibs(TITLE, CATEGORY, MADLIB_TEXT, RATING)
VALUES('.$_POST['Title'] . ',' .$_POST['Category'] .', '.$_POST['MADLIB_TEXT'].','.$_POST['Rating'] . ');';



$result = mysql_query($cmdText);

if (!$result) {
    die('Invalid query: ' . mysql_error() );
}

$decode = json_decode($result, true);

?>

