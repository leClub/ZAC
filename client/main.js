Session.setDefault( 'resolution', { 'width' : window.innerWidth, 'height' : window.innerHeight } );

window.onresize = function() {
	Session.set( 'resolution', { 'width' : window.innerWidth, 'height' : window.innerHeight } );		
	// console.log( Session.get( 'resolution' ) );
};

window.onload = function() {
	// var mission = new Mission( 'mission_01' );
};