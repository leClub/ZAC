Meteor.methods( {
	loginPlayer : function( username ) {
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

	logoutPlayer : function( username ) {
		Players.update(
			{ 'username' : username },
			{ $set : { 'connected' : false } }
		);
		
		// Meteor.call( 'removeAllSurvivors', username );

		// console.log( 'Player', username, 'disconnected' );
	},

	joinRoom : function( roomId ) {
		if( ! Meteor.call( 'checkRoomExistence', roomId ) ) {
			console.log( 'room', roomId, 'not found, creating it');
			Rooms.insert( { 
				'roomId' : roomId ,
				'players': [],
				'messages': [],
				'survivors' : [ 'Amy', 'Doug', 'Josh', 'Ned', 'Phil', 'Wanda' ],
				'mission': ''
			} );
		}
		console.log( roomId, 'checkRoomExistence: ', Meteor.call( 'checkRoomExistence', roomId ) );
	},

	checkRoomExistence : function( roomId ) {
		return ( Rooms.find( { roomId : roomId } ).count() != 0 ) ? 
			Rooms.findOne( { roomId : roomId } ) : 
			false;
	},

	newMessage : function( roomId, msg ) {
		Rooms.update(
			{ roomId : roomId },
			{ $push : { messages : { $each : [ msg ], $position : 0 } } }
		);
	},

	clearMessages : function( roomId ) {
		Rooms.update(
			{ roomId : roomId }, 
			{ $pull : { messages : { createdAt : { $lt : Date.now() } } } }
		);
	},

	loadMissions : function() {
		var data = JSON.parse( Assets.getText( 'missions.json' ) );
		// console.log( data.missions );
		return data.missions;
	},

	createMission : function( missionName ) {
		return JSON.parse( Assets.getText( missionName + '.json' ) );
		// return HTTP.get( Meteor.absoluteUrl( 'missions/' + missionName + '.json' ) ).data;
	},

	addSurvivor : function( username, survivorName ) {
		Players.update(
			{ 'username' : username },
			{ $push : { 'survivors' : new Survivor( survivorName ) } }
		);
		// Meteor.call( 'removeSurvivorFromAvailable', survivorName );
		// console.log( username, 'survivors:', Players.findOne( { 'username' : username } ).survivors );
	},

	// removeSurvivorFromAvailable : function( survivorName ) {
		// AvailableSurvivors.remove( { 'name' : survivorName } );
	// },

	// addSurvivorToAvailable : function( survivorName ) {
		// AvailableSurvivors.insert( { 'name' : survivorName } );
	// },

	removeAllSurvivors : function( username ) {
		var survivors = Players.findOne( { 'username' : username } ).survivors;
		for( var i = 0; i < survivors.length; i ++ ) {
			Meteor.call( 'removeSurvivor', username, survivors[ i ].name );
		}
	},

	removeSurvivor : function( username, survivorName ) {
		Players.update(
			{ 'username' : username },
			{ $pull : { 'survivors' : new Survivor(survivorName) } }
		);
		// Meteor.call( 'addSurvivorToAvailable', survivorName );
		// console.log( username, 'survivors:', Players.findOne( { 'username' : username } ).survivors );
	}
} );