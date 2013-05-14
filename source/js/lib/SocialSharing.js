/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 14/05/13
 * Time: 19:21
 */
define(function () {

	var app_url = 'http://tubamuga.com/demos/html5/asteroids/';
	var SocialSharing = {

		tweet: function tweet(points, callback) {
			window.open("https://twitter.com/intent/tweet?text=I've just scored " + points + " points in HTML5 Asteroids! " + app_url + " pic.twitter.com/PFvO0Gzo0Z", //
				'Share your score on Twitter!', // Twitter overwrites this
				'width=500,height=260,menubar=no,location=no,resizable=no,scrollbars=auto,status=no');
			if (callback) callback();
		},
		facebook: function facebook(points, callback) {
			FB.ui(
				{
					method: 'feed',
					name: 'HTML5 Asteroids',
					caption: '',
					description: ( "I've just scored " + points + " points in HTML5 Asteroids!" ),
					link: app_url,
					picture: app_url + 'icon-black.png'
				},
				function (response) {
					if (response && response.post_id) {
						if (callback) callback();
						//console.log('Post was published.');
					} else {
						if (callback) callback();
						//console.log('Post was not published.');
					}
				}
			);
		},
		googlePlus: function googlePlus(points, callback) {
			if (callback) callback();
		}
	};

	return SocialSharing;
});