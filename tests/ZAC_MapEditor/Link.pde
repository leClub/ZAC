class Link {
    int idRoomA, idRoomB;
    int hasDoor;
    PVector a, b;

    Link(int _a, int _b, int _hasDoor) {
        idRoomA = _a;
        idRoomB = _b;
        hasDoor = _hasDoor;
        for (int i=0; i<rooms.size (); i++) {
            Room r = rooms.get(i);
            if (r.id == idRoomA) a = r.center();
            else if (r.id == idRoomB) b = r.center();
        }
    }

    void draw() {
        strokeWeight(10);
        stroke(255 - hasDoor * 255, 180);
        line( a.x, a.y, b.x, b.y);
        strokeWeight(1);

        if (hasDoor == 1) {
            noStroke();
            fill(0, 180);
            ellipse((a.x + b.x)/2, (a.y + b.y)/2, 40, 40);
        }
    }
}

