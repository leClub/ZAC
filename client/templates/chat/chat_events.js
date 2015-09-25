Template.chat.events( {
	'submit .newMessage' : function( event ) {
		event.preventDefault();
		var text = event.target.text.value;
			
		if( text != ''){
			var room = Rooms.findOne(),
				player = Players.findOne();

			Meteor.call( 'newMessage', room.roomId, { 'msg' : player.username + ': ' + text , 'createdAt' : Date.now() } );

			// Clear form
			event.target.text.value = '';
		}
	}
} );