class Room {

    int id;
    int x, y, w, h;
    int type = 0; 
    boolean isOver = false;
    /*
    0:outside
     1:inside
     2:street
     3:building
     */

    Room(int _id, int _x, int _y, int _w, int _h) {
        id = _id;
        x = _x;
        y = _y;
        w = _w;
        h = _h;
    }

    Room(int _id, int _x, int _y, int _w, int _h, int _type) {
        id = _id;
        x = _x;
        y = _y;
        w = _w;
        h = _h;
        type = _type;
    }

    boolean mouseOver() {
        return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    }

    PVector center() {
        return new PVector(x + w / 2, y + h / 2);
    }

    void draw() {
        isOver = mouseOver();
        if ( isOver &&  type < 2 ) currentOver = id;

        noFill();
        noStroke();
        switch(type) {
        case 0:
            fill(255, 0, 0, isOver?120:60);
            break;
        case 1:
            fill(0, 0, 255, isOver?120:60);
            break;
        case 2:
            strokeWeight(5);
            stroke(255, 0, 0, isOver?255:100);
            break;
        case 3:
            strokeWeight(5);
            stroke(0, 0, 255, isOver?255:100);
            break;
        }
        rect(x, y, w, h);
    }
}

