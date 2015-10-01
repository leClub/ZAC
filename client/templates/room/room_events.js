Template.room.events( {
	'click .mission' : function( event ) {
		event.preventDefault();
		console.log( 'click', event.target );
	}
} );