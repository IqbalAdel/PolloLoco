class Level{
    enemies;
    endboss;
    clouds;
    character;
    world;
    level_end_x=700;
    healthBar;
    bottlebar;
    coinBar;
    items;
    backgroundObject =[
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png', -719),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719),
            
    ];

    constructor(enemies,endboss, clouds,bars, items, layers){  
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.healthBar = bars[0] ; 
        this.bottleBar = bars[1];
        this.coinBar = bars[2]; 
        this.items = items;
        this.setCoins(layers); 
        this.setBackground(layers);
        this.level_end_x = layers*719
    }

    /**
     * Adds the background object that sets the background image in the game.
     * 
     * @param {number} layers This is the number of backgroundimage-sets that should be added into the game for a longer horizontal movement. 
     */
    setBackground(layers){
        for (let i = 0; i <= layers; i+=2) { 
            this.backgroundObject.push(
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png', 719*i),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719*i),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719*i),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719*i),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png', 719*(i+1)),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719*(i+1)),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719*(i+1)),
            new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719*(i+1)),)
        }
    }

    /**
     * Adds the coin objects into the game.
     * 
     * @param {number} layers This is the number of coin-sets that should float and spawn in the game. 
     */
    setCoins(layers){
        for (let i = 0; i < layers; i++) {
            this.items.push(
                new CollectableObject(150 + (400*i), 200, "coin"),
                new CollectableObject(200 + (400*i), 150, "coin"),
                new CollectableObject(250 + (400*i), 200, "coin")
            );
        }
    }
}