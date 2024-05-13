let canvas; 
let world;
let ctx; 
let keyboard;
let intervallArray= [];
let audioMute = false;
let fullScreen = false;
let gameOver = false;
let newGame = false;
let startscreen = document.getElementById('introscreen');
let preloader = document.getElementById('preloader');
let endscreen = document.getElementById("endscreen")
let gamescreen = document.getElementById('gamescreen');
let manual = document.getElementById('manual');
let overlay = document.getElementById('overlay');
     


/**
 * Starts the process that activates the game.
 */
function startGame(){
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    loadGame();
    initLevel();
    world = new World(canvas, keyboard);

};

/**
 * Restarts the game once the user has finished the game before.
 */
function restartGame(){
  canvas = document.getElementById('canvas');
  setStartScreen();
  initLevel();
  loadGame();
  world = new World(canvas, keyboard);

}


/**
 * Resets the gamescreen, removing / hiding all unneccesary elements and resetting game variables.
 */
function setStartScreen(){
  endscreen.classList.add('d-none')
  endscreen.classList.remove("d-flex")
  endscreen.classList.remove("badEndBg")
  endscreen.classList.remove("goodEndBg")
  newGame = false;
  gameOver = false;

}


/**
 * Starts and ends the loading screen, bridging the time until objects have been loaded within the game world. 
 */
function loadGame(){
    startLoadingScreen();
    stopLoadingScreen();
}


/**
 * Shows the loadingscreen
 */
function startLoadingScreen(){
    startscreen.classList.add("d-none");
    preloader.classList.remove("d-none");
}

/**
 * Hides the loadingscreen and shows the gamescreen
 */
function stopLoadingScreen(){
    setTimeout(() => {
        preloader.classList.remove("d-none");
        preloader.classList.add("d-none");
        gamescreen.classList.remove("d-none");
    }, 1000);
}



/**
 * Enables the fullscreen mode for the game.
 */
function fullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    if(!document.fullscreenElement){
        enterFullscreen(fullscreen);
        removeCorners();
    } 
    else{
        exitFullscreen();
        addCorners();
    }
    fullScreen = !fullScreen; 
    
}


/**
 * Removes the border-radius for the screens. 
 */
function removeCorners(){
  startscreen.classList.remove("border-radius20")
  endscreen.classList.remove("border-radius20")
  preloader.classList.remove("border-radius20")
  canvas.classList.remove("border-radius20")
}


/**
 * Adds border-radius for the screens.
 */
function addCorners(){
  startscreen.classList.add("border-radius20")
  endscreen.classList.add("border-radius20")
  preloader.classList.add("border-radius20")
  canvas.classList.add("border-radius20")
}


/**
 * Exits the fullscreen mode.
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }


/**
 * Enters the fullscreen mode.
 * 
 * @param {object} element This is the element in the DOM that changes to fullscreen. 
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  
      element.webkitRequestFullscreen();
    }
  }


/**
 * Shows the manual page.
 */
function showManual(){
  overlay.classList.add('displayNone')
  startscreen.classList.add('displayNone')
  gamescreen.classList.add('displayNone')
  manual.classList.remove('displayNone')
}

/**
 * Hides the manual page.
 */
function hideManual(){
  startscreen.classList.remove('displayNone')
  overlay.classList.remove('displayNone')
  gamescreen.classList.remove('displayNone')
  manual.classList.add('displayNone')
}

/**
 * Enables toggeling of the audio sound.
 */
function toggleAudioSound(){
    let muteButton = document.getElementById('mute-button') 
    if(!audioMute){
        muteButton.src = './img/volume-off-solid.svg' 
    } else {
        muteButton.src = './img/volume-high-solid.svg' 
    }; 
    audioMute = !audioMute;
  }




