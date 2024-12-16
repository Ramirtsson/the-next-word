
var levelScreens=[];
var page=0;
var btn_lv_back=undefined;
var btn_lv_next=undefined;
var text_lv=undefined;

export class selectGameScene extends Phaser.Scene{
    constructor(){
        super({key:'selectGameScene'});
    }

    init(data) {//recibe data personalizada
        // Recibe los datos pasados desde EscenaOrigen
        this.levels = data.levels || 'Desconocido';
    }

    preload(){
        const alphabt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const numbers = ['1','2','3','4','5','6','7','8','9','0'];
        alphabt.forEach((el) => {
            this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
            this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
        })
        numbers.forEach((el) => {
            this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
            this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
        });


    }

    create(){
        page=0;
        levelScreens=[]
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game_sel");

        this.add.image(mid_w, basic_padding, "levels_title").setOrigin(.5,0).setScale(.4);
        elements.showBtnReturn(this,originScreen);
        
        if(this.sys.game.device.os.android || this.sys.game.device.os.iOS){
            this.scaleToken = 0.3;
        }else{
            if(height < 1081){
                this.scaleToken = 0.33;
            }else{
                this.scaleToken = 0.6;
            }
        }
        
        this.drawGames(this);
        }

    drawGames(scene,scrollContainer){
        var index=0;
        var countItems=0;
        var row=height/4;
        var si_entra=false;
        
        var scrollContainer = this.add.container(0,0);

        this.screenSelection = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight,0x000000,1).setOrigin(0.5,0.5).setDepth(0).setInteractive();

