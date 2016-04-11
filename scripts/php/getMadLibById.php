<?php

//get madlib by ID
require ('functions.php');

$conn = connectToSQL();

$cmdText = 'SELECT TITLE, MADLIB_TEXT, CATEGORY, RATING FROM MadLibs WHERE SEQ_ID = ' . mysql_real_escape_string($_GET['id']);


$result = mysql_query($cmdText, $conn);
if (!$result) {
    die('Invalid query: ' . mysql_error());
}



$arr =  mysql_fetch_row($result);

if(count($arr)  === 0) {
//return null;
	echo 'ID does not exist';
}else {

echo json_encode($arr);

}

/*
foreach($arr as $col) {
//iterate through columns

echo $col . '<br>';


}
//echo 'new' . $result;

//$decode = json_decode($result, true);
//echo $decode;


*/

mysql_close($conn);


?>
