Rooms = new Mongo.Collection( 'rooms' );
Players = new Mongo.Collection( 'players' );
// AvailableSurvivors = new Mongo.Collection( 'availableSurvivors' );

Meteor.startup( function() {
	if( Meteor.isServer ) { 
		// console.log();
		// Meteor.users.remove( {} );
		// console.log( 'Meteor.users:' );
		// console.log( Meteor.users.find().fetch() );

		// console.log();
		// Rooms.remove( {} );
		// console.log( 'Rooms:' );
		// console.log( Rooms.find().fetch() );

		// console.log();
		// Players.remove( {} );
		// console.log( 'Players:' );
		// console.log( Players.find().fetch() );

		// AvailableSurvivors.remove( {} );
		// [ 'Amy', 'Doug', 'Josh', 'Ned', 'Phil', 'Wanda' ].map( function( name ) {
		// 	AvailableSurvivors.insert( { 'name' : name } );
		// } );
	}
} );