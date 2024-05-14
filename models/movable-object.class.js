class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0.15;
    acceleration = 4;
    lastHit = 0;
    gravity;
    
    /**
     * Applays gravity if character is above ground. 
     */
    applyGravity(){
        this.gravity = setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
            else if(this instanceof Character){
                this.y = 185
            }
        }, 1000/25);
    }

    /**
     * Checks if object is above ground level.
     * @returns Boolean value.
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true
        }
        if(this instanceof MiniChicken){
            return this.y < 340;
        }
        return this.y<183;
    };

    /**
     * Makes object move right
     */

    MoveRight(){
        this.x+=this.speed;
        this.otherDirection = true;
    };

    /**
     * Makes object move left.
     */
    MoveLeft(){
        this.x-=this.speed;
        this.otherDirection = false; 
    };
    
    /**
     * Makes character jump upwards.
     */
    jump(){
        this.speedY = 30;
    }

    /**
     * Checks if one game object is colliding with another game object.
     * @param {Object} ob 
     * @returns Boolean value
     */
    isColliding(ob){
        return  this.x + this.width - this.offset.right > ob.x + ob.offset.left &&
                this.y + this.height - this.offset.bottom > ob.y + ob.offset.top &&
                this.x + this.offset.left < ob.x + ob.width - ob.offset.right &&
                this.y + this.offset.top < ob.y + ob.height - ob.offset.bottom; 
    };


    /**
     * Decreases energy of a game character.
     */
    hit(){
        this.energy -= 5;
        if(this.energy < 0) this.energy = 0;
        this.lastHit = new Date().getTime();
    };

    /**
     * Checks if energy levels have reached zero.
     * @returns Boolean value
     */
    isDead(){
        return this.energy <= 0;
    };

    /**
     * Checks how much time has passed since last hit. If the duration is too small, attack still lasts and "hurting" continues
     * @returns Boolean value
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed<1;
    };
}