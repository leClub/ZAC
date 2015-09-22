class Link {
    int idRoomA, idRoomB;
    int hasDoor, dir;
    PVector a, b, doorPos = new PVector(0, 0);
    PImage img;

    Link(int _a, int _b, int _hasDoor) {
        idRoomA = _a;
        idRoomB = _b;
        hasDoor = _hasDoor;
        if (hasDoor == 1) img = loadImage("5.png");

        for (int i=0; i<rooms.size (); i++) {
            Room r = rooms.get(i);
            if (r.id == idRoomA) a = r.center();
            else if (r.id == idRoomB) b = r.center();
        }
    }

    Link(int _a, int _b, int _hasDoor, int x, int y, int _dir) {
        idRoomA = _a;
        idRoomB = _b;
        hasDoor = _hasDoor;
        img = loadImage("5.png");
        doorPos.x = x;
        doorPos.y = y;
        dir = _dir;
        
        for (int i=0; i<rooms.size (); i++) {
            Room r = rooms.get(i);
            if (r.id == idRoomA) a = r.center();
            else if (r.id == idRoomB) b = r.center();
        }
    }

    void draw() {
        if (showLinks) {
            strokeWeight(10);
            stroke(255 - hasDoor * 255, 180);
            line( a.x, a.y, b.x, b.y);
            strokeWeight(1);
        }

        if (hasDoor == 1) {
            pushMatrix();
            translate(doorPos.x, doorPos.y);
            rotate(dir * PI/2.);

            imageMode(CENTER);
            image(img, 0, 0);
            imageMode(CORNER);

            popMatrix();
        }
    }
}

