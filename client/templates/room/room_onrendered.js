Template.room.onRendered( function() {
	var room = Rooms.findOne(),
		player = Players.findOne();
	console.log( room );
	console.log( player );
	// Meteor.call( 'userInRoom', player.username, room.roomId );
} );
