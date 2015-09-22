var TILE_SIZE = 500;

Mission = function( name ) {
	this.name = name;
	this.load( name );
};

Mission.prototype.load = function( name ) {
	d3.json( '/missions/' + name + '.json', function( err, json ) {
		// console.log( 'mission loaded' );
		this.tiles = json.tiles;
		this.rooms = json.rooms;
		this.buildings = json.buildings;
		this.streets = json.streets;
		this.links = json.links;

		var w = this.tiles[ 0 ].length * TILE_SIZE,
			h = this.tiles.length * TILE_SIZE,
			viewBox = '0 0 ' + w + ' ' + h;

		var svg = d3.select( '#map' )
			.attr( 'width', w )
			.attr( 'height', h )
			.attr( 'viewBox', viewBox );

		for ( var y = 0; y < this.tiles.length; y ++ ) {
			for( var x = 0; x < this.tiles[ y ].length; x ++ ) {
				var rotate = 'rotate(' + ( this.tiles[ y ][ x ].orientation * 90 ) + ','
					+ ( TILE_SIZE / 2 + x * TILE_SIZE ) + ',' 
					+ ( TILE_SIZE / 2 + y * TILE_SIZE ) + ')';

				d3.select( '#map' )
					.append( 'image' )
					.attr( 'x', x * TILE_SIZE )
					.attr( 'y', y * TILE_SIZE )
					.attr( 'width', TILE_SIZE )
					.attr( 'height', TILE_SIZE )
					.attr( 'xlink:href', '/imgs/tiles/' + this.tiles[ y ][ x ].id + '.jpg' )
					.attr( 'transform', rotate );
			}
		}

		d3.select( '#map' )
			.selectAll( 'rect' ).data( this.rooms )
			.enter().append( 'rect' )
			.attr( 'id', function( data ) { return 'room_' + data.id; } )
			.attr( 'x', function( data ) { return data.x; } )
			.attr( 'y', function( data ) { return data.y; } )
			.attr( 'width', function( data ) { return data.w; } )
			.attr( 'height', function( data ) { return data.h; } )
			.attr( 'data-type', function( data ) { return data.type; } );
		
		d3.select( '#map' )
			.selectAll( 'rect' ).each( function( d, i ) {
				if( d.type == 0 ) {
					d3.select( this )
						.style( { 'fill': '#212121', 'stroke': 'none', 'fill-opacity': '0.2' } )
						.attr( 'class', 'zone outside' );
				}
				else if( d.type == 1 ) {
					d3.select( this )
						.style( { 'fill': '#c6ff00', 'stroke': 'none', 'fill-opacity': '0.2' } )
						.attr( 'class', 'zone inside' );
				}
				else if( d.type == 2 ) {
					d3.select( this )
						.style( { 'stroke': '#212121', 'fill': 'none', 'stroke-width': '0.5' } )
						.attr( 'class', 'block street' );
				}
				else if( d.type == 3 ) {
					d3.select( this )
						.style( { 'stroke': '#c6ff00', 'fill': 'none', 'stroke-width': '0.5' } )
						.attr( 'class', 'block building' );
				}
			} );
	} );
};