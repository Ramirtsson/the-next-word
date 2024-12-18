import ArrayWord from "../../assets/js/array-word.js";

export class howToPlay extends Phaser.Scene{
    constructor(){
        super({key:'howtoPlay'});
        this.formattedText = "";
        this.nextWord = "";
        this.scaleToken
    }

    init(data) {
        const elements = this.scene.get('elements');
        elements.drawLoadingScreen(this)
        worldAudio.pause();
        elements.backgroundMusic(this,'play');
        this.actionMoment = false;
        this.buildResult = ""; 
        // // Recibe los datos pasados desde EscenaOrigen
        // this.words = data.words || 'Desconocido';
        // this.lvl = data.lvl;
        // // console.log(this.lvl);
        // this.actionMoment = false;
        // this.waitingForChange = false;
    }

    preload() {

        this.applauseSound = this.sound.add('applause');
        this.coin = this.sound.add('coin')
        this.cancel = this.sound.add('cancel')
        this.success = this.sound.add('success')

        loadFont("Fredoka", "assets/fonts/Jua/Jua-Regular.ttf");
        const alphabt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        alphabt.forEach((el) => {
            this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
            this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
        })
    }

    create() {
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game");
        elements.showBtnReturn(this,'','selectModeScene');
        if(this.sys.game.device.os.android || this.sys.game.device.os.iOS){
            this.scaleToken = 0.3;
        }else{
            if(height < 1081){
                this.scaleToken = 0.33;
            }else{
                this.scaleToken = 0.6;
            }
        }
        this.title = ['H','O','W','T','O','P','L','A','Y'];
        this.wordExample = ['D','O','G'];
        this.wordExImage = [];
        this.SPECIALWORD = [];
        this.titleImage = [];
        this.title.forEach((el,idx) => {
            this.titleImage[idx] = this.add.image(window.innerWidth/2,0,el).setScale(this.scaleToken/1.5).setOrigin(0.5,0.5);
            this.titleImage[idx].y = this.titleImage[idx].displayHeight;
            if(idx == 0){
                this.titleImage[idx].x = (window.innerWidth/(this.title.length/3.2));
            }else if(idx == 3 || idx == 5){
                this.titleImage[idx].x = this.titleImage[idx-1].x + (this.titleImage[idx].displayWidth)+(this.titleImage[idx].displayWidth/2);
            }else{
                this.titleImage[idx].x = this.titleImage[idx-1].x + (this.titleImage[idx].displayWidth - this.titleImage[idx].displayWidth/3);
            }
            this.titleImage[idx].setAngle(Math.random() * (15 - (-15)) + (-15));

            this.tweens.add({
                targets: this.titleImage[idx],
                y: this.titleImage[idx].y + 5,
                duration: 500,
                delay:100*idx,
                ease: 'Quad.easeInOut',        
                repeat: -1,
                yoyo:true,
                onComplete: () => {
                }
            });
        })

            this.messageOne = this.add.text(window.innerWidth/2, window.innerHeight/2, 
            "WELCOME, TRAVELER! WE`RE SO GLAD TO SEE YOU HERE. WE`LL SHOW YOU HOW TO PLAY THE NEXT WORD.", { 
                fontSize: '1rem ',
                fontFamily: "Fredoka",
                stroke: "#39484a",
                strokeThickness: 8,
                wordWrap: { width: window.innerWidth/1.5, useAdvancedWrap: true },
                align:"center",
            }).setOrigin(0.5,0.5);

            // this.typewriteText('WELCOME, TRAVELER! WE`RE SO GLAD TO SEE YOU HERE. WE`LL SHOW YOU HOW TO PLAY THE NEXT WORD.');

            this.tweens.add({
                targets: this.messageOne,
                y: (this.titleImage[0].y*2)+(this.titleImage[0].displayHeight/1.5),
                duration: 700,
                ease: 'Quad.easeInOut',        
                delay:5000,
                repeat: 0,
                yoyo:false,
                onComplete: () => {
                    // this.messageOne.setAlpha(0);
                    this.messageTwo = this.add.text(window.innerWidth/2, window.innerHeight/2, 
                        'NOW! WE WILL SEARCH FOR THE NEXT WORD ON THE BOARD, LETTER BY LETTER, AND IN ORDER.', { 
                            fontSize: '1rem ',
                            fontFamily: "Fredoka",
                            stroke: "#39484a",
                            strokeThickness: 8,
                            wordWrap: { width: window.innerWidth/1.5, useAdvancedWrap: true },
                            align:"center",
                        }).setOrigin(0.5,0.5).setDepth(5);
                        this.tweens.add({
                            targets: this.messageOne,
                            alpha: 0,
                            duration: 500,
                            delay:1000,
                            ease: 'Quad.easeInOut',        
                            repeat: 0,
                            yoyo:false,
                        });
                        this.tweens.add({
                            targets: this.messageTwo,
                            y: this.messageOne.y,
                            duration: 500,
                            delay:1000,
                            ease: 'Quad.easeInOut',        
                            repeat: 0,
                            yoyo:false,
                            onComplete: () => {
                                this.wordExample.forEach((el,idx) => {
                                    if(idx == 0){
                                        this.SPECIALWORD[idx] = this.add.image(window.innerWidth/2, this.messageTwo.y+(this.messageTwo.displayHeight*1.2),el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
                                        this.SPECIALWORD[idx].x = this.SPECIALWORD[idx].x - (this.SPECIALWORD[idx].displayWidth/2)
                                    }else{
                                        this.SPECIALWORD[idx] = this.add.image(this.SPECIALWORD[idx-1].x + (this.SPECIALWORD[idx-1].displayWidth/1.4), this.messageTwo.y+(this.messageTwo.displayHeight*1.2),el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5);
                                    }
                                    this.SPECIALWORD[idx].setAlpha(0.5);
                                    this.SPECIALWORD[idx].setDepth(5);
                                    this.SPECIALWORD[idx].name = el;
                                    this.SPECIALWORD[idx].used = false;
                                    this.SPECIALWORD[idx].setAngle(Math.random() * (30 - (-30)) + (-30));
                                });
                                setTimeout(() => {
                                    this.genBoard();
                                },2000)
                            }
                        });
                }
            });
            



            // this.anims.create({ key : "pet_1_anim_play",frames: this.anims.generateFrameNames("pet_1_anim",{start: 1,end:4}),repeat:-1});
            // var pet_1=this.physics.add.sprite(mid_w-(mid_w/4), mid_h+(mid_h/6), "pet_1").setScale(.6).setOrigin(.5,.5);
            // pet_1.anims.play("pet_1_anim_play",true);

    }

    genBoard(){
        var counter=0;
        this.nextWord = new ArrayWord();
        this.demoConfig = {
            "title": "Words",
            "category": "DEMO",
            "config": {
                "fullWord": false,
                "difficulty": "easy",
                "timeRemaining": 0,
                "random": false,
                "bonusWord": 5,
                "point": 1,
                "cursedWord": 1
            },
            "words": [
                "DOG",
            ],
            "findDifference": [],
            "status": true
        };
        var counterAnim = 0;
        this.nextWord._data = this.demoConfig['words'];
        this.nextWord.lvl = this.demoConfig;
        this.lvl = this.demoConfig;
        this.positionLetter = [];
        this.wordsImage = new Array();
        this.arrayWord = this.nextWord.getArrayWord(this.dataRemaining);
        this.board = this.add.rectangle(window.innerWidth/2,window.innerHeight/1.5,width/1.5,height/1.7,'0xffffff',0).setOrigin(0.5,0.5);
        this.arrayWord.forEach((room,idx) => {
            room.forEach((cel,stp) => {
                var pos = counter;
                this.wordsImage[pos] = this.add.image(0, window.innerHeight+(window.innerHeight/2), cel).setScale(this.scaleToken).setOrigin(0.5,0.5).setInteractive();



                // if(this.arrayWord.length % 2 === 0 || room.length % 2 === 0){
                    this.widthCols = room.length * this.wordsImage[pos].displayWidth;
                    this.heightCols = this.arrayWord.length * this.wordsImage[pos].displayHeight;
                // }else{
                //     var widthCols = room.length * this.wordsImage[pos].displayWidth;
                //     console.log('numero impar');
                //     var widthCols = room.length * this.wordsImage[pos].displayWidth;
                //     var heightCols = this.arrayWord.length * this.wordsImage[pos].displayHeight;
                // }
                if(this.arrayWord.length % 2 === 0 || room.length % 2 === 0){
                    var startX = this.board.x - this.widthCols/2.3;  
                    var startY = this.board.y - this.heightCols/2;
                }else{
                    var startX = this.board.x - this.widthCols/2.6;
                    var startY = this.board.y - this.heightCols/2.5;

                }
                this.wordsImage[pos].x = startX + this.wordsImage[pos].displayWidth*stp;
                this.wordsImage[pos].name = cel;
                
                this.wordsImage[pos].used = false;

                this.tweens.add({
                    targets: this.wordsImage[pos],   
                    y:startY + this.wordsImage[pos].displayHeight*idx,
                    duration: 100*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,         
                    onComplete:  () => {
                        counterAnim++;
                        if(counter == counterAnim){
                            this.shadowGuide();
                        }
                    },
                    onCompleteParams: [this]
                });
                if(['D','O','G'].includes(cel)){
                    if(!this.positionLetter[cel]){
                        this.positionLetter[cel] = pos;
                        this.wordsImage[pos].on('pointerdown',(pointer) => {
                            pointer.event.stopPropagation();   
                            this.selectCharacter(this.wordsImage[pos],pos,cel,this.lvl['config']['fullWord']);
                        });
                    }
                }
                
                counter++;
            })
        })
    }

    shadowGuide(){
        // console.log(this.positionLetter);
        this.actionMoment=true;
        this.theaterCortain = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight,0x000000,1).setOrigin(0.5,0.5);
        this.blockScreen
        this.theaterCortain.setAlpha(0);

        this.circle = this.add.circle(this.board.x, this.board.y, this.widthCols/2, 0xffffff).setOrigin(0.5,0.5);
        this.mask = this.circle.createGeometryMask();
        this.mask.invertAlpha = true;
        this.theaterCortain.setMask(this.mask);
        this.circle.setVisible(false);
        
        this.tweens.add({
            targets: this.theaterCortain,   
            alpha:0.5,
            duration: 500,
            delay: 2000,
            ease: 'Quart.easeInOut',        
            repeat: 0,         
            onComplete:  () => {
                this.messageTwo.setText('THERE WILL BE MANY LETTERS ON THE BOARD, AND THE ONES WE NEED WILL BE AMONG THEM.');
                setTimeout(() => {
                    
                    this.tweens.add({
                        targets: this.circle,   
                        scale: this.wordsImage[this.positionLetter['D']].scale - this.wordsImage[this.positionLetter['D']].scale/3,
                        duration: 500,
                        ease: 'Quart.easeInOut',        
                        repeat: 0,         
                        onComplete:  () => {
                            
                        },
                        onCompleteParams: [this]
                    });

                    this.tweens.add({
                        targets: this.circle,   
                        x: this.wordsImage[this.positionLetter['D']].x-2,
                        y: this.wordsImage[this.positionLetter['D']].y-0.5,
                        duration: 500,
                        ease: 'Quart.easeInOut',        
                        repeat: 0,         
                        onComplete:  () => {
                            this.messageTwo.setText('YOU WILL NEED TO CLICK IN ORDER TO FORM THE WORD.\nLET`S TRY WITH FIRST LETTER.');
                            this.actionMoment = false;
                        },
                        onCompleteParams: [this]
                    });

                    

                },4000)
            },
            onCompleteParams: [this]
        });

    }

