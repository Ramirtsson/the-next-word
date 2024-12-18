


export class scoreboardScene extends Phaser.Scene{
    constructor(){
        super({key:'scoreboardScene'});
    }

    create(){
        const elements = this.scene.get('elements');//trae distintos elementos del juego
        elements.getBackground(this,"bg_main");
        elements.showBtnReturn(this,originScreen);
        this.add.image(mid_w,0,"title_scoreboard").setOrigin(.5,0).setScale(default_scale);
        this.drawScoreboard(global_score);
    }

    drawScoreboard(data){
    	var row=mid_h/3;
    	var index=1;
    	data.forEach((el) => {
            var btn=this.add.image(mid_w,row,"score_tab").setOrigin(.5,.5).setScale(default_scale*1.4).setInteractive();
            var rankText=this.add.text(btn.getBounds().left , btn.y,"#"+index, { fontFamily: 'Arial', fontSize: 12 }).setOrigin(1, .5).setStroke('#000000',6);
            var userText=this.add.text(btn.getBounds().left+basic_padding*4 , btn.y,el.user, { fontFamily: 'Arial', fontSize: 15 }).setOrigin(0, .5).setStroke('#000000',6);
            var completedText=this.add.text(btn.getBounds().right-basic_padding*7 , btn.y,el.completed, { fontFamily: 'Arial', fontSize: 12 }).setOrigin(0, .5).setStroke('#000000',6);
            var completedText=this.add.text(btn.getBounds().right-basic_padding*4 , btn.y,el.score+"pts", { fontFamily: 'Arial', fontSize: 12 }).setOrigin(0, .5).setStroke('#000000',6);
        	row+=btn.height/3;
        	index++;
        })
    }
    
}