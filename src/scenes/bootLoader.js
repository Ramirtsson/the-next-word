

export class bootLoader extends Phaser.Scene{

    constructor ()
    {
        super('bootLoader');
    }

    preload ()
    {
        //esto es para cargar el fondo y el logo del preloader
        this.load.image('bg_preload', 'assets/game/bg_preload.png');
        this.load.image('logo', 'assets/game/logo.png');
    }

    create ()
    {
        //this.registry.set('highscore', 0);venia en el demo del preloader

        this.scene.start('preloadScene');
    }
}
