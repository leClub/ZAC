final static int TILE_SIZE = 500;
final static String MISSION_NAME = "mission_02";
Map map;

ArrayList<Room> rooms;
int startX, startY, counter = 0;
boolean isDrawingRoom = false;
boolean showRooms = false;

ArrayList<Link> links;
int currentOver, linkStart;
boolean showLinks = false;
boolean placingDoor = false;

ArrayList<Element> elements;
Element el;
boolean placingElement = false;

void setup() {
    rooms = new ArrayList<Room>();
    links = new ArrayList<Link>();
    elements = new ArrayList<Element>();
    el = new Element(0);

    //createMap();
    loadMap();
}

void draw() {
    background(127);
    map.draw();

    for (int i=rooms.size ()-1; i>=0; i--) {
        Room r = rooms.get(i);
        r.mouseOver();
    }

    for (int i=elements.size ()-1; i>=0; i--) {
        Element e = elements.get(i);
        e.draw();
    }

    if (showRooms) {
        for (int i=rooms.size ()-1; i>=0; i--) {
            Room r = rooms.get(i);
            r.draw();
        }
    }

    for (int i=links.size ()-1; i>=0; i--) {
        Link l = links.get(i);
        l.draw();
    }

    // when over a room, show links and linked rooms
    if (!showRooms && !showLinks) {
        for (int i=rooms.size ()-1; i>=0; i--) {
            Room r = rooms.get(i);
            if (r.isOver) {
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

    if (placingElement) {
        el.pos.x = mouseX;
        el.pos.y = mouseY;
        el.draw();
    } else if (placingDoor) {
        Link l = links.get(links.size() -1);
        l.doorPos.x = mouseX;
        l.doorPos.y = mouseY;
    } else if (isDrawingRoom) {
        noStroke();
        fill(255, 130);
        rect(startX, startY, mouseX - startX, mouseY - startY);
    }
}

void mouseClicked() {
    if (placingElement) {
        elements.add( new Element(el.type, el.pos.x, el.pos.y, el.dir, currentOver));
        placingElement = false;
    } else if (placingDoor) {
        placingDoor = false;
    } else {
        map.tiles[mouseY / TILE_SIZE][mouseX / TILE_SIZE].dir++;
    }
}

void mousePressed() {
    if (placingElement || placingDoor) {
    } else {
        startX = mouseX;
        startY = mouseY;
    }
}

void mouseReleased() {
    if (placingElement || placingDoor) {
    } else if (isDrawingRoom) {
        rooms.add( new Room(counter, startX, startY, mouseX - startX, mouseY - startY) );
        counter++;
        isDrawingRoom = false;
    }
}

void mouseDragged() {
    if (placingElement || placingDoor) {
    } else {
        isDrawingRoom = true;
    }
}

void keyPressed() {
    if (placingElement) {
        switch(key) {
        case '0':
            el.setType(0);
            break;
        case '1':
            el.setType(1);
            break;
        case '2':
            el.setType(2);
            break;
        case '3':
            el.setType(3);
            break;
        case '4':
            el.setType(4);
            break;
        case 'r':
            Element e = elements.get(elements.size() -1);
            e.dir = (e.dir + 1) % 4;
            println("e.dir", e.dir);
            break;
        }
    } else if (placingDoor) {
        if (key == 'r') {
            Link l = links.get(links.size() -1);
            l.dir = (l.dir + 1) % 4;
            println("l.dir", l.dir);
        }
    } else if (key == 'a') {
        linkStart = currentOver;
    } else if ( key == 'b') {
        links.add(new Link(linkStart, currentOver, 0));
    } else if ( key == 'c') {
        links.add(new Link(linkStart, currentOver, 1));
        placingDoor = true;
    } else if (key == ' ') {
        export();
    } else if (key == 'l') {
        showLinks = !showLinks;
    } else if (key == 'v') {
        showRooms = !showRooms;
    } else if (key == 'e') {
        placingElement = true;
    } else if (key == 'E') {
        if (elements.size()>0) {
            elements.remove(elements.size()-1);
        }
    } else if (key == '-') {
        if (rooms.size()>0) {
            rooms.remove(rooms.size()-1);
        }
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

