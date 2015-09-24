Zombie = class Zombie{
	constructor( type, caseId ) {
		// 0: Walker 1: Runner 2: Fatty 3: Boss
		this.type = type;
		this.pos = 
		
		this.actions = 
			( type == 0 ) ? 1 :
			( type == 1 ) ? 2 :
			( type == 2 ) ? 1 :
			1;

		this.actionsDone = 0;
	}
	
	move() {
		// moves are based on:
			// 1 : view
				// a zombie sees survivors in rooms directly around it
				// in the streets, a zombie sees survivors if they're in straight line (horizontal/vertical) with it
			// 2 : sound
				// if zombie doesn't see any survivor, it goes in direction of the noisiest place
			// 3: if no view and no sound, random move (can also stay still)
	}

	attack() {

	}
};