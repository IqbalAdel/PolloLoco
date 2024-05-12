class Character extends MovableObject{
    height = 250 ;
    y = 180; 
    x = 100

    offset = {
        top: 60,
        right: 30,
        bottom: 40,
        left: 10,
    };

    world;
    speed = 10;
    sounds = new Sounds();

    idleTime;
    idleTimerSet = false;

    constructor(){
        super().loadImage('img/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadCharacterImages();
        this.animatePepe();
        this.applyGravity();

    }

    /**
     * Animates character motions for movement, tiredness or other motions.
     */
    animatePepe(){
        setInterval(()=> this.moveCharacter(), 1000/60);
        setInterval(()=> this.playAnimationCharacter(), 1000/20);
        setInterval(() => this.makeCharacterTired(), 200);
    };

    /**
     * Animates character when he is either in idle or sleep mode.
     */
    makeCharacterTired(){
        if(this.isStandingStill() && !this.isSleepy()){
            this.playAnimation(MC_IDLE)
        }
        else if(this.isStandingStill() && this.isSleepy()){
            this.playAnimation(MC_ASLEEP)
            this.sounds.playSound(this.sounds.snoring);
        } 
    }
    
    /**
     * Controls character movement.
     */
    moveCharacter(){
        this.world.camera_x = -this.x+250;
        this.sounds.walking_sound.pause();
        if(this.canMoveRight()) this.characterMoveRight();
        if(this.canMoveLeft()) this.characterMoveLeft();
        if(this.canJump()) this.jump();
    };
    

    /**
     * Animates character for different cases.
     */
    playAnimationCharacter(){
        if(this.isDead()) this.playAnimation(MC_DEAD);
        if(this.isHurt()) this.playAnimation(MC_HURT);
        if(this.isAboveGround()) this.playAnimation(MC_JUMPING);
        else if(this.isWalking()) this.playAnimation(MC_WALKING);
    }

    /**
     * Checks if character is outside right game border when trying to move right.
     * @returns Boolean value
     */
    canMoveRight(){
        return this.world.keyboard.RIGHT && this.x<this.world.level.level_end_x
    }

    /**
     * Checks if character is outside left game border when trying to move left.
     * @returns Boolean value
     */
    canMoveLeft(){
        return this.world.keyboard.LEFT && this.x>=-100
    }
    
    /**
     * Checks if character is on the ground when trying to jump
     * @returns Boolean value
     */
    canJump(){
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }

    /**
     * Executes right moving actions for character.
     */
    characterMoveRight(){
        this.MoveRight();
        this.idleTimerSet = false
        if(!this.isAboveGround() && !this.isDead()){
            this.sounds.playSound(this.sounds.walking_sound);
        }
    }

    /**
     * Executes left moving actions for character.
     */
    characterMoveLeft(){
        this.MoveLeft();
        this.idleTimerSet = false;
        if(!this.isAboveGround() && !this.isDead()){
            this.sounds.playSound(this.sounds.walking_sound);
        }
    }

    /**
     * Executes jump actions for character.
     */
    jump(){
        super.jump();
        this.idleTimerSet = false
        this.sounds.jumping_sound.volume = 0.05;
        this.sounds.playSound(this.sounds.jumping_sound);
    }


    /**
     * Checks if character is moving left or right.
     * @returns Boolean value
     */
    isWalking(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }


    /**
     * Checks if character is sleepy and has been idle for prolonged time.
     * @returns Boolean value
     */
    isSleepy(){
        this.characterIsIdle();
        let sleepTime = new Date().getTime() - this.idleTime; // time difference in ms
        sleepTime = sleepTime / 1000; // difference in s
        return sleepTime>3;
    };


    /**
     * Sets the time the character has started being in idle mode.
     */
    characterIsIdle(){
        if(!this.idleTimerSet){
            this.idleTimerSet = true
            this.idleTime = new Date().getTime();
        }
    }
    

    /**
     * Returns a boolean value to see if character is standing in place.
     * @returns Boolean Statement 
     */
    isStandingStill(){
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.D;
    }

    /**
     * Moves character right.
     */
    MoveRight(){
        this.x+=this.speed;
        this.otherDirection = false;
    };


    /**
     * Moves character left.
     */
    MoveLeft(){
        this.x-=this.speed;
        this.otherDirection = true; 
    }


    /**
     * Loads all character motion images.
     */
    loadCharacterImages(){
        this.loadImages(MC_WALKING);
        this.loadImages(MC_JUMPING);
        this.loadImages(MC_DEAD);
        this.loadImages(MC_HURT);
        this.loadImages(MC_IDLE);
        this.loadImages(MC_ASLEEP);
    }

}