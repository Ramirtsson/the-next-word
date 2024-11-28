import Phaser from "../lib/phaser.js";
import ArrayWord from "../../assets/js/array-word.js";

export class GameScene extends Phaser.Scene{
    constructor(){
        super({key:'Game'});
        this.arrayWord = []
        this.formattedText = ""
        this.nextWord = ""
    }

    async create(){
        this.nextWord = new ArrayWord("Sports");
        await this.nextWord.loadData();

        this.arrayWord = this.nextWord.getArrayWord()
        console.log(this.arrayWord)

        this.formattedText = this.arrayWord.map(row => row.join(' ')).join('\n');

        this.textObject = this.add
        .text(this.scale.width / 2, this.scale.height / 2, this.formattedText, {
          fontSize: '32px',
          color: '#ffffff',
          align: 'center',
        })
        .setOrigin(0.5);

        setTimeout(()=>{
            this.arrayWord = this.nextWord.getArrayWord()
            console.log(this.arrayWord)

            this.formattedText = this.arrayWord.map(row => row.join(' ')).join('\n');
            this.textObject.setText(this.formattedText);
        },5000)
    }
}