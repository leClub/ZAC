Survivor = class Survivor{
	constructor( name ) {
		this.name = name;
		this.card = 'imgs/survivors/' + name + '.jpg';

		this.kills = 0;
		this.killSize = 864 / 44;
		this.killsCursorX = 22 + this.kills * this.killSize;
		this.killWidth = this.killsCursorX + this.killSize - 22;

		this.hit = 0; // player can take 1 hit, then dies
		this.cards = []; // up to 5 cards minus hit
		
		this.actions = 3; // + params.freeActions
		this.actionsDone = 0;
		
		this.moveDist = 1;
		this.freeMoves = 0;

		this.search = 1;
		this.freeSearch = 0;

		this.position;
	}

	move() {
	}

	search() {
		// get random card
		// add it to cards[]
		// 
	}

	equip() {

	}

	trade() {

	}

	hit() {

	}

	openDoor() {

	}

	makeSound() {

	}

	rollDices( nbDices ) {
		var dices = [];
		for(var i = 0; i < nbDices; i++){
			dices.push( 1 + Math.floor( Math.random() * 6 ) );
		}
		return dices; 
	}
};