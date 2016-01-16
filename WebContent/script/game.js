var screenWidth = 800;
var screenHeight = 400;
var obstacles = 30;
var splashLoadtime = 1000;
var currentScene;
var timer;
var newRecord;
var playerRight;
var blockLeft;

setup();

/*
 * Audio: http://www.musicradar.com/news/tech/sampleradar-627132
 */

Crafty.paths({ audio: "assets/sounds/", images: "assets/images/" });

Crafty.init(screenWidth, screenHeight, document.getElementById("game"));

Crafty.background('#FFFFFF');

Crafty.timer.FPS(50);

var assetsObj = {
	"audio" : {
		"backgroundGameMusic" : [ "CS_FMArp A_110-E.wav" ],
		"countDownSound" : [ "CS_Noise D-16.wav"],
		"wallHitSound" : [ "CS_Noise B-06.wav" ],
		"highScorePositive" : [ "CS_VocoBitA_Noise-06.wav"],
		"highScoreNegative" : [ "CS_VocoBitA_Noise-05.wav"]
		
	}
};

Crafty.defineScene("menu", function() {
	currentScene = "menu";

	// Set Storage values
	setBestTime(getBestTime());

	// Add characters
	createBlocks(true);

	// Create border
	createBorder();

	// Start
	Crafty.e('MenuStart');

	// HighScore
	Crafty.e('MenuHighscore');

});

Crafty.defineScene("game", function() {
	currentScene = "game";

	timer = Crafty.e('Timer');
	
	// Create border
	createBorder();

	// Create obstacles
	createObstacles();

	// Create Countdown
	createCountdown();
	
});

Crafty.defineScene("highscore", function() {
	currentScene = "highscore";

	// Continue
	Crafty.e('RibbonContinue');

	// Reset Highscore
	Crafty.e('RibbonResetHighScore');

	// Create Timer
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
			playSound('highScorePositive');
		}else{
			playSound('highScoreNegative');
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

loadScene("splash", splashLoadtime);

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
				Crafty.e("2D, Canvas, Tween, Color, Image").attr({
					alpha : 0.0,
					x : ((screenWidth / 2) - 150),
					y : ((screenHeight / 2) - 50),
					w : 300,
					h : 100
				}).image("assets/logo.png", "no-repeat").tween({
					alpha : 1.0
				}, duration).bind("TweenEnd", function() {
					this.unbind("TweenEnd");
					this.tween({
						alpha : 0.0
					}, duration).bind("TweenEnd", function() {
						Crafty.load(assetsObj, // preload assets
								function() { // when loaded
									Crafty.enterScene('menu');
								},
								function(e) { // progress
									console.debug(e.percent + '%');
								},

								function(e) { // uh oh, error loading
									console.debug(e);
								});
					});
				});
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
		stopMusic();
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
	startMusic();
	createBlocks(true);
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

function startMusic() {
	switch (currentScene) {
	case 'game':
		Crafty.audio.play("backgroundGameMusic", -1, 0.2); // Play the audio
															// file
		break;
	}
}

function stopMusic() {
	Crafty.audio.stop();	
}

function playSound(sound) {
	Crafty.audio.play(sound,1,0.2);
}

function setup() {
	window.addEventListener("keydown", function(e) {
	    // space and arrow keys
	    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	        e.preventDefault();
	    }
	}, false);
}

function createBlocks(enabled){
	blockRight = Crafty.e('BlockRight').setEnabled(enabled);
	playerLeft = Crafty.e('BlockLeft').setEnabled(enabled);
}

function createBorder(){
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
}

function createObstacles(){
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 20 + Math.floor((Math.random() * (screenHeight / 3)) + 1)
		});
	}

	
	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 100 + Math.floor((Math.random() * (screenHeight / 3)) + 1)
		});
	}

	for (var x = 0; x < obstacles; x++) {
		Crafty.e('Wall').attr({
			w : 16,
			h : 16,
			x : 100 + Math.floor((Math.random() * (screenWidth - 200)) + 1),
			y : 230 + Math.floor((Math.random() * (screenHeight / 3)) + 1)
		});
	}
}

function createCountdown(){
	playSound("countDownSound");
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
	}, 1000).bind("TweenEnd", function() {
		this.unbind("TweenEnd");
		this.tween({
			alpha : 0.0
		}, 200).bind("TweenEnd", function() {
			playSound("countDownSound");
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
			}, 1000).bind("TweenEnd", function() {
				this.unbind("TweenEnd");
				this.tween({
					alpha : 0.0
				}, 200).bind("TweenEnd", function() {
					playSound("countDownSound");
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
					}, 1000).bind("TweenEnd", function() {
						this.unbind("TweenEnd");
						this.tween({
							alpha : 0.0
						}, 200).bind("TweenEnd", function() {
							playSound("countDownSound");
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
							}, 1000).bind("TweenEnd", function() {
								this.unbind("TweenEnd");
								this.tween({
									alpha : 0.0
								}, 200).bind("TweenEnd", function() {
									playSound("countDownSound");
									start();
								});
							})
						});
					})
				});
			})
		});
	});
}