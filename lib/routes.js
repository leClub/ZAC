// Default routing settings
Router.configure( {
	layoutTemplate : 'mainLayout',
	loadingTemplate : 'loading',
	notFoundTemplate : '404'
} );

Router.route( '/', function() {
	return this.render( 'roomSelection' );
} );

Router.route('/rooms/:roomId', {
	template : 'room',

	waitOn : function() {
		return Meteor.subscribe( 'room', this.params.roomId );
	},

	data : function() {
		var room = Rooms.findOne( { 'roomId' : this.params.roomId } );
		// console.log( room );
		return room;
	}
} );

Router.route('/players/:username', {
	template : 'singlePlayer',

	waitOn : function() {
		return Meteor.subscribe( 'player', this.params.username );
	},

	data : function() {
		var player = Players.findOne( { 'username' : this.params.username } );
		// console.log( player );
		return player;
	}
} );

/*var requireLogin = function() {
	if (! Meteor.user()) {
		this.redirect( '/' );
	} else {
		this.next();
	}
}
Router.onBeforeAction(requireLogin, {except: ['mainLayout']});*/
