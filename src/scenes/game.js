import Phaser from "../lib/phaser.js";
import ArrayWord from "../../assets/js/array-word.js";

export class GameScene extends Phaser.Scene{
    constructor(){
        super({key:'Game'});
        this.arrayWord = []
        this.formattedText = ""
        this.nextWord = ""
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

    async create(){
        this.buildResult = "";
        this.nextWord = new ArrayWord("Geometry");
        await this.nextWord.loadData();
        this.wordsImage = new Array();
        
        this.arrayWord = this.nextWord.getArrayWord();
        var spacing = 0;
        this.arrayWord.forEach((room,idx) => {
            room.forEach((cel,stp) => {
                var pos = idx +''+ stp;
                if(cel.length > 1){
                    // console.log(this.nextWord);
                    this.wordsImage[pos] = this.add.image(100, 100, 'SPECIAL').setScale(0.5).setOrigin(0.5,0.5).setInteractive();
                    this.wordsImage[pos]['icon'] = this.add.image(100, 100, this.nextWord.infoWord.icon).setScale(0.1).setOrigin(0.5,0.5);
                    
                }else{
                    this.wordsImage[pos] = this.add.image(100, 100, cel).setScale(0.5).setOrigin(0.5,0.5).setInteractive();
                }
                this.wordsImage[pos].x = window.innerWidth/6 + this.wordsImage[pos].displayWidth*stp;
                this.wordsImage[pos].y = window.innerWidth/8 + this.wordsImage[pos].displayHeight*idx;
                this.wordsImage[pos].name = cel;
                this.wordsImage[pos].used = false;
                this.wordsImage[pos].fullWord = false;
                if(cel.length > 1){
                    this.wordsImage[pos]['icon'].x = this.wordsImage[pos].x
                    this.wordsImage[pos]['icon'].y = this.wordsImage[pos].y; 
                }
                this.wordsImage[pos].on('pointerdown',() => {
                    this.selectCharacter(this.wordsImage[pos],cel);
                });
            })
        });

        // console.log(this.arrayWord)

        // this.formattedText = this.arrayWord.map(row => row.join(' ')).join('\n');
        // 
        // this.textObject = this.add.text(this.scale.width / 2, this.scale.height / 2, this.formattedText, {
        //   fontSize: '32px',
        //   color: '#ffffff',
        //   align: 'center',
        // })
        // .setOrigin(0.5);

        // setTimeout(()=>{
        //     this.arrayWord = this.nextWord.getArrayWord()
        //     // console.log(this.arrayWord)

        //     this.formattedText = this.arrayWord.map(row => row.join(' ')).join('\n');
        //     // console.log(this.formattedText);
        //     this.textObject.setText(this.formattedText);
        // },5000)
        
    }
    selectCharacter(target,chara){

        if(target.used === false){
            target.setTexture(chara+"_alt");
            this.tweens.add({
                targets: target,   
                scale: 0.7,        
                duration: 100,     
                // yoyo: true,        
                repeat: 0,         
                onComplete: function () {
                    target.scale = 0.5;
                    target.used = true; 
                    // target.setTexture(chara);
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