Shouter = class Shouter{

	constructor( text ){
		console.log( 'Creating Shouter( ' + text + ' )');
		this.msg = text;
	}

	shout(){
		for(let i=0; i<5; i++){
			console.log(this.msg.toUpperCase() + '!');
		}
	}
};

getRandInt = function( max, callback ){
	callback( Math.floor( Math.random() * max ) );
}