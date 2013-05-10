<?php

# .. Neave Games simple PHP high scores script
# .. Requires at least PHP 4.1.0 on your server

# .. Upload this file to your server and rename for better security
# .. Upload the game scores text file to the same directory as this file and CHMOD to 666
# .. Edit the game Flash file to point to this file on your server

# .. For more help see http://www.neave.com/games/help/


$name_max = 16; # Maximum player name length allowed
$display_max = 100; # Maximum number of scores to display (multiple of 10)


# Error handler
function error_msg($msg) {
	exit("success=0&errorMsg=$msg");
}

# Store POSTed info
@$player_name = $_POST['name'];
@$player_score = $_POST['score'];
@$game_name = $_POST['game'];

# Need game name
if (!isset($game_name)) error_msg('Could not access scores.');

# Filename of text file to hold the scores given by game name - e.g. Pac-Man becomes pacman_scores.txt
$filename = $game_name . '_scores.txt';

# Saving new score?
if (isset($player_score) && is_numeric($player_score) && isset($player_name) && strlen($player_name) > 0 && strlen($player_name) <= $name_max) {

	# Open the text file for writing
	$file = fopen($filename, 'r+') or error_msg('Could not load scores.');

	# Lock file
	if (flock($file, LOCK_EX | LOCK_NB)) {
		$content = fread($file, filesize($filename));

		$newline = '';
		$ranked = false;
		$i = 1;

		# Store pairs of values into pairs array
		$pairs = explode('&', $content);
		foreach ($pairs as $pair) {
			# Store name or score pair
			@list($nm, $val) = explode('=', $pair);
			if ($i <= $display_max && strlen($val) > 0) {
				# Insert name
				if (substr($nm, 0, 4) == 'name') $this_name = $val;
				else {
					# Insert score or player's score
					$this_score = $val;
					if (!$ranked && ((int)$player_score) > ((int)$this_score)) {
						$newline .= "&name$i=$player_name&score$i=$player_score";
						$ranked = true;
						$i++;
					}

					$newline .= "&name$i=$this_name&score$i=$this_score";
					$i++;
				}
			}
		}

		# Write new scores
		if (strlen($newline) > 0) {
			ftruncate($file, 0);
			rewind($file);
			fwrite($file, $newline) or error_msg('Could not save score.');
		}

		echo 'success=1&errorMsg=OK&maxScore=' . $display_max . $newline;
	}
	else error_msg('Could not save score.');

	fclose($file);
}
else {
	# Return new scores
	@$file = fopen($filename, 'r') or error_msg('Could not load scores.');
	$content = fread($file, filesize($filename));
	echo 'success=1&errorMsg=OK&maxScore=' . $display_max . $content;
	fclose($file);
}

?>