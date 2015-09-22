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
            export.add("\"orientation\":"+map.tiles[y][x].orientation);
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
        export.add("\"x\":" + r.x + ",");
        export.add("\"y\":" + r.y + ",");
        export.add("\"w\":" + r.w + ",");
        export.add("\"h\":" + r.h + ",");
        export.add("\"type\":" + r.type);
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
        export.add("\"hasDoor\":"+l.hasDoor);
        export.add(i<links.size()-1 ? "}," : "}");
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
    int[][] orientations = new int[tiles.size()][tiles.getJSONArray(0).size()];
    for (int y=0; y<tiles.size (); y++) {
        JSONArray row = tiles.getJSONArray(y);
        for (int x=0; x<row.size (); x++) {
            JSONObject tile = row.getJSONObject(x);
            tileIds[y][x] = tile.getString("id");
            orientations[y][x] = tile.getInt("orientation");
        }
    }
    
    map = new Map(tileIds, orientations);
    size(TILE_SIZE * map.nx, TILE_SIZE * map.ny, P2D);


    JSONArray JSONrooms = json.getJSONArray("rooms");
    for (int i=0; i<JSONrooms.size (); i++) {
        JSONObject JSONroom = JSONrooms.getJSONObject(i);
        int id = JSONroom.getInt("id");
        int x = JSONroom.getInt("x");
        int y = JSONroom.getInt("y");
        int w = JSONroom.getInt("w");
        int h = JSONroom.getInt("h");
        int type = JSONroom.getInt("type");
        rooms.add(new Room(id, x, y, w, h, type));
    }

    JSONArray JSONlinks = json.getJSONArray("links");
    for (int i=0; i<JSONlinks.size (); i++) {
        JSONObject JSONlink = JSONlinks.getJSONObject(i);
        int idRoomA = JSONlink.getInt("idRoomA");
        int idRoomB = JSONlink.getInt("idRoomB");
        int hasDoor = JSONlink.getInt("hasDoor");
        links.add(new Link(idRoomA, idRoomB, hasDoor));
    }
}

