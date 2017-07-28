Meteor.methods( {
	loginPlayer : username => {
		if( Players.find( { 'username' : username } ).count() == 0 ) {
			// console.log( 'Player', username, 'not found, creating new player' );
			var player = new Player( username );
			Players.insert( player );
		}
		else{
			// console.log( 'Player', username, 'found' );
		}
		Players.update(
			{ 'username' : username },
			{ $set : { 'connected' : true } }
		);

		return username;
		// console.log( 'nbPlayers:', Players.find( {} ).count() );
	},

	logoutPlayer : username => {
		Players.update(
			{ 'username' : username },
			{ $set : { 'connected' : false } }
		);

		// Meteor.call( 'removeAllSurvivors', username );

		// console.log( 'Player', username, 'disconnected' );
	},

	joinRoom : ( roomId, username ) => {
		if( ! Meteor.call( 'checkRoomExistence', roomId ) ) {
			console.log( 'room', roomId, 'not found, creating it');
			Rooms.insert( {
				'roomId' : roomId ,
				'creator' : username,
				'players': [],
				'messages': [],
				'survivors' : [ 'Amy', 'Doug', 'Josh', 'Ned', 'Phil', 'Wanda' ],
				'mission': ''
			} );
		}
		console.log( roomId, 'checkRoomExistence: ', Meteor.call( 'checkRoomExistence', roomId ) );
	},

	checkRoomExistence : roomId => {
		return ( Rooms.find( { roomId : roomId } ).count() != 0 ) ?
			Rooms.findOne( { roomId : roomId } ) :
			false;
	},

	newMessage : ( roomId, msg ) => {
		Rooms.update(
			{ roomId : roomId },
			{ $push : { messages : { $each : [ msg ], $position : 0 } } }
		);
	},

	clearMessages : roomId => {
		Rooms.update(
			{ roomId : roomId },
			{ $pull : { messages : { createdAt : { $lt : Date.now() } } } }
		);
	},

	loadMissions : () => {
		var data = JSON.parse( Assets.getText( 'missions/missions.json' ) );
		// console.log( data.missions );
		return data.missions;
	},

	setRoomMission : ( roomId, missionFile ) => {
		Rooms.update(
			{ roomId : roomId },
			{ $set : { mission : new Mission( JSON.parse( Assets.getText( 'missions/' + missionFile ) ) ) } }
		);
	},

	removeRoomMission : roomId => {
		Rooms.update(
			{ roomId : roomId },
			{ $set : { mission : '' } }
		);
	},

	createMission : missionFile => {
		return JSON.parse( Assets.getText( 'missions/' + missionFile ) );
	},

	addSurvivor : ( username, survivorName ) => {
		Players.update(
			{ 'username' : username },
			{ $push : { 'survivors' : new Survivor( survivorName ) } }
		);
		// Meteor.call( 'removeSurvivorFromAvailable', survivorName );
		// console.log( username, 'survivors:', Players.findOne( { 'username' : username } ).survivors );
	},

	// removeSurvivorFromAvailable : ( survivorName )=>  {
		// AvailableSurvivors.remove( { 'name' : survivorName } );
	// },

	// addSurvivorToAvailable : ( survivorName )=>  {
		// AvailableSurvivors.insert( { 'name' : survivorName } );
	// },

	removeAllSurvivors : username => {
		var survivors = Players.findOne( { 'username' : username } ).survivors;
		for( var i = 0; i < survivors.length; i ++ ) {
			Meteor.call( 'removeSurvivor', username, survivors[ i ].name );
		}
	},

	removeSurvivor : ( username, survivorName ) => {
		Players.update(
			{ 'username' : username },
			{ $pull : { 'survivors' : new Survivor(survivorName) } }
		);
		// Meteor.call( 'addSurvivorToAvailable', survivorName );
		// console.log( username, 'survivors:', Players.findOne( { 'username' : username } ).survivors );
	}
} );
