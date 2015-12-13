/**
 * 
 */

var screenWidth = 800;
var screenHeight = 400;

Crafty.init(screenWidth, screenHeight, document.getElementById("game"));

Crafty.background('#FFFFFF');

Crafty.defineScene("game", function() {
	Crafty.background("#AAAAAA");
	Crafty.timer.FPS(60);

	Crafty.e('Timer');

	// Add characters
	Crafty.e('PlayerCharacterRight');
	Crafty.e('PlayerCharacterLeft');

	// Create border
	for (var x = 0; x < screenWidth; x++) {
		for (var y = 0; y < screenHeight; y++) {
			if (x == 0 || x == screenWidth - 16 || y == 0
					|| y == screenHeight - 16) {
				Crafty.e('Wall').attr({
					w : 16,
					h : 16,
					x : x,
					y : y
				});
			}
		}
	}
});

Crafty.defineScene("highscore", function() {
	Crafty.background("#FFFFFF");
	Crafty.e("2D, DOM, Text").attr({
		w : 100,
		h : 20,
		x : ((screenWidth / 2) - 85),
		y : ((screenHeight / 2) - 30),
	}).text("HighScore").css({
		"text-align" : "center"
	}).textColor("#000000");
});

loadScene("game", 1500);

function loadScene(scene, duration) {
	Crafty.e("2D, Canvas, Tween, Color, Image").attr({
		alpha : 0.0,
		x : ((screenWidth / 2) - 85),
		y : ((screenHeight / 2) - 30),
		w : 170,
		h : 60
	}).image("assets/text-logo.png", "no-repeat").tween({
		alpha : 1.0
	}, duration).bind("TweenEnd", function() {
		this.unbind("TweenEnd");
		this.tween({alpha: 0.0}, duration).bind("TweenEnd", function() {
			Crafty.enterScene(scene);
		});
	});
}

function loadHighscore() {
	Crafty.enterScene('highscore');
}
