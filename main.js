if( Meteor.isServer ) {
	Meteor.startup( function() {
		/*
		// ES2015+ tests
		var shouter = new Shouter( 'yo' );
		shouter.shout();

		getRandInt(10, ( value ) => {
			console.log( value );
		});
		*/
	} );
}

if( Meteor.isClient ) {
	// console.clear();
}