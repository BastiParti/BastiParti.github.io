
var hangman = {
guesses:10,
dictionary:["Tastatur", "Praktikum", "Burgverlies", "Portemonnaie", "Typ", "Terrasse", "Ouvertuere", "Quarzuhr",
            "Kirschkernweitspuckwettbewerb", "Tafelschwamm", "Tisch", 
            "Werkbank", "Donaudampfschifffahrtsgesellschaft", "Rhein", "Lehrer", "Main", "Donau", "Television", 
            "Kater", "Kerze", "Weihnachten", "Weihnachtsfest", "Heiligabend", "Katze", "Rucksack", "Großvater",
            "Elternteil", "Großmutter", "Lautsprecher", "Fernsehschrank", "Innenraumbeleuchtung", "Tischdecke", 
            "Adventskranz", "Unterstant", "Baumschule", "Wohnhaus", "Wohnung", "Elternsprechtag", "Nachsitzen", 
            "Nachschub", "Ofen", "Weihnachtsgeschenk", "Ausserhaus", "Schulleitung", "Schultag", "Verspaetung", 
            "Computer", "Bierausschank", "Drucker", "Schreibtisch", "Stift", "Druckerpatrone", "Bilderrahmen", 
            "Lichterkette", "Tablette", "Tannenbaum", "Tannenbaumständer", "Legospielzeug", "Schrankreihe", 
            "Fenster", "Deckenlampe", "Tischlampe", "Feuerkorb", "Lautsprechersystem", "Kratzbaum", "Couch", 
            "Couchecke", "couchleuchte", "Blumentopf", "Katzenspielzeug", "Besen", "Handfeger", "Buchreihe", 
            "Bücher", "Efeu", "Kerzenstaender", "Alkohol", "Hocker", "Cristkind", "Christentum", "Judentum", 
            "Islam", "Jerusalem", "Hamburgerinnenstadt", "Uhrenturm", "Leuchtturm", "Computerstuhl", "Kronleuchter", 
            "Tischunterplatte", "Teppich", "Gelbersack", "Gelbetonne", "Grauetonne", "Gruenetonne", "Kompost", "Laptop", 
            "Unterlagen", "Quarzleuchte", "Glühbirne", "Staubsauger", "Schaufelradlader", "Radlader", "Baustelle", 
            "Baustellenleitung", "Baustellenaufsicht", "Lernprogramm", "Programierer", "Kaninchen", "Pferd", "Pferdestall", 
            "Pferdepflege", "Hautarzt", "Arzt", "Binomischeformeln", "Griechisch", "Mathematik", "Unterricht", "Erdnuesse", 
            "Erdnusflips", "Vegetarisch", "Bier", "Brauerrei", "Stoertebecker", "Großstadt", "Kleinstadt", "Komma", "Punkt", 
            "Punktevergabe", "Glass", "Gesalzen", "Salz", "Frisch", "Fisch", "Trockenfutter", "Garnele", "Fischfutter", 
            "Frischfleisch", "Fleisch", "Trockenfleisch", "Hausnummer", "Nummer", "Name", "Nachname", "Vorname", "Erde", 
            "Motorradclub", "Motorradfahrgemeinschaft", "Motorrad", "Speichern", "Loeschen", "Alkoholfrei", "Vitamin", 
            "Gerste", "Gerstenmalz", "Zucker", "Traubenzucker", "Kohlensaeure", "Farbstoff", "Mais", "Maisduenger", "Dünger", 
            "Feuerloescher",  ],
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