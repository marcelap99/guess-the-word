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
let remainingGuesses = 8;

// CREATE ASYNC FUNCTION TO FETCH DATA
const getWord = async function(){
// Fetch request to pull in data
  const wordRequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  // Data in Text format
  const textData = await wordRequest.text();
  // console.log(textData)
  // Split text data creating an array, split at white space
  const fetchedWordArray = textData.split("\n");
  // console.log(fetchedWordArray);

  // create a random number to be used an the array index
   const randomWordIndex = Math.floor(Math.random() * fetchedWordArray.length);

   // Grab item in array based on specific index
   const newWord = fetchedWordArray[randomWordIndex];
   // Get rid of white space from word
   word = newWord.trim();
   // console.log(`the new word:${word}`)

   // Call letterPlacehodler function with new random word so place holders match each word being guessed
   letterPlaceholder(word);
   console.log(word)

};
// Starts the game
getWord();



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

    displayGuessed();
    countGuessesRemaining(inputValue);
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

// CREATE A FUNCTION TO KEEP TRACK OF NUM OF GUESSES
function countGuessesRemaining(inputValue){
  // Convert word fetched in to Capitalize
  const upperCasedWord = word.toUpperCase();
// The includes() method returns true if a string contains a specified string, otherwise false.
// Check if word does !not include letter entered
// Only subtract num of guesses if wrong guess
  if(!upperCasedWord.includes(inputValue)){
    messageDisplay.innerText = `The word does not include this letter.`;
    remainingGuesses -= 1;
  }else{
      messageDisplay.innerText = `Good guess the letter is in this word!`;
  }
// Change message displayed and num of guesses remaining
  if(remainingGuesses === 0){
    messageDisplay.innerText = `The game is over! The word is "${upperCasedWord}"`;
    remainingSpan.innerText = `0 guesses`;
    startover();
  } else if(remainingGuesses === 1){
    remainingSpan.innerText = `1 guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }

};


// CREATE FUNTION TO CHECK IF GUESSED CORRECTLY AND WON!
function checkIfWin(){
  // console.log(wordInProgress)

  // Check if word fetched is the same as word guessed by player
  if(word.toUpperCase() === wordInProgress.innerText){
    // Change class name (changes CSS) of message paragraph
    messageDisplay.classList.add("win");
    // Change text of message being displayed
    messageDisplay.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';

    startover();
  }
// this function gets called in the updateWordInProgress function
};

// CREATE FUNCTION TO HIDE AND SHOW SOME ELEMENTS & START OVER
function startover(){
  // Hide button by adding "hide" class
  guessButton.classList.add("hide");
  // Hide paragraph showing guesses remaining
  remainingPar.classList.add("hide");
  // Hide letters guessed
  guessedLetters.classList.add("hide");
  // Show the play again button
  playAgainButton.classList.remove("hide");
};

// CREATE CLICK EVENT FOR PLAY AGAIN BUTTON
playAgainButton.addEventListener("click",function(){
  // Remove the "win" class from message paragraph
  messageDisplay.classList.remove("win");
  // Set message to empty string
  messageDisplay.innerText = "";
  // Set guessed letters to empty string
  guessedLetters.innerText = "";
  // Reset the remaing guesses to start point
  remainingGuesses = 8;
  // Reset guessed letters array to empty array
  guessedLettersArray = [];
  // Reset the remaing guesses paragraph span
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  // Show the guess button again
  guessButton.classList.remove("hide");
  // Show paragraph with remaining guesses info
  remainingPar.classList.remove("hide");
  // Show letters being guessed again
  guessedLetters.classList.remove("hide");
  // Hide play again button
  playAgainButton.classList.add("hide");
  // RE-START THE GAME!
  getWord();

});
