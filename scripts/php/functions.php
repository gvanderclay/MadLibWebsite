<?php 

function connectToSQL() {
$servername = "cis.gvsu.edu";
$username = "jardine";
$password = "jardine1214";
$dbname = "jardine";

// Create connection
        $conn = mysql_connect($servername, $username, $password)
                or die("Could not connect..." . mysql_error($conn) );

        $selected = mysql_select_db("jardine",$conn)
  or die("Could not select examples" . mysql_error($conn));

  return $conn;
  }


  function loadTimer()
  {
        sleep(2);

    }

?>
