let level1; 

/**
 * Initiates the objects that are loaded for the game.
 */
function initLevel(){
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new MiniChicken(),
            new MiniChicken(),
            new MiniChicken()
        ],
            new Endboss(),
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],
        [
            new HealthBar(),
            new BottleBar(),
            new CoinBar(),
        ],
        [
            new CollectableObject(300, 320, "bottle"),
            new CollectableObject(700, 320, "bottle"),
            new CollectableObject(1100, 320, "bottle"),
            new CollectableObject(1500, 320, "bottle"),
        ],
        5,
    );

    
}


        