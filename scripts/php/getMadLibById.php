<html>
<head></head>
<body>

fucking hi
<?php 

//get madlib by ID


$servername = "cis.gvsu.edu";
$username = "jardine";
$password = "jardine1214";
$dbname = "jardine";

// Create connection
        $conn = mysql_connect($servername, $username, $password)
                or die("Could not connect..." . mysql_error($conn) );

        $selected = mysql_select_db("jardine",$conn)
  or die("Could not select examples" . mysql_error($conn));




$cmdText = 'SELECT TITLE, MADLIB_TEXT, RATING FROM MadLibs WHERE SEQ_ID = 3';


$result = mysql_query($cmdText, $conn);
if (!$result) {
    die('Invalid query: ' . mysql_error());
}



//echo 'Hello' . mysql_fetch_row($result);

echo 'new' . $result

//$decode = json_decode($result, true);


//echo $decode;

mysql_close($conn);


?>

</body>

</html>
