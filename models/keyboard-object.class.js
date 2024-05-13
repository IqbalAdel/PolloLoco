class Keyboard{
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;

    constructor(){
        this.bindKeyPressEvents();
        this.bindBtnPressEvents();
    }

    /**
     * Sets key values as true or false upon/after touch in the mobile version, thus triggering the related movement animations for the player character
     */
    bindBtnPressEvents(){
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true; 
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true; 
        });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true; 
        });
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true; 
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false; 
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false; 
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false; 
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false; 
        });
    }

    /**
     * Sets key values as true or false upon/after key-press in the desktop version, thus triggering the related movement animations for the player character
     */
    bindKeyPressEvents(){  
        window.addEventListener('keydown', event => {
            if(event.keyCode == 37) this.LEFT = true;  
            if(event.keyCode == 39) this.RIGHT = true; 
            if(event.keyCode == 32) this.SPACE = true;
            if(event.keyCode == 68) this.D = true;
        });
        window.addEventListener('keyup', event => {
            if(event.keyCode == 37) this.LEFT = false;
            if(event.keyCode == 39) this.RIGHT = false;
            if(event.keyCode == 32) this.SPACE = false; 
            if(event.keyCode == 68) this.D = false;
        });
    }
};