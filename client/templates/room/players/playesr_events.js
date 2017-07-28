Template.currentPlayer.events( {
	'click .removeSurvivor' : event => {
		event.preventDefault();
		Meteor.call( 'removeSurvivor', Session.get( 'username' ), event.currentTarget.id );
	}
} );

Template.addSurvivor.events( {
	'click .selectSurvivor' : event => {
		event.preventDefault();

		let survivorName = $( event.currentTarget ).text();
		console.log( 'add survivor', survivorName );
		if( survivorName != '' ) {
			Meteor.call( 'addSurvivor', Session.get( 'username' ), survivorName );
		}
	}
} );
