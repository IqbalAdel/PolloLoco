class World{
    character = new Character();
    enemies = level1.enemies;
    endboss = level1.endboss
    clouds = level1.clouds; 
    backgroundObject = level1.backgroundObject;
    sounds = new Sounds();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = level1.healthBar;
    bottleBar = level1.bottleBar;
    coinBar = level1.coinBar;
    items = level1.items;
    bottles = [];
    bossHealth = new HealthBarBoss();
    bossDeath;
    bottleCounter = 0;
    gameEnd = false;
    gameWon;
    requestAnimationId;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setworld();
        this.runChecks();
    }

    /**
     * Checks for certain events during the game and executes follow-up functions.
     */
    runChecks(){
        setInterval(() => {
            this.checkJumpAttack();
            this.checkCollectable();
        }, 1000/60);
        setInterval(() => {
            this.checkBottleThrow();
        }, 150);
        setInterval(() =>{
            this.checkCollisions();
            this.checkEncounter();
            this.checkBottleAttack();
            this.checkEndGame();
            this.checkBackgroundMusic();
        }, 200);
    };
    
    /**
     * Creates connection between different classes.
     */
    setworld(){
        this.character.world = this;
        this.endboss.world = this;
    }
    
    /**
     * Checks if audio is muted and plays the game music.
     */
    checkBackgroundMusic(){
        if(!audioMute) this.sounds.gameMusic.play();
        else this.sounds.gameMusic.pause();
    }

    /**
     * Checks if game character is within a certain range of the endboss and starts final fight sequence.
     */  
    checkEncounter(){
        if(this.character.x >= 1620) this.endboss.startFinalBattle = true;
        if(this.character.x >= 1550) this.endboss.approachingBoss = true;
    }

    /**
     * Checks for collision with enemy characters.
     */
    checkCollisions(){
        this.enemies.forEach((enemy) => {
            if(this.characterHasBeenHit(enemy)) this.characterIsHurt();
        });
        if(this.character.isColliding(this.endboss)) this.character.energy = 0;
    };
    
    /**
     * Checks if game character is hurt.
     */
    characterIsHurt(){
        this.character.hit();
        this.sounds.playSound(this.sounds.hurt_sound);
        this.healthBar.loadStatus(this.character.energy, MC_HEALTHBAR)
    }

    /**
     * Returns a true or false statement for enemy collision.
     * @param {Object} enemy Enemy object from the enemies array
     * @returns boolean statement to check collision with enemies on the ground
     */
    characterHasBeenHit(enemy){
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead()
    }

    /**
     * Checks for attacks against enemy characters and death sequence for those,
     */
    checkJumpAttack(){
        this.enemies.forEach((enemy) => {
            if (this.chickenIsAttacked(enemy)) this.enemyDies(enemy);
        });
    };

    /**
     * Returns a true or false statement for attack against enemies.
     * @param {Object} enemy Enemy object from the enemies array
     * @returns  boolean statement to check collision with enemies from above during attack
     */
    chickenIsAttacked(enemy){
        return this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead()
    }
    
    /**
     * Executes enemy death sequence
     * @param {Object} enemy Enemy object from the enemies array
     */
    enemyDies(enemy){
        enemy.energy--;
        this.character.jump();
        if(enemy.energy == 0) this.chickenDeathSequence(enemy);
    }

    /**
     * Enemy death sequence
     * @param {Object} enemy Enemy object from the enemies array
     */
    chickenDeathSequence(enemy){
        enemy.stopAnimation();
        enemy.stoppAnimation(enemy.jumpIntervall);
        this.sounds.playSound(this.sounds.chickenDeath);
        this.loadDeadEnemyImage(enemy);
        this.removeEnemy(enemy);
    }
    
    /**
     * Removes enemy object from the enemies array.
     * @param {Object} enemy Enemy object from the enemies array
     */
    removeEnemy(enemy){
        setTimeout(()=>{
            let enemyIndex = this.enemies.indexOf(enemy)
            this.enemies.splice(enemyIndex, 1)
        }, 2000)
    }

    /**
     * Loads image of dead chicken.
     * @param {Object} enemy Enemy object from the enemies array
     */
    loadDeadEnemyImage(enemy){
        if(enemy.type == "chicken"){
            enemy.loadImage("img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        }
        else{
            enemy.loadImage("img/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png");
        }
    }

    /**
     * Checks for collision with collectable objects.
     */
    checkCollectable(){
            this.items.forEach((item) => {
            if(this.character.isColliding(item)) this.collectItem(item);
        })
    };
    
    /**
     * Collects item (bottle or coins) and removes it from the game.
     * @param {Object} item This is collectable object in the game.
     */
    collectItem(item){
        if(item.type == "bottle") this.bottleCollected();
        else this.coinCollected();
        this.removeItem(item);
    }

    /**
     * Collects item of type bottle, and changes bottle bar.
     */
    bottleCollected(){
        this.sounds.playSound(this.sounds.pickBottle);
        this.bottleCounter++;
        this.bottleBar.percentage+=25;
        this.bottleBar.loadStatus(this.bottleBar.percentage, MC_BOTTLEBAR)
    }
    
    /**
     * Collects item of type coin, and changes coin bar.
     */
    coinCollected(){
        this.sounds.playSound(this.sounds.coinPickUp);
        this.coinBar.percentage+=7;
        this.coinBar.loadStatus(this.coinBar.percentage, MC_COINBAR)
    }
    
    /**
     * Removes the object from the items array.
     * @param {Object} item This is collectable object in the game.
     */
    removeItem(item){
        let itemIndex = this.items.indexOf(item)
        this.items.splice(itemIndex, 1)
    }

    /**
     * Checks and controls the bottle throw action sequence.
     */
    checkBottleThrow(){
        if(this.bottlesAvailable()){
            this.bottleIsThrown();
            this.bottleCounter--;
            this.bottleBar.percentage-=25;
            this.bottleBar.loadStatus(this.bottleBar.percentage, MC_BOTTLEBAR)  
        }
    };
    
    /**
     * Returns a statement to check if bottle throw is possible or not.
     * @returns Boolean Statement if key has been pressed and bottles have been picked up.
     */
    bottlesAvailable(){
        return this.keyboard.D && this.bottleCounter>0
    }
    
    /**
     * Animates the bottle throw action.
     */
    bottleIsThrown(){
        this.sounds.playSound(this.sounds.throwing_sound);
        let bottle = new ThrowableObject(this.character.x+50, this.character.y+100, this.character.otherDirection)
        this.bottles.push(bottle)
    }

    /**
     * Checks if endboss has been hit by a bottle.
     */
    checkBottleAttack(){
        this.bottles.forEach((bottle) => {
            if(this.bossHasBeenHit(bottle)) this.bossIsHurt(bottle);
        })
    }

    /**
     * Returns a statement to see if endboss has been hit with bottle.
     * @param {Object} bottle This is a bottle object.
     * @returns Boolean statement to check collision of bottle with endboss.
     */
    bossHasBeenHit(bottle){
        return bottle.isColliding(this.endboss)
    }
        
    /**
     * Controls the sequence of events if endboss was successfully hit with bottle.
     * @param {Object} bottle This is a bottle object.
     */
    bossIsHurt(bottle){
        bottle.splash();
        this.endboss.hit();
        this.sounds.playSound(this.sounds.endboss_hurt)
    }

    /**
     * Checks if game has ended and starts either the good ending or bad ending sequence.
     */
    checkEndGame(){
        if(this.gameEnd) this.goodGameOver();
        else if(this.character.isDead()) this.badGameOver();
    }

    /**
     * Starts the good ending sequence.
     */
    goodGameOver(){
        this.clearAllIntervals();
        this.playEndingSound(this.sounds.victory_sound);
        this.showEnd("goodEndBg");
    }

    /**
     * Starts the bad ending sequence.
     */
    badGameOver(){
        this.clearAllIntervals(); 
        this.playEndingSound(this.sounds.gameOver_sound);           
        this.showEnd("badEndBg");
    }

    /**
     * Play the ending sound.
     * @param {Audio} ending 
     */
    playEndingSound(ending){    
            this.sounds.gameMusic.volume = 0;
            this.sounds.chickenDeath.volume =0;
            this.sounds.playSound(ending);
    }

    /**
     * Shows the endscreen with a good or bad ending.
     * @param {string} ending 
     */
    showEnd(ending){
        let endScreen = document.getElementById('endscreen')
        endScreen.classList.remove('d-none')
        endScreen.classList.add("d-flex")
        endScreen.classList.add(ending)
    }

    /**
     * Clears all remaining intervalls.
     */
    clearAllIntervals() {
        for (let i = 1; i < 999; i++) window.clearInterval(i);
    }
    
    /**
     * Redraws an object on a canvas.
     */
    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x,0)        
        this.drawGameObjects();
        let self = this 
        this.requestAnimationId= requestAnimationFrame(() => self.draw());
    };

    /**
     * Draws all game objects on the canvas. 
     */
    drawGameObjects(){
        this.addObjectsToMap(this.backgroundObject);
        this.addToMap(this.character)        
        this.addObjectsToMap(this.items);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.clouds);
        this.ctx.translate(-this.camera_x,0)
        if(this.endboss.approachingBoss) this.addToMap(this.bossHealth);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }

    /**
     * Draws an array of game objects
     * @param {Object} objects Array of object for the game
     */
    addObjectsToMap(objects){
        objects.forEach(o => this.addToMap(o));
    };

    /**
     * Draws an object for the game.
     * @param {Object} ob Game object to be added on the canvas
     */
    addToMap(ob){
        if(ob.otherDirection) this.flipImage(ob);
        ob.draw(this.ctx);        
        if(ob.otherDirection) this.flipImageBack(ob);
    };

    /**
     * Flips or inverts a game image 
     * @param {Object} ob 
     */
    flipImage(ob){
        this.ctx.save();
        this.ctx.translate(ob.width, 0);
        this.ctx.scale(-1,1);
        ob.x = ob.x * (-1);};

    /**
     * Flips or inverts a game image back to its previous state.
     * @param {Object} ob 
     */
    flipImageBack(ob){
        ob.x = ob.x * -1;
        this.ctx.restore();}
}