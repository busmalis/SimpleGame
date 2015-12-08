/**
 * 
 */

Game = {

	// This defines our grid's size and the size of each of its tiles
	map_grid : {
		width : 24,
		height : 16,
		tile : {
			width : 16,
			height : 16
		}
	},

	// The total width of the game screen. Since our grid takes up the entire
	// screen
	// this is just the width of a tile times the width of the grid
	width : function() {
		return this.map_grid.width * this.map_grid.tile.width;
	},

	// The total height of the game screen. Since our grid takes up the entire
	// screen
	// this is just the height of a tile times the height of the grid
	height : function() {
		return this.map_grid.height * this.map_grid.tile.height;
	},
	
	// Initialize and start our game
	start : function() {
		// Start crafty and set a background color so that we can see it's
		// working
		Crafty.init(Game.width(), Game.height(), document
				.getElementById("game"));

		Crafty.background('#AAAAAA');

		Crafty.timer.FPS(60);
				
		// Player1 character, placed at 2, 2 on our grid
	    Crafty.e('PlayerCharacterRight').at(2, 2);
	    
	    // Player2 character, placed at 5, 5 on our grid
	    Crafty.e('PlayerCharacterLeft').at(5, 5);
		
		// Create border
		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				if (x == 0 || x == Game.map_grid.width - 1 || y == 0
						|| y == Game.map_grid.height - 1) {
					Crafty.e('Wall').at(x, y);
				}
			}
		}
	}
}
