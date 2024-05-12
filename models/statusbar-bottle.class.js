class BottleBar extends StatusBar{
    

    constructor(){
        super();
        this.y = 15;
        this.percentage = 0;
        this.loadImages(MC_BOTTLEBAR);
        this.loadStatus(this.percentage, MC_BOTTLEBAR);
    };
}