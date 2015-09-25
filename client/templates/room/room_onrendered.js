Template.room.onRendered(function() {
	// d3.select( '.newMessage>input' ).style( 'width', parseInt( $( '#chat' ).css( 'width' ) ) + 'px' );
	var room = Rooms.findOne(),
		player = Players.findOne();
	console.log(room);
	console.log(player);
	// Meteor.call( 'userInRoom', player.username, room.roomId );
});
