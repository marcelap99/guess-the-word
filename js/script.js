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
// loop through length of string while pusing symbol into empty array
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
  }

};
