class Chicken extends Monster{
    height = 90
    width = 90
    energy = 1
    chickenSound = new Audio("audio/chicken.mp3");
    acceleration = 4
    type = "chicken"

    constructor(){
        super().loadImage('img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random()*900;
        this.y = 350
        this.speed = 15+1*Math.random();
        this.loadImages(CHICKEN_WALKING);
        this.animate();
        this.applyGravity();
    }

    /**
     * Animates the chicken within the game 
     */
    animate(){
        this.chickenMove();
        this.patrol();      
        this.play(CHICKEN_WALKING, 200);
    };
    
    /**
     * Controls the movement of the chicken towards the left and right side depending on the directionSwitch variable. 
     */
    chickenMove(){
        this.marchIntervall = setInterval(() => {
            if(this.directionSwitch) {
                this.MoveLeft();
            } else {
                this.MoveRight();
            }
        }, 1000/30);
    }

    /**
     * Changes the variable directionSwitch in a certain time interval.
     */
    patrol(){
        this.directionSwitchIntervall = setInterval(() => {
            this.directionSwitch = !this.directionSwitch;
        }, 2000 + 10000*Math.random()); 
    }
}

