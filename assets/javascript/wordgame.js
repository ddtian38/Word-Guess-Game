//Creating variables to access the DOM elements in index.html
let guessWord = document.getElementById("guess-word");
let numOfGuess = document.getElementById("guess-remaining");
let guessedLettersText = document.getElementById("guessed-letters");
let audio = document.querySelector("audio");

//Creating game object to run the game.
let game = {listOfWords: ["sith", "jedi","vader", "yoda", "tarkin", "chewbacca", "anakin", "clones"],
wordGuessCorrectly: false,
numGuess: 15,
wins: 0,
losses: 0,
wordToGuess: "",
guessedLetters: [],
outOfGuesses: false,
wordGuessCorrectly: "",
blanks: "",
imagesGallery: {
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
},
//Function selects random word from the listOfWords array
selectRandomWord: function(arr){
    numOfGuess.textContent = this.numGuess;
    var i = Math.floor(Math.random()*arr.length);
    return arr[i];
},

//Function populates the number of blanks according to the selected word
fillBlank: function(word) {
    for (var x = 0; x < word.length; x++){
        this.blanks = this.blanks + "-";
        guessWord.textContent = this.blanks;
    }
},

//Function resets the game
reset: function() {
    this.guessedLetters = [];
    this.outOfGuesses = false;
    this.wordGuessCorrectly = false;
    this.numGuess = 15;
    this.blanks = "";
    guessWord.textContent= "";
    guessedLettersText.textContent= "";
    this.wordToGuess = this.selectRandomWord(this.listOfWords)
    this.fillBlank(this.wordToGuess);
},

//Function replaces the blanks with the letter that the user types
replaceChar: function(str, ind, letter){
    if (ind === 0){
        str = letter + str.substring(1, str.length);
    }
    else{
        str = str.substring(0, ind) + letter + str.substring(ind+1);
     }
     return str;
},

//Function is runned when the player wins. Updates the picture associated with the word. Updates the number of wins the player has.
playerWins: function(){
    alert("Congratulations for solving the words.");
    document.querySelector("#char-pic").src = this.imagesGallery[this.wordToGuess]["image"];
    this.wins++;
    document.querySelector("#name").textContent = this.wordToGuess;
    document.getElementById("num-of-wins").textContent = this.wins;
    document.querySelector("audio").src = this.imagesGallery[this.wordToGuess]["sound"];
    document.querySelector("audio").play();
    game.reset();
},

//Function is runned when the player loses. Updates the number of losses the player has.
playerLoses: function() {
    alert("Sorry you lost.");
    this.losses++;
    document.getElementById("num-of-losses").textContent = this.losses;
    reset();
}





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
        var listLetterIndArr = [];
        for (var i = 0; i < game.wordToGuess.length;i++){
            if (game.wordToGuess[i] === letter.toLowerCase()){
                listLetterIndArr.push(i);
            }
        }

            // Checks to see if the listLetterArray is empty or not. If it's not empty, then the letter that the user typed is part of the word to guess and it fills in the blanks with the typed letter.
            var listLetterIndIsNotEmpty  = (listLetterIndArr.length > 0);
            if (listLetterIndIsNotEmpty){
                while (listLetterIndIsNotEmpty){
                    var p = listLetterIndArr.pop();
                    game.blanks = game.replaceChar(game.blanks, p, letter);
                    listLetterIndIsNotEmpty = !(listLetterIndArr.length === 0);
                }
                //Updates the blanks with the letter
                guessWord.textContent = game.blanks;
                //Checks if the player has correctly guessed the word
                game.wordGuessCorrectly = (guessWord.textContent === game.wordToGuess);
            }
            
            //Updates number of guesses remaining and guessed letter array by adding user input
            if((game.guessedLetters.length === 0) || (game.guessedLetters.indexOf(letter.toLowerCase()) === -1)){
                game.numGuess--;
                numOfGuess.textContent = game.numGuess;
                game.guessedLetters.push(letter.toLowerCase());
                if(game.blanks.indexOf(letter.toLowerCase()) === -1){
                    guessedLettersText.textContent += (" " + letter);
                 }
             
            }
        }

    //Checks if the player has runned out of guesses
    game.outOfGuesses = (game.numGuess === 0);
    
    if(game.outOfGuesses){
        //If the player runs out of guesses but guesses the word correctly, the player wins. Else the player loses.
        if(game.wordGuessCorrectly){
            game.playerWins();
        }
        else{
            game.playerLoses();
        }
    }
    else if(game.wordGuessCorrectly){
        game.playerWins();
    }
    
}
    

//Starting game function
function main(){
    game.wordToGuess = game.selectRandomWord(game.listOfWords);
    game.fillBlank(game.wordToGuess);

    document.addEventListener("keydown", trackGame);
}
//When the web page has loaded, run main() to play the game.
document.onload = main();