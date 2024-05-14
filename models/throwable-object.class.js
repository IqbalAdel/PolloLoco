class ThrowableObject extends MovableObject{
    height = 80
    width = 80
    x;
    y;
    bottlesCollected = 0; 
    world;
    movement;
    world;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    
    constructor(x, y, boolDirection){
        super(); 
        this.loadImage("img/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(BOTTLE_THROWING)
        this.loadImages(BOTTLE_SPLASH)
        this.throw(x, y, boolDirection);
        this.applyGravity();
        this.otherDirection = boolDirection;
    };

    /**
     * Enables the throwing motion of the bottles in the game.
     * 
     * @param {number} x This is the x coordinate from which the bottle is thrown
     * @param {number} y This is the y coordinate from which the bottle is thrown
     * @param {boolean} throwDirection This is the variable that shows which side the character is facing and where the bottle should be thrown
     */
    throw(x, y, throwDirection){
        this.bottleVerticalMove(x, y, throwDirection)
        this.bottleHorizontalMove(20, 50);
        this.playIntervall = setInterval(() => this.playAnimation(BOTTLE_THROWING), 200);
    }

    /**
     * Controls the vertical movement of the thrown bottle. 
     * 
     * @param {number} x This is the x coordinate from which the bottle is thrown
     * @param {number} y This is the y coordinate from which the bottle is thrown
     * @param {boolean} throwDirection This is the variable that shows which side the character is facing and where the bottle should be thrown 
     */
    bottleVerticalMove(x, y, throwDirection){
        if(throwDirection == true) this.x = x-50; 
        else this.x = x;
        this.y = y
        this.speedY = 20;
        this.acceleration = 2
        this.applyGravity
    }
    
    /**
     * Controls the horizontal movement of the thrown bottle. 
     * 
     * @param {number} speed This is the speed with which the bottle moves along the x-axis.
     * @param {boolean} checkInterval This is the interval speed for the interval function. 
     */
    bottleHorizontalMove(speed, checkInterval){
        this.movement = setInterval(() => {
            if(this.otherDirection == true) this.x-=speed;
            else this.x+=speed;
        }, checkInterval);
    }
    
    /**
     * Activates the bottle splash animation for the botte when hitting the endboss enemy.
     */
    splash(){
        this.stopAnimation();
        this.playAnimation(BOTTLE_SPLASH);
        this.width = 150;
        this.height = 150;
    }

    /**
     * Returns a statement to check if bottle throw is possible or not.
     * @returns Boolean Statement if key has been pressed and bottles have been picked up.
     */
    bottlesAvailable(){
        return this.world.keyboard.D && this.bottlesCollected>0
    }


}