        // console.log(this.levels);
        this.titlesCategory = [];
        this.letsPlay = ['P','L','A','Y'];
        this.screenSelection.setAlpha(0);
        this.playBtn = [];
        for (var i = 0; i < scene.levels.length; i++) {
            var btn_level=scene.add.image(cols[index]-(col_size/2),row , this.levels[i].image).setOrigin(.5,0).setScale(default_scale+.1).setInteractive();
            var widthColsTitle;
            this.levels[i]['title'] = this.levels[i]['title'].replaceAll(" ",'');
            var nameCategory = this.levels[i]['title'].split("");
            
            this.titlesCategory[this.levels[i]['title']] = [];
            
            
            var middleBtnPlay;

            var playContainer = this.add.container(0,0)

            this.letsPlay.forEach((el,idx) =>{
                this.playBtn[idx] = this.add.image(window.innerWidth/2,window.innerHeight+window.innerHeight/2,el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(5).setInteractive();
                middleBtnPlay = this.playBtn[idx].displayWidth * this.letsPlay.length;

                if(idx == 0){
                    this.playBtn[idx].x = (window.innerWidth/2 - middleBtnPlay/2) + this.playBtn[idx].displayWidth/2;
                }else{
                    this.playBtn[idx].x = this.playBtn[(idx-1)].x + middleBtnPlay/this.letsPlay.length;
                }

                
                
                // playContainer.add(this.playBtn[idx]);
            });

            btn_level.playBtn=playContainer;//aca asigne el container a una variable del nivel, tecnicamente viaja con el nivel el boton de play
            btn_level.playBtn.visible=false;//ivan aca oculte el container

            


            nameCategory.forEach((el,idx) => {
                this.titlesCategory[this.levels[i]['title']][idx] = this.add.image(0,window.innerHeight+window.innerHeight/2,el.toUpperCase()).setScale(this.scaleToken).setOrigin(0.5,0.5).setDepth(6);
                widthColsTitle = this.titlesCategory[this.levels[i]['title']][idx].displayWidth * nameCategory.length;

                if(idx == 0){
                    this.titlesCategory[this.levels[i]['title']][idx].x = (window.innerWidth/2 - widthColsTitle/2) + this.titlesCategory[this.levels[i]['title']][idx].displayWidth/2;
                }else{
                    this.titlesCategory[this.levels[i]['title']][idx].x = this.titlesCategory[this.levels[i]['title']][(idx-1)].x + widthColsTitle/nameCategory.length;
                    // this.titlesCategory[this.levels[i]['title']][idx].x = this.titlesCategory[this.levels[i]['title']][(idx-1)].x + (this.titlesCategory[this.levels[i]['title']][idx].displayWidth - this.titlesCategory[this.levels[i]['title']][idx].displayWidth/4);
                }
                this.titlesCategory[this.levels[i]['title']][idx].setAngle(Math.random() * (30 - (-30)) + (-30));
            })

            
            //console.log(this.titlesCategory);
            index++;
            if (index>2) {
                index=0;
                row+= btn_level.displayHeight+basic_padding;
            }

            btn_level.name=scene.levels[i].title;
            
            btn_level.on("pointerdown", ((words,lvl) => {
                return () => {
                    if (!this.isDragging) {
                        
                        this.screenSelection.setDepth(5);
                        this.letsPlay.visible=true;;
                        this.tweens.add({
                            targets: this.screenSelection,
                            alpha:0.2,
                            duration: 200,
                            ease: 'Quart.easeInOut',        
                            repeat: 0,         
                            onComplete: function () {
                                btn_level.playBtn.visible=true;
                                btn_level.playBtn.setDepth(10);
                            }
                        });
                        this.youyouStange = [];
                        this.titlesCategory[lvl['title']].forEach((el,idx) => {

                            this.playBtn.forEach((el, idx) => {
                                this.tweens.add({
                                    targets: this.playBtn[idx],
                                    y:window.innerHeight/2+window.innerHeight/6,
                                    duration: 500,
                                    delay:100*idx,
                                    ease: 'Quart.easeInOut', 
                                    yoyo:false,       
                                    repeat: 0,         
                                    onComplete: function () {   
                                    }
                                }); 
                            });

                            this.tweens.add({
                                targets: this.titlesCategory[lvl['title']][idx],
                                y:window.innerHeight/2,
                                duration: 500,
                                ease: 'Quart.easeInOut',        
                                repeat: 0,         
                                onComplete: () => {
                                    this.playBtn.forEach((el, idx) => {


                                        this.playBtn[idx].on("pointerdown", ((pointer) => {
                                            if(!originScreen.includes('selectGameScene')){
                                                originScreen.push("selectGameScene");
                                                this.scene.start("inGameScene", { words: lvl.words, lvl: lvl });
                                            }
                                        }),this);
                                    })
                                    

                                    this.youyouStange[idx] = this.tweens.add({
                                        targets: this.titlesCategory[lvl['title']][idx],
                                        y:el.y + 5,
                                        duration: 500,
                                        delay:100*idx,
                                        ease: 'Quad.easeInOut', 
                                        yoyo:true,       
                                        repeat: -1,         
                                        onComplete: function () {   
                                        }
                                    }); 

                                },
                            });
                                
                        })

                        this.screenSelection.on('pointerdown',(pointer) => {
                            pointer.event.stopPropagation(); 

                            this.youyouStange.forEach((el,idx) => {
                                this.youyouStange[idx].destroy();
                            })
                            this.playBtn.forEach((el, idx) => {
                                this.tweens.add({
                                    targets: this.playBtn[idx],
                                    y:window.innerHeight+window.innerHeight/2,
                                    duration: 500,
                                    delay:100,
                                    ease: 'Quart.easeInOut', 
                                    yoyo:false,       
                                    repeat: 0,         
                                    onComplete: function () {   
                                    }
                                }); 
                            });

                            this.tweens.add({
                                targets: this.screenSelection,
                                alpha:0,
                                depth:0,
                                duration: 200,
                                ease: 'Quart.easeInOut',        
                                repeat: 0,         
                                onComplete: () => {

                                    this.titlesCategory[lvl['title']].forEach((el,idx) => {
                                        this.tweens.add({
                                            targets: this.titlesCategory[lvl['title']][idx],
                                            y:window.innerHeight+window.innerHeight/2,
                                            duration: 200,
                                            ease: 'Quart.easeInOut',        
                                            repeat: 0,         
                                            onComplete: () => {
                                                btn_level.playBtn.visible=false;
                                                this.screenSelection.setDepth(0);
                                                this.screenSelection.setAlpha(0);                                                
                                                this.titlesCategory[lvl['title']][idx].y = window.innerHeight+window.innerHeight/2; 
                                            }
                                        })    
                                    })
                                }
                            });

                        })
                    }
                }
            })(scene.levels[i].words,scene.levels[i]), scene);

            if (countItems<5) {
                scrollContainer.add(btn_level);
                countItems++;
            }else{
                si_entra=true;
                scrollContainer.add(btn_level);
                levelScreens.push(scrollContainer);
                countItems=0;
                scrollContainer = this.add.container(0,0);
                row=height/4;
                index=0;
            }


            if (i==scene.levels.length-1) {
                if (countItems<5&&!si_entra) {//si algun container tiene menos de 6 items y se han acabaod los niveles finalizamos para agregar el screen, se puede optimziar esto.
                    levelScreens.push(scrollContainer);
                    countItems=0;
                    scrollContainer = this.add.container(0,0);
                    row=height/4;
                    index=0;
                }
            }

            si_entra=false;
            
        }
        

        btn_lv_back=this.add.image(mid_w_q, height-basic_padding, 'btn_return').setOrigin(.5,1).setScale(default_scale).setInteractive().on("pointerdown", () => {
                console.log(origin);
                if (page>0) {
                    page--;
                    this.showLevelContainer(page)
                }
                
        });

        btn_lv_next=this.add.image(mid_w+mid_w_q, height-basic_padding, 'btn_return').setOrigin(.5,1).setScale(default_scale).setInteractive().on("pointerdown", () => {
                console.log(origin);
                if (page<levelScreens.length-1) {
                    page++;
                    this.showLevelContainer(page);
                }
        });
        text_lv=this.add.text(mid_w , height-basic_padding,(page+1)+"/"+levelScreens.length, { fontFamily: 'Arial', fontSize: 30 }).setOrigin(.5, 1).setStroke('#000000',6);

        btn_lv_next.flipX=true;

        this.showLevelContainer(page);

    }

