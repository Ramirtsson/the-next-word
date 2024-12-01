import Phaser from "./lib/phaser.js";
import { animotions } from "./animations/animations.js";
import {elements} from "./scenes/elements.js";
import { loadingScene } from "./scenes/loading.js";
import { selectModeScene } from "./scenes/modes.js";
import { selectGameScene } from "./scenes/game_selection.js";
import { inGameScene } from "./scenes/in_game.js";


const game = new Phaser.Game({
    type:Phaser.CANVAS,
    roundPixels:true,
    pixelArt:true,
    scale: {
        parent: 'game-container',
        width: width,
        height: height,
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
    scene: [loadingScene,selectModeScene,elements,animotions,selectGameScene,inGameScene],
})

console.log(game);
game.scene.start('loading');

