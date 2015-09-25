Template.chat.helpers( {
	messages : function() {
		var room = Rooms.findOne();
		// console.log( room );
		
		return room.messages;
	}
} );