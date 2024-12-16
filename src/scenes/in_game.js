

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
        // console.log(this.lvl);
        this.actionMoment = false;
        this.waitingForChange = false;
    }



    preload (){
        loadFont("Fredoka", "assets/fonts/Jua/Jua-Regular.ttf");
        const alphabt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const numbers = ['1','2','3','4','5','6','7','8','9','0'];
        
        this.load.image('SPECIAL', 'assets/sprites/words/_blank.png');
        this.load.image('SPECIAL_alt', 'assets/sprites/words/_blank_alt.png');        
        alphabt.forEach((el) => {
            this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
            this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
        })

        numbers.forEach((el) => {
            this.load.image(el, 'assets/sprites/words/'+el.toLowerCase()+'.png');
            this.load.image(el+'_alt', 'assets/sprites/words/'+el.toLowerCase()+'_alt.png');
        })
        if(this.lvl['config']['fullWord'] || this.lvl['findDifference'].length > 0){
            this.words.forEach((el) =>{
                if (this.lvl['config']['folder']) {
                    this.load.image(el.toLowerCase(), 'assets/sprites/icons/'+this.lvl['config']['folder']+"/"+el.toLowerCase()+'.png');
                }else{
                    this.load.image(el.toLowerCase(), 'assets/sprites/icons/'+el.toLowerCase()+'.png');
                }
                
            });
        }

    }

    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game");
        elements.showBtnReturn(this,originScreen);

        if (firstTime) {
            firstTime=false;
            this.anims.create({ key : "howto_anim_play",frames: this.anims.generateFrameNames("howto_anim",{start: 1,end:5}),repeat:-1});
            this.anims.create({ key : "pet_1_anim_play",frames: this.anims.generateFrameNames("pet_1_anim",{start: 1,end:4}),repeat:-1});
            var container = this.add.container(0,0);
            var modal = this.add.rectangle(mid_w, mid_h, width-(mid_w/2), height-(mid_h/2), 0xffffff, .9);
            var pet_1=this.physics.add.sprite(mid_w-(mid_w/4), mid_h+(mid_h/6), "pet_1").setScale(.6).setOrigin(.5,.5);
            var howto=this.physics.add.sprite(mid_w+(mid_w/4), mid_h, "howto_anim").setScale(.6).setOrigin(.5,.5);
            

            container.add(modal);
            container.add(pet_1);
            container.add(howto);
            container.add(this.add.image(mid_w, modal.getBounds().bottom, 'btn_got_it').setOrigin(.5,.5).setScale(default_scale*1.3).setInteractive().on("pointerdown", () => {
                container.visible=false;
                container.enable=false;
                container.destroy();
                this.drawBoard();
            }));
            container.add(this.add.text(mid_w, modal.getBounds().top , "How to Play", { fontFamily: 'Arial', fontSize: 50 }).setOrigin(.5, 0).setStroke('#000000',6));
            
            pet_1.anims.play("pet_1_anim_play",true);
            pet_1.anims.msPerFrame = 1000;
            howto.anims.play("howto_anim_play",true);
            howto.anims.msPerFrame = 1000;
                
            
        }else{
            this.drawBoard()
        }
        
        
        //elements.showBtnMoney(this);
        //this.drawBoard()
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

            this.findNow = this.add.text(window.innerWidth/14, window.innerHeight+(window.innerHeight/2), 
            'FIND NOW', { 
                fontSize: '1rem ',
                fontFamily: "Fredoka",
                stroke: '1px'
            });
            this.currentScore = 0;

            this.Points = this.add.text(window.innerWidth/14+(window.innerWidth/1.25), window.innerHeight+(window.innerHeight/2), 
                'SCORE', { 
                    fontSize: '1rem ',
                    fontFamily: "Fredoka",
                    stroke: '1px'
                }).setOrigin(0.5,0.5);


                
            if(this.lvl['config']['timeRemaining'] > 0){

                this.TimeTitle = this.add.text(window.innerWidth/14+(window.innerWidth/1.7), window.innerHeight+(window.innerHeight/2), 
                'TIME', { 
                    fontSize: '1rem ',
                    fontFamily: "Fredoka",
                    stroke: '1px'
                }).setOrigin(0.5,0.5);
                this.timeRemaining = this.lvl['config']['timeRemaining'];
                
            }
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

        if(remaining == 'FIRSTGAME'){
            if(this.lvl['config']['timeRemaining'] > 0){
                this.timer = this.time.addEvent({
                    delay: 1000,            // Disparar cada 1000 ms (1 segundo)
                    callback: () => {
                        if(this.waitingForChange === false){
                            this.timeRemaining--;   // Disminuir el tiempo restante
                        }
                        // textoTemporizador.setText(`Tiempo restante: ${tiempoRestante}s`);
                            this.showTimer('');
                        this.waitingForChange = false;
                        // Si el tiempo se agota, hacer algo
                        if (this.timeRemaining <= 0) {
                            this.timer.destroy();
                            this.clearBoard('finish');
                            this.resultTime();

                            // console.log('¡El tiempo ha terminado!');
                            // Realizar alguna acción cuando termine el tiempo
                        }
                    },
                    callbackScope: this,    // Contexto para la función de callback
                    loop: true              // Repetir indefinidamente cada segundo
                });
            }
        }

        this.wordsImage = new Array();
        this.arrayWord = this.nextWord.getArrayWord(this.dataRemaining);
        
        if(this.arrayWord == "GG"){
            // this.clearBoard('finish');
            this.resultTime();
            return;
        }

        var uniqueLetters = this.nextWord.infoWord.toUpperCase().split('')
        uniqueLetters.forEach((el,idx) =>{
            if(idx == 0){
                this.SPECIALWORD[idx] = this.add.image(window.innerWidth/12, window.innerHeight+(window.innerHeight/2), el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(1);
            }else{
                this.SPECIALWORD[idx] = this.add.image(this.SPECIALWORD[idx-1].x + (this.SPECIALWORD[idx-1].displayWidth/1.4), window.innerHeight+(window.innerHeight/2), el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(1);
            }
            this.SPECIALWORD[idx].setAlpha(0.5);
            this.SPECIALWORD[idx].name = el;
            this.SPECIALWORD[idx].used = false;
            this.SPECIALWORD[idx].setAngle(Math.random() * (30 - (-30)) + (-30));
        })
        
        
        
        this.board = this.add.rectangle(window.innerWidth/2,window.innerHeight/3,width/1.25,height/1.25,'0xffffff',0).setOrigin(0.5,0.5);
        console.log(this.arrayWord);
        this.arrayWord.forEach((room,idx) => {
            room.forEach((cel,stp) => {
                var pos = counter;
                // if(this.wordsImage[pos]) this.wordsImage[pos].destroy();

                if(this.lvl['config']['fullWord'] || this.lvl['findDifference'].length > 0){
                    this.wordsImage[pos] = this.add.image(100, 100, 'SPECIAL').setScale(this.scaleToken*1.1).setOrigin(0.5,0.5).setInteractive();

                    this.wordsImage[pos]['icon'] = this.add.image(100, 100, cel.toLowerCase()).setScale(this.wordsImage[pos].scale/4.45).setOrigin(0.5,0.5).setDepth(1);
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
                    onComplete:  () => {
                        if(pos === (8*6)-1){
                            this.showCurrentWord();
                            if(remaining == 'FIRSTGAME'){
                                if(this.lvl['config']['timeRemaining'] > 0){
                                    this.showTimer('FIRSTGAME');
                                }
                                this.showScore('FIRSTGAME');
                            }
                        }
                    },
                    onCompleteParams: [this]
                });
                this.wordsImage[pos].name = cel;
                this.wordsImage[pos].used = false;
                if(this.lvl['config']['fullWord'] === true){
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
                
                
                this.wordsImage[pos].on('pointerdown',(pointer) => {
                    pointer.event.stopPropagation();   
                    this.selectCharacter(this.wordsImage[pos],pos,cel,this.lvl['config']['fullWord']);
                });
                counter++;
            })
        });
        
    }
    showCurrentWord(){
        this.tweens.add({
            targets: this.findNow,
            y:window.innerHeight-(window.innerHeight/13),
            duration: 200,
            ease: 'Quart.easeInOut',        
            repeat: 0,         
            onComplete: function () {
                
            }
        });
        this.SPECIALWORD.forEach((itm,idx) => {
            this.tweens.add({
                targets: this.SPECIALWORD[idx],
                y:window.innerHeight-(window.innerHeight/8),
                duration: 50*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,         
                onComplete: function () {
                    
                }
            });
        })
        if(this.lvl['config']['timeRemaining'] > 0){
            this.timer.paused = false;
        }
    }
    showTimer(type){
        this.lastTime = [];
        var anglesMod = [];
        
        if(this.prettyTime && this.prettyTime.length > 0){
            this.lastTime = this.prettyTime;
            this.prettyTime.forEach((el,idx) => {
                this.prettyTime[idx].destroy();
            })
        }
        if(this.timeRemaining <= 0){
            this.timeRemaining = 0;
        }
        let translation = '';
        translation = String(this.timeRemaining);
        translation = translation.padStart(4, '0');

        this.prettyTime = [];

        var uniqueNumbers = translation.toUpperCase().split('');

        if(this.lastTime != ''){
            this.lastTime.forEach((el,idx) => {
                if("id_"+idx+"_"+uniqueNumbers[idx] == el.name){
                    anglesMod[el.name] = el.angle;
                }
            })
        }
        var positionY = window.innerHeight-(window.innerHeight/8);
        if(type == "FIRSTGAME"){
            positionY = window.innerHeight+(window.innerHeight/2);
        }

        for(let idx=uniqueNumbers.length-1; idx>=0;idx--){
            let el = uniqueNumbers[idx];
            if(idx == uniqueNumbers.length-1){
                this.prettyTime[idx] = this.add.image(this.TimeTitle.x+this.TimeTitle.displayWidth/2,positionY,el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(idx+1);
                this.prettyTime[idx].name = "id_"+idx+"_"+el;
            }else{
                this.prettyTime[idx] = this.add.image(this.prettyTime[idx+1].x - (this.prettyTime[idx+1].displayWidth/1.5), positionY,el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(idx+1);
                this.prettyTime[idx].name = "id_"+idx+"_"+el;
            }

            if(anglesMod["id_"+idx+"_"+el]){
                this.prettyTime[idx].setAngle(anglesMod["id_"+idx+"_"+el]);
            }else{
                this.prettyTime[idx].setAngle(Math.random() * (30 - (-30)) + (-30));
            }
        }
        this.waitingForChange = true;

        if(type == "FIRSTGAME"){
            this.prettyTime.forEach((el, idx) => {
                this.tweens.add({
                    targets: this.prettyTime[idx],
                    y: window.innerHeight-(window.innerHeight/8),
                    duration: 50*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,         
                    onComplete: function () {
                        
                    }
                });
            })
            this.tweens.add({
                targets: this.TimeTitle,
                y: window.innerHeight-(window.innerHeight/15),
                duration: 200,
                ease: 'Quart.easeInOut',        
                repeat: 0,         
                onComplete: function () {
                    
                }
            });
        }

        
        

    }
    showScore(type){
        this.lastScore = [];
        var anglesMod = [];
        
        if(this.prettyScore && this.prettyScore.length > 0){
            this.lastScore = this.prettyScore;
            this.prettyScore.forEach((el,idx) => {
                this.prettyScore[idx].destroy();
            })
        }

        this.prettyScore = [];
        
        let translation = '';
        
        if(type == 'plus'){
            this.currentScore++;
        }else if(type == 'wrong'){
            if(this.currentScore > 0){
                this.currentScore--;
            }
        }
        translation = String(this.currentScore);
        translation = translation.padStart(3, '0');


        var uniqueNumbers = translation.toUpperCase().split('');

        if(this.lastScore != ''){
            this.lastScore.forEach((el,idx) => {
                if("id_"+idx+"_"+uniqueNumbers[idx] == el.name){
                    anglesMod[el.name] = el.angle;
                }
            })
        }
        var positionY = window.innerHeight-(window.innerHeight/8);
        if(type == "FIRSTGAME"){
            positionY = window.innerHeight+(window.innerHeight/2);
        }

        for(let idx=uniqueNumbers.length-1; idx>=0;idx--){
            let el = uniqueNumbers[idx];
            if(idx == uniqueNumbers.length-1){
                this.prettyScore[idx] = this.add.image(this.Points.x+this.Points.displayWidth/2 , positionY,el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(idx+1);
                this.prettyScore[idx].name = "id_"+idx+"_"+el;
            }else{
                this.prettyScore[idx] = this.add.image(this.prettyScore[idx+1].x - (this.prettyScore[idx+1].displayWidth/1.5), positionY,el).setScale(this.scaleToken-0.1).setOrigin(0.5,0.5).setDepth(idx+1);
                this.prettyScore[idx].name = "id_"+idx+"_"+el;
            }

            if(anglesMod["id_"+idx+"_"+el]){
                this.prettyScore[idx].setAngle(anglesMod["id_"+idx+"_"+el]);
            }else{
                this.prettyScore[idx].setAngle(Math.random() * (30 - (-30)) + (-30));
            }
        }
        
        if(type == "FIRSTGAME"){
            this.prettyScore.forEach((el, idx) => {
                this.tweens.add({
                    targets: this.prettyScore[idx],
                    y: window.innerHeight-(window.innerHeight/8),
                    duration: 50*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,         
                    onComplete: function () {
                        
                    }
                });
            })
            this.tweens.add({
                targets: this.Points,
                y: window.innerHeight-(window.innerHeight/15),
                duration: 200,
                ease: 'Quart.easeInOut',        
                repeat: 0,         
                onComplete: function () {
                    
                }
            });
        }


    }
    clearBoard(step){
        if(this.lvl['config']['timeRemaining'] > 0){
            this.timer.paused = true;
        }
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
                if(this.lvl['config']['fullWord'] === true){
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
                            if(step == ''){
                                this.genBoard(this.words,this.nextWord.remaining);
                            }else{

                            }
                        },100)
                    },150)
                }else{
                    i++;
                }
            }); 
        });   
    }
    resultTime(){
        if(this.prettyTime){
            this.prettyTime.forEach((el, idx) => {
                this.tweens.add({
                    targets: this.prettyTime[idx],
                    y:window.innerHeight+(window.innerHeight/2),
                    duration: 100*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,         
                    onComplete: function () {
                        
                    }
                });
            })
            this.prettyTime.forEach((el, idx) => {
                this.prettyTime[idx].destroy();
            });
        }
        this.prettyScore.forEach((el, idx) => {
            this.tweens.add({
                targets: this.prettyScore[idx],
                y:window.innerHeight+(window.innerHeight/2),
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,         
                onComplete: function () {
                    
                }
            });
            this.prettyScore.forEach((el, idx) => {
                this.prettyScore[idx].destroy();
            });
        })
        this.tweens.add({
            targets: this.Points,
            y:window.innerHeight+(window.innerHeight/2),
            duration: 100,
            ease: 'Quart.easeInOut',        
            repeat: 0,         
            onComplete: function () {
                
            }
        });
        this.tweens.add({
            targets: this.TimeTitle,
            y:window.innerHeight+(window.innerHeight/2),
            duration: 100,
            ease: 'Quart.easeInOut',        
            repeat: 0,         
            onComplete: function () {
                
            }
        });
        this.tweens.add({
            targets: this.findNow,
            y:window.innerHeight+(window.innerHeight/2),
            duration: 100,
            ease: 'Quart.easeInOut',        
            repeat: 0,         
            onComplete: function () {
                
            }
        });
    
        this.youGotTextOne = ['Y','O','U']; 
        this.youGotTextTwo = ['G','O','T','I','T']; 
        
        let totalCount = this.nextWord._data.length;
        let remainingCount = (this.nextWord.remaining.length) - totalCount;


        // console.log(remainingCount);
        // console.log(totalCount);

        this.youGotTextThree = (remainingCount)+'OF'+(totalCount);
        this.youGotTextThree = this.youGotTextThree.split('');

        this.lineOneFinish = [];
        this.lineTwoFinish = [];
        this.lineThreeFinish = [];
        var temp = this.add.image(-window.innerHeight,window.innerHeight/2,'SPECIAL').setScale(this.scaleToken).setOrigin(0.5,0.5).setAlpha(0);
        this.youGotTextOne.forEach((el,idx) => {
            if(idx==0){
                this.lineOneFinish[idx] = this.add.image((window.innerWidth/2) - temp.displayWidth,-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }else{
                this.lineOneFinish[idx] = this.add.image(this.lineOneFinish[(idx-1)].x+(this.lineOneFinish[(idx-1)].displayWidth),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }
        });
        this.youGotTextTwo.forEach((el,idx) => {
            if(idx==0){
                this.lineTwoFinish[idx] = this.add.image((window.innerWidth/2) - temp.displayWidth*(this.youGotTextTwo.length/2),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }else if(idx==3){
                this.lineTwoFinish[idx] = this.add.image(this.lineTwoFinish[(idx-1)].x+(this.lineTwoFinish[(idx-1)].displayWidth*2),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }else{
                this.lineTwoFinish[idx] = this.add.image(this.lineTwoFinish[(idx-1)].x+(this.lineTwoFinish[(idx-1)].displayWidth),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }
        });
        this.youGotTextThree.forEach((el,idx) => {
            if(idx==0){
                this.lineThreeFinish[idx] = this.add.image((window.innerWidth/2) - temp.displayWidth*(this.youGotTextThree.length/2.9),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }else{
                this.lineThreeFinish[idx] = this.add.image(this.lineThreeFinish[(idx-1)].x+(this.lineThreeFinish[(idx-1)].displayWidth),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }
        });

        // for(let i=0;i<=remainingCount;i++){
        //         this.tweens.add({
        //             targets: this.lineThreeFinish[0],
        //             rotation: 45,
        //             duration: 1000,
        //             ease: 'Quart.easeInOut',        
        //             repeat: 0,
        //             yoyo:true,
        //             onComplete: () => {
        //                     console.log(i);
        //                     this.lineThreeFinish[0].setTexture(String(i));
        //             }
        //         });
        // }
        


        this.lineOneFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:window.innerHeight/2-temp.displayWidth*2,
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
            });
        })
        this.lineTwoFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:window.innerHeight/2-temp.displayWidth,
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
            });
        })
        this.lineThreeFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:window.innerHeight/2+(temp.displayWidth/2),
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
            });
        })
        this.lineOneFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                angle: (Math.random() * (15 - (-15)) + (-15)),
                duration: 500,
                ease: 'Quart.easeInOut',        
                repeat: -1,
                yoyo:true,
            });
        })
        this.lineTwoFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                angle: (Math.random() * (15 - (-15)) + (-15)),
                duration: 500,
                ease: 'Quart.easeInOut',        
                repeat: -1,
                yoyo:true,
            });
        })
        temp.destroy();
        
        if(Math.abs(remainingCount) >= Math.ceil(totalCount*0.75)){
            // console.log('Se ha conseguido');
            setTimeout(() => {
                this.finishGame('clear');
            },2000)
        }else{
            // console.log('AH! NO POS NADOTA');
            setTimeout(() => {
                this.finishGame('failed');
            },2000)
        }

    }
    finishGame(type){

        this.lineOneFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:-window.innerHeight/2,
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
            });
        })
        this.lineTwoFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:-window.innerHeight/2,
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
            });
        })
        this.lineThreeFinish.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:-window.innerHeight/2,
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
                onComplete: () => {
                    if(idx == this.lineThreeFinish.length-1){
                        this.lineOneFinish.forEach((el,idx) => {
                            this.lineOneFinish[idx].destroy();
                        })
                        this.lineTwoFinish.forEach((el,idx) => {
                            this.lineTwoFinish[idx].destroy();
                        })
                        this.lineThreeFinish.forEach((el,idx) => {
                            this.lineThreeFinish[idx].destroy();
                        })
                                 
                    }
                }
            });
        })

        this.titleStage = ['S','T','A','G','E']; 
        this.stageClear = ['C','L','E','A','R'];
        this.stageFailed = ['F','A','I','L','E','D'];
        var temp = this.add.image(-window.innerHeight,window.innerHeight/2,'SPECIAL').setScale(this.scaleToken).setOrigin(0.5,0.5).setAlpha(0);
        this.lineOneStage = [];
        this.lineTwoStage = [];


        this.titleStage.forEach((el,idx) => {
            if(idx==0){
                this.lineOneStage[idx] = this.add.image((window.innerWidth/2) - temp.displayWidth*(this.titleStage.length/2.5),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }else{
                this.lineOneStage[idx] = this.add.image(this.lineOneStage[(idx-1)].x+(this.lineOneStage[(idx-1)].displayWidth),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
            }
        });
        this.lineOneStage.forEach((el,idx) => {
            this.tweens.add({
                targets: el,
                y:window.innerHeight/2-temp.displayWidth*2,
                duration: 100*(idx+1),
                ease: 'Quart.easeInOut',        
                repeat: 0,
                yoyo:false,
            });
        })
        
        if(type == 'clear'){
            this.lineOneStage.forEach((el,idx) => {
                this.tweens.add({
                    targets: el,
                    angle: (Math.random() * (15 - (-15)) + (-15)),
                    duration: 500,
                    ease: 'Quart.easeInOut',        
                    repeat: -1,
                    yoyo:true,
                });
            })
            this.stageClear.forEach((el,idx) => {
                if(idx==0){
                    this.lineTwoStage[idx] = this.add.image((window.innerWidth/2) - temp.displayWidth*(this.stageClear.length/2.5),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
                }else{
                    this.lineTwoStage[idx] = this.add.image(this.lineTwoStage[(idx-1)].x+(this.lineTwoStage[(idx-1)].displayWidth),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
                }
            });
            this.lineTwoStage.forEach((el,idx) => {
                this.tweens.add({
                    targets: el,
                    y:window.innerHeight/2-temp.displayWidth,
                    duration: 100*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,
                    yoyo:false,
                });
            })
            this.lineTwoStage.forEach((el,idx) => {
                this.tweens.add({
                    targets: el,
                    angle: (Math.random() * (15 - (-15)) + (-15)),
                    duration: 500,
                    ease: 'Quart.easeInOut',        
                    repeat: 3,
                    yoyo:true,
                    onComplete: () => {
                        const elements = this.scene.get('elements');
                        elements.mainModes(this);   
                    }
                });
            })
        }else{
            this.stageFailed.forEach((el,idx) => {
                if(idx==0){
                    this.lineTwoStage[idx] = this.add.image((window.innerWidth/2) - temp.displayWidth*(this.stageFailed.length/2.4),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
                }else{
                    this.lineTwoStage[idx] = this.add.image(this.lineTwoStage[(idx-1)].x+(this.lineTwoStage[(idx-1)].displayWidth),-window.innerHeight/2,el).setScale(this.scaleToken).setOrigin(0.5,0.5);
                }
            });
            this.lineTwoStage.forEach((el,idx) => {
                this.tweens.add({
                    targets: el,
                    y:window.innerHeight/2-temp.displayWidth,
                    duration: 100*(idx+1),
                    ease: 'Quart.easeInOut',        
                    repeat: 0,
                    yoyo:false,
                    onComplete: () => {
                        setTimeout(() => {
                            const elements = this.scene.get('elements');
                            elements.mainModes(this); 
                        },3000)
                    }
                });
            })
        }
        
        
        temp.destroy();

    }
    
    selectCharacter(targetInfo,step,chara,lvl,mode){
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
                stepChar = this.buildResult.split('');
                // console.log(uniqueLetters);
                // console.log(stepChar);
                var foundLetter = false;
                if(this.nextWord.infoWord.includes(chara)){
                    
                    if(lvl === true){

                        if(this.nextWord._displayed.has(chara) === true){
                            this.showScore('plus');
                            foundLetter = true;

                            this.wordsImage[step].setTexture("SPECIAL_alt");
                            

                            this.tweens.add({
                                targets: this.wordsImage[step],
                                scale: this.scaleToken+(this.scaleToken/5),
                                duration: 100,
                                ease: 'Quart.easeInOut',        
                                repeat: 0,
                                yoyo:true,
                            });

                            uniqueLetters.forEach((el,idx) => {

                                this.tweens.add({
                                    targets: this.SPECIALWORD[idx],
                                    scale: this.scaleToken+(this.scaleToken/5),
                                    duration: 200,
                                    delay: 100*(idx+1),
                                    ease: 'Quart.easeInOut',        
                                    repeat: 0,
                                    yoyo:true,
                                    onComplete: () => {
                                        this.buildResult += el;
                                        if(this.buildResult.length === uniqueLetters.length){
                                            setTimeout(() => {
                                                this.actionMoment = false;
                                                if(this.lvl['config']['timeRemaining'] > 0){
                                                    this.timeRemaining += this.lvl['config']['bonusWord'];
                                                }                                        
                                                this.clearBoard('')
                                            },200)
                                        }
                                    }
                                });

                                this.tweens.add({
                                    targets: this.SPECIALWORD[idx],   
                                    alpha:1,
                                    duration: 200,
                                    delay: 100*(idx+1),
                                    ease: 'Quart.easeInOut',        
                                    repeat: 0,         
                                    onComplete: () => {
                                        
                                    },
                                });
                            });

                        }else{
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
                                    this.buildResult = '';
                                }
                            });
                        }

                    }else{
                        
                        this.SPECIALWORD.forEach((el,idx) => {
                            if(foundLetter === false && this.SPECIALWORD[idx].used === false){

                                if(chara === uniqueLetters[idx] && idx == (this.buildResult.length-1)){
                                    
                                    this.showScore('plus');
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
                                                
                                                this.clearBoard('')
                                            }
                                        },
                                    });
                                }else{
                                    foundLetter = true;
                                    console.log(this.lvl);
                                    if(this.lvl['config']['difficulty'].toUpperCase() == 'EASY'){
                                        
                                        if(this.lvl['config']['timeRemaining'] > 0){
                                            // this.showScore('wrong');
                                            this.timeRemaining -= this.lvl['config']['bonusWord'];
                                            this.showTimer();
                                        }else{
                                            this.showScore('wrong');
                                        }

                                        

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
                    }
                    
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
                                if(this.lvl['config']['timeRemaining'] > 0){
                                    // this.showScore('wrong');
                                    this.timeRemaining -= this.lvl['config']['bonusWord'];
                                    this.showTimer();
                                }else{
                                    this.showScore('wrong');
                                }
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
    
}
function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}
