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
			signIn : 'Sign In',
		}
	}
} );

/*
function mySubmitFunc() {
	console.log( 'mySubmitFunc' );
}
function myPreSubmitFunc() {
	console.log( 'myPreSubmitFunc' );
}
*/

if( Meteor.isClient ) {
	Session.setDefault( 'username', null );

	Accounts.onLogin( function() { 
		var username = Meteor.user().username;
		// console.log(username);
		Session.set( { 'username' : username } );
		Meteor.call( 'loginPlayer', username, function( error, result ) {
			// console.log( result, 'logged in' );
			Meteor.subscribe( 'player', result );
		} ); 
	} );
}