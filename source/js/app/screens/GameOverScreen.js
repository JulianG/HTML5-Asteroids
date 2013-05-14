/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/05/13
 * Time: 11:25
 */
define(['lib/easeljs/useHandCursor','lib/SocialSharing'], function (useHandCursor, SocialSharing) {

	function GameOverScreen(atlas) {
		this.gotoMenuRequested = new signals.Signal();
		//
		this.playerScore = 0;
		this.atlas = atlas;
		this.view = new createjs.Container();

		var gameover = new createjs.Text("GAME OVER", "29px Ubuntu Condensed", "#ffffff");
		gameover.textAlign = 'center';
		gameover.x = 400;
		gameover.y = 145;
		this.view.addChild(gameover);

		this.points = new createjs.Text("0", "bold 45px Ubuntu", "#ffffff");
		this.points.textAlign = 'center';
		this.points.x = 400;
		this.points.y = 185;
		this.view.addChild(this.points);

		var share = new createjs.Text("SHARE YOUR SCORE!", "18px Ubuntu Condensed", "#ffffff");
		share.textAlign = 'center';
		share.x = 400;
		share.y = 260;
		this.view.addChild(share);

		var twitter_logo = this.atlas.getDisplayObject('twitter-logo');
		twitter_logo.x = 330;
		twitter_logo.y = 290;
		this.view.addChild(twitter_logo);

		var fb_logo = this.atlas.getDisplayObject('fb-logo');
		fb_logo.x = 380;
		fb_logo.y = 290;
		this.view.addChild(fb_logo);

		var gplus_logo = this.atlas.getDisplayObject('gplus-logo');
		gplus_logo.x = 430;
		gplus_logo.y = 290;
		this.view.addChild(gplus_logo);

		var back_btn = this.atlas.getDisplayObject('btn-background');
		back_btn.x = 330;
		back_btn.y = 345;
		this.view.addChild(back_btn);

		var nothanks = new createjs.Text("NO THANKS!", "18px Ubuntu Condensed", "#ffffff");
		nothanks.textAlign = 'center';
		nothanks.x = 400;
		nothanks.y = 350;
		this.view.addChild(nothanks);

		var self = this;

		useHandCursor(twitter_logo);
		twitter_logo.onPress = function (mouseEvent) {
			SocialSharing.tweet( self.playerScore, function(){
				self.gotoMenuRequested.dispatch();
			} );
		};
		useHandCursor(fb_logo);
		fb_logo.onPress = function (mouseEvent) {
			SocialSharing.facebook( self.playerScore, function(){
				self.gotoMenuRequested.dispatch();
			} );
		};
		useHandCursor(gplus_logo);
		gplus_logo.onPress = function (mouseEvent) {
			console.log("google plus");
		};
		useHandCursor(back_btn);
		back_btn.onPress = function (mouseEvent) {
			createjs.Sound.play('button');
			self.gotoMenuRequested.dispatch();
		};

	}

	var api = GameOverScreen.prototype;

	api.setPoints = function setPoints(points) {
		this.playerScore = points;
		this.points.text = points;
	};

	return GameOverScreen;
});