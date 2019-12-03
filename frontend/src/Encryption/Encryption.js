class Encryption {

    Ceaser(text, iteration) {
        let newText = text.toString().toLowerCase();
        let encryptedText = '';
        let alphabet = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"]

        var encryption = (letter) => {
            alphabet.forEach((Letter, key) => {
                if (letter === Letter) {
                    encryptedText += alphabet[((key + parseInt(iteration)) % 33)];

                }
            });
        }
        for (const letter of newText) {
            encryption(letter);
        }
        return encryptedText;
    }

    CeaserDecoding(encryptedText, iteration) {
        let orjinalText = '';
        let alphabet = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"]

        var decode = (letter) => {
            alphabet.forEach((Letter, key) => {
                if (letter === Letter) {
                    orjinalText += alphabet[((key - parseInt(iteration)) % 33)];

                }
            });
        }
        for (const letter of encryptedText) {
            decode(letter);
        }
        return orjinalText;
    }

    Polybius(text) {
        let newText = text.toString().toLowerCase();
        let encryptedText = '';
        let polybiusMatrix = [[" /a", "b", "c/ç", "d", "e"],
        ["f", "g,ğ", "h", "ı/i", "j"],
        ["k", "l", "m", "n", "o/ö"],
        ["p", "q", "r", "s/ş", "t"],
        ["u/ü", "v", "w/x", "y", "z"]]

        let encryption = (letter) => {
            polybiusMatrix.forEach((row, rowkey) => {
                row.forEach((column, columnkey) => {
                    let letterSplit = column.split("/");
                    letterSplit.forEach((Letter, Letterkey) => {
                        if (letter === Letter) {
                            encryptedText += (rowkey + 1).toString() + Letterkey.toString() + (columnkey + 1).toString();
                        }
                    });
                });
            });
        }
        for (const letter of newText) {
            encryption(letter);
        }
        return encryptedText;
    }

    Vigenere(text, keyword) {
        let dizi = [
            ["a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " "],
            ["b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a"],
            ["c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b"],
            ["ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c"],
            ["d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç"],
            ["e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d"],
            ["f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e"],
            ["g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f"],
            ["ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g"],
            ["h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ"],
            ["ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h"],
            ["i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı"],
            ["j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i"],
            ["k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j"],
            ["l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k"],
            ["m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l"],
            ["n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m"],
            ["o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n"],
            ["ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o"],
            ["p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö"],
            ["q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p"],
            ["r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q"],
            ["s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r"],
            ["ş", "t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s"],
            ["t", "u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş"],
            ["u", "ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t"],
            ["ü", "v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u"],
            ["v", "w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü"],
            ["w", "x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v"],
            ["x", "y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w"],
            ["y", "z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x"],
            ["z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y"],
            [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"]
        ]
        let column = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
        let row = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
        let newText = text.toString().toLowerCase();
        let newKeyword = keyword.toString().toLowerCase();
        let keywordLength = keyword.toString().length;
        let numberOfRow = 0;
        let numberOfColumn = 0;
        let encryptedText = '';

        let rowFunction = (letter) => {

            row.forEach((Letter, key) => {
                if (Letter === letter) {
                    numberOfRow = key;
                }
            });

        }

        let columnFunction = (keyword) => {

            column.forEach((Letter, key) => {
                if (Letter === keyword) {
                    numberOfColumn = key;
                }
            });

        }

        let encryption = (letter, keyword) => {
            rowFunction(letter);
            columnFunction(keyword);
            encryptedText += dizi[numberOfRow][numberOfColumn];
        }

        for (let i = 0; i < newText.length; i++) {
            encryption(newText[i], newKeyword[i % keywordLength]);
        }
        return encryptedText;
    }

    PicketFence(text) {
        let newText = text.toString().toLowerCase();
        let singleLetter = '';
        let doubleLetter = '';
        let encryptedText = '';
        for (let i = 0; i < newText.length; i++) {
            const letter = newText[i];
            if (i % 2 === 0) {
                singleLetter += letter;
            } else {
                doubleLetter += letter;
            }
        }

        for (let i = 0; i < (newText.length) / 2; i++) {
            if (singleLetter[i]) {
                encryptedText += singleLetter[i];
            }
        }
        for (let i = 0; i < (newText.length) / 2; i++) {
            if (doubleLetter[i]) {
                encryptedText += doubleLetter[i];
            }
        }
        return encryptedText;

    }

    Columnar(text) {
        let newText = text.toString().toLowerCase();
        let encryptedText = '';
        let numberOfMatrix = 0;
        for (let index = 0; ; index++) {
            const indexPow = Math.pow(index, 2)
            if (newText.length <= indexPow) {
                numberOfMatrix = index;
                break;
            }
        }

        let matrix = createColumnarArray(numberOfMatrix);
        let numberOfNewText = 0;

        for (let row = 0; row < numberOfMatrix; row++) {
            for (let column = 0; column < numberOfMatrix; column++) {
                matrix[row][column] = newText[numberOfNewText];
                numberOfNewText++;
            }
        }

        for (let row = 0; row < numberOfMatrix; row++) {
            for (let column = 0; column < numberOfMatrix; column++) {
                if (matrix[column][row]) {
                    encryptedText += matrix[column][row];
                }
            }
        }
        return encryptedText;
    }

}

function createColumnarArray(numberOfMatrix) {
    let matrix = new Array(numberOfMatrix);
    for (let index = 0; index < matrix.length; index++) {
        matrix[index] = new Array(numberOfMatrix);
    }
    return matrix;
}

var encrpyt = new Encryption();

export default encrpyt;