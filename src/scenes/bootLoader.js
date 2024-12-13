

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

        levels = getLevels();


    }

    create ()
    {
        //this.registry.set('highscore', 0);venia en el demo del preloader

        this.scene.start('preloadScene');
    }
}
async function getLevels(){
    try {
        const response = await fetch('data/config.json');
          
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        var globalConfig = await response.json();
        // console.log(this.globalConfig);
        levels = globalConfig.configurationGame[0]['categoryGames'];
        // this._data = this._data.filter(value => value.category === this.category);
  
      } catch (error) {
        console.error('Hubo un problema con la carga del archivo JSON:', error);
      }
}
