Template.navbar.helpers( {
	username : function() {
		var username = Session.get( 'username' );
		if( username == null ) AccountsTemplates.logout();
		else return username;
	}
} );