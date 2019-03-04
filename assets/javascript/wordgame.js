var guessWord = document.getElementById("guess-word");
var numOfGuess = document.getElementById("guess-remaining");
var guessedLettersText = document.getElementById("guessed-letters");
// var guessedLettersArray = [];
var listOfWords = ["ahsoka", "sith", "jedi", "clones" ,"vader", "yoda", "tarkin", "cody", "chewbacca", "rex"];
var gameOver = false;
var notCorrectLetter = false;
var numGuess = 15;
var wins = 0, losses = 0;
var guessedLetters = [];
var outOfGuesses, wordToGuess, blanks, gameOver;

var imagesGallery = {
    "ahsoka": "assets/images/ahsoka.jpg",
    "sith": "assets/images/sith.jpg",
    "jedi": "assets/images/jedi.jpg",
    "clones": "assets/images/clones.jpg",
    "vader": "assets/images/vader.jpg",
    "yoda": "assets/images/yoda.jpg",
    "tarkin": "assets/images/tarkin.jpg",
    "cody": "assets/images/cody.jpg",
    "chewbacca": "assets/images/chewbacca.jpg",
    "rex": "assets/images/rex.jpg"
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
    gameOver = false;
    numGuess = 15;
    guessedLettersText.textContent = "";
    fillBlank(selectRandomWord());

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

//Tracks the user input and runs the game.
function trackGame(event){
    
    console.log('x');
    var letter = event.key;
    //Checks to see if the user has pressed an alpha letter. If not, warnings user to choose a letter from the alphabet. Else, continues to run the game
    if (!(letter.match(/[a-zA-Z]/))){
        console.log('xx');
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


        listLetterIndIsNotEmpty  = (listLetterInd.length > 0);
            if (listLetterIndIsNotEmpty){
                while (listLetterIndIsNotEmpty){
                    var p = listLetterInd.pop();
                    blanks = replaceChar(blanks, p, letter);
                    listLetterIndIsNotEmpty = !(listLetterInd.length === 0);
                }
                guessWord.textContent = blanks;

                gameOver = (guessWord.textContent === wordToGuess);
            }
            else{
                notCorrectLetter = true;
            }

            //Updates number of guesses remaining and guessed letter array by adding user input
            if((guessedLetters.length === 0) || (guessedLetters.indexOf(letter.toLowerCase()) === -1)){
                numGuess--;
                numOfGuess.textContent = numGuess;
                outOfGuesses = (numGuess === 0);
                guessedLetters.push(letter.toLowerCase());
                if(blanks.indexOf(letter.toLowerCase()) === -1){
                    guessedLettersText.textContent += (" " + letter);
                 }
             

            }
        }

        
    if(outOfGuesses){
        alert("Sorry you lost.");
        losses++;
        document.getElementById("num-of-losses").textContent = losses;
        reset();
    }
    else if(gameOver){
        alert("Congratulations for solving the words.");
        document.querySelector("#char-pic").src = imagesGallery[wordToGuess]
        wins++;
        document.getElementById("num-of-wins").textContent = wins;
        reset();
    }
    
}
    

//Starting game function
function init(){
    wordToGuess = selectRandomWord();
    fillBlank(wordToGuess);

    document.addEventListener("keydown", trackGame);
}

document.onload = init();
