//THE SPACESHIP GAME PLAYLIST
class Sounds {
    main = new Audio ("./sounds/main.mp3");
    play(sounds) {
        this[sounds].play();
    }
    pause(sounds){
        this[sounds].pause();
    }
    gameOver = new Audio("./sounds/gameOver.wav");
}

