<?php
//get madlib by ID
require('functions.php');

sleep(2);

$conn = connectToSQL();


$cmdText = 'SELECT TITLE, CATEGORY, RATING FROM MadLibs';

$result = mysql_query($cmdText, $conn);
if (!$result) {
    die('Invalid query: ' . mysql_error());
}

$arr = array();

while($row = mysql_fetch_row($result) ){

	$arr[] = $row;
	


}

echo json_encode($arr);





?>

