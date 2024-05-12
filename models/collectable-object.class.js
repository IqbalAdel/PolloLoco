class CollectableObject extends DrawableObject{
    x = 530;
    y = 250;
    height = 150;
    width = 150;    
    itemsCollected = 0;

    offset = {
        top: 60,
        right: 80,
        bottom: 110,
        left: 50,
    };
    type;
    bottleCounter = 0;
    
    constructor(x, y, type){
        super(); 
        this.type = type;
        this.x = x;
        this.y = y;
        this.spawnObjects(type);
    };

    /**
     * Starts animation for images
     * @param {images} images images of game objects
     */
    
    play(images){
        this.playIntervall =
        setInterval(() => {
            this.playAnimation(images);
        }, 500);
        
    }

    /**
     * Generates item in the game
     * @param {string} type type of item, bottle or coin.
     */
    spawnObjects(type){
        if(type == "coin") this.generateCoin();
        else this.generateBottle();
    }

    /**
     * Loads and animates coin images.
     */
    generateCoin(){
        this.loadImage("img/img_pollo_locco/img/8_coin/coin_2.png");
        this.loadImages(ITEM_COIN);
        this.play(ITEM_COIN);
    }

    /**
     * Loads and animates bottle images.
     */
    generateBottle(){
        this.offset = {top: 0, right: 30, bottom: 0, left: 20,};
        this.width = 100;
        this.height = 100;
        this.loadImage("img/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(ITEM_BOTTLE);
        this.play(ITEM_BOTTLE);
    }
}