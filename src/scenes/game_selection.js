
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

    create(){
        page=0;
        levelScreens=[]
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game_sel");

        this.add.image(mid_w, basic_padding, "levels_title").setOrigin(.5,0).setScale(.4);
        elements.showBtnReturn(this,originScreen);
        
       
        
        this.drawGames(this);
        }

    drawGames(scene,scrollContainer){
        var index=0;
        var countItems=0;
        var row=height/4;
        var si_entra=false;
        var scrollContainer = this.add.container(0,0);
        for (var i = 0; i < scene.levels.length; i++) {
            var btn_level=scene.add.image(cols[index]-(col_size/2),row , this.levels[i].image).setOrigin(.5,0).setScale(default_scale+.1).setInteractive();
            index++;
            if (index>2) {
                index=0;
                row+= btn_level.displayHeight+basic_padding;
            }

            btn_level.name=scene.levels[i].title;
            
            btn_level.on("pointerdown", ((words,lvl) => {
                    return () => {
                    if (!this.isDragging) {
                        originScreen.push("selectGameScene");
                        scene.scene.start("inGameScene", { words: words, lvl: lvl });
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

        text_lv.text=(page+1)+"/"+levelScreens.length;

    }


}