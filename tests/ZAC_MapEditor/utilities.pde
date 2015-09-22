void createMap() {
    String[][] tileIds = {
        {
            "1b", "1b", "1b"
        }
        , {
            "5b", "5b", "3b"
        }
    };

    map = new Map(tileIds);
    size(TILE_SIZE * map.nx, TILE_SIZE * map.ny, P2D);
}

void export() {
    ArrayList<String> export = new ArrayList<String>();
    export.add("{");
    export.add("\"tiles\":[");
    for (int y = 0; y<map.ny; y++) {   
        export.add("[");
        for (int x = 0; x<map.nx; x++) {
            export.add("{");
            export.add("\"id\":\""+map.tiles[y][x].id+"\",");
            export.add("\"dir\":"+map.tiles[y][x].dir);
            export.add(x<map.nx-1 ? "}," : "}");
        }
        export.add(y<map.ny-1 ? "]," : "]");
    }
    export.add("],");

    export.add("\"rooms\":[");
    for (int i=0; i<rooms.size (); i++) {
        Room r = rooms.get(i);
        export.add("{");
        export.add("\"id\":" + r.id + ",");
        export.add("\"t\":" + r.type + ",");
        export.add("\"x\":" + r.x + ",");
        export.add("\"y\":" + r.y + ",");
        export.add("\"w\":" + r.w + ",");
        export.add("\"h\":" + r.h + ",");
        export.add("\"center\":{\"x\":" + int(r.center().x) + ", \"y\":" + int(r.center().y) + "}");
        export.add(i<rooms.size()-1 ? "}," : "}");
    }
    export.add("],");

    export.add("\"buildings\":[");
    boolean first = true;
    for (int i=0; i<rooms.size (); i++) {
        Room building = rooms.get(i);
        if (building.type == 3) {
            if (!first) export.add(",");
            export.add("[");
            boolean firstRoom = true;
            for (int j=0; j<rooms.size (); j++) {
                Room r = rooms.get(j);
                if (r.type == 1) {
                    PVector v = r.center();
                    if ( v.x > building.x && v.x < building.x+building.w && v.y > building.y && v.y < building.y+building.h ) {
                        if (!firstRoom) export.add(",");
                        export.add(""+r.id);
                        firstRoom = false;
                    }
                }
            }
            export.add("]");
            first = false;
        }
    }
    export.add("],");

    export.add("\"streets\":[");
    first = true;
    for (int i=0; i<rooms.size (); i++) {
        Room street = rooms.get(i);
        if (street.type == 2) {
            if (!first) export.add(",");
            export.add("[");
            boolean firstRoom = true;
            for (int j=0; j<rooms.size (); j++) {
                Room r = rooms.get(j);
                if (r.type == 0) {
                    PVector v = r.center();
                    if ( v.x > street.x && v.x < street.x+street.w && v.y > street.y && v.y < street.y+street.h ) {
                        if (!firstRoom) export.add(",");
                        export.add(""+r.id);
                        firstRoom = false;
                    }
                }
            }
            export.add("]");
            first = false;
        }
    }
    export.add("],");

    export.add("\"links\":[");
    for (int i=0; i<links.size (); i++) {
        Link l = links.get(i);
        export.add("{");
        export.add("\"idRoomA\":"+l.idRoomA+",");
        export.add("\"idRoomB\":"+l.idRoomB+",");
        if (l.hasDoor == 1 ) {
            export.add("\"hasDoor\":"+l.hasDoor+",");
            export.add("\"x\":"+int(l.doorPos.x)+",");
            export.add("\"y\":"+int(l.doorPos.y)+",");
            export.add("\"dir\":"+l.dir);
        } else export.add("\"hasDoor\":"+l.hasDoor);
        export.add(i<links.size()-1 ? "}," : "}");
    }
    export.add("],");

    export.add("\"elements\":[");
    for (int i=0; i<elements.size (); i++) {
        Element e = elements.get(i);
        export.add("{");
        export.add("\"t\":"+e.type+",");
        export.add("\"x\":"+int(e.pos.x)+",");
        export.add("\"y\":"+int(e.pos.y)+",");
        export.add("\"dir\":"+e.dir+",");
        export.add("\"roomId\":"+e.roomId);
        export.add(i<elements.size()-1 ? "}," : "}");
    }
    export.add("]");

    export.add("}");

    String[] json = new String[export.size()];  
    for ( int i=0; i<export.size (); i++) {
        json[i] = export.get(i);
    }
    saveStrings("data/mission.json", json);
}

void loadMap() {
    JSONObject json = loadJSONObject("mission.json");

    JSONArray tiles = json.getJSONArray("tiles");
    String[][] tileIds = new String[tiles.size()][tiles.getJSONArray(0).size()];
    int[][] dirs = new int[tiles.size()][tiles.getJSONArray(0).size()];
    for (int y=0; y<tiles.size (); y++) {
        JSONArray row = tiles.getJSONArray(y);
        for (int x=0; x<row.size (); x++) {
            JSONObject tile = row.getJSONObject(x);
            tileIds[y][x] = tile.getString("id");
            dirs[y][x] = tile.getInt("dir");
        }
    }

    map = new Map(tileIds, dirs);
    size(TILE_SIZE * map.nx, TILE_SIZE * map.ny, P2D);

    JSONArray JSONrooms = json.getJSONArray("rooms");
    for (int i=0; i<JSONrooms.size (); i++) {
        JSONObject JSONroom = JSONrooms.getJSONObject(i);
        int id = JSONroom.getInt("id");
        int x = JSONroom.getInt("x");
        int y = JSONroom.getInt("y");
        int w = JSONroom.getInt("w");
        int h = JSONroom.getInt("h");
        int type = JSONroom.getInt("t");
        rooms.add(new Room(id, x, y, w, h, type));
    }
    counter = rooms.get(rooms.size() - 1).id + 1;

    JSONArray JSONlinks = json.getJSONArray("links");
    for (int i=0; i<JSONlinks.size (); i++) {
        JSONObject JSONlink = JSONlinks.getJSONObject(i);
        int idRoomA = JSONlink.getInt("idRoomA");
        int idRoomB = JSONlink.getInt("idRoomB");
        int hasDoor = JSONlink.getInt("hasDoor");
        if (hasDoor == 0) links.add(new Link(idRoomA, idRoomB, hasDoor));
        else {
            int x = JSONlink.getInt("x");
            int y = JSONlink.getInt("y");
            int dir = JSONlink.getInt("dir");
            links.add(new Link(idRoomA, idRoomB, hasDoor, x, y, dir));
        }
        /*
                if (l.hasDoor == 1 ) {
         export.add("\"hasDoor\":"+l.hasDoor+",");
         export.add("\"doorPos\":{\"x\":"+l.doorPos.x+",\"y\":"+l.doorPos.x+"},");
         export.add("\"dir\":"+l.dir+",");
         } else export.add("\"hasDoor\":"+l.hasDoor);
         */
    }

    JSONArray JSONelements = json.getJSONArray("elements");
    for (int i=0; i<JSONelements.size (); i++) {
        JSONObject JSONEl = JSONelements.getJSONObject(i);
        int type = JSONEl.getInt("t");
        int x = JSONEl.getInt("x");
        int y = JSONEl.getInt("y");
        int dir = JSONEl.getInt("dir");
        int roomId = JSONEl.getInt("roomId");
        elements.add(new Element(type, x, y, dir, roomId));
    }
}

