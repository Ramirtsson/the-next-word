import Phaser from "./lib/phaser.js";
import { GameScene } from "./scenes/game.js";

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
})
game.scene.add('Game', GameScene);
game.scene.start('Game');