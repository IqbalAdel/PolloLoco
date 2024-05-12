class HealthBarBoss extends StatusBar{

    constructor(){
        super();
        this.y = 60;
        this.x = 540;
        this.width = 300;
        this.height = 50
        this.percentage = 100;
        this.loadImages(ENDBOSS_HEALTHBAR);
        this.loadStatus(this.percentage, ENDBOSS_HEALTHBAR);
    }
}