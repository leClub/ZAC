Template.room.onRendered( () => {
	// var room = Rooms.findOne(),
	// player = Players.findOne();
	// console.log( room );
	// console.log( player );
	// Meteor.call( 'userInRoom', player.username, room.roomId );
} );

Template.room.helpers( {
	room : () => {
		var room = Rooms.findOne();
		// console.log( room );
		return room;
	},

	test : roomId => {
		// console.log( roomId );
		if ( roomId == undefined ) {
			window.location = '/';
		}
	},

	missionNotSet : mission => {
		return mission == '';
	},

	missions : () => {
		var missions = Meteor.call( 'loadMissions', ( error, result ) => {
			if( error ) return;

			// console.log( result );
			result.forEach( mission => {
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
	'click .mission' : event => {
		event.preventDefault();
		// console.log( event );

		var missionFile = event.target.attributes[ 'data-file' ].nodeValue,
			missionName = event.target.innerHTML;
		var room = Rooms.findOne();
		Meteor.call( 'newMessage', room.roomId, { 'user' : '#' + room.roomId, 'text' : missionName , 'createdAt' : Date.now() } );
		Meteor.call( 'setRoomMission', room.roomId, missionFile );
	}
} );
