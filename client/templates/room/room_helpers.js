Template.room.helpers( {
	room : function() {
		var room = Rooms.findOne();
		// console.log( room );
		return room;
	},
	test : function( roomId ) {
		// console.log( roomId );
		if( roomId == undefined ) {
			window.location = '/';
		}
	}
} );