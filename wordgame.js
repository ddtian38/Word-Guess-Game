var guessWord = document.getElementById("guess-word");
var numOfGuess = document.getElementById("guess-remaining");
var guessedLetters = document.getElementById("guessed-letters");
// var guessedLettersArray = [];
var listOfWords = ["ahsoka", "sith", "jedi", "clones" ,"vader", "yoda", "windu", "tarkin", "cody"];
var gameOver = false;
var notCorrectLetter = false;
var numGuess = 15;
var wins = 0, losses = 0;
var outOfGuesses, wordToGuess, blanks, guessCorrectly;


// A random index is selected from words list and fills the space with blank
function selectRandomWord(){
    numOfGuess.textContent = numGuess;
    var i = Math.floor(Math.random()*listOfWords.length);
    wordToGuess = listOfWords[i];
    blanks = "";
    for (var x = 0; x < wordToGuess.length; x++){
        blanks = blanks + "-";
    }
    guessWord.textContent = blanks;
}

function reset(){
    outOfGuesses= false;
    guessCorrectly = false;
    numGuess = 15;
    guessedLetters.textContent = "";
    selectRandomWord();

}


function replaceChar(str, ind, letter){
    if (ind === 0){
        str = letter + str.substring(1, str.length);
    }
    else{
        str = str.substring(0, ind) + letter + str.substring(ind+1);
     }
     return str;
}

//Tranks the user input and runs the game.
function trackGame(event){
    
    console.log('x');
    var letter = event.key;

    if (!(letter.match(/[a-zA-Z]/))){
        console.log('xx');
        alert("Please choose letters from the alphabet");
    }

    else{
            if (wordToGuess.indexOf(letter.toLowerCase()) !== -1){
                blanks = replaceChar(blanks, wordToGuess.indexOf(letter.toLowerCase()), letter);
                guessWord.textContent = blanks;
                guessCorrectly = (guessWord.textContent === wordToGuess);
            }
            else{
                notCorrectLetter = true;
            }

            //Updates number of guesses remaining
            numGuess--;
            numOfGuess.textContent = numGuess;
            outOfGuesses = (numGuess === 0);

            //Updates guessed letter array by adding user input
            if(notCorrectLetter){
                console.log('pppppp');
                console.log(notCorrectLetter);
                guessedLetters.textContent += (" " + letter);
                outOfGuesses = (numGuess === 0);
                notCorrectLetter = false;
            }
        }

    console.log(notCorrectLetter);
    if(outOfGuesses){
        alert("Sorry you lost.");
        losses++;
        document.getElementById("num-of-losses").textContent = losses;
        reset();
    }
    else if(guessCorrectly){
         setTimeout(alert("Congratulations for solving the words."),5000);
        wins++;
        document.getElementById("num-of-wins").textContent = wins;
        reset();
    }
    
}
    

//Starting game function
function init(){
    selectRandomWord();

    document.addEventListener("keydown", trackGame);
}

document.onload = init();
