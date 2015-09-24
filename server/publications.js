Meteor.publish( 'room', function( roomId ) {
	var room = Rooms.find( { 'roomId' : roomId } );
	return room;
} );

Meteor.publish( 'player', function( username ) {
	var player = Players.find( { 'username' : username } );
	return player;
} );