

export class elements extends Phaser.Scene{
    constructor(){
        super({key:'elements'});
    }

    showBtnConfig(scene){
        //recibe la escena donde se va a mostrar el elemento
        scene.add.image(0+basic_padding, 0+basic_padding, 'btn_config').setOrigin(0,0).setScale(.6);
    }

    showBtnReturn(scene,origin){//origin: a donde vamos a regresar
        scene.add.image(0+basic_padding, 0+basic_padding, 'btn_return').setOrigin(0,0).setScale(.6).setInteractive().on("pointerdown", () => {
            console.log(origin);
            scene.scene.start(origin);
        });
    }

    showBtnMoney(scene,config=null){
        //agregar configuracion si es necesario por ejemplo posicion en x: config.x
        if (config==null) {
            config={
                x:width-basic_padding,
                y:0+basic_padding
            }
            
        }
        btn_money=scene.add.image(config.x, config.y, 'btn_add_coins').setOrigin(1,0).setScale(.6);
        btn_money.objText=scene.add.text(btn_money.x-(btn_money.width/3), btn_money.y+15 , 10, { fontFamily: 'Arial', fontSize: 40 }).setOrigin(1, 0).setStroke('#000000',6);
    }


    showBtnChallenges(scene){
        scene.add.image((mid_w+mid_w_q), height, 'main_challenges').setOrigin(.5,1);
    }

    showBtnProfile(scene,x=null, y=null){
        scene.add.image(mid_w_q, height, 'main_profile').setOrigin(.5,1);
    }

    getBackground(scene,bg){
        //bg_main,bg_modes, 
        scene.add.image(0, 0, bg).setOrigin(0,0).setDisplaySize(width,height);
    }

  
}