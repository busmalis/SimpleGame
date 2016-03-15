var objectWidth = 16;
var objectHeight = 16;
var blockLeftPosX = 30;
var blockLeftPosY = 200;
var blockLeftColor = 'rgb(0, 0, 255)';
var blockRightPosX = 750;
var blockRightPosY = 200;
var blockRightColor = 'rgb(255, 0, 0)';
var movementPoints = 50;
var speed = 3;

Crafty.c('Timer', {
	time : 0,
	run : false,
	init : function() {
		this.requires('2D, Canvas, Text').attr({
			x : 350,
			y : 5
		}).text(0).bind('EnterFrame', function(ent) {
			if (this.run) {
				this.setTime();
			} else if (!this.run)
				this.stopTimer();
		}).textFont({
			size : '40px',
			weight : 'bold'
		});
	},

	setTime : function() {
		this.time = Math.round((this.time + 0.01) * 1000) / 1000;
		this.text(this.time);
	},

	stopTimer : function() {
		this.run = false;
	},

	startTimer : function() {
		this.run = true;
	},

	getTime : function() {
		return this.time;
	}
});

Crafty.c('RibbonContinue', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color('rgb(20, 50, 255)')
				.attr({
					w : 100,
					h : 30,
					x : 20,
					y : screenHeight - 100
				}).text("PRESS C TO CONTINUE").textFont({
					size : '40px',
					weight : 'bold'
				});
	}
});

Crafty.c('RibbonResetHighScore', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color('rgb(20, 50, 255)')
				.attr({
					w : 100,
					h : 30,
					x : 20,
					y : screenHeight - 50
				}).text("PRESS R TO RESET HIGHSCORE").textFont({
					size : '40px',
					weight : 'bold'
				});
	}
});

Crafty.c('MenuStart', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color('rgb(255, 255, 255)')
				.attr({
					w : 100,
					h : 30,
					x : 50,
					y : 100
				}).text("START").textFont({
					size : '40px',
					weight : 'bold'
				});
	}
});

Crafty.c('MenuHighscore', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color('rgb(255, 255, 255)')
				.attr({
					w : 100,
					h : 30,
					x : 500,
					y : 150
				}).text("HIGHSCORE").textFont({
					size : '40px',
					weight : 'bold'
				});
	}
});

Crafty.c('Actor', {
	init : function() {
		this.requires('2D, Canvas, Grid');
	}
});

Crafty.c('Wall', {
	init : function() {
		this.requires('Actor, Color, Solid').color('rgb(255, 165, 0)');
	}
});

Crafty.c('Block', {
	init : function() {
		
	}
});

Crafty.c('PowerbarLeft', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color(blockLeftColor)
		.text("PowerBar").textFont({
			size : '20px'
		}).attr({
			w : 200,
			h : 50,
			x : 0,
			y : 0,				
		});
	},
	
	setWidth : function(value){
		this.w = (200 / 100) * value;
	}
});

Crafty.c('PowerbarRight', {	
	init : function() {
		this.requires('2D, Canvas, Color, Text').color(blockRightColor)
		.text("PowerBar").textFont({
			size : '20px'
		}).attr({
			w : 200,
			h : 50,
			x : 600,
			y : 0,				
		});
	},
	
	setWidth : function(value){
		this.w = (200 / 100) * value;
	}
});

