class Tile {
    String id;
    PImage img;
    int dir = 0;
    int w, h;

    Tile(String _id) {
        id = _id;
        img = loadImage(id + ".jpg");
        img.resize(TILE_SIZE, TILE_SIZE);
    }
    
    Tile(String _id, int _dir) {
        id = _id;
        dir = _dir;
        img = loadImage(id + ".jpg");
        img.resize(TILE_SIZE, TILE_SIZE);
    }

    void draw(int x, int y) {
        pushMatrix();
        {
            translate(x, y);
            pushMatrix();
            {
                translate(TILE_SIZE/2, TILE_SIZE/2);
                rotate(dir * PI / 2.);
                translate(-TILE_SIZE/2, -TILE_SIZE/2);
                image(img, 0, 0);
                /*
                noStroke();
                 beginShape();
                 fill(255, 0, 0);
                 vertex(0, 0);
                 fill(255, 255, 0);
                 vertex(w, 0);
                 fill(0, 255, 0);
                 vertex(w, h);
                 fill(0);
                 vertex(0, h);
                 endShape(CLOSE);
                 */
            }
            popMatrix();
            /*
            translate(TILE_SIZE/2, TILE_SIZE/2);
             textAlign(CENTER, CENTER);
             textSize(50);
             fill(255);
             text(id, 0, 0);
             */
        }
        popMatrix();
    }
}

