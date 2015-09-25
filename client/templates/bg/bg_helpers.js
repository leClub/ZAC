Template.bg.helpers( {
	getGiphy : function(){
		console.log( 'getGiphy' );
		d3.json( 'http://api.giphy.com/v1/gifs/search?q=zombies&api_key=dc6zaTOxFJmzC', function( err, json ) {
			if( err ) console.log( err );
			else{
				console.log( json.data[ Math.floor( Math.random() * json.data.length ) ].images.original.url );
				d3.select( '.giphy' )
					.attr( 'src', function() {
						return json.data[ Math.floor( Math.random() * json.data.length ) ].images.original.url;
					} );
			}
		} );
	}
} );