// This is the left block controlled character
Crafty.c('BlockLeft', {
	movementPoints : movementPoints,
	enabled : false,
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(blockLeftColor).attr({
			w : objectWidth,
			h : objectHeight,
			x : blockLeftPosX,
			y : blockLeftPosY
		}).bind('EnterFrame', function() {
			if (this.getMovementPoints() > 0 && this.enabled) {

				if (this.isDown("LEFT_ARROW")) {
					this.x -= speed;
					this.useMovementPoints(true);
				}
				if (this.isDown("RIGHT_ARROW")) {
					this.x += speed;
					this.useMovementPoints(true);
				}
				if (this.isDown("UP_ARROW")) {
					this.y -= speed;
					this.useMovementPoints(true);
				}
				if (this.isDown("DOWN_ARROW")) {
					this.y += speed;
					this.useMovementPoints(true);
				}

			}
		}).onHit('Solid', function(ent) {
			playSound('wallHitSound');
			 
			if (this.isDown("LEFT_ARROW")) {
				this.x += speed;
				this.useMovementPoints(false);
			}
			if (this.isDown("RIGHT_ARROW")) {
				this.x -= speed;
				this.useMovementPoints(false);
			}
			if (this.isDown("UP_ARROW")) {
				this.y += speed;
				this.useMovementPoints(false);
			}
			if (this.isDown("DOWN_ARROW")) {
				this.y -= speed;
				this.useMovementPoints(false);
			}
		}).onHit('BlockRight', function() {
			if (currentScene == 'game') {
				loadHighscore();
			}

		}).onHit('MenuStart', function() {
			startGame();
		}).onHit('MenuHighscore', function() {
			loadHighscore();
		});
	},

	useMovementPoints : function(moved) {
		if(moved){
			Crafty("BlockRight").addMovementPoints();
			this.decreaseMovementPoints();
		}else{
			Crafty("BlockRight").decreaseMovementPoints();
			this.addMovementPoints();
		}
	},

	getMovementPoints : function() {
		Crafty("PowerbarLeft").setWidth(this.movementPoints);
		return this.movementPoints;
	},

	addMovementPoints : function() {
		this.movementPoints += 1;
	},
	
	decreaseMovementPoints : function() {
		this.movementPoints -= 1;
	},

	setEnabled : function(enabled) {
		this.enabled = enabled;
	}
});

// This is the right block controlled character
Crafty.c('BlockRight', {
	movementPoints : movementPoints,
	enabled : false,
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(blockRightColor).attr({
			w : objectWidth,
			h : objectHeight,
			x : blockRightPosX,
			y : blockRightPosY
		}).bind('EnterFrame', function() {
			if (this.getMovementPoints() > 0 && this.enabled) {

				this.isMovementOK = false;

				if (this.isDown("A")) {
					this.x -= speed;
					this.useMovementPoints(true);
				}
				if (this.isDown("D")) {
					this.x += speed;
					this.useMovementPoints(true);
				}
				if (this.isDown("W")) {
					this.y -= speed;
					this.useMovementPoints(true);
				}
				if (this.isDown("S")) {
					this.y += speed;
					this.useMovementPoints(true);
				}
			}
		}).onHit('Solid', function(ent) {
			playSound('wallHitSound');
			
			if (this.isDown("A")){
				this.x += speed;
				this.useMovementPoints(false);
			}
				
			if (this.isDown("D")){
				this.x -= speed;
				this.useMovementPoints(false);
			}
			if (this.isDown("W")){
				this.y += speed;
				this.useMovementPoints(false);
			}
			if (this.isDown("S")){
				this.y -= speed;
				this.useMovementPoints(false);
			}
		}).onHit('MenuStart', function() {
			startGame();
		}).onHit('MenuHighscore', function() {
			loadHighscore();
		});
	},

	useMovementPoints : function(moved) {
		if(moved){
			Crafty("BlockLeft").addMovementPoints();
			this.decreaseMovementPoints();
		}else{
			Crafty("BlockLeft").decreaseMovementPoints();
			this.addMovementPoints();
		}
	},

	getMovementPoints : function() {
		Crafty("PowerbarRight").setWidth(this.movementPoints);
		return this.movementPoints;
	},

	addMovementPoints : function() {
		this.movementPoints += 1;
	},
	
	decreaseMovementPoints : function() {
		this.movementPoints -= 1;
	},
	
	setEnabled : function(enabled) {
		this.enabled = enabled;
	}

});
