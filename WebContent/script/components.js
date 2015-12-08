// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
	init : function() {
		this.attr({
			w : Game.map_grid.tile.width,
			h : Game.map_grid.tile.height
		})
	},

	// Locate this entity at the given position on the grid
	at : function(x, y) {
		if (x === undefined && y === undefined) {
			return {
				x : this.x / Game.map_grid.tile.width,
				y : this.y / Game.map_grid.tile.height
			}
		} else {
			this.attr({
				x : x * Game.map_grid.tile.width,
				y : y * Game.map_grid.tile.height
			});
			return this;
		}
	}
});

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
				'rgb(20, 75, 40)').bind('EnterFrame', function() {
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
		});
	}
});

//This is the player-controlled character
Crafty.c('PlayerCharacterRight', {
	init : function() {
		this.requires('Actor, Color, Collision, Multiway').color(
				'rgb(20, 75, 40)').bind('EnterFrame', function() {
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
