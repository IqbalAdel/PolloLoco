class CoinBar extends StatusBar{
    
    constructor(){
        super();
        this.y = 80;        
        this.percentage = 0;
        this.loadImages(MC_COINBAR);
        this.loadStatus(this.percentage, MC_COINBAR);
    };
}