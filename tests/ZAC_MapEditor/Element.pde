class Element {
    /*
    type 0: start
     type 1: exit
     type 2: zombies arrival
     type 3: objective
     type 4: sewers
     */
    PImage img;
    int roomId, type, dir; 
    PVector pos = new PVector(0, 0);

    Element(int _type) {
        setType(_type);
    }

    Element(int _type, float x, float y, int _dir, int _roomId) {
        setType(_type);
        pos = new PVector(x, y);
        dir = _dir;
        roomId = _roomId;
    }

    void setType(int _type) {
        type = _type;
        if (type != 4) {
            img = loadImage(type + ".png");
        }
    }

    void draw() {
        pushMatrix();
        {
            translate(pos.x, pos.y);
            rotate(dir * PI/2.);
            if (type == 4) {
                noStroke();
                fill(0, 255, 0, 120);
                ellipse(0, 0, 50, 50);
            } else {
                imageMode(CENTER);
                image(img, 0, 0);
                imageMode(CORNER);
            }
        }
        popMatrix();
    }
}

