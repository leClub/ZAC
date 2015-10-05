Template.roomSelection.events( {
	'click #roomSelectionBtn' : function( event ) {
		event.preventDefault();

		var player = Players.findOne();
		
		var roomId = $( '#roomIdField' )[ 0 ].value;
		if(roomId != '' ) {
			Meteor.call( 'joinRoom', slugify(roomId), player.username, function() {
				Router.go('/rooms/' + slugify( $( '#roomIdField' )[ 0 ].value) ) ;
			} );
		}
		else return;
	}
} );
