class Player {
    String name;
    int kills = 0;
    int dangerLevel = 0;

    Card[] cards = new Card[5];
    int nbCards = 0;

    Board board;

    Player(String _name) {
        name = _name;
        board = new Board(this, name);

        for (int i=0; i<5; i++) {
            cards[i] = new Card(i);
        }
    }

    void shoot() {
        String[] results = splitTokens(rollDices(2), " ");
        for (int i = 0; i < results.length; i ++) {
            if ( int( results[ i ] ) > 3 ) {
                kills ++;
            }
        }
        println(results);

        dangerLevel = ( kills < 7) ? 0 :
        ( kills < 19 ) ? 1 : 
        ( kills < 43 ) ? 2 :
        3;

        board.updateKillsPos(kills);
    }

    String rollDices(int nbDices) {
        String result = "";
        for (int i = 0; i < nbDices; i ++) {
            result += floor( random( 1, 7 ) ) + " ";
        }
        return result;
    }
}

