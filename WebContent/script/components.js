var objectWidth = 16;
var objectHeight = 16;
var playerLeftPosX = 30;
var playerLeftPosY = 200;
var playerRightPosX = 750;
var playerRightPosY = 200;
var movementPoints = 50;
var speed = 3;

Crafty.c('Timer', {
	time : 0,
	run : false,
	init : function() {
		this.requires('2D, Canvas, Text').attr({
			x : 20,
			y : 20
		}).text(0).bind('EnterFrame', function(ent) {
			// if (ent.frame % 60 == 0) {
			if (this.run) {
				this.setTime();
			} else if (!this.run)
				this.stopTimer();
		}).textFont({
			size : '20px',
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
}),

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

Crafty.c('MenuStart', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color('rgb(255, 255, 0)')
				.attr({
					w : 100,
					h : 30,
					x : 200,
					y : 100
				}).text("START").textFont({
					size : '40px',
					weight : 'bold'
				});
	}
});

Crafty.c('MenuHighscore', {
	init : function() {
		this.requires('2D, Canvas, Color, Text').color('rgb(255, 255, 0)')
				.attr({
					w : 100,
					h : 30,
					x : 200,
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

// This is the player-controlled character
Crafty.c('PlayerCharacterLeft', {
	movementPoints : movementPoints,
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(
				'rgb(255, 0, 0)').attr({
			w : objectWidth,
			h : objectHeight,
			x : playerLeftPosX,
			y : playerLeftPosY
		}).bind('EnterFrame', function() {
			if (this.getMovementPoints() > 0) {
				if (this.isDown("LEFT_ARROW")) {
					this.x -= speed;
					this.useMovementPoints();
				}
				if (this.isDown("RIGHT_ARROW")) {
					this.x += speed;
					this.useMovementPoints();
				}
				if (this.isDown("UP_ARROW")) {
					this.y -= speed;
					this.useMovementPoints();
				}
				if (this.isDown("DOWN_ARROW")) {
					this.y += speed;
					this.useMovementPoints();
				}
			}
		}).onHit('Solid', function(ent) {

			if (ent[0].obj.__c.Wall)
				console.debug('Wall');
			else
				console.debug('Solid');

			if (this.isDown("LEFT_ARROW"))
				this.x += speed;
			if (this.isDown("RIGHT_ARROW"))
				this.x -= speed;
			if (this.isDown("UP_ARROW"))
				this.y += speed;
			if (this.isDown("DOWN_ARROW"))
				this.y -= speed;
		}).onHit('PlayerCharacterRight', function() {
			loadHighscore();
		}).onHit('MenuStart', function() {
			startGame();
		}).onHit('MenuHighscore', function() {
			loadHighscore();
		});
	},

	useMovementPoints : function() {
		Crafty("PlayerCharacterRight").addMovementPoints();
		this.movementPoints -= 1;
	},

	getMovementPoints : function() {
		return this.movementPoints;
	},

	addMovementPoints : function() {
		this.movementPoints += 1;
	}
});

// This is the player-controlled character
Crafty.c('PlayerCharacterRight', {
	movementPoints : movementPoints,
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(
				'rgb(0, 40, 255)').attr({
			w : objectWidth,
			h : objectHeight,
			x : playerRightPosX,
			y : playerRightPosY
		}).bind('EnterFrame', function() {
			if (this.getMovementPoints() > 0) {
				if (this.isDown("A")) {
					this.x -= speed;
					this.useMovementPoints();
				}
				if (this.isDown("D")) {
					this.x += speed;
					this.useMovementPoints();
				}
				if (this.isDown("W")) {
					this.y -= speed;
					this.useMovementPoints();
				}
				if (this.isDown("S")) {
					this.y += speed;
					this.useMovementPoints();
				}
			}
		}).onHit('Solid', function(ent) {
			if (ent[0].obj.__c.Wall)
				console.debug('Wall');
			else
				console.debug('Solid');

			if (this.isDown("A"))
				this.x += speed;
			if (this.isDown("D"))
				this.x -= speed;
			if (this.isDown("W"))
				this.y += speed;
			if (this.isDown("S"))
				this.y -= speed;
		}).onHit('MenuStart', function() {
			startGame();
		}).onHit('MenuHighscore', function() {
			loadHighscore();
		});
	},

	useMovementPoints : function() {
		Crafty("PlayerCharacterLeft").addMovementPoints();
		this.movementPoints -= 1;
	},

	getMovementPoints : function() {
		return this.movementPoints;
	},

	addMovementPoints : function() {
		this.movementPoints += 1;
	}

});
