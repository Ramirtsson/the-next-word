

export class preloadScene extends Phaser.Scene{
    constructor(){
        super({key:'preloadScene'});
    }

    init ()
    {
        const elements = this.scene.get('elements');
        elements.drawLoadingScreen(this)
    }

    preload(){
        //aca meter todos los elementos graficos a cargar, al menos para las pantallas generales, para los juegos requerir pantalla de carga con sus assets

        
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
            this.load.image('icon_candy', 'assets/game/icon_candy.png');
            this.load.image('icon_holidays', 'assets/game/icon_holidays.png');
            this.load.image('icon_human', 'assets/game/icon_human.png');
            this.load.image('icon_reddit', 'assets/game/icon_reddit.png');
            this.load.image('icon_gamer', 'assets/game/icon_gamer.png');
            this.load.image('icon_pokemon', 'assets/game/icon_pokemon.png');
            this.load.image('icon_f_v', 'assets/game/icon_f_v.png');
            this.load.image('icon_horror_movies', 'assets/game/icon_horror_movies.png');
            this.load.image('icon_famous', 'assets/game/icon_famous.png');
            this.load.image('icon_g_v', 'assets/game/icon_g_v.png');

            
            //graficos genericos usables en cualquier lado
            this.load.image('btn_return', 'assets/game/btn_return.png');
            this.load.image('btn_return_alt', 'assets/game/btn_return_alt.png');
            this.load.image('main_challenges', 'assets/game/main_challenges.png');
            this.load.image('main_profile', 'assets/game/main_profile.png');
            this.load.image('btn_config', 'assets/game/config.png');
            this.load.image('btn_add_coins', 'assets/game/add_coins.png');

            //quick tuto
            this.load.atlas("howto_anim", "assets/game/how_to_quick/howto.png","assets/game/how_to_quick/howto.json");
            this.load.atlas("pet_1_anim", "assets/game/pet_1/pet_1.png","assets/game/pet_1/pet_1.json");
            this.load.image('btn_got_it', 'assets/game/btn_got_it.png');
        

    }



    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_main");
        elements.showBtnReturn(this,originScreen);

        this.scene.start('startScene');

    }



    
}
