var hangman = {
guesses:10,
dictionary:["Tastatur", "Praktikum", "Burgverlies", "Portemonnaie", "Typ", "Terrasse", "Ouvertüre", "Quarzuhr",
            "Kirschkernweitspuckwettbewerb", ],
usedChar: [],
chosWord: "",
secWord: "",
};

document.getElementById('hangman-reset').onclick=startgame;

function startgame() 
{   
    document.getElementById('ergebnis').value="";
    document.getElementById('input').value="";
        hangman.guesses=10;
    document.getElementById('hangman-lives').innerText=hangman.guesses;
    var used = hangman.usedChar = [];
    document.getElementById('charUsed').innerText=used;
    start();
    setImage();
};

function start()
{
    var x = Math.round(Math.random() * (hangman.dictionary.length-1));
    var word = hangman.dictionary[x];
    hangman.chosWord = word.toLowerCase();
    var char = word.length;
    var secWord = "";
    var schritt;
        for (schritt = 0; schritt < char; schritt++) {
            secWord = secWord + "_ ";
        }
    document.getElementById('ergebnis').value=secWord;
    hangman.secWord = secWord;
};
startgame();

document.getElementById('enterbut').onclick=guess;

function guess() {
    if (hangman.guesses > 0) {
        var char = document.getElementById('input').value.toLowerCase();
        var pos = hangman.chosWord.indexOf(char);
        var posUsed = hangman.usedChar.indexOf(char); // Wrong letter
        var inputClear = document.getElementById('input');

        if (posUsed != -1) {
            alert("Du hast diesen Buchstaben schon benutzt!")
            inputClear.value="";
        }

        else {
            if (pos == -1) {
                hangman.guesses--;
                document.getElementById('hangman-lives').innerText=hangman.guesses;
                hangman.usedChar.push(char);
                document.getElementById('charUsed').innerText=hangman.usedChar.join(', ');
                inputClear.value="";
                setImage();

                if (hangman.guesses == 0) {
                    alert("Game Over! Das Wort ist " + hangman.chosWord);
                }
            }
            while (pos != -1) {
                var secWord = hangman.secWord;
                var replace = replaceat(pos, char, secWord);
                pos = hangman.chosWord.indexOf(char, pos + 1);
                hangman.secWord = replace;
                document.getElementById('ergebnis').value=replace;
                inputClear.value="";
            }
            if (hangman.secWord.indexOf("_")== -1) {
                alert("Gut gemacht! Das Wort war " + hangman.chosWord);
            }
        }
    }
    else{
        alert("Du musst das Spiel neustarten!");
    }
};

document.addEventListener("keydown",
function(event) {
    if (event.key === "Enter")
        guess();
});

function replaceat(pos, char, chosWord="") {
    var word = chosWord.slice(0, pos * 2);
    var str = chosWord.slice(pos * 2 + 1);
    if (pos == 0) {
        char = char.toUpperCase();
    }
    return word + char + str; 
}

function setImage() {
    var number = 10 - hangman.guesses;
    document.getElementById("hangman-img").src="/src/hangman" + number + ".png";
};