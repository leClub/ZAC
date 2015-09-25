Template.navbar.events( {
	'click #logout' : function( event ) {
		event.preventDefault();
		
		var username = Session.get( 'username' );
		Meteor.call( 'logoutPlayer', username );
		AccountsTemplates.logout();
	}
} );