class Encryption {

    Ceaser(text, iteration) {
        let newText = text.toString().toLowerCase();
        let encryptedText = '';
        let alphabet = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"]

        var encryption = (letter) => {
            alphabet.forEach((Letter, key) => {
                if (letter === Letter) {
                    encryptedText += alphabet[((key + parseInt(iteration)) % alphabet.length)];
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
        var number = 0
        var decode = (letter) => {
            alphabet.forEach((Letter, key) => {
                if (letter === Letter) {
                    number = (key - parseInt(iteration) < 0 ?
                        ((alphabet.length + (key - parseInt(iteration))) % alphabet.length)
                        : ((key - parseInt(iteration)) % alphabet.length))
                    orjinalText += alphabet[number];
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
        let polybiusMatrix =    [[" /a", "b", "c/ç", "d", "e"],
                                ["f", "g/ğ", "h", "ı/i", "j"],
                                ["k", "l", "m", "n", "o/ö"],
                                ["p", "q", "r", "s/ş", "t"],
                                ["u/ü", "v", "w/x", "y", "~/z"]]

        let encryption = (letter) => {
            polybiusMatrix.forEach((row, rowkey) => {
                row.forEach((column, columnkey) => {
                    let letterSplit = column.split("/");
                    letterSplit.forEach((Letter, Letterkey) => {
                        if (letter === Letter) {
                            console.log(letter)
                            encryptedText += (rowkey + 1).toString() + Letterkey.toString() + (columnkey + 1).toString();
                        }
                    });
                });
            });
        }
        for (const letter of newText) {
            encryption(letter);
        }
        console.log(encryptedText);
        return encryptedText;
    }

    PolybiusDecode(text) {
        let newText = text.toString().toLowerCase();
        let codeText = '';
        let polybiusMatrix = [[" /a", "b", "c/ç", "d", "e"],
        ["f", "g/ğ", "h", "ı/i", "j"],
        ["k", "l", "m", "n", "o/ö"],
        ["p", "q", "r", "s/ş", "t"],
        ["u/ü", "v", "w/x", "y", "~/z"]]
        var matrixPosition
        var textPosition
        let encryption = (letter) => {
            polybiusMatrix.forEach((row, rowkey) => {
                row.forEach((column, columnkey) => {
                    let letterSplit = column.split("/");
                    letterSplit.forEach((Letter, Letterkey) => {
                        matrixPosition = (rowkey + 1).toString() + Letterkey.toString() + (columnkey + 1).toString()
                        if (letter === matrixPosition) {
                            codeText += Letter;
                        }
                    });
                });
            });
        }
        for (let textNum = 0; textNum < (newText.length) / 3; textNum++) {
            textPosition = ''
            for (let letterNum = textNum * 3; letterNum < (textNum * 3 + 3); letterNum++) {
                textPosition += newText[letterNum]
            }
            encryption(textPosition)
        }
        console.log(codeText);
        return codeText;
    }

    Vigenere(text, keyword) {
        let dizi = [
            [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"],
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
            ["z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y"]
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

    VigenereDecode(text, keyword) {
        let dizi = [
            [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"],
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
            ["z", " ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y"]
        ]
        let column = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
        let row = [" ", "a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z"];
        let newText = text.toString().toLowerCase();
        let newKeyword = keyword.toString().toLowerCase();
        let keywordLength = keyword.toString().length;
        let numberOfRow = 0;
        let numberOfColumn = 0;
        let decodeText = '';

        let rowFunction = (keyword) => {

            row.forEach((Letter, key) => {
                if (Letter === keyword) {
                    numberOfRow = key;
                }
            });

        }

        let columnFunction = (letter) => {

            dizi[numberOfRow].forEach((Letter, key) => {
                if (Letter === letter) {
                    numberOfColumn = key
                }
            })

        }

        let decoder = (letter, keyword) => {
            rowFunction(keyword);
            columnFunction(letter);
            decodeText += column[numberOfColumn];
        }

        for (let i = 0; i < newText.length; i++) {
            decoder(newText[i], newKeyword[i % keywordLength]);
        }
        return decodeText;
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

    PicketFenceDecode(text) {
        let newText = text.toString().toLowerCase();
        let decodeText = '';
        let midPoint = Math.round(newText.length / 2)
        for (let index = 0; index < midPoint; index++) {

            if (newText[midPoint + index] !== undefined) {
                decodeText += newText[index] + newText[midPoint + index]
            } else {
                decodeText += newText[index]
            }

        }
        return decodeText;

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
        console.log(matrix)
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
                } else {
                    encryptedText += "~";
                }
            }
        }


        return encryptedText;
    }

    ColumnarDecode(text) {
        let newText = text.toString().toLowerCase();
        let decodeText = '';
        let numberOfMatrix = 0;
        for (let index = 0; ; index++) {
            const indexPow = Math.pow(index, 2)
            if (newText.length <= indexPow) {
                numberOfMatrix = index;
                break;
            }
        }

        let matrix = createColumnarArray(numberOfMatrix);
        console.log(matrix)
        let numberOfNewText = 0;
        for (let column = 0; column < numberOfMatrix; column++) {
            for (let row = 0; row < numberOfMatrix; row++) {
                matrix[row][column] = newText[numberOfNewText];
                numberOfNewText++;
            }
        }
        for (let row = 0; row < numberOfMatrix; row++) {
            for (let column = 0; column < numberOfMatrix; column++) {
                if (matrix[row][column] && matrix[row][column] !== '~') {
                    decodeText += matrix[row][column];
                }
            }
        }
        return decodeText;
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