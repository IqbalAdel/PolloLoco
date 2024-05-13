class Sounds{
    walking_sound = new Audio("audio/walking.mp3");
    jumping_sound = new Audio("audio/jump.mp3");
    throwing_sound = new Audio("audio/throw.mp3");
    hurt_sound = new Audio("audio/hurt.mp3");
    bottleHit = new Audio("./audio/bottleHit.mp3")
    pickBottle = new Audio("./audio/pickBottle.mp3")
    chickenDeath = new Audio("./audio/chickenDeath.mp3")
    endboss_hurt = new Audio("./audio/endboss_hurt.mp3")
    coinPickUp = new Audio("./audio/coin.mp3");
    gameOver_sound = new Audio("./audio/gameOver.mp3")
    victory_sound = new Audio("./audio/gameWon.mp3")
    gameMusic = new Audio("audio/gameMusic.mp3");
    snoring = new Audio("audio/snoring.mp3");
    
    constructor(){
        this.setSoundSettings();
    }

    /**
     * Plays and stops the audio from playing when the audio button is toggeled on or off, changing the audioMute variable. 
     * 
     * @param {Audio} sound This is the audio file being played.
     */
    playSound(sound){
        if(!audioMute){
            sound.play();
        }
        else{
            sound.pause();
        }
    }

    /**
     * Controls volume of audio.
     * 
     * @param {Audio} sound This is the audio file being played.
     * @param {number} percent This is the float number for the audio volume.
     */
    volume(sound, percent){
        sound.volume = percent;
    }

    /**
     * Controls playback speed of audio played.
     * 
     * @param {Audio} sound This is the audio file being played.
     * @param {number} num This is the float number for the speed to playback the sound with.
     */
    playbackRate(sound, num){
        sound.playbackRate = num;
    }

    /**
     * Controls sound setting for the game sounds.
     */
    setSoundSettings(){
        this.gameMusic.loop = true;
        this.volume(this.gameMusic, 0.3)
        this.playbackRate(this.gameMusic, 1.2)
        this.volume(this.coinPickUp, 0.2)
    }
}