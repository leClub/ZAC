class Map {
    Tile[][] tiles;
    int nx, ny;

    Map(String[][] tilesId) {
        ny = tilesId.length;
        nx = tilesId[0].length;
        tiles = new Tile[ny][nx];

        for (int y=0; y<ny; y++) {
            for (int x=0; x<nx; x++) {
                tiles[y][x] = new Tile(tilesId[y][x]);
            }
        }
    }
    Map(String[][] tilesId, int[][] dirs) {
        ny = tilesId.length;
        nx = tilesId[0].length;
        tiles = new Tile[ny][nx];

        for (int y=0; y<ny; y++) {
            for (int x=0; x<nx; x++) {
                tiles[y][x] = new Tile(tilesId[y][x], dirs[y][x]);
            }
        }
    }

    void draw() {
        for (int y=0; y<ny; y++) {
            for (int x=0; x<nx; x++) {
                tiles[y][x].draw(x*TILE_SIZE, y*TILE_SIZE);
            }
        }
    }
}

