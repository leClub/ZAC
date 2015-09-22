Survivor = function( name ) {
	this.name = name;
	this.card = 'imgs/survivors/' + name + '.jpg';

	this.kills = 0;
	this.killSize = 864/44;
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
};

Survivor.prototype.move = function() {
};

Survivor.prototype.search = function() {
	// get random card
	// add it to cards[]
	// 
};

Survivor.prototype.equip = function() {

};

Survivor.prototype.trade = function() {

};

Survivor.prototype.hit = function() {

};

Survivor.prototype.openDoor = function() {

};

Survivor.prototype.makeSound = function() {

};

Survivor.prototype.rollDices = function(nbDices) {
	var dices = [];
	for(var i = 0; i < nbDices; i++){
		dices.push( 1 + Math.floor( Math.random() * 6 ) );
	}
	return dices; 
};