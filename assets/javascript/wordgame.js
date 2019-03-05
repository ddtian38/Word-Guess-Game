let guessWord = document.getElementById("guess-word");
let numOfGuess = document.getElementById("guess-remaining");
let guessedLettersText = document.getElementById("guessed-letters");
let audio = document.querySelector("audio");

let game = {listOfWords: ["sith", "jedi","vader", "yoda", "tarkin", "chewbacca", "anakin", "clones"],
wordGuessCorrectly: false,
notCorrectLetter: false,
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

selectRandomWord: function(arr){
    numOfGuess.textContent = this.numGuess;
    var i = Math.floor(Math.random()*arr.length);
    return arr[i];
},

fillBlank: function(word) {
    for (var x = 0; x < word.length; x++){
        this.blanks = this.blanks + "-";
        console.log(this.blanks);
    guessWord.textContent = this.blanks;
    }
},

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

replaceChar: function(str, ind, letter){
    if (ind === 0){
        str = letter + str.substring(1, str.length);
    }
    else{
        str = str.substring(0, ind) + letter + str.substring(ind+1);
     }
     return str;
},

playerWins: function(){
    alert("Congratulations for solving the words.");
    console.log(this.imagesGallery);
    console.log(this.wordToGuess);
    document.querySelector("#char-pic").src = this.imagesGallery[this.wordToGuess]["image"];
    this.wins++;
    document.querySelector("#name").textContent = this.wordToGuess;
    document.getElementById("num-of-wins").textContent = this.wins;
    document.querySelector("audio").src = this.imagesGallery[this.wordToGuess]["sound"];
    document.querySelector("audio").play();
    game.reset();
},

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


            var listLetterIndIsNotEmpty  = (listLetterIndArr.length > 0);
            if (listLetterIndIsNotEmpty){
                while (listLetterIndIsNotEmpty){
                    var p = listLetterIndArr.pop();
                    game.blanks = game.replaceChar(game.blanks, p, letter);
                    listLetterIndIsNotEmpty = !(listLetterIndArr.length === 0);
                }
                guessWord.textContent = game.blanks;

                game.wordGuessCorrectly = (guessWord.textContent === game.wordToGuess);
            }
            else{
                game.notCorrectLetter = true;
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

    game.outOfGuesses = (game.numGuess === 0);

    if(game.outOfGuesses){
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
    console.log('xxx');
    game.fillBlank(game.wordToGuess);

    document.addEventListener("keydown", trackGame);
}

document.onload = main();




// var guessWord = document.getElementById("guess-word");
// var numOfGuess = document.getElementById("guess-remaining");
// var guessedLettersText = document.getElementById("guessed-letters");
// var audio = document.querySelector("audio");
// var listOfWords = ["sith", "jedi","vader", "yoda", "tarkin", "chewbacca", "anakin", "clones"];
// var wordGuessCorrectly = false;
// var notCorrectLetter = false;
// var numGuess = 15;
// var wins = 0, losses = 0;
// var guessedLetters = [];
// var outOfGuesses, wordToGuess, blanks;
// var imagesGallery = {
//     "sith": { image: "assets/images/sith.jpg",
//               sound: "assets/sounds/sith.mp3"
//              },
//     "jedi": { image: "assets/images/jedi.jpg",
//              sound: "assets/sounds/jedi.mp3"
//             }, 
//     "vader": { image: "assets/images/vader.jpg",
//             sound: "assets/sounds/vader.mp3"
//             },
//     "yoda": { image: "assets/images/yoda.jpg",
//             sound: "assets/sounds/yoda.mp3"
//              },
//     "tarkin": { image: "assets/images/tarkin.jpg",
//              sound: "assets/sounds/tarkin.mp3"
//             },

//     "chewbacca": { image:"assets/images/chewbacca.jpg",
//             sound: "assets/sounds/chewbacca.wav"
//             },

//     "anakin": { image: "assets/images/anakin.jpg",
//             sound:"assets/sounds/anakin.mp3"

//     },
//     "clones": { image: "assets/images/clone.jpg",
//             sound: "assets/sounds/clone.ogg"
//     }
// }

// // A random index is selected from words list and fills the space with blank
// function selectRandomWord(){
//     numOfGuess.textContent = numGuess;
//     var i = Math.floor(Math.random()*listOfWords.length);
//     return listOfWords[i];
// }

// function fillBlank(word){
//     blanks = "";
//     for (var x = 0; x < word.length; x++){
//         blanks = blanks + "-";
//     guessWord.textContent = blanks;
// }
// }

// //Function resets the game after the word has been correctly guessed.
// function reset(){
//     guessedLetters = [];
//     outOfGuesses= false;
//     wordGuessCorrectly = false;
//     numGuess = 15;
//     guessWord.textContent= "";
//     guessedLettersText.textContent= "";
//     wordToGuess = selectRandomWord()
//     fillBlank(wordToGuess);

// }

// //Function replaces blanks with corrected input keyboard letter
// function replaceChar(str, ind, letter){
//     if (ind === 0){
//         str = letter + str.substring(1, str.length);
//     }
//     else{
//         str = str.substring(0, ind) + letter + str.substring(ind+1);
//      }
//      return str;
// }

// function playerWins(){
//     alert("Congratulations for solving the words.");
//     document.querySelector("#char-pic").src = imagesGallery[wordToGuess]["image"];
//     wins++;
//     document.querySelector("#name").textContent = wordToGuess;
//     document.getElementById("num-of-wins").textContent = wins;
//     document.querySelector("audio").src = imagesGallery[wordToGuess]["sound"];
//     document.querySelector("audio").play();
//     reset();
// }

// function playerLoses(){
//     alert("Sorry you lost.");
//     losses++;
//     document.getElementById("num-of-losses").textContent = losses;
//     reset();
// }