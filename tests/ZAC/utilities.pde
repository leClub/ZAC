PImage counter, arrow;
String[] cardsList;
void loadCommons() {
    counter = loadImage("data/survivors/counter_bg.png");
    counter.resize(864, 66);
    arrow = loadImage("data/survivors/arrow.png");

    cardsList = loadStrings("data/cards/cards.txt");
}

Player pickRandomPlayer() {
    return new Player( survivorsNames[ floor(random(survivorsNames.length)) ] );
}

PImage pickRandomCard() {
    PImage img = loadImage("data/cards/" + cardsList[ floor(random(cardsList.length)) ] );
    // img.resize(177, 277);
    return img;
}


