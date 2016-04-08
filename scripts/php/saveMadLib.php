<?php
require('functions.php');

//insert madlib 
$conn = connectToSQL();

$cmdText = 'INSERT INTO MadLibs (TITLE,CATEGORY,MADLIB_TEXT,REG_DATE) '. 
'VALUES("'.$_POST['Title'] . '","' .$_POST['Category'] .'", "'.$_POST['Contents'].'","'.$_POST['TimeStamp'].'");';

$result = mysql_query($cmdText);
if (!$result) {
   die('Invalid query: ' . mysql_error() );
}else

echo $result;

?>

