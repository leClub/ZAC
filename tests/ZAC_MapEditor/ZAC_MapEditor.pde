final static int TILE_SIZE = 500;

Map map;

ArrayList<Room> rooms;
int startX, startY, counter = 0;
boolean isDrawingRoom = false;
boolean showRooms = false;

ArrayList<Link> links;
int currentOver, linkStart;
boolean showLinks = false;

void setup() {
    rooms = new ArrayList<Room>();
    links = new ArrayList<Link>();

    //createMap();
    loadMap();
}

void draw() {
    background(127);
    map.draw();

    if (showRooms) {
        for (int i=rooms.size ()-1; i>=0; i--) {
            Room r = rooms.get(i);
            r.draw();
        }
    }

    if (showLinks) {
        for (int i=links.size ()-1; i>=0; i--) {
            Link l = links.get(i);
            l.draw();
        }
    }

    if (!showRooms && !showLinks) {
        for (int i=rooms.size ()-1; i>=0; i--) {
            Room r = rooms.get(i);
            if (r.mouseOver()) {
                r.draw();
                for (int j=links.size ()-1; j>=0; j--) {
                    Link l = links.get(j);
                    if (l.idRoomA == r.id || l.idRoomB == r.id) {
                        for (int k=rooms.size ()-1; k>=0; k--) {
                            Room r2 = rooms.get(k);
                            if (r.id != r2.id && (l.idRoomA == r2.id || l.idRoomB == r2.id)) {
                                r2.draw();
                            }
                        }
                        l.draw();
                    }
                }
            }
        }
    }

    if (isDrawingRoom) {
        noStroke();
        fill(255, 130);
        rect(startX, startY, mouseX - startX, mouseY - startY);
    }
}

void mouseClicked() {
    map.tiles[mouseY / TILE_SIZE][mouseX / TILE_SIZE].orientation++;
}

void mousePressed() {
    startX = mouseX;
    startY = mouseY;
}

void mouseReleased() {
    if (isDrawingRoom) {
        rooms.add( new Room(counter, startX, startY, mouseX - startX, mouseY - startY) );
        counter++;
    }

    isDrawingRoom = false;
}

void mouseDragged() {
    isDrawingRoom = true;
}

void keyPressed() {
    if (key == 'a') {
        linkStart = currentOver;
    } else if ( key == 'b') {
        links.add(new Link(linkStart, currentOver, 0));
    } else if ( key == 'c') {
        links.add(new Link(linkStart, currentOver, 1));
    } else if (key == ' ') {
        export();
    } else if (key == 'l') {
        showLinks = !showLinks;
    } else if (key == 'v') {
        showRooms = !showRooms;
    } else if (key == '-') {
        rooms.remove(rooms.size()-1);
    } else {
        for (int i=rooms.size ()-1; i>=0; i--) {
            Room r = rooms.get(i);
            if (r.isOver) {
                switch(key) {
                case 'r':
                    for (int j=links.size ()-1; j>=0; j--) {
                        Link l = links.get(j);
                        if (l.idRoomA == r.id || l.idRoomB == r.id) {
                            links.remove(j);
                        }
                    }
                    rooms.remove(i);
                    break;
                case '0':
                    r.type = 0;
                    break;
                case '1':
                    r.type = 1;
                    break;
                case '2':
                    r.type = 2;
                    break;
                case '3':
                    r.type = 3;
                    break;
                }
            }
        }
    }
}

