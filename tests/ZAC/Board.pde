class Board {
    PImage bg;
    Player parent;
    float killsPos = 22;
    float killSize = 864. / 44.;
    
    int[][] cardPos = {
        {283, 189},{496, 189},{709, 189}, // cards in reserve
        {390, 223},{603, 223} // in hands
    };

    Board(Player _parent, String _name) {
        parent = _parent;
        bg = loadImage("data/survivors/sic-" + _name + ".jpg");
    }

    void updateKillsPos(int kills) {
        if ( kills <= 43 ) {
            killsPos = 22 + kills * killSize;
        }
    }

    void display(int x, int y) {
        pushMatrix();
        translate(x, y);

        image(bg, 0, 0);

        noStroke();
        beginShape();
        texture(counter);
        vertex(22, 22, 0, 0);
        vertex(killsPos + killSize, 22, killsPos + killSize - 22, 0);
        vertex(killsPos + killSize, 88, killsPos + killSize - 22, 66);
        vertex(22, 88, 0, 66);
        endShape();

        image(arrow, killsPos, 10);
        
        for(int i=0; i<5; i++){
            image(parent.cards[i].img, cardPos[i][0], cardPos[i][1]); 
        }

        popMatrix();
    }
}

