

export class selectGameScene extends Phaser.Scene{
    constructor(){
        super({key:'selectGameScene'});
    }

    init(data) {//recibe data personalizada
        // Recibe los datos pasados desde EscenaOrigen
        this.levels = data.levels || 'Desconocido';
    }

    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game_sel");
        this.add.image(mid_w, 50, "levels_title").setOrigin(.5,0).setScale(.4);
        //elements.showBtnChallenges(this);
        //lements.showBtnProfile(this);
        elements.showBtnReturn(this,originScreen);
        //elements.showBtnMoney(this);
        this.drawGames()
    }

    async drawGames(){
        var index=0;
        var row=height/4;
        for (var i = 0; i < this.levels.length; i++) {
            console.log(index);
            var btn_level=this.add.image(cols[index]-(col_size/2),row , this.levels[i].image).setOrigin(.5,0).setScale(default_scale+.1).setInteractive();
            console.log(btn_level)
            index++;
            if (index>2) {
                index=0;
                row+= btn_level.displayHeight+basic_padding;
            }

            btn_level.name=this.levels[i].title;
            
            btn_level.on("pointerdown", ((words,lvl) => {
                return () => {
                    console.log("data", words);
                    originScreen.push("selectGameScene");
                    this.scene.start("inGameScene", { words: words, lvl: lvl });
                };
            })(this.levels[i].words,this.levels[i]), this);
        }

       
    }


    
}