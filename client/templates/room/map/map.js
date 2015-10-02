serialize = function serialize( el ) {
	var wrap = document.createElement( 'div' );
	wrap.appendChild( el.cloneNode( true ) );
	return wrap.innerHTML;
};

Template.map.helpers( {
	drawMap : function( mission ) {
		console.log( mission );

		console.log( d3.select( '#map' ) );
		/*var w = mission.tiles[ 0 ].length * mission.TILE_SIZE,
			h = mission.tiles.length * mission.TILE_SIZE,
			viewBox = '0 0 ' + w + ' ' + h;

		var svg = document.createElement('svg');
		svg.id = 'map';

		d3.select( svg )
			.attr( 'width', w )
			.attr( 'height', h )
			.attr( 'viewBox', viewBox );

		for ( var y = 0; y < mission.tiles.length; y ++ ) {
			for( var x = 0; x < mission.tiles[ y ].length; x ++ ) {
				var rotate = 'rotate(' + ( mission.tiles[ y ][ x ].orientation * 90 ) + ','
					+ ( mission.TILE_SIZE / 2 + x * mission.TILE_SIZE ) + ',' 
					+ ( mission.TILE_SIZE / 2 + y * mission.TILE_SIZE ) + ')';

				d3.select( svg )
					.append( 'image' )
					.attr( 'x', x * mission.TILE_SIZE )
					.attr( 'y', y * mission.TILE_SIZE )
					.attr( 'width', mission.TILE_SIZE )
					.attr( 'height', mission.TILE_SIZE )
					.attr( 'xlink:href', '/imgs/tiles/' + mission.tiles[ y ][ x ].id + '.jpg' )
					.attr( 'transform', rotate );
			}
		}

		d3.select( svg )
			.selectAll( 'rect' ).data( mission.rooms )
			.enter().append( 'rect' )
			.attr( 'id', function( data ) { return 'room_' + data.id; } )
			.attr( 'x', function( data ) { return data.x; } )
			.attr( 'y', function( data ) { return data.y; } )
			.attr( 'width', function( data ) { return data.w; } )
			.attr( 'height', function( data ) { return data.h; } )
			.attr( 'data-type', function( data ) { return data.type; } );
		
		d3.select( svg )
			.selectAll( 'rect' ).each( function( d, i ) {
				if( d.type == 0 ) {
					d3.select( 'rect' )
						.style( { 'fill': '#212121', 'stroke': 'none', 'fill-opacity': '0.2' } )
						.attr( 'class', 'zone outside' );
				}
				else if( d.type == 1 ) {
					d3.select( 'rect' )
						.style( { 'fill': '#c6ff00', 'stroke': 'none', 'fill-opacity': '0.2' } )
						.attr( 'class', 'zone inside' );
				}
				else if( d.type == 2 ) {
					d3.select( 'rect' )
						.style( { 'stroke': '#212121', 'fill': 'none', 'stroke-width': '0.5' } )
						.attr( 'class', 'block street' );
				}
				else if( d.type == 3 ) {
					d3.select( 'rect' )
						.style( { 'stroke': '#c6ff00', 'fill': 'none', 'stroke-width': '0.5' } )
						.attr( 'class', 'block building' );
				}
			} );

		return serialize( svg );*/
		
	}
} );

Template.map.events( {
	'click #closeMission>a' : function( event ) {
		event.preventDefault();
		var room = Rooms.findOne();
		Meteor.call( 'removeRoomMission', room.roomId );
	}
} );