    showLevelContainer(page){
        // console.log(btn_lv_back);
        
        if(this.ofPage){
            this.ofPage.forEach((el,idx)=>{ this.ofPage[idx].destroy(); })
        }

        for (var i = 0; i < levelScreens.length; i++) {
            btn_lv_back.setTexture("btn_return")
            btn_lv_next.setTexture("btn_return");

            if (page==i) {
                levelScreens[i].enable=true;
                levelScreens[i].visible=true;
            }else{
                levelScreens[i].enable=false;
                levelScreens[i].visible=false;
            }
        }

        if (page==0) {
            btn_lv_back.setTexture("btn_return_alt")
        }

        if (page==levelScreens.length-1) {
            btn_lv_next.setTexture("btn_return_alt");
        }

        

        
        

        this.ofPage =  [];
        
        if((page+1)>9){
            let pagesStr = (page+1).toString().split("");
            this.ofPage[0] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, pagesStr[0]).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
            this.ofPage[1] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, pagesStr[1]).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
        }else{
            this.ofPage[0] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, "0").setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
            this.ofPage[1] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, (page+1)).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
            
        }

        this.ofPage[2] =  this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, 'O').setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
        this.ofPage[3] =  this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, 'F').setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);

        if(levelScreens.length>9){
            let pagesStr = levelScreens.length.toString().split("");
            this.ofPage[4] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, pagesStr[0]).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
            this.ofPage[5] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, pagesStr[1]).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
        }else{
            this.ofPage[4] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, "0").setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
            this.ofPage[5] = this.add.image(text_lv.x,text_lv.y - text_lv.displayHeight/2, levelScreens.length).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
        }
        
        var widthCols = this.ofPage[0].displayWidth * this.ofPage.length-1;
        var totalWidthCols = window.innerWidth/2 - widthCols/2;

        this.ofPage.forEach((el,idx) =>{
            if(idx == 0){
                this.ofPage[idx].x = totalWidthCols + el.displayWidth*idx;
            }else if(idx == 2 || idx == 4){
                this.ofPage[idx].x = this.ofPage[(idx-1)].x + (el.displayWidth+el.displayWidth/2);
            }else{
                this.ofPage[idx].x = this.ofPage[(idx-1)].x + (el.displayWidth);
            }
            el.setAngle(Math.random() * (30 - (-30)) + (-30));
        })

        text_lv.text=(page+1)+"/"+levelScreens.length;
        text_lv.setAlpha(0);

    }


}