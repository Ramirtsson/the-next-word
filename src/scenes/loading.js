

export class loadingScene extends Phaser.Scene{
    constructor(){
        super({key:'loading'});
    }

    preload(){
        //aca meter todos los elementos graficos a cargar, al menos para las pantallas generales, para los juegos requerir pantalla de carga con sus assets

        //fondos
        this.load.image('bg_main', 'assets/game/bg_main.png');
        this.load.image('bg_modes', 'assets/game/bg_modes.png');
        this.load.image('bg_game_sel', 'assets/game/bg_game_sel.png');
        this.load.image('bg_game', 'assets/game/bg_game.png');


        //unicos del main title
        this.load.image('btn_start', 'assets/game/btn_start.png');
        this.load.image('mage', 'assets/game/mage.png');
        this.load.image('game_title', 'assets/game/game_title.png');


        //unicos de modes.js
        this.load.image('modes_title', 'assets/game/title_modes.png');
        this.load.image('mode_icon_1', 'assets/game/mode_icon_1.png');
        this.load.image('mode_icon_2', 'assets/game/mode_icon_2.png');
        this.load.image('mode_icon_3', 'assets/game/mode_icon_3.png');


        //unicos de game_selections.js
        this.load.image('levels_title', 'assets/game/title_levels.png');
        this.load.image('icon_animals', 'assets/game/icon_animals.png');
        this.load.image('icon_figures', 'assets/game/icon_figures.png');
        this.load.image('icon_fruits', 'assets/game/icon_fruits.png');
        this.load.image('icon_planets', 'assets/game/icon_planets.png');
        this.load.image('icon_weather', 'assets/game/icon_weather.png');

        

        //graficos genericos usables en cualquier lado
        this.load.image('btn_return', 'assets/game/btn_return.png');
        this.load.image('main_challenges', 'assets/game/main_challenges.png');
        this.load.image('main_profile', 'assets/game/main_profile.png');
        this.load.image('btn_config', 'assets/game/config.png');
        this.load.image('btn_add_coins', 'assets/game/add_coins.png');

    }

    create(){

        const elements = this.scene.get('elements');//trae distintos elementos del juego
        const animotions = this.scene.get('animotions');//ejecuta animaciones genericas
        elements.getBackground(this,"bg_main");
        elements.showBtnChallenges(this);
        elements.showBtnProfile(this);
        elements.showBtnConfig(this);
        elements.showBtnMoney(this);


        //elemetnos unicos del main: maguito, boton start, titulo del juego
        this.add.image(mid_w+50, mid_h, 'mage').setOrigin(.5,1).setScale(.6);

        animotions.anim_heartbeat(this,
                this.add.image(mid_w, mid_h+300, 'btn_start')
                .setOrigin(.5,.5)
                .setScale(.4)
                .setInteractive()
                .on("pointerdown", () => {
                    originScreen="loading";
                    this.scene.start('selectModeScene');
                })
            ,{scale:.5,duration:350});
        animotions.anim_swing(this,this.add.image(mid_w, mid_h+100, 'game_title').setOrigin(.5,1).setScale(.6),{start:mid_w+10,duration:2000});

    }



    
}