Template.navbar.helpers( {
	username : function() {
		var username = Session.get( 'username' );
		if( username == null ) AccountsTemplates.logout();
		else return username;
	}
} );

Template.navbar.events( {
	'click #logout' : function( event ) {
		event.preventDefault();
		
		var username = Session.get( 'username' );
		Meteor.call( 'logoutPlayer', username );
		AccountsTemplates.logout();
	}
} );