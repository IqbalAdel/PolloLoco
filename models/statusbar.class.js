class StatusBar extends DrawableObject{
    x = 20;
    height = 40;
    width = 200;

    /**
     * Changes the status of the bar depending on changes in percentages when collecting items or losing health. 
     * 
     * @param {number} percentage This is the percentage with which the bar changes. 
     * @param {array} images These are the images showing the various bar statuses.
     */
    loadStatus(percentage, images){
        this.percentage = percentage;
        this.path = images[this.resolveImageIndex()];
        this.img = this.imageCache[this.path];    
        }


    /**
     * Returns a number depending on the changes of the percentage variable.
     * 
     * @returns number that is used for showing the specific image within the images array.
     */
    resolveImageIndex(){
        if(this.percentage >= 100){
            this.percentage = 100;
            return 5;
        }
        else if(this.percentage > 75) return 4;
        else if(this.percentage >50) return 3;
        else if(this.percentage >25) return 2;
        else if(this.percentage >0) return 1;
        else if(this.percentage<=0)return 0;
    }     
}