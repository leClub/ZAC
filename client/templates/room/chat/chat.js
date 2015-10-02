Template.chat.events( {
	'submit .newMessage' : function( event ) {
		event.preventDefault();
		var text = event.target.text.value;
			
		if( text != ''){
			var room = Rooms.findOne(),
				player = Players.findOne();

			if( text == '/clear' ){
				Meteor.call( 'clearMessages', room.roomId );
			}
			else{
				Meteor.call( 'newMessage', room.roomId, { 'user' : player.username, 'text' : text , 'createdAt' : Date.now() } );
			}

			// Clear form
			event.target.text.value = '';
		}
	}
} );