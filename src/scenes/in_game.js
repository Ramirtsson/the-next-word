

export class inGameScene extends Phaser.Scene{
    constructor(){
        super({key:'inGameScene'});
    }

    init(data) {
        // Recibe los datos pasados desde EscenaOrigen
        this.words = data.words || 'Desconocido';
    }

    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_game");
        elements.showBtnReturn(this,originScreen);
        elements.showBtnMoney(this);
        this.drawBoard()
    }

    drawBoard(){
        
        //aca pintamos el tablero

       this.words
    }


    
}