<?php
//get madlib by ID
require('functions.php');


$conn = connectToSQL();


$cmdText = 'SELECT SEQ_ID, TITLE, CATEGORY FROM MadLibs';

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

