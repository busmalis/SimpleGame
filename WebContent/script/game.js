var screenWidth = 800;
var screenHeight = 400;
var obstacles = 30;
var currentScene;
var timer;
var newRecord;
var playerRight;
var playerLeft;

Crafty.init(screenWidth, screenHeight, document.getElementById("game"));

Crafty.background('#FFFFFF');

Crafty.defineScene("menu", function() {
	currentScene = "menu";
	Crafty.background("#FFFFFF");

	// Set Storage values
	setBestTime(getBestTime());

	// Add characters
	Crafty.e('PlayerCharacterRight').setEnabled(true);
	Crafty.e('PlayerCharacterLeft').setEnabled(true);

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
	Crafty.timer.FPS(50);

	timer = Crafty.e('Timer');

	// Add characters
	playerRight = Crafty.e('PlayerCharacterRight');
	playerLeft = Crafty.e('PlayerCharacterLeft');

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

	Crafty.e("2D, DOM, Canvas, Tween, Text").attr({
		alpha : 0.0,
		x : ((screenWidth / 2) - 85),
		y : ((screenHeight / 2) - 30),
		w : 170,
		h : 60
	}).text("3").css({
		"text-align" : "center"
	}).textColor("#000000").textFont({
		size : '80px',
		weight : 'bold'
	}).tween({
		alpha : 1.0
	}, 500).bind("TweenEnd", function() {
		this.unbind("TweenEnd");
		this.tween({
			alpha : 0.0
		}, 500).bind("TweenEnd", function() {
			Crafty.e("2D, DOM, Canvas, Tween, Text").attr({
				alpha : 0.0,
				x : ((screenWidth / 2) - 85),
				y : ((screenHeight / 2) - 30),
				w : 170,
				h : 60
			}).text("2").css({
				"text-align" : "center"
			}).textColor("#000000").textFont({
				size : '80px',
				weight : 'bold'
			}).tween({
				alpha : 1.0
			}, 500).bind("TweenEnd", function() {
				this.unbind("TweenEnd");
				this.tween({
					alpha : 0.0
				}, 500).bind("TweenEnd", function() {
					Crafty.e("2D, DOM, Canvas, Tween, Text").attr({
						alpha : 0.0,
						x : ((screenWidth / 2) - 85),
						y : ((screenHeight / 2) - 30),
						w : 170,
						h : 60
					}).text("1").css({
						"text-align" : "center"
					}).textColor("#000000").textFont({
						size : '80px',
						weight : 'bold'
					}).tween({
						alpha : 1.0
					}, 500).bind("TweenEnd", function() {
						this.unbind("TweenEnd");
						this.tween({
							alpha : 0.0
						}, 500).bind("TweenEnd", function() {
							Crafty.e("2D, DOM, Canvas, Tween, Text").attr({
								alpha : 0.0,
								x : ((screenWidth / 2) - 200),
								y : ((screenHeight / 2) - 30),
								w : 170,
								h : 60
							}).text("START").css({
								"text-align" : "center"
							}).textColor("#000000").textFont({
								size : '80px',
								weight : 'bold'
							}).tween({
								alpha : 1.0
							}, 500).bind("TweenEnd", function() {
								this.unbind("TweenEnd");
								this.tween({
									alpha : 0.0
								}, 500).bind("TweenEnd", function() {
									start();
								});
							})
						});
					})
				});
			})
		});
	});
});

Crafty.defineScene("highscore", function() {
	currentScene = "highscore";
	Crafty.background("#FFFFFF");

	// Continue
	Crafty.e('RibbonContinue');

	// Reset Highscore
	Crafty.e('RibbonResetHighScore');

	// CURRENT TIME
	time = getCurrentTime();
	
	if (time) {
		Crafty.e("2D, DOM, Text").attr({
			w : screenWidth,
			h : 50,
			x : 0,
			y : ((screenHeight / 2) - 50),
		}).text("TIME: " + time).css({
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
	}).text("BEST TIME : " + getBestTime()).css({
		"text-align" : "center"
	}).textColor("#000000").textFont({
		size : '40px',
		weight : 'bold'
	}).bind('KeyDown', function(e) {
		switch (e.key) {
			case 67: // "C"
				loadScene("menu", 200);
				break;
			case 82:
				resetHighscore();
				loadHighscore();
				break;
		}
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
			/*
			 * Crafty.e("2D, Canvas, Tween, Color").attr({ alpha : 1.0, x : 0, y :
			 * 0, w : screenWidth, h : screenHeight }).color("#000000").tween({
			 * alpha : 0.0 }, duration);
			 */

		});
	}
}

function loadHighscore() {

	setCurrentTime(0);

	if (currentScene == "game") {
		timer.stopTimer();
		setCurrentTime(timer.getTime());
		if (getBestTime() >= getCurrentTime()) {
			setBestTime(getCurrentTime());
			newRecord = true;
		} else {
			newRecord = false;
		}
	} else {
		newRecord = false;
	}

	loadScene("highscore", 0);
}

function startGame() {
	loadScene("game", 200);
}

function getNewRecord() {
	return newRecord;
}

function start() {
	timer.startTimer();
	playerRight.setEnabled(true);
	playerLeft.setEnabled(true);
}

function setBestTime(time) {
	Crafty.storage('bestTime', time);
}

function getBestTime() {
	var time = Crafty.storage('bestTime');
	if (!time)
		time = "1000";

	return time;
}

function resetHighscore() {
	Crafty.storage.remove('bestTime');
}

function getCurrentTime() {
	return Crafty.storage('currentTime');
}

function setCurrentTime(time) {
	Crafty.storage('currentTime', time);
}