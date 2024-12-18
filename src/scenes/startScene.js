

export class startScene extends Phaser.Scene{
    constructor(){
        super({key:'startScene'});
    }

    

    create(){

        const elements = this.scene.get('elements');//trae distintos elementos del juego
        const animotions = this.scene.get('animotions');//ejecuta animaciones genericas
        elements.getBackground(this,"bg_main");
        elements.worldMusic(this,"play"); 
        //elements.showBtnConfig(this);
        //elements.showBtnMoney(this);

        //elemetnos unicos del main: maguito, boton start, titulo del juego
        this.add.image(mid_w, mid_h, 'mage').setOrigin(.5,1).setScale(default_scale);

        animotions.anim_heartbeat(this,
                this.add.image(mid_w, height-10, 'btn_start')
                .setOrigin(.5,1)
                .setScale(.2)
                .setInteractive()
                .on("pointerdown", () => {
                    originScreen.push("loading");
                    this.scene.start('selectModeScene');
                })
            ,{scale:.25,duration:350});
        animotions.anim_swing(this,this.add.image(mid_w, mid_h+100, 'game_title').setOrigin(.5,1).setScale(default_scale),{start:mid_w+10,duration:2000});

    }
    
}