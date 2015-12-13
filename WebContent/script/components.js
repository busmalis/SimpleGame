Crafty.c('Timer', {
	time : 0,
	run : true,
	init : function() {		
		this.requires('2D, Canvas, Text').attr({ x: 20, y: 20}).text(0).bind('EnterFrame', function(ent){
			if(ent.frame%60 == 0){
				if(this.run)
					this.setTime();
			}
			else
				if(!this.run)
					this.stopTimer();
		});
	},
	
	setTime : function() {
		this.time = this.time + 1;
		this.text(this.time);
	},
	
	stopTimer : function() {
		this.run = false;
	}
}),

Crafty.c('Actor', {
	init : function() {
		this.requires('2D, Canvas, Grid');
	},
});

Crafty.c('Wall', {
	init : function() {
		this.requires('Actor, Color, Solid, Particles').color('rgb(50, 50, 50)');
	},
});

// This is the player-controlled character
Crafty.c('PlayerCharacterLeft', {
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(
				'rgb(20, 75, 40)').attr({
					w : 16,
					h : 16,
					x : 20,
					y : 20}).bind('EnterFrame', function() {
			if (this.isDown("LEFT_ARROW"))
				this.x -= 3;
			if (this.isDown("RIGHT_ARROW"))
				this.x += 3;
			if (this.isDown("UP_ARROW"))
				this.y -= 3;
			if (this.isDown("DOWN_ARROW"))
				this.y += 3;

		}).onHit('Solid', function(ent) {

			if (ent[0].obj.__c.Wall)
				console.debug('Wall');
			else
				console.debug('Solid');

			if (this.isDown("LEFT_ARROW"))
				this.x += 3;
			if (this.isDown("RIGHT_ARROW"))
				this.x -= 3;
			if (this.isDown("UP_ARROW"))
				this.y += 3;
			if (this.isDown("DOWN_ARROW"))
				this.y -= 3;
		}).onHit('PlayerCharacterRight', function(player){
			loadHighscore();
		});
	}
});

//This is the player-controlled character
Crafty.c('PlayerCharacterRight', {
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(
				'rgb(20, 75, 40)').attr({
					w : 16,
					h : 16,
					x : 200,
					y : 200}).bind('EnterFrame', function() {
			if (this.isDown("A"))
				this.x -= 3;
			if (this.isDown("D"))
				this.x += 3;
			if (this.isDown("W"))
				this.y -= 3;
			if (this.isDown("S"))
				this.y += 3;

		}).onHit('Solid', function(ent) {
			if (ent[0].obj.__c.Wall)
				console.debug('Wall');
			else
				console.debug('Solid');

			if (this.isDown("A"))
				this.x += 3;
			if (this.isDown("D"))
				this.x -= 3;
			if (this.isDown("W"))
				this.y += 3;
			if (this.isDown("S"))
				this.y -= 3;
		});
	}
});
