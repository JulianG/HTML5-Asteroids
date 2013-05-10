<?php

# .. Neave Games MySQL/PHP high scores script
# .. Requires at least PHP 4.1.0 and MySQL on your server

# .. Upload this file to your server and rename for better security
# .. Set up a MySQL table for the game containing 'name', 'score' and 'ip' and a games_banned_ip table
# .. Edit the game Flash file to point to this file on your server

# .. For more help see http://www.neave.com/games/help/


$name_max = 16; # Maximum player name length allowed
$display_max = 100; # Maximum number of scores to display (multiple of 10)
$table_max = 125; # Maximum number of scores kept in table


# Error handler
function error_msg($msg) {
	exit("success=0&errorMsg=$msg");
}

# Store POSTed info
@$player_name = $_POST['name'];
@$player_score = $_POST['score'];
@$game_name = $_POST['game'];

# SQL table name is 'games_pacman' for Pac-Man, etc.
$table_name = 'games_' . strtolower($game_name);
$player_ip = $_SERVER['REMOTE_ADDR'];

# Need table
if (!isset($game_name)) error_msg('Could not access game table.');

# DB config - it's more secure to keep this in an external PHP file, not publically accessible.
# Set appropriate $db_name, $db_hostname, $db_username and $db_password variables
require_once('/home/yourname/includes/db_inc.php');
#$db_name = 'yourname';
#$db_username = 'yourname';
#$db_password = 'password';
#$db_hostname = 'localhost';

# Connect to DB
@mysql_connect($db_hostname, $db_username, $db_password) or error_msg('Could not connect to database.');
mysql_select_db($db_name) or error_msg('Could not access database.');

# Saving new score?
if (isset($player_score) && is_numeric($player_score) && isset($player_name) && strlen($player_name) > 0 && strlen($player_name) <= $name_max) {
	# Is this IP banned?
	$query = mysql_query('SELECT ip FROM games_banned_ip') or error_msg('Could not access database.');
	while ($row = mysql_fetch_row($query)) {
		if ($player_ip == $row[0]) error_msg('Sorry, high scores have been disabled for your computer.');
	}

	# Has this name played already?
	$query = mysql_query("SELECT name, score FROM $table_name") or error_msg('Could not access database.');
	$num_rows = mysql_num_rows($query);
	$name_found = false;
	while ($row = mysql_fetch_row($query)) {
		if ($player_name == $row[0]) {
			$name_found = true;
			break;
		}
	}
	if ($name_found) {
		# If name already exists, and score is good enough, update it
		if (((int)$player_score) > ((int)$row[1])) mysql_query("UPDATE $table_name SET score='$player_score' WHERE name='$player_name'") or error_msg('Could not update score.');
	}
	else {
		# If scores table is full, check score and delete lowest entry before inserting
		if ($num_rows >= $table_max) {
			$query = mysql_query("SELECT name, score FROM $table_name ORDER BY score ASC LIMIT 0, 1") or error_msg('Could not retrieve scores.');
			$row = mysql_fetch_row($query);
			$good_score = (((int)$player_score) > ((int)$row[1]));
			if ($good_score) mysql_query("DELETE FROM $table_name WHERE name='$row[0]'") or error_msg('Could not delete score.');
		}
		else $good_score = true;

		# Insert new name, score and ip
		if ($good_score) mysql_query("INSERT INTO $table_name VALUES ('$player_name', '$player_score', '$player_ip')") or error_msg('Could not insert score.');
	}
}

# Return new scores table
$query = mysql_query("SELECT name, score FROM $table_name ORDER BY score DESC LIMIT 0, $display_max") or error_msg('Could not retrieve scores.');

$i = 1;
echo 'success=1&errorMsg=OK&maxScore=' . $display_max;
while ($row = mysql_fetch_row($query)) {
	echo "&name$i=$row[0]&score$i=$row[1]";
	$i++;
}

?>