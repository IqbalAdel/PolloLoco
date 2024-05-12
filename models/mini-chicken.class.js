class MiniChicken extends Chicken{
height = 50
width = 50
energy = 1
acceleration = 4
type = "minichicken"

offset = {
    top: -20,
    right: -30,
    bottom: -20,
    left: -10,
};

    constructor(){
        super().loadImage('img/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 200 + Math.random()*500;
        this.y = 374;
        this.speed = 3+1*Math.random();
        this.loadImages(MINICHICKEN_WALKING);
        
    }

    /**
     * Animates the small chicken in the game.
     */

    animate(){
        this.chickenMove();
        this.patrol();        
        this.jump();
        this.play(MINICHICKEN_WALKING, 200);
        
    };


    /**
     * Enables jumping of the chicken within the game.
     */

    jump(){
        this.jumpIntervall = setInterval(() => {
            if(!this.isAboveGround()) {
                this.jumpUpwards();
            }
        }, 2000 + 8000*Math.random());
        
    }

    /**
     * Makes the mini-chicken jump upwards by changing the speedY variable, that is necessary for the applyGravity function inherited from the Chicken class.
     */

    jumpUpwards(){
        this.speedY = 40;
    }
}