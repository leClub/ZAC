class Card{
    PImage img;
    int pos;
    boolean inHand;
    
    Card(int _pos){
        pos = _pos;
        inHand = (pos >= 3);
        img = pickRandomCard();
    }
}