    selectCharacter(targetInfo,step,chara,lvl,mode,){

        if(this.actionMoment === false){
            this.actionMoment = true;
            var stepChar;
            var foundLetter = false;
            var uniqueLetters = this.nextWord.infoWord.toUpperCase().split('');
        

            if(targetInfo.used === false){
                if(lvl === false){
                    // target.setTexture(chara+"_alt");
                    this.buildResult += chara;
                }else{
                    // this.buildResult = chara;
                    // target.setTexture("SPECIAL_alt");
                }
                // console.log(this.buildResult);
                stepChar = this.buildResult.split('');
                var foundLetter = false;
                if(this.nextWord.infoWord.includes(chara)){

                        this.SPECIALWORD.forEach((el,idx) => {
                            if(foundLetter === false && this.SPECIALWORD[idx].used === false){

                                if(chara === uniqueLetters[idx] && idx == (this.buildResult.length-1)){
                                    
                                    // this.showScore('plus');
                                    this.coin.play();
                                    foundLetter = true;
                                    this.SPECIALWORD[idx].used = true;
                                    this.wordsImage[step].setTexture(chara+"_alt");
                                    this.tweens.add({
                                        targets: this.wordsImage[step],
                                        scale: this.scaleToken+(this.scaleToken/5),
                                        duration: 100,
                                        ease: 'Quart.easeInOut',        
                                        repeat: 0,
                                        yoyo:true,
                                    });

                                    this.tweens.add({
                                        targets: this.SPECIALWORD[idx],
                                        scale: this.scaleToken+(this.scaleToken/5),
                                        duration: 100,
                                        ease: 'Quart.easeInOut',        
                                        repeat: 0,
                                        yoyo:true,
                                    });

                                    this.tweens.add({
                                        targets: this.SPECIALWORD[idx],   
                                        alpha:1,
                                        duration: 200,
                                        ease: 'Quart.easeInOut',        
                                        repeat: 0,         
                                        onComplete: () => {
                                            this.actionMoment = false;
                                            if(this.buildResult.length === uniqueLetters.length){
                                                if(this.lvl['config']['timeRemaining'] > 0){
                                                    this.timeRemaining += this.lvl['config']['bonusWord'];
                                                }
                                                this.finishTutorial('')
                                            }else{
                                                if(chara == 'D'){
                                                    this.messageTwo.setText('GREAT! NOW LET`S TRY GOING FOR THE SECOND LETTER.');
                                                    this.tweens.add({
                                                        targets: this.circle,   
                                                        x: this.wordsImage[this.positionLetter['O']].x-2,
                                                        y: this.wordsImage[this.positionLetter['O']].y-0.5,
                                                        duration: 500,
                                                        ease: 'Quart.easeInOut',        
                                                        repeat: 0,         
                                                        onComplete:  () => {
                                                        },
                                                        onCompleteParams: [this]
                                                    });
                                                }else if(chara == 'O'){
                                                    this.messageTwo.setText('NICE! JUST ONE MORE LETTER TO COMPLETE THE WORD.');
                                                    this.tweens.add({
                                                        targets: this.circle,   
                                                        x: this.wordsImage[this.positionLetter['G']].x-2,
                                                        y: this.wordsImage[this.positionLetter['G']].y-0.5,
                                                        duration: 500,
                                                        ease: 'Quart.easeInOut',        
                                                        repeat: 0,         
                                                        onComplete:  () => {
                                                        },
                                                        onCompleteParams: [this]
                                                    });
                                                }
                                            }
                                        },
                                    });
                                }else{
                                    foundLetter = true;
                                    // console.log(this.lvl);
                                    if(this.lvl['config']['difficulty'].toUpperCase() == 'EASY'){
                                        
                                            // this.showScore('wrong');
                                    
                                        this.tweens.add({
                                            targets: this.wordsImage[step],
                                            tint: 0xff0000,
                                            alpha:0.5,
                                            duration: 100,
                                            ease: 'Quart.easeInOut',        
                                            repeat: 1,
                                            yoyo:true,
                                            onComplete:() => {
                                                this.actionMoment = false;
                                                this.buildResult = this.buildResult.substr(0, this.buildResult.length - 1);
                                            }
                                        });
                                    }
                                }
                                
                            }
                        })
                    
                    
                }else{
                    
                    if(this.lvl['config']['difficulty'].toUpperCase() == 'EASY'){
                        
                        this.tweens.add({
                            targets: this.wordsImage[step],
                            tint: Phaser.Display.Color.GetColor(255, 0, 0),
                            alpha:0.5,
                            duration: 100,
                            ease: 'Quart.easeInOut',        
                            repeat: 1,
                            yoyo:true,  
                            onComplete: () => {
                                this.actionMoment = false;
                                
                                    // this.showScore('wrong');
                                
                            }
                        });
                        this.buildResult = this.buildResult.substr(0, this.buildResult.length - 1);
                        // console.log("fallaste vuelve a intentar tu palabra es:", this.buildResult)   
                    }else{
                        // this.clearBoard()
                    }
                }
                // console.log(this.buildResult);
                // console.log(target);
                // console.log(chara);
                // console.log(lvl);
            }
        }
    }

    finishTutorial(){
        this.success.play();
        this.messageTwo.setText('CONGRATULATIONS! YOU`VE COMPLETED THE WORD!');
        this.tweens.add({
            targets: this.circle,   
            scale: 1000,
            duration: 500,
            ease: 'Quart.easeInOut',        
            repeat: 0,         
            onComplete:  () => {
                this.theaterCortain.destroy();
                this.circle.destroy();
                this.mask.destroy();
                this.clearBoard();
                setTimeout(() => {
                    this.applauseSound.play();
                    this.messageTwo.setText('YOU WILL EARN POINTS BY FINDING LETTERS, NUMBERS, OR SOMETIMES THE GRAPHIC REPRESENTATION OF THE WORD.');
                    this.messageThree = this.add.text(window.innerWidth/2, window.innerHeight/2, 
                        'THANK YOU FOR YOUR TIME, AND WE HOPE YOU ENJOY\nTHE NEXT WORD. SEE YOU SOON!', { 
                            fontSize: '1rem ',
                            fontFamily: "Fredoka",
                            stroke: "#39484a",
                            strokeThickness: 8,
                            wordWrap: { width: window.innerWidth/1.5, useAdvancedWrap: true },
                            align:"center",
                        }).setOrigin(0.5,0.5).setDepth(5);
                },2000)
            },
            onCompleteParams: [this]
        });
    }

    clearBoard(step){
        
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
                if(i == countWords){
                    setTimeout(() => {
                        deleteArray.forEach((el,idx) => {
                            this.wordsImage[idx].destroy();
                        });
                    },150)
                }else{
                    i++;
                }
            }); 
        });   
    }

    typewriteText(text)
    {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.message.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
}

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}