var screenWidth = 800;
var screenHeight = 400;
var obstacles = 30;
var currentScene;
var timer;
var bestTime;
var currentTime;
var newRecord;

Crafty.init(screenWidth, screenHeight, document.getElementById("game"));

Crafty.background('#FFFFFF');

Crafty.defineScene("menu", function() {
	currentScene = "menu";
	Crafty.background("#FFFFFF");

	// Get Storage values
	//Crafty.storage.remove('bestTime');
	bestTime = Crafty.storage('bestTime');
	if (!bestTime)
		bestTime = "1000";
	
	currentTime = 1000;

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

	// Start
	Crafty.e('MenuStart');

	// HighScore
	Crafty.e('MenuHighscore');

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
			y : 20 + Math.floor((Math.random() * (screenHeight / 3)) + 1)
		});
	}

	// Create obstacles
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 100 + Math.floor((Math.random() * (screenHeight / 3)) + 1)
		});
	}

	// Create obstacles
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 230 + Math.floor((Math.random() * (screenHeight / 3)) + 1)
		});
	}
	
	timer.startTimer();
});

Crafty.defineScene("highscore", function() {
	currentScene = "hightscore";
	Crafty.background("#FFFFFF");

	// Continue
	Crafty.e('RibbonContinue');

	// CURRENT TIME
	if(currentTime){
		Crafty.e("2D, DOM, Text").attr({
			w : screenWidth,
			h : 50,
			x : 0,
			y : ((screenHeight / 2) - 50),
		}).text("LAST TIME: " + currentTime).css({
			"text-align" : "center"
		}).textColor("#000000").textFont({
			size : '20px',
			weight : 'bold'
		});
		
		// RECORD
		if (getNewRecord()) {
			Crafty.e("2D, DOM, Text").attr({
				w : screenWidth,
				h : 50,
				x : 0,
				y : ((screenHeight / 2) - 100),
			}).text("NEW RECORD!").css({
				"text-align" : "center"
			}).textColor("#000000").textFont({
				size : '40px',
				weight : 'bold'
			});
		}
	}
	
	Crafty.e("2D, DOM, Text").attr({
		w : screenWidth,
		h : 50,
		x : 0,
		y : ((screenHeight / 2)),
	}).text("BEST TIME : " + bestTime).css({
		"text-align" : "center"
	}).textColor("#000000").textFont({
		size : '40px',
		weight : 'bold'
	}).bind('KeyDown', function(e) {
		if (e.key == 67) // "C"
			loadScene("menu", 500);
	});
});

loadScene("splash", 500);

function loadScene(scene, duration) {

	switch (scene) {
	case 'splash':
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
				Crafty.enterScene('menu');
			});
		});
		break;
		
	default:
		Crafty.e("2D, Canvas, Tween, Color").attr({
			alpha : 0.0,
			x : 0,
			y : 0,
			w : screenWidth,
			h : screenHeight
		}).color("#000000").tween({
			alpha : 1.0
		}, duration).bind("TweenEnd", function() {
			Crafty.enterScene(scene);
			Crafty.e("2D, Canvas, Tween, Color").attr({
				alpha : 1.0,
				x : 0,
				y : 0,
				w : screenWidth,
				h : screenHeight
			}).color("#000000").tween({
				alpha : 0.0
			}, duration);

		});
	}
}

function loadHighscore() {

	oldBestTime = bestTime;
	
	if (currentScene == "game") {
		timer.stopTimer();
		currentTime = timer.getTime();
		if (bestTime >= currentTime) {
			bestTime = currentTime;
			Crafty.storage('bestTime', bestTime);
			newRecord = true;
		}else{
			newRecord = false;
		}
	}

	loadScene("highscore", 500);
}

function startGame() {
	loadScene("game", 500);
}

function getNewRecord() {
	return newRecord;
}
