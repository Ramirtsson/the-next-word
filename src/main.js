import Phaser from "./lib/phaser.js";
import { animotions } from "./animations/animations.js";
import {elements} from "./scenes/elements.js";
import { bootLoader } from "./scenes/bootLoader.js";
import { preloadScene } from "./scenes/preload.js";
import { startScene } from "./scenes/startScene.js";
import { selectModeScene } from "./scenes/modes.js";
import { selectGameScene } from "./scenes/game_selection.js";
import { inGameScene } from "./scenes/in_game.js";


const game = new Phaser.Game({
    type:Phaser.CANVAS,
    roundPixels:true,
    pixelArt:true,
    scale: {
        parent: 'game-container',
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: true,
      },
    },
    scene: [bootLoader,preloadScene,startScene,selectModeScene,elements,animotions,selectGameScene,inGameScene],
})

game.scene.start('bootLoader');

