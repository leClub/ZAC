Template.map.helpers( {
} );

Template.map.events( {
	'click #closeMission>a' : function( event ) {
		event.preventDefault();
		var room = Rooms.findOne();
		Meteor.call( 'removeRoomMission', room.roomId );
	}
} );
