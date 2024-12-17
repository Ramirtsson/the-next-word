
class ArrayWord{
    constructor(rows = 8, cols = 6){
        this._data = []
        this.remaining = [],
        this.rows = rows
        this.cols = cols
        this.lvl = [];
        this.wrongChar = '';
        this._displayed = new Set();
        this.infoWord
        this.randomIndex
    }

    // async loadData() {
    //     if(this._data.length >0) return

    //     try {
    //       const response = await fetch('data/config.json');
            
    //       if (!response.ok) {
    //         throw new Error('Error al cargar el archivo JSON');
    //       }
    //       this._data = await response.json();
    //       this._data = this._data.filter(value => value.category === this.category);

    //     } catch (error) {
    //       console.error('Hubo un problema con la carga del archivo JSON:', error);
    //     }
    // }

    getArrayWord(remaining){
        if (this._data.length === 0) {
            console.log("No hay datos disponibles");
            return;
        }
        var availableWords;

        if(!Array.isArray(remaining)){
            availableWords = this._data;
        }else if(Array.isArray(remaining) && remaining.length >= 0){
            availableWords = remaining;
        }

        if (availableWords.length === 0) {
            console.log("Ya no hay más palabras disponibles.");
            return 'GG';
        }
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const randomWord = availableWords[randomIndex];
        this.randomIndex = randomIndex;
        this.infoWord = availableWords[randomIndex];
        this.remaining = availableWords.filter(word => word !== this.infoWord );
        this._displayed.add(randomWord);
        return this.makeArray(randomWord)
    }

    reset() {
        this._displayed.clear();
        console.log("El estado ha sido reiniciado.");
    }

    makeArray(word){
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '1234567890';
        var noWordArray;
        if(this.lvl['category'] == 'DEMO'){
           this.cols = 5;
           this.rows = 5;
        }
        var array = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));

        // console.log(array);
        
        
        const uniqueLetters = word.toUpperCase().split('');
        // console.log(uniqueLetters);
        const uniqueNumbers = numbers.toUpperCase().split('');
                    
        
        if(this.lvl['config']['fullWord'] || this.lvl['findDifference'].length > 0){
            noWordArray = this._data.map(itm => {
                if(itm != word){
                    return itm;
                }
            });

            noWordArray = noWordArray.filter(itm => itm !== undefined && itm !== null && itm !== "");

            let placed = false;
            while (!placed) {
                const randomRow = Math.floor(Math.random() * this.rows);
                const randomCol = Math.floor(Math.random() * this.cols);
                
                if (array[randomRow][randomCol] === null) {
                    array[randomRow][randomCol] = word;
                    placed = true;
                }
            }
        }else{
            // console.log(uniqueLetters);
            uniqueLetters.forEach(letter => {
                let placed = false;            
                    while (!placed) {
                        const randomRow = Math.floor(Math.random() * this.rows);
                        const randomCol = Math.floor(Math.random() * this.cols);
        
                        if (array[randomRow][randomCol] === null) {
                            array[randomRow][randomCol] = letter;
                            
                            placed = true;
                        }
                    }
            });
            // console.log(array);
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (array[i][j] === null) {
                    if(this.lvl['config']['fullWord']){  
                        array[i][j] = noWordArray[Math.floor(Math.random() * noWordArray.length)];
                    }else if(this.lvl['config']['fullWord'] && this.lvl['findDifference'].length > 0){  
                        array[i][j] = this.lvl['findDifference'][this.randomIndex];    
                    }else{
                        if(this.lvl['category'] == 'Numbers'){
                            array[i][j] = numbers[Math.floor(Math.random() * numbers.length)];
                        }else if(this.lvl['category'] == 'Letters' || this.lvl['category'] == 'DEMO'){
                            array[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
                            // console.log(alphabet[Math.floor(Math.random() * alphabet.length)]);
                            // console.log(array);
                        }
                    }
                }
            }
        }

        return array;
    
    }

}

export default ArrayWord;