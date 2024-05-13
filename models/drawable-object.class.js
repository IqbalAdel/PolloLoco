class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    width = 100;
    height = 100;  
    x = 120;
    y = 460 - this.height;
    energy = 100;
    marchIntervall;
    playIntervall;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    /**
     * Draws a square frame for the object
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawFrame(ctx){
        if( this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth ="5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        };
    };

    /**
     * Draws a square frame for the object including offsets
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawHitBox(ctx){
        if(this instanceof Character){
            ctx.beginPath();
            ctx.lineWidth ="5";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.getHitBoxLeftPos(), 
                this.getHitBoxTopPos(), 
                this.getHitBoxRightPos(), 
                this.getHitBoxBottomPos(),
                );
            ctx.stroke();
        }
    }

    /**
     * Returns Left position of the object frame.
     * @returns position number
     */
    getHitBoxLeftPos() {
        return this.x + this.offset.left;
    }

    /**
     * Returns top position of the object frame.
     * @returns position number
     */
    getHitBoxTopPos() {
        return this.y + this.offset.top;
    }

    /**
     * Returns righ position of the object frame.
     * @returns position number
     */
    getHitBoxRightPos() {
        return this.width - this.offset.right;
    }

    /**
     * Returns bottom position of the object frame.
     * @returns position number
     */
    getHitBoxBottomPos() {
        return this.height - this.offset.bottom;
    }

    /**
     * Returns width of the object frame.
     * @returns position number
     */
    getHitBoxWidth() {
        return this.getHitBoxLeftPos() - this.getHitBoxRightPos();
    }

    /**
     * Returns height of the object frame.
     * @returns position number
     */
    getHitBoxHeight() {
        return this.getHitBoxTopPos() - this.getHitBoxBottomPos();
    }

    /**
     * Draws coordinates of the hit box of an object onto canvas.
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawHitBoxCoordinates(ctx) {
        if(this instanceof Character){
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'black';
            ctx.font = 'normal small-caps 100 20px serif';
            ctx.strokeText(
                ' y: ' + this.getHitBoxTopPos(),
                this.getHitBoxLeftPos(),
                this.getHitBoxTopPos() - 16
            );
        }
    }

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path){
        this.img= new Image();
        this.img.src = path;
    };

    /**
     * Loads multiple images from an array of paths.
     * @param {array} arr - An array containing paths to the image files.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]=img;
        });
    };


    /**
     * Draws the loaded image onto a canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } catch(e){
            console.warn('error loading imageA',e)
            console.warn("could not load this image", this.img.src)
        }
    };

    /**
     * Stops movement and animation of images
     */
    stopAnimation() {
        this.stopMovement();
        this.stopPlayAnimation();
    }
       
    /**
     * stops movement intervall
     */
    stopMovement(){
        clearInterval(this.marchIntervall);    
    }

    /**
     * Stops play interval
     */
    stopPlayAnimation(){
        clearInterval(this.playIntervall);
    }
    
    /**
     * Stops interval
     * @param {intervall} interval 
     */
    stoppAnimation(interval){
        clearInterval(interval);
    }

    /**
     * Plays animation by cycling through a list of images.
     * @param {array} images - An array of paths to the images to be animated.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
};

    /**
     * Plays animation by cycling through a list of images at a specified interval.
     * @param {array} images - An array of paths to the images to be animated.
     * @param {number} interval - The interval between each frame of the animation.
     */
    play(images, intervall){
        this.playIntervall =
        setInterval(() => {
            this.playAnimation(images);
        }, intervall);
    }
}