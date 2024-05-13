class Endboss extends Monster{
    x = 2000 ;
    y = 70; 
    width = 400;
    height = 400;
    energy = 100;
    startFinalBattle = false;
    approachingBoss;
    startAttack = false;
    startMoving = false;
    world;
    bossRage;
    bossMoveLeft;
    bossWalk;
    death;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 20,
    };
    sounds = new Sounds();

    constructor(){
        super().loadImage('img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadEndBossImages();
        this.speed = 5;
        this.animate();
    }

    /**
     * Animates endboss game motions
     */
    animate(){
        this.bossAlert();
        this.bossAttacks();
        this.bossMovingLeft();
        this.bossWalkAnimation();
        this.bosshurtAnimation();
        this.bossDeadAnimation();
    }
    
    /**
     * Animates boss alert motion.
     */
    bossAlert(){
        let startBattle = setInterval(() => {
            this.playAnimation(ENDBOSS_ALERT)
            if(this.startFinalBattle){
                setTimeout(() => {
                    clearInterval(startBattle)
                }, 500);
                this.startAttack = true;
            }
        }, 500);
    }
    
    /**
     * Animates boss rage motion.
     */
    bossAttacks(){
        this.bossRage = setInterval(() => {
            if(this.startAttack){
                this.playAnimation(ENDBOSS_ATTACK)
                setTimeout(() => {
                    this.startMoving = true
                }, 2500);
            }
        }, 200);
    }

    /**
     * Enables boss left movement along x-axis.
     */
    bossMovingLeft(){
        this.bossMoveLeft = setInterval(() => {
            if(this.startMoving){
                clearInterval(this.bossRage)
                this.MoveLeft()
            }
        }, 1000/60);
    }

    /**
     * Animates boss walking motion.
     */
    bossWalkAnimation(){
        this.bossWalk = setInterval(() => {
            if(this.startMoving){
                this.playAnimation(ENDBOSS_WALKING)
            }
        }, 200);   
    }

    /**
     * Animates boss hurt motions.
     */
    bosshurtAnimation(){
        setInterval(() => {
            if(this.isHurt() && !this.isDead()){
                this.bossHealthFalls();
                this.sounds.playSound(this.sounds.bottleHit);  
                this.bossHurt(); 
            }
        }, 200);
    }
    
    /**
     * Animates boss death motions and begins ending sequence for the game.
     */
    bossDeadAnimation(){
        this.death = setInterval(() => {
            if(this.isDead()){
                this.clearBossIntervalls();
                this.playAnimation(ENDBOSS_DEAD)
                this.finalDeathSequence()
            }
        }, 200);
    }
    
    /**
     * Decreases boss energy.
     */
    hit(){
        this.energy -= 9.2;
        if(this.energy <0){
            this.energy = 0;
            this.world.bossHealth.percentage=0
            this.world.bossHealth.loadStatus(this.world.bossHealth.percentage, ENDBOSS_HEALTHBAR)
        };
        this.lastHit = new Date().getTime();
    };

    /**
     * Decreases boss health bar.
     */
    bossHealthFalls(){
        this.world.bossHealth.percentage-=5;
        this.world.bossHealth.loadStatus(this.world.bossHealth.percentage, ENDBOSS_HEALTHBAR)
    }
    
    /**
     * Controls boss hurt animation in between its walk motions.
     */
    bossHurt(){
        clearInterval(this.bossWalk) 
        clearInterval(this.bossMoveLeft) 
        this.playAnimation(ENDBOSS_HURT)
        this.bossMovingLeft()
        this.bossWalkAnimation()
    }

    /**
     * Shows death image for endboss, ends death animation and signals end of game.
     */
    finalDeathSequence(){
        setTimeout(() => {
            if(this.img.src.includes('img/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png')){
                clearInterval(this.death)
                this.world.gameEnd = true;
            }
        }, 700);
    }

    /**
     * Clear endboss intervals.
     */
    clearBossIntervalls(){
        clearInterval(this.bossRage) 
        clearInterval(this.bossWalk) 
        clearInterval(this.bossMoveLeft)
    }

    /**
     * Loads all endboss animation images.
     */
    loadEndBossImages(){
        this.loadImages(ENDBOSS_WALKING);
        this.loadImages(ENDBOSS_ALERT);
        this.loadImages(ENDBOSS_ATTACK);
        this.loadImages(ENDBOSS_HURT);
        this.loadImages(ENDBOSS_DEAD);
    }


    
    
}
