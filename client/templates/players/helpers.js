Template.currentPlayerTab.helpers( {
	currentPlayer : function() {
		return Players.findOne( { 'username' : Session.get( 'username' ) } );
	}
} );

Template.currentPlayer.helpers( {
	currentPlayer : function() {
		return Players.findOne( { 'username' : Session.get( 'username' ) } );
	}
} );

Template.addSurvivor.helpers( {
	availableSurvivors : function() {
		return []; //AvailableSurvivors.find( {} );
	}
} );

Template.otherPlayersTab.helpers( {
	otherPlayers : function() {
		return Players.find( { 'username' : {$ne : Session.get( 'username' ) }, 'connected' : true } );
	}
} );

Template.otherPlayers.helpers( {
	otherPlayers : function() {
		return Players.find( { 'username' : {$ne : Session.get( 'username' ) }, 'connected' : true } );
	}
} );

Template.player.helpers( {
	isCurrentPlayer : function( name ) {
		return name == Session.get( 'username' );
	} 
} );

Template.survivor.helpers( {
	isCurrentPlayer : function( name ) {
		return name == Session.get( 'username' );
	},
	
	isAvailable : function( survivorName ) {
		// if( AvailableSurvivors.find( { 'name' : survivorName } ).count() > 0 ) {
		// 	Meteor.call( 'removeSurvivorFromAvailable', survivorName );
		// 	return true;
		// }
		// else {
			return false;
		// }
	}
} );