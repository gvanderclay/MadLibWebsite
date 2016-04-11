<?php
require('functions.php');

//insert madlib 
$conn = connectToSQL();

$cmdText = 'INSERT INTO MadLibs (TITLE,CATEGORY,MADLIB_TEXT,REG_DATE) '. 
'VALUES("'.mysql_real_escape_string($_POST['Title']) . '","' .mysql_real_escape_string($_POST['Category']) .'", "'.mysql_real_escape_string($_POST['Contents']).'","'.mysql_real_escape_string($_POST['TimeStamp']).'");';

$result = mysql_query($cmdText);
if (!$result) {
   die('Invalid query: ' . mysql_error() );
}else

echo $result;

?>

