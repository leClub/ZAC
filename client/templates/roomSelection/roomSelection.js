Template.roomSelection.events( {
	'click #roomSelectionBtn' : event => {
		event.preventDefault();

		let player = Players.findOne();

		let roomId = $( '#roomIdField' )[ 0 ].value;
		if( roomId !== '' ) {
			Meteor.call( 'joinRoom', slugify( roomId ), player.username, () => {
				Router.go('/rooms/' + slugify( $( '#roomIdField' )[ 0 ].value ) ) ;
			} );
		}
		else return;
	}
} );
