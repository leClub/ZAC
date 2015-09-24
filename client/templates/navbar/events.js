Template.navbar.events( {
	'click #logout' : function() {
		var username = Session.get( 'username' );
		Meteor.call( 'logoutPlayer', username );
		AccountsTemplates.logout();
	}
} );