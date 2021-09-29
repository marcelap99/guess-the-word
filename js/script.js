const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingPar = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remainingSpan");
const messageDisplay = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "Magnolia";

const letterPlaceholder = function(word){
  // set empty array to insert symbol
  const placeholderLetters = [];
// loop through length of string while pusing symbol into empty array
  for(let letters of word ){
    // console.log(letters)
    // symbol was copy paste
    placeholderLetters.push("●");
  }
// join symbols together to make a string converting from array to string
  wordInProgress.innerText = placeholderLetters.join("");

};
letterPlaceholder(word);

// create event listener for click event
guessButton.addEventListener("click",function(e){
  // stop button default behavior of submitting form and reloading page
   e.preventDefault();
// grab the value being entered in input field
   const inputValue = inputLetter.value;
   console.log(inputValue);
   // clear input field after letter submitted
   inputLetter.value = "";

});
