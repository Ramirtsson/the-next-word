

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
        this.add.image(mid_w, 100, "levels_title").setOrigin(.5,0).setScale(.6);
        elements.showBtnChallenges(this);
        elements.showBtnProfile(this);
        elements.showBtnReturn(this,originScreen);
        elements.showBtnMoney(this);
        this.drawGames()
    }

    drawGames(){
        var index=0;
        var row=400;
        for (var i = 0; i < this.levels.length; i++) {
            console.log(index);
            
            var btn_level=this.add.image(cols[index]-(col_size/2),row , this.levels[i].image).setOrigin(.5,.5).setScale(.6).setInteractive();
            index++;
            if (index>2) {
                index=0;
                row+= 250;
            }

            btn_level.name=this.levels[i].title;
            btn_level.on("pointerdown", ((words) => {
                return () => {
                    console.log("data", words);
                    originScreen = "selectModeScene";
                    this.scene.start("inGameScene", { words: words });
                };
            })(this.levels[i].words), this);
        }

       
    }


    
}