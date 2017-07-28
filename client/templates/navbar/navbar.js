Template.navbar.helpers( {
	username : () => {
		var username = Session.get( 'username' );
		if( username === null ) AccountsTemplates.logout();
		else return username;
	}
} );

Template.navbar.events( {
	'click #logout' : event => {
		event.preventDefault();

		var username = Session.get( 'username' );
		Meteor.call( 'logoutPlayer', username );
		AccountsTemplates.logout();
	}
} );
