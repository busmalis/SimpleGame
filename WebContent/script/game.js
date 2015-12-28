var screenWidth = 800;
var screenHeight = 400;
var obstacles = 30;
var currentScene;
var timer;

Crafty.init(screenWidth, screenHeight, document.getElementById("game"));

Crafty.background('#FFFFFF');

Crafty.defineScene("menu", function() {
	currentScene = "menu";
	Crafty.background("#FFFFFF");

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
	
	// HighScore
	
	// Start
	Crafty.e('MenuStart');
	
});

Crafty.defineScene("game", function() {
	currentScene = "game";
	Crafty.background("#FFFFFF");
	Crafty.timer.FPS(100);

	timer = Crafty.e('Timer');

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

	// Create obstacles
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 20 + Math.floor((Math.random() * (screenHeight/3)) + 1)
		});
	}
	
	// Create obstacles
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 100 + Math.floor((Math.random() * (screenHeight/3)) + 1)
		});
	}
	
	// Create obstacles
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 230 + Math.floor((Math.random() * (screenHeight/3)) + 1)
		});
	}
});

Crafty.defineScene("highscore", function() {
	currentScene = "hightscore";
	Crafty.background("#FFFFFF");
	Crafty.e("2D, DOM, Text").attr({
		w : 300,
		h : 200,
		x : ((screenWidth / 2) - 150),
		y : ((screenHeight / 2) - 30),
	}).text("TIME : " + timer.getTime()).css({
		"text-align" : "center"
	}).textColor("#000000").textFont({
		size : '40px',
		weight : 'bold'
	});
});

loadScene("menu", 1500);

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
		this.tween({
			alpha : 0.0
		}, duration).bind("TweenEnd", function() {
			Crafty.enterScene(scene);
		});
	});
}

function loadHighscore() {
	if(currentScene == "game")
		Crafty.enterScene('highscore');
}

function startGame(){
	Crafty.enterScene('game');
}
