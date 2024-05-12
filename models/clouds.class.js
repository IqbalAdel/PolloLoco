class Cloud extends MovableObject{
    y = 7;
    width = 400;
    height = 300;
    img = 'img/img_pollo_locco/img/5_background/layers/4_clouds/1.png';
    speed = 0.15*Math.random()
    
    constructor(){
        super().loadImage(this.img);
        this.x = 1 + Math.random()*1500;
        this.driftLeft();
        
    };

    /**
     * Enables movement of cloud images towards the left side of the screen.
     */

    driftLeft(){
        setInterval(() => {
            this.MoveLeft(); 
        }, 1000/60);

    }
}