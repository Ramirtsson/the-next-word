

import ArrayWord from "../../assets/js/array-word.js";

export class inGameScene extends Phaser.Scene{
    constructor(){
        super({key:'inGameScene'});
        this.formattedText = "";
        this.nextWord = "";
        this.scaleToken
    }

    init(data) {
        const elements = this.scene.get('elements');
        elements.drawLoadingScreen(this)
        // Recibe los datos pasados desde EscenaOrigen
        this.words = data.words || 'Desconocido';
        this.lvl = data.lvl;
    }



    preload (){
        const alphabt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','SPECIAL'];
        
        
        alphabt.forEach((el) => {
            if(el == 'SPECIAL'){
                this.load.image('SPECIAL', 'assets/sprites/words/_blank.png');
                this.load.image('SPECIAL_alt', 'assets/sprites/words/_blank_alt.png');
            }else{
                this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
                this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
            }
        })

        if(this.lvl['config'][0]['fullWord'] === true){
            this.words.forEach((el) =>{
                this.load.image(el.toLowerCase(), 'assets/sprites/icons/'+el.toLowerCase()+'.png');
            });
        }

    }

    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game");
        elements.showBtnReturn(this,originScreen);
        //elements.showBtnMoney(this);
        this.drawBoard()
    }

    async drawBoard(){

        this.SPECIALWORD = [];
            if(this.sys.game.device.os.android || this.sys.game.device.os.iOS){
                this.scaleToken = 0.3;
            }else{
                if(height < 1081){
                    this.scaleToken = 0.33;
                }else{
                    this.scaleToken = 0.6;
                }
            }
            this.buildResult = "";  
            this.nextWord = new ArrayWord();
            this.nextWord.category = this.lvl['title'];        
            // console.log(this.arrayWord);
            // this.loadingScreen();
            this.genBoard(this.words,'FIRSTGAME');
    }

    genBoard(words,remaining){

        this.nextWord._data = words;
        this.nextWord.lvl = this.lvl;
        var counter = 0;
        if(remaining.length > 0){
            this.dataRemaining = remaining;
        }else{
            this.dataRemaining = [];
        }
        this.wordsImage = new Array();
        this.arrayWord = this.nextWord.getArrayWord(this.dataRemaining);
        
        if(this.arrayWord == "GG"){
            console.log('GAMEOVER');
            return;
        }
        var uniqueLetters = this.nextWord.infoWord.toUpperCase().split('')
        uniqueLetters.forEach((el,idx) =>{
            if(idx == 0){
                this.SPECIALWORD[idx] = this.add.image(window.innerWidth/12, window.innerHeight-(window.innerHeight/8), el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(1);
            }else{
                this.SPECIALWORD[idx] = this.add.image(this.SPECIALWORD[idx-1].x + (this.SPECIALWORD[idx-1].displayWidth/1.4), window.innerHeight-(window.innerHeight/8), el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(1);
            }
            this.SPECIALWORD[idx].setAlpha(0.5);
            this.SPECIALWORD[idx].name = el+"_"+idx;
            this.SPECIALWORD[idx].used = false;
            this.SPECIALWORD[idx].setAngle(Math.random() * (30 - (-30)) + (-30));
        })

            this.board = this.add.rectangle(window.innerWidth/2,window.innerHeight/3,width/1.25,height/1.25,'0xffffff',0).setOrigin(0.5,0.5);
        this.arrayWord.forEach((room,idx) => {
            room.forEach((cel,stp) => {
                var pos = counter;
                // if(this.wordsImage[pos]) this.wordsImage[pos].destroy();
                if(this.lvl['config'][0]['fullWord'] === true){
                    this.wordsImage[pos] = this.add.image(100, 100, 'SPECIAL').setScale(this.scaleToken).setOrigin(0.5,0.5).setInteractive();
                    this.wordsImage[pos]['icon'] = this.add.image(100, 100, cel.toLowerCase()).setScale(this.wordsImage[pos].scale/6).setOrigin(0.5,0.5).setDepth(1);
                    this.wordsImage[pos]['icon'].y = height+(height/2);
                }else{
                    this.wordsImage[pos] = this.add.image(100, 100, cel).setScale(this.scaleToken).setOrigin(0.5,0.5).setInteractive();
                }

                this.wordsImage[pos].x = (this.board.x/3) + (width/7.5)*stp;
                this.wordsImage[pos].y = height+(height/2);

                this.tweens.add({
                    targets: this.wordsImage[pos],   
                    y:(this.board.y/2.7) + (height/11)*idx,
                    duration: 100*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,         
                    onComplete: function () {
                        
                    }
                });
                this.wordsImage[pos].name = cel;
                this.wordsImage[pos].used = false;
                if(this.lvl['config'][0]['fullWord'] === true){
                    this.wordsImage[pos]['icon'].x = this.wordsImage[pos].x; 
                    this.tweens.add({
                        targets: this.wordsImage[pos]['icon'],
                        y:(this.board.y/2.7) + (height/11)*idx,
                        duration: 100*(idx+1),
                        ease: 'Quart.easeInOut',        
                        repeat: 0,         
                        onComplete: function () {
                            
                        }
                    });
                }

                
                this.wordsImage[pos].on('pointerdown',() => {
                    this.selectCharacter(this.wordsImage[pos],cel,this.lvl['config'][0]['fullWord']);
                });
                counter++;
            })
        });

    }
    // loadingScreen(){
    //     var wordLoad = ['L','O','A','D','I','N','G'];
    //     this.specialBar = [];
    //     wordLoad.forEach((el, idx) => {
    //         if(idx == 0){a
    //             this.specialBar[idx] = this.add.image((window.innerWidth/wordLoad.length*2), height/2, el).setScale(this.scaleToken).setOrigin(0.5,0.5);
    //         }else{
    //             this.specialBar[idx] = this.add.image(this.specialBar[(idx-1)].x + this.specialBar[(idx-1)].displayWidth, height/2, el).setScale(this.scaleToken).setOrigin(0.5,0.5);
    //         }
    //     })
    //     // setTimeout(() => {
    //     //     
    //     // },5e3)   
    // }
    clearBoard(){
        var deleteArray = [];
        if(this.SPECIALWORD.length > 0){
            this.SPECIALWORD.forEach((el,idx) => {
                this.SPECIALWORD[idx].destroy();
            });
        }
        var passDelete = false;
        var i = 0;
        var countWords = this.wordsImage.length-1;
        this.arrayWord.forEach((room,idx) => {
            room.forEach((cel,stp) => {
                deleteArray[i] = true;
                this.tweens.add({
                    targets: this.wordsImage[i],   
                    y:height+(height/2),
                    duration: 100,
                    ease: 'Quart.easeInOut',        
                    repeat: 0,         
                    onComplete: function () {
                    }    
                });
                if(this.lvl['config'][0]['fullWord'] === true){
                    this.tweens.add({
                        targets: this.wordsImage[i]['icon'],   
                        y:height+(height/2),
                        duration: 100,
                        ease: 'Quart.easeInOut',        
                        repeat: 0,         
                        onComplete: function () {
                        }    
                    });
                }
                
                if(i == countWords){
                    setTimeout(() => {
                        deleteArray.forEach((el,idx) => {
                            this.wordsImage[idx].destroy();
                        });
                        setTimeout(() => {
                            this.buildResult = '';
                            this.genBoard(this.words,this.nextWord.remaining);
                        },100)
                    },150)
                }else{
                    i++;
                }
            }); 
        });   
    }

    selectCharacter(target,chara,lvl){
        
        if(target.used === false){

            if(lvl === false){
                target.setTexture(chara+"_alt");
                this.buildResult += chara;
            }else{
                this.buildResult = "";
                target.setTexture("SPECIAL_alt");
            }
            if(this.nextWord.infoWord.includes(chara)){
                console.log("Correcto! Cambio de letras! y genera una palabra nueva");
                var count = this.nextWord.infoWord.length;
                if(lvl === true){
                    if(this.nextWord._displayed.has(chara) === true){
                        var uniqueLetters = this.nextWord.infoWord.toUpperCase().split('');
                        console.log(uniqueLetters);
                        uniqueLetters.forEach((el,idx) => {
                            this.tweens.add({
                                targets: this.SPECIALWORD[idx],   
                                alpha:1,
                                duration: 200*idx,
                                ease: 'Quart.easeInOut',        
                                repeat: 0,         
                                onComplete: () => {
                                    this.buildResult += el;
                                    console.log(this.buildResult);
                                    if(this.buildResult.length === count){
                                        this.clearBoard()
                                    }
                                },
                            });
                        })
                    }
                }else{
                    var foundLetter = false;
                    this.SPECIALWORD.forEach((el,idx) => {
                        if(el.name == chara+"_"+idx && foundLetter === false && this.SPECIALWORD[idx].used === false){
                            foundLetter = true;
                            this.SPECIALWORD[idx].used = true;
                            this.tweens.add({
                                targets: this.SPECIALWORD[idx],   
                                alpha:1,
                                duration: 700,
                                ease: 'Quart.easeInOut',        
                                repeat: 0,         
                                onComplete: () => {
                                    if(this.buildResult.length === this.nextWord.infoWord.length){
                                        console.log("Correcto! Cambio de letras! y genera una palabra nueva");
                                        this.clearBoard()
                                    }
                                }
                            });
                        }
                    })
                }
            }else{
                // console.log('Ups! me parece que has fallado');
                // this.clearBoard()
            }
            // console.log(this.buildResult);
        }
        // if(this.buildResult.length === this.nextWord.infoWord.length){
        //     if(this.nextWord._displayed.has(this.buildResult) === true){
                
                
        //     }else{
        //         console.log("Incorrecto! Cambio de letras! y genera una palabra nueva");
        //         // this.clearBoard()
        //     }
        // }if(this.buildResult.length > this.nextWord.infoWord.length){
        //     console.log("Incorrecto! Cambio de letras! y genera una palabra nueva");
        //     // this.clearBoard()
        // }
        
    }

    
}