var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys.js");
var hangman = require("./hangman.js");
var additionalFunctions = require("./additionalfxns.js");
var swapi = require("swapi-node")

exports.object = [
	{
		StarWarsConstructor: function(){
			this.category = additionalFunctions.directory[0].rngSW(3)[0];
			this.possibleAnswers = additionalFunctions.directory[0].rngSW(3)[1];
			this.gameSetup = () => {
				gameSetup(this.category, this.possibleAnswers);
			}
		}
	}
]

var gameSetup = function(category, possibleAnswers){
	var rng = additionalFunctions.directory[0].rng(possibleAnswers.length);
	var url =  "http://swapi.co/api/" + category + "/" + rng;
	console.log(rng);
	swapi.get(url).then((result) =>{
		// console.log(result);
		var word1 = result.name;
		var word = word1.toUpperCase();
		var blankArray = additionalFunctions.directory[0].blankmaker(word)[0];
		var blankString = blankArray.join(" ");
		var previousGuesses = [];
		var guessesAllowed = additionalFunctions.directory[0].blankmaker(word)[1];
		var guessesRemaining = 10;
		var guessesMade = 0
		var game = function(){
			console.log(word);
			console.log(blankString);
			if (guessesRemaining > 0 && guessesAllowed != guessesMade) {
				//have to set a variable equal to this due to scoping and such. Only used for validation
				var prior = previousGuesses;
				//question for the inquirer prompt
				var question = [
					{
						type: "input",
						message: "Choose a letter",
						//validates that input is a letter, only one letter is guessed, and that the letter hasn't been used yet
						validate: function(input){
							var code = input.toUpperCase().charCodeAt();
							var beenUsed = false;
							var tooLong = false;
							for (var i = 0; i < prior.length; i++){
								if (input.toUpperCase() === prior[i]){
									beenUsed = true;
								}
							}
							if (input.length != 1) {
								console.log("\nPlease enter only 1 letter");
								return false;
							} else if (code <= 90 && code >= 65 && beenUsed === false){
								return true;
							} else {
								if (beenUsed === true){
									console.log("\nThis has already been used");
								} else {
									console.log("\nPlease select a letter. No numbers or characters");
								}
								return false;
							}
						},
						name: "character"
					}
				]
				//asks the user to pick a question. The .then is where all game logic is
				inquirer.prompt(question).then((answer) =>{
					// foundOne is used to determine if the user got a letter right or not. If true, guessesRemaining doesn't iterate
					var foundOne = false;
					var uppercase = answer.character.toUpperCase().charAt();
					//iterates through blankarray checking if the uppercase character is in it
					for (var i = 0; i < word.length; i++){
						if (word.charAt(i) === uppercase){
							blankArray[i] = uppercase;
							foundOne = true;
							guessesMade++;
						}
					}
					if (foundOne === false) {
						guessesRemaining--;
					}
					//pushes uppercase to the previous guesses
					previousGuesses.push(uppercase);
					blankString = blankArray.join(" ");
					game();
				})
				//this runs if the user has guessed everythign right
			} else if (guessesMade === guessesAllowed){
				console.log("You won!");
				additionalFunctions.directory[0].starWarsInfo(result, category);
				//this runs if the user runs out of guesses
			} else {
				console.log("Game over man. Game over");
				additionalFunctions.directory[0].starWarsInfo(result, category);
			}
		}
		game();
	})
}