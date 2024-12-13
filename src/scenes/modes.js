

export class selectModeScene extends Phaser.Scene{
    constructor(){
        super({key:'selectModeScene'});
    }

    create(){
        const elements = this.scene.get('elements');
        

        elements.getBackground(this,"bg_modes");
        this.add.image(mid_w, 50, "modes_title").setOrigin(.5,0).setScale(.5);
        elements.showBtnChallenges(this);
        elements.showBtnProfile(this);
        //elements.showBtnReturn(this,originScreen);
        //elements.showBtnMoney(this);

        this.drawModes()
    }

    drawModes(){
        for (var i = 0; i < levels.length; i++) {
            var btn_level=this.add.image(cols[i]-(col_size/2), height/4, levels[i].image).setOrigin(.5,0).setScale(default_scale+.1).setInteractive();

            btn_level.name=levels[i].category;
            btn_level.subCategories=levels[i].subCategories;
            btn_level.on("pointerdown", ((subCategories) => {
                return () => {
                    // console.log("data", subCategories);
                    originScreen.push("selectModeScene");
                    this.scene.start("selectGameScene", { levels: subCategories });
                };
            })(levels[i].subCategories), this);
        }
    }

    
}