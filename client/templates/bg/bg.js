let giphyData = {};

Template.bg.helpers( {
	getGiphy : () => {
		console.log( 'getGiphy' );
		d3.json( 'https://api.giphy.com/v1/gifs/search?api_key=061a223bd4fa41a79779496320ca32c6&q=zombies&limit=100&offset=0&rating=PG-13&lang=en', ( err, json ) => {
			if( err ) console.log( err );
			else{
				console.log( json );
				giphyData = json;
				setBackground();
			}
		} );
	}
} );

function setBackground() {
	d3.select( '.giphy' )
		.attr( 'src', giphyData.data[ Math.floor( Math.random() * giphyData.data.length ) ].images.original.url );

	Meteor.setTimeout( setBackground, 30000 );
}
