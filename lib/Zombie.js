Zombie = function( type ) {
	// type 0 : Walker
	// type 1 : Runner
	// type 2 : Fatty
	// type 3 : Boss

	this.type = type;
	
	this.actions = 
		( type == 0 ) ? 1 :
		( type == 1 ) ? 2 :
		( type == 2 ) ? 1 :
		1;

	this.actionsDone = 0;
};

Zombie.prototype.move = function() {
	// moves are based on:
		// 1 : view
			// a zombie sees survivors in rooms directly around it
			// in the streets, a zombie sees survivors if they're in straight line (horizontal/vertical) with it
		// 2 : sound
			// if zombie doesn't see any survivor, it goes in direction of the noisiest place
		// 3: if no view and no sound, random move (can also stay still)
};

Zombie.prototype.attack = function() {

};
