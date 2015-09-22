String[] survivorsNames = {
    "amy", 
    "doug", 
    "josh", 
    "ned", 
    "phil", 
    "wanda"
};

Player player;

void setup() {
    loadCommons();
    player = pickRandomPlayer();
    size(player.board.bg.width, player.board.bg.height, P2D);
}

void draw() {
    player.board.display(0, 0);
}

void keyPressed() {
    if ( key == 'p' ) player = pickRandomPlayer();
    else if ( key == 's') player.shoot();
}

int prevX = 0, prevY = 0;
void mousePressed() {
    if (mouseButton == RIGHT) {
        println(mouseX, mouseY, abs(prevX-mouseX), abs(prevY-mouseY));
        prevX = mouseX;
        prevY = mouseY;
    }
}

