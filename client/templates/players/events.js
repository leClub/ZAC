Template.currentPlayer.events( {
	'click .removeSurvivor' : function( event ) {
		Meteor.call( 'removeSurvivor', Session.get( 'username' ), event.currentTarget.id );
	}
} );

Template.addSurvivor.events( {
	'click .selectSurvivor' : function( event ) {
		var survivorName = $( event.currentTarget ).text();
		console.log( 'add survivor', survivorName );
		if(survivorName != '' ) {
			Meteor.call( 'addSurvivor', Session.get( 'username' ), survivorName );
		}
	},
} );