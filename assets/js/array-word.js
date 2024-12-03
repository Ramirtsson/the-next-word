
class ArrayWord{
    constructor(category,rows = 8, cols = 6){
        this._data = []
        this.category = category
        this.rows = rows
        this.cols = cols
        this._displayed = new Set();
        this.infoWord
    }

    async loadData() {
        if(this._data.length >0) return

        try {
          const response = await fetch('data/words.json');
          
          if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
          }
          this._data = await response.json();

          this._data = this._data.filter(value => value.category === this.category);

        } catch (error) {
          console.error('Hubo un problema con la carga del archivo JSON:', error);
        }
    }

    getArrayWord(){
        if (this._data.length === 0) {
            console.log("No hay datos disponibles");
            return;
        }
        const availableWords = this._data.filter(word => !this._displayed.has(word.word));
        
        if (availableWords.length === 0) {
            console.log("Ya no hay más palabras disponibles.");
            return;
        }
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const randomWord = availableWords[randomIndex];
        this.infoWord = availableWords[randomIndex];
        this._displayed.add(randomWord.word);
        console.log(randomWord.word)
        return this.makeArray(randomWord.word)
    }

    reset() {
        this._displayed.clear();
        console.log("El estado ha sido reiniciado.");
    }

    makeArray(word){
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // 
        const array = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
        console.log(array);
        const uniqueLetters = word.toUpperCase().split('')
        
        if(!this.infoWord['fullWord']){
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
        }else{
            let placed = false;
            while (!placed) {
                const randomRow = Math.floor(Math.random() * this.rows);
                const randomCol = Math.floor(Math.random() * this.cols);

                if (array[randomRow][randomCol] === null) {
                    array[randomRow][randomCol] = word;
                    placed = true;
                }
            }
        }
        for (let i = 0; i < this.rows; i++) {
            
            for (let j = 0; j < this.cols; j++) {
                if (array[i][j] === null) {
                    array[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }

        return array;
    
    }

}

export default ArrayWord;