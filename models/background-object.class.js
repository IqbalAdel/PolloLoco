class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        if(y){
            this.y = y
        }
        this.x = x 
        this.y = 480 - this.height

    }
}