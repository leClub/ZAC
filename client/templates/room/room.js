Template.room.onRendered( function() {
	var room = Rooms.findOne(),
		player = Players.findOne();
	console.log( room );
	console.log( player );
	// Meteor.call( 'userInRoom', player.username, room.roomId );
} );

Template.room.helpers( {
	room : function() {
		var room = Rooms.findOne();
		// console.log( room );
		return room;
	},
	
	test : function( roomId ) {
		// console.log( roomId );
		if ( roomId == undefined ) {
			window.location = '/';
		}
	},
	
	missionNotSet : function( mission ) {
		return mission == '';
	},

	missions : function() {
		var missions = Meteor.call( 'loadMissions', function( error, result ){
			if( error ) return;
			
			// console.log( result );
			result.forEach( function( mission ) {
				d3.select( '#missionSelector' )
					.append( 'li' )
					.append( 'a' )
					.attr( 'class', 'mission' )
					.attr( 'data-file', mission.file )
					.text( mission.name );
			} );

			$('.dropdown-button').dropdown();
		} );
	}
} );

Template.room.events( {
	'click .mission' : function( event ) {
		event.preventDefault();
		var missionFile = event.target.attributes[ 'data-file' ].nodeValue;
		var room = Rooms.findOne();
		Meteor.call( 'setRoomMission', room.roomId, missionFile );
	}
} );
