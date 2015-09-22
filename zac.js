Players = new Mongo.Collection( 'players' );
AvailableSurvivors = new Mongo.Collection( 'availableSurvivors' );

var pwd = AccountsTemplates.removeField( 'password' );
AccountsTemplates.removeField( 'email' );
AccountsTemplates.addFields( [
	{
		_id: 'username',
		type: 'text',
		displayName: 'username',
		required: true,
		minLength: 4,
	},
	pwd
] );

AccountsTemplates.configure( {
	// Behavior
	confirmPassword : true,
	enablePasswordChange : true,
	forbidClientAccountCreation : true,
	overrideLoginErrors : true,
	sendVerificationEmail : false,
	lowercaseUsername : false,
	focusFirstInput : true,

	// Appearance
	showAddRemoveServices : false,
	showForgotPasswordLink : false,
	showLabels : false,
	showPlaceholders : false,
	showResendVerificationEmailLink : false,

	// Client-side Validation
	continuousValidation : false,
	negativeFeedback : false,
	negativeValidation : true,
	positiveValidation : true,
	positiveFeedback : true,
	showValidating : true,

	// Privacy Policy and Terms of Use
	// privacyUrl: 'privacy',
	// termsUrl: 'terms-of-use',

	// Redirects
	// homeRoutePath: '/home',
	// redirectTimeout: 4000,

	// Hooks
	// onLogoutHook: myLogoutFunc,
	// onSubmitHook: mySubmitFunc,
	// preSignUpHook: myPreSubmitFunc,

	// Texts
	texts : {
		button: {
			signUp : 'Register Now!'
		},
		socialSignUp : 'Register',
		socialIcons : {
			'meteor-developer' : 'fa fa-rocket'
		},
		title : {
			forgotPwd : 'Recover Your Password'
		}
	}
} );

/*function mySubmitFunc() {
	console.log( 'mySubmitFunc' );
}
function myPreSubmitFunc() {
	console.log( 'myPreSubmitFunc' );
}*/


if( Meteor.isServer ) { 
	// Meteor.users.remove( {} );
	// Players.remove( {} );

	AvailableSurvivors.remove( {} );
	[ 'Amy', 'Doug', 'Josh', 'Ned', 'Phil', 'Wanda' ].map( function( name ) {
		AvailableSurvivors.insert( { 'name' : name } );
	} );

	Meteor.onConnection( function( connection ) {
		// console.log( connection.id );
		// console.log( Players.find( {} ).count() );
	} ); 
}

if( Meteor.isClient ) {
	Session.setDefault( 'username', null );
	Session.setDefault( 'resolution', { 'width' : window.innerWidth, 'height' : window.innerHeight } );

	window.onresize = function() {
		Session.set( 'resolution', { 'width' : window.innerWidth, 'height' : window.innerHeight } );		
		// console.log( Session.get( 'resolution' ) );
	};

	Accounts.onLogin( function() { 
		var username = Meteor.user().username;
		// console.log(username);
		Session.set( { 'username' : username } );
		Meteor.call( 'loginPlayer', username ); 
	} );

	Template.navbar.helpers( {
		username : function() {
			return Session.get( 'username' );
		}
	} );

	Template.navbar.events( {
		'click #logout' : function() {
			console.log( 'logout' );
			var username = Session.get( 'username' );
			if( username !== null ) {
				Meteor.call( 'logoutPlayer', username );
				AccountsTemplates.logout();
			}
		}
	} );

	//Survivor management
	Template.currentPlayerTab.helpers( {
		currentPlayer : function() {
			return Players.findOne( { 'username' : Session.get( 'username' ) } );
		}
	} );

	Template.currentPlayer.helpers( {
		currentPlayer : function() {
			return Players.findOne( { 'username' : Session.get( 'username' ) } );
		}
	} );

	Template.currentPlayer.events( {
		'click .removeSurvivor' : function( event ) {
			Meteor.call( 'removeSurvivor', Session.get( 'username' ), event.currentTarget.id );
		}
	} );

	Template.addSurvivor.helpers( {
		availableSurvivors : function() {
			return AvailableSurvivors.find( {} );
		}
	} );
	
	Template.addSurvivor.events( {
		'click .selectSurvivor' : function( event ) {
			var survivorName = $( event.currentTarget ).text();
			console.log( 'add survivor', survivorName );
			if(survivorName != '' ) {
				Meteor.call( 'addSurvivor', Session.get( 'username' ), survivorName );
			}
		},
	} );

	Template.otherPlayersTab.helpers( {
		otherPlayers : function() {
			return Players.find( { 'username' : {$ne : Session.get( 'username' ) }, 'connected' : true } );
		}
	} );

	Template.otherPlayers.helpers( {
		otherPlayers : function() {
			return Players.find( { 'username' : {$ne : Session.get( 'username' ) }, 'connected' : true } );
		}
	} );

	Template.player.helpers( {
		isCurrentPlayer : function( name ) {
			return name == Session.get( 'username' );
		} 
	} );

	Template.survivor.helpers( {
		isCurrentPlayer : function( name ) {
			return name == Session.get( 'username' );
		},
		
		isAvailable : function( survivorName ) {
			if( AvailableSurvivors.find( { 'name' : survivorName } ).count() > 0 ) {
				Meteor.call( 'removeSurvivorFromAvailable', survivorName );
				return true;
			}
			else {
				return false;
			}
		}
	} );
}