<?php

$db_host = 'external-db.s172649.gridserver.com';
// $db_host = 'internal-db.s172649.gridserver.com';
$db_user = 'db172649_scott';
$db_pass = 'hackathon2014';
$db_name = 'db172649_hackathon';
$tbl_accidents = 'dat_accident';
$tbl_potholes = 'dat_pothole';

function ExecuteQuery($sQuery) {
	global $db_host, $db_user, $db_pass, $db_name;

	$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

	if (!$mysqli) {
		echo 'ExecuteQuery: DataBase Connect Failed'. $mysqli->error;
	} else {
		$result = $mysqli->query($sQuery);
		if ($result == false) {
			echo $mysqli->error."\r\n".$sQuery."\r\n";
		}
	}

	$mysqli->close();
	return $result;
}

$sql = "SELECT * FROM {$tbl_potholes}";
$result = ExecuteQuery($sql);
$count = 0;
$updateQuery = '';

while($row = $result->fetch_assoc()){
	$raw = $row['RAW_LOC'];
	preg_match("/\((\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)\)/", $raw, $output);
	$lat = $output[1];
	$lng = $output[3];

	$updateQuery = " UPDATE {$tbl_potholes} SET lat={$lat}, lng={$lng} WHERE id={$row['id']};";
	$resultThing = ExecuteQuery($updateQuery);
}

?>
