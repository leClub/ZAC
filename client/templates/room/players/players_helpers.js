Template.currentPlayerTab.helpers( {
	currentPlayer : () => {
		return Players.findOne( { 'username' : Session.get( 'username' ) } );
	}
} );

Template.currentPlayer.helpers( {
	currentPlayer : () => {
		return Players.findOne( { 'username' : Session.get( 'username' ) } );
	}
} );

Template.addSurvivor.helpers( {
	availableSurvivors : () => {
		return []; //AvailableSurvivors.find( {} );
	}
} );

Template.otherPlayersTab.helpers( {
	otherPlayers : () => {
		return Players.find( { 'username' : { $ne : Session.get( 'username' ) }, 'connected' : true } );
	}
} );

Template.otherPlayers.helpers( {
	otherPlayers : () => {
		return Players.find( { 'username' : { $ne : Session.get( 'username' ) }, 'connected' : true } );
	}
} );

Template.player.helpers( {
	isCurrentPlayer : name => {
		return name == Session.get( 'username' );
	}
} );

Template.survivor.helpers( {
	isCurrentPlayer : name => {
		return name == Session.get( 'username' );
	},

	isAvailable : survivorName => {
		// if( AvailableSurvivors.find( { 'name' : survivorName } ).count() > 0 ) {
		// 	Meteor.call( 'removeSurvivorFromAvailable', survivorName );
		// 	return true;
		// }
		// else {
			return false;
		// }
	}
} );
