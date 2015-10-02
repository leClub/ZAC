Template.singlePlayer.helpers( {
	player : function() {
		var player = Players.findOne();
		// console.log( player );
		return player;
	},
	
	test : function( username ) {
		// console.log( username );
		if( username == undefined ) {
			window.location = '/';
		}
	}
} );