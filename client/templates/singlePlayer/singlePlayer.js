Template.singlePlayer.helpers( {
	player : () => {
		let player = Players.findOne();
		// console.log( player );
		return player;
	},

	test : username => {
		// console.log( username );
		if( username === undefined ) {
			window.location = '/';
		}
	}
} );
