

export class elements extends Phaser.Scene{
    constructor(){
        super({key:'elements'});
    }

    // create(){
    //     elements.WorldMusic = this.sound.add('mainscreen').setLoop(true);
    // }



    showBtnConfig(scene){
        //recibe la escena donde se va a mostrar el elemento
        scene.add.image(0+basic_padding, 0+basic_padding, 'btn_config').setOrigin(0,0).setScale(default_scale);
    }

    mainModes(scene){
        originScreen=[];
        scene.scene.start("selectModeScene");
    }

    

    closeButton(scene){
        scene.add.image(0+basic_padding, 0+basic_padding, 'btn_close').setOrigin(0,0).setScale(default_scale).setInteractive().on("pointerdown", () => {
            this.mainModes(scene);
        });
    }

    showBtnReturn(scene,origin,custom){//origin: a donde vamos a regresar
        scene.add.image(0+basic_padding, 0+basic_padding, 'btn_return').setOrigin(0,0).setScale(default_scale).setInteractive().on("pointerdown", () => {
            if(scene.backgroundMusic) scene.backgroundMusic.pause();
            if(worldAudio.play === false ){ worldAudio.play(); }
            if(origin){
                // console.log(origin);
                scene.scene.start(originScreen[origin.length-1]);
                originScreen.pop();
            }else{
                originScreen=[];
                scene.scene.start(custom);
            }
        });
    }

    noReturnWithoutAuth(scene,origin,custom){//origin: a donde vamos a regresar
        
        scene.add.image(0+basic_padding, 0+basic_padding, 'btn_return').setOrigin(0,0).setScale(default_scale).setInteractive().on("pointerdown", () => {
            scene.exitDoor = scene.add.rectangle(window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight,0x000000,0.5).setOrigin(0.5,0.5).setDepth(5).setInteractive();
            scene.disclaimer = scene.add.text(window.innerWidth/2, window.innerHeight/2, 
            'ARE YOU SURE YOU WANT TO EXIT? YOR GAME WILL BE LOST.', { 
                fontSize: '1rem',
                fontFamily: "Fredoka",
                stroke: '1px',
                align:"center",
            }).setOrigin(0.5,0.5).setDepth(5);

            scene.yesOption = scene.add.text(scene.disclaimer.x, scene.disclaimer.y + scene.disclaimer.displayHeight*2, 
                'YES', { 
                    fontSize: '1rem',
                    fontFamily: "Fredoka",
                    stroke: '1px',
                    align:"center",
                }).setOrigin(0.5,0.5).setDepth(5).setInteractive().on("pointerdown", () => {
                    originScreen=[];
                    worldAudio.play();
                    scene.scene.start("selectModeScene");
                    scene.backgroundMusic.pause();
                })

            scene.noOption = scene.add.text(scene.yesOption.x, scene.yesOption.y + scene.yesOption.displayHeight*2, 
                'NO', { 
                    fontSize: '1rem',
                    fontFamily: "Fredoka",
                    stroke: '1px',
                    align:"center",
                }).setOrigin(0.5,0.5).setDepth(5).setInteractive().on("pointerdown", () => {
                    setTimeout(() => {
                        scene.exitDoor.destroy();
                        scene.disclaimer.destroy();
                        scene.yesOption.destroy();
                        scene.noOption.destroy();
                    }, 500);
                })




            // scene.timer.paused = true;  
            // if(origin){
            //     // console.log(origin);
            //     scene.scene.start(originScreen[origin.length-1]);
            //     originScreen.pop();
            // }else{
            //     originScreen=[];
            //     scene.scene.start(custom);
            // }
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
        btn_money=scene.add.image(config.x, config.y, 'btn_add_coins').setOrigin(1,0).setScale(default_scale);
        btn_money.objText=scene.add.text(btn_money.x-(btn_money.width/3), btn_money.y+15 , 10, { fontFamily: 'Arial', fontSize: 40 }).setOrigin(1, 0).setStroke('#000000',6);
    }


    showBtnChallenges(scene){
        scene.add.image((mid_w+mid_w_q), height, 'main_challenges').setOrigin(.5,1).setScale(default_scale*2);
    }

    showBtnProfile(scene,x=null, y=null){
        return scene.add.image(mid_w_q, height, 'main_profile').setOrigin(.5,1).setScale(default_scale*2).setInteractive();        
    }

    getBackground(scene,bg){
        //bg_main,bg_modes, 
        scene.add.image(0, 0, bg).setOrigin(0,0).setDisplaySize(width,height);
    }

    drawLoadingScreen(scene){
        //  We loaded this image in our Boot Scene, so we can display it here
        scene.add.image(0, 0, "bg_preload").setOrigin(0,0).setDisplaySize(width,height);
        var loading=scene.add.image(mid_w, mid_h-(mid_h/2), "loading").setOrigin(.5,.5).setScale(.5);

        scene.tweens.add({
            targets: loading,
            y: loading.y + 25,
            duration: 1000,
            ease: 'Quad.easeInOut',
            easeParams: [],
            yoyo:true,
            repeat:-1
          });

        //  A simple progress bar. This is the outline of the bar.
        scene.add.rectangle(mid_w, mid_h+(mid_h/2), 468, 32).setStrokeStyle(1, 0xffffff);
        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = scene.add.rectangle(mid_w-230, mid_h+(mid_h/2), 4, 28, 0xffffff);
        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        let displayedProgress = 0;

        scene.load.on('progress', (progress) => {
            // Actualiza la barra suavemente hacia el valor de "progress"
            displayedProgress += (progress - displayedProgress) * 0.1; // Ajusta 0.1 para cambiar la velocidad

            // Calcula el ancho de la barra basado en el progreso interpolado
            bar.width = 4 + (460 * displayedProgress);

            // Puedes usar una función como setTimeout o requestAnimationFrame si necesitas animarlo aún más
        });
    }


    
    worldMusic(scene,mode){
        worldAudio = this.sound.add('mainscreen').setLoop(true);
        if(mode == 'play'){
            worldAudio.play();  
        }else{
            worldAudio.pause(); 
        }
    }

    backgroundMusic(scene,mode){
        if(!scene.backgroundMusic) scene.backgroundMusic = scene.sound.add('inGame').setLoop(true);
        if(mode == 'play'){
            scene.backgroundMusic.play();  
        }else{
            scene.backgroundMusic.pause();
        }
    }
}