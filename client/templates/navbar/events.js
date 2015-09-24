Template.navbar.events( {
	'click #logout' : function() {
		var username = Session.get( 'username' );
		if( username !== null ) {
			Meteor.call( 'logoutPlayer', username );
			AccountsTemplates.logout();
		}
	}
} );