var guessWord = document.getElementById("guess-word");
var numOfGuess = document.getElementById("guess-remaining");
var guessedLettersText = document.getElementById("guessed-letters");
var audio = document.querySelector("audio")
var listOfWords = ["sith", "jedi","vader", "yoda", "tarkin", "chewbacca", "anakin", "clones"];
var wordGuessCorrectly = false;
var notCorrectLetter = false;
var numGuess = 15;
var wins = 0, losses = 0;
var guessedLetters = [];
var outOfGuesses, wordToGuess, blanks;

var imagesGallery = {
    "sith": { image: "assets/images/sith.jpg",
              sound: "assets/sounds/sith.mp3"
             },
    "jedi": { image: "assets/images/jedi.jpg",
             sound: "assets/sounds/jedi.mp3"
            }, 
    "vader": { image: "assets/images/vader.jpg",
            sound: "assets/sounds/vader.mp3"
            },
    "yoda": { image: "assets/images/yoda.jpg",
            sound: "assets/sounds/yoda.mp3"
             },
    "tarkin": { image: "assets/images/tarkin.jpg",
             sound: "assets/sounds/tarkin.mp3"
            },

    "chewbacca": { image:"assets/images/chewbacca.jpg",
            sound: "assets/sounds/chewbacca.wav"
            },

    "anakin": { image: "assets/images/anakin.jpg",
            sound:"assets/sounds/anakin.mp3"

    },
    "clones": { image: "assets/images/clone.jpg",
            sound: "assets/sounds/clone.ogg"
    }
}

// A random index is selected from words list and fills the space with blank
function selectRandomWord(){
    numOfGuess.textContent = numGuess;
    var i = Math.floor(Math.random()*listOfWords.length);
    return listOfWords[i];
}

function fillBlank(word){
    blanks = "";
    for (var x = 0; x < word.length; x++){
        blanks = blanks + "-";
    guessWord.textContent = blanks;
}
}

//Function resets the game after the word has been correctly guessed.
function reset(){
    guessedLetters = [];
    outOfGuesses= false;
    wordGuessCorrectly = false;
    numGuess = 15;
    guessWord.textContent= "";
    guessedLettersText.textContent= "";
    wordToGuess = selectRandomWord()
    fillBlank(wordToGuess);

}

//Function replaces blanks with corrected input keyboard letter
function replaceChar(str, ind, letter){
    if (ind === 0){
        str = letter + str.substring(1, str.length);
    }
    else{
        str = str.substring(0, ind) + letter + str.substring(ind+1);
     }
     return str;
}

function playerWins(){
    alert("Congratulations for solving the words.");
    document.querySelector("#char-pic").src = imagesGallery[wordToGuess]["image"];
    wins++;
    document.querySelector("#name").textContent = wordToGuess;
    document.getElementById("num-of-wins").textContent = wins;
    document.querySelector("audio").src = imagesGallery[wordToGuess]["sound"];
    document.querySelector("audio").play();
    reset();
}

function playerLoses(){
    alert("Sorry you lost.");
    losses++;
    document.getElementById("num-of-losses").textContent = losses;
    reset();
}

//Tracks the user input and runs the game.
function trackGame(event){
    
    var letter = event.key;
    //Checks to see if the user has pressed an alpha letter. If not, warnings user to choose a letter from the alphabet. Else, continues to run the game
    if (!(letter.match(/[a-zA-Z]/))){
        alert("Please choose letters from the alphabet");
    }

    else{
        ///For loop checks if the input letter matches correctly to the word that needs to be guessed and adds the index of that letter to array listLetterInd.
        var listLetterInd = [];
        for (var i = 0; i < wordToGuess.length;i++){
            if (wordToGuess[i] === letter.toLowerCase()){
                listLetterInd.push(i);
            }
        }


        var listLetterIndIsNotEmpty  = (listLetterInd.length > 0);
            if (listLetterIndIsNotEmpty){
                while (listLetterIndIsNotEmpty){
                    var p = listLetterInd.pop();
                    blanks = replaceChar(blanks, p, letter);
                    listLetterIndIsNotEmpty = !(listLetterInd.length === 0);
                }
                guessWord.textContent = blanks;

                wordGuessCorrectly = (guessWord.textContent === wordToGuess);
            }
            else{
                notCorrectLetter = true;
            }

            //Updates number of guesses remaining and guessed letter array by adding user input
            if((guessedLetters.length === 0) || (guessedLetters.indexOf(letter.toLowerCase()) === -1)){
                numGuess--;
                numOfGuess.textContent = numGuess;
                guessedLetters.push(letter.toLowerCase());
                if(blanks.indexOf(letter.toLowerCase()) === -1){
                    guessedLettersText.textContent += (" " + letter);
                 }
             
            }
        }

    outOfGuesses = (numGuess === 0);

    if(outOfGuesses){
        if(wordGuessCorrectly){
            playerWins();
        }
        else{
            playerLoses();
        }
    }
    else if(wordGuessCorrectly){
        playerWins();
    }
    
}
    

//Starting game function
function init(){
    wordToGuess = selectRandomWord();
    fillBlank(wordToGuess);

    document.addEventListener("keydown", trackGame);
}

t1 = performance.now();
document.onload = init();
t2 = performance.now();
console.log(t1+t2/1000);
