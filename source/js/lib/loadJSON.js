/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/03/13
 * Time: 15:26
 */
define(function () {

	/**
	 * Loads and parses a JSON file
	 * @param url
	 * @param callback
	 */
	function loadJSON(url, callback) {

		var http_request = new XMLHttpRequest();
		http_request.open("GET", url, true);
		http_request.onreadystatechange = function () {
			if (http_request.readyState == 4 && http_request.status == 200) {
				if (callback) callback(JSON.parse(http_request.responseText));
			}
		};
		http_request.send(null);
	}

	return loadJSON;
});
