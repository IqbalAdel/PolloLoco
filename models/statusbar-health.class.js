class HealthBar extends StatusBar{

    constructor(){
        super();
        this.y = 45;
        this.percentage = 100;
        this.loadImages(MC_HEALTHBAR);
        this.loadStatus(this.percentage, MC_HEALTHBAR);
    };
}