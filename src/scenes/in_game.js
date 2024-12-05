

import ArrayWord from "../../assets/js/array-word.js";

export class inGameScene extends Phaser.Scene{
    constructor(){
        super({key:'inGameScene'});
        this.formattedText = "";
        this.nextWord = "";
        this.scaleToken
    }

    init(data) {
        // Recibe los datos pasados desde EscenaOrigen
        this.words = data.words || 'Desconocido';
        this.lvl = data.lvl;
    }

    preload (){
        const alphabt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','SPECIAL'];
        var additionals = [
            'triangulo'
        ];
        additionals.forEach((el) =>{
            this.load.image(el, 'assets/sprites/icons/'+el+'.png');
        });
        alphabt.forEach((el) => {
            if(el == 'SPECIAL'){
                this.load.image('SPECIAL', 'assets/sprites/words/_blank.png');
                this.load.image('SPECIAL_alt', 'assets/sprites/words/_blank_alt.png');
            }else{
                this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
                this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
            }
        })
    }

    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game");
        elements.showBtnReturn(this,originScreen);
        elements.showBtnMoney(this);
        this.drawBoard()
    }

    async drawBoard(){
        if(this.sys.game.device.os.android || this.sys.game.device.os.iOS){
            this.scaleToken = 0.3;
        }else{
            if(height < 1081){
                this.scaleToken = 0.5;
            }else{
                this.scaleToken = 1;
            }
        }
        this.buildResult = "";  
        this.nextWord = new ArrayWord();
        this.nextWord.category = this.lvl['title'];

        this.nextWord._data = this.words;
        this.nextWord.lvl = this.lvl;
        // console.log();
        // console.log(this.lvl['config'][0]);
        this.wordsImage = new Array();
        this.arrayWord = this.nextWord.getArrayWord();
        console.log(this.nextWord.infoWord);
        //aca pintamos el tablero
        this.board = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,width/1.25,height/1.25,'0xffffff',0).setOrigin(0.5,0.5);
        this.arrayWord.forEach((room,idx) => {
            room.forEach((cel,stp) => {
                var pos = idx +''+ stp;
                if(this.lvl['config'][0]['fullWord'] === true){
                    this.wordsImage[pos] = this.add.image(100, 100, 'SPECIAL').setScale(this.scaleToken).setOrigin(0.5,0.5).setInteractive();
                    // this.wordsImage[pos]['icon'] = this.add.image(100, 100, this.nextWord.infoWord.icon).setScale(0.1).setOrigin(0.5,0.5);
                }else{
                    this.wordsImage[pos] = this.add.image(100, 100, cel).setScale(this.scaleToken).setOrigin(0.5,0.5).setInteractive();
                }

                this.wordsImage[pos].x = (this.board.x/3) + (width/7.5)*stp;
                this.wordsImage[pos].y = (this.board.y/2.7) + (height/11)*idx;
                this.wordsImage[pos].name = cel;
                this.wordsImage[pos].used = false;
                this.wordsImage[pos].fullWord = false;
                // if(this.lvl['config'][0]['fullWord'] === true){
                //     this.wordsImage[pos]['icon'].x = this.wordsImage[pos].x
                //     this.wordsImage[pos]['icon'].y = this.wordsImage[pos].y; 
                // }
                this.wordsImage[pos].on('pointerdown',() => {
                    this.selectCharacter(this.wordsImage[pos],cel);
                });
            })
        });


        console.log(this.arrayWord);
    //    this.words
    }
    selectCharacter(target,chara){

        if(target.used === false){
            target.setTexture(chara+"_alt");
            this.tweens.add({
                targets: target,   
                scale: this.scaleToken-0.1,        
                duration: 100,
                ease: 'Quart.easeInOut',        
                repeat: 0,         
                yoyo:true,
                onComplete: function () {
                    target.used = true;
                }
            });
            if(target.fullWord === false){
                this.buildResult += chara;
            }else{

            }
            console.log(this.buildResult);
        }

        if(this.nextWord._displayed.has(this.buildResult) === true){
            console.log("Cambio de letras! y genera una palabra nueva");
        }
        
    }

    
}