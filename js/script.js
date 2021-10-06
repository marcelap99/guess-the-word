// GRAB HTML ELEMENTS
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingPar = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remainingSpan");
const messageDisplay = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// GLOBAL VARIABLES
let word = "Magnolia";
let guessedLettersArray = [];

// FUNCTION THAT CREATES PLACE HOLDERS
const letterPlaceholder = function(word){
  // set empty array to insert symbol
  const placeholderLetters = [];
// loop through length of string while pushing symbol into empty array
  for(let letters of word ){
    // symbol was copy paste
    placeholderLetters.push("●");
  }
// join symbols together to make a string converting from array to string
  wordInProgress.innerText = placeholderLetters.join("");
};
letterPlaceholder(word);

// EVENT LISTENER CLICK EVENT BUTTON
guessButton.addEventListener("click",function(e){
  // stop button default behavior of submitting form and reloading page
   e.preventDefault();
   // clear message being displayed
   messageDisplay.innerText = "";
    // grab the value being entered in input field
   const inputValue = inputLetter.value;

// CALL VALIDATOR FUNCTION GRAB RESULT
   const validatedGuess = validateInfo(inputValue);
// IF VALIDATED GUESS CALL MAKE GUESS FUNCTION
   if(validatedGuess){
     makeGuess(inputValue);
   }

   // clear input field after letter submitted
   inputLetter.value = "";

});

// CREATE VALIDATOR FUNCTION
function validateInfo(input){
  // CREATE REGULAR EXPERSSION FOR LETTERS ONLY
  const acceptedLetter = /[a-zA-Z]/
  // check if input is empty
  if(input.length === 0){
    // change message display accordingly
    messageDisplay.innerText = "Please enter a letter field is empty.";

    // check if more than one letter was enterd
  } else if (input.length > 1){

    messageDisplay.innerText = "Please enter only one letter.";

    // check if something other than letters were entered
  } else if(!input.match(acceptedLetter)){

    messageDisplay.innerText = "Please enter only letters.";
  } else {
    // if all filters passed return the letter enetered
  return input };
  // this function gets called in the event listener
};

// CREATE FUNCTION THAT WILL UPDATE THE GUESSED LETTERS ARRAY
function makeGuess(inputValue){
  // convert to uppercase so as to not have issues with case sensitivity
  inputValue = inputValue.toUpperCase();

  // check if letter already in the array
  if(guessedLettersArray.includes(inputValue)){
    messageDisplay.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    // push letter into the array
    guessedLettersArray.push(inputValue)
    // console.log(`Array ${guessedLettersArray}`)
    displayGuessed();
    updateWordInProgress(guessedLettersArray);
  }

};


// CREATE FUNCTION THAT WILL DISPLAY LETTERS GUESSED BY THE PLAYER
function displayGuessed(){
  // Clear the list first if not it will duplicate guesses
  guessedLetters.innerHTML = "";
// Loop through array of letters guessed while making new LI inserting letter into new LI, then insert LI into display ul
  for(const letter of guessedLettersArray){
    // console.log(letter);
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
// this function gets called in the makeGuess function
};

// Create a Function to Update the Word in Progress
function updateWordInProgress(guessedLettersArray){
  // Capitalize word to be guessed
  const wordUpper = word.toUpperCase();
  // use .split() to convert into an array
  const wordArray = wordUpper.split("");
  // set empty array to reveal correct guesses
  const revealWord = [];
  // console.log(wordArray)
  // loop through array of correct word to be guesssed
  for(const letter of wordArray){
    // console.log(letter)
    // check if guessed letter is a match with the correct letters in the word to be guessed
    if(guessedLettersArray.includes(letter)){
      // insert correct guesses into empty array to be revealed
        revealWord.push(letter.toUpperCase());
    }else{
      // if guess is incorrect insert placeholder symbol
      revealWord.push("●");
    }
  }
  // console.log(revealWord)

  // use .join("") to convert array back into string, insert string as correct guesses to reveal.
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
  // this function gets called in the makeGuess function
};


function checkIfWin(){
  // console.log(wordInProgress)
  if(word.toUpperCase() === wordInProgress.innerText){
    messageDisplay.classList.add("win");
    messageDisplay.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
  }
// this function gets called in the updateWordInProgress function
};
