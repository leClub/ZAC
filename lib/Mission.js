Mission = class Mission{
	constructor( json ) {
		console.log( 'creating Misson' );
		this.TILE_SIZE = 500;
		this.tiles = json.tiles;
		this.rooms = json.rooms;
		this.buildings = json.buildings;
		this.streets = json.streets;
		this.links = json.links;
		this.survivors = [];
		this.zombies = [];
	}
};