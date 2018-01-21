var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys.js");
var hangman = require("./hangman.js");
var additionalFunctions = require("./additionalfxns.js");

exports.object = [
	{
		BeerConstructor: function(){
		this.rng = additionalFunctions.directory[0].rng(9);
		this.word = exports.object[this.rng].name.toUpperCase();
		this.id = exports.object[this.rng].id;
		this.blankArray = additionalFunctions.directory[0].blankmaker(this.word)[0];
		this.blankString = this.blankArray.join(" ");
		this.previousGuesses = [];
		this.guessesAllowed = additionalFunctions.directory[0].blankmaker(this.word)[1];
		this.guessesRemaining = 10;
		this.guessesMade = 0
		this.game = function(){
			console.log(this.word);
			console.log(this.blankString);
			if (this.guessesRemaining > 0 && this.guessesAllowed != this.guessesMade) {
				//have to set a variable equal to this due to scoping and such. Only used for validation
				var prior = this.previousGuesses;
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
					for (var i = 0; i < this.word.length; i++){
						if (this.word.charAt(i) === uppercase){
							this.blankArray[i] = uppercase;
							foundOne = true;
							this.guessesMade++;
						}
					}
					if (foundOne === false) {
						this.guessesRemaining--;
					}
					//pushes uppercase to the previous guesses
					this.previousGuesses.push(uppercase);
					this.blankString = this.blankArray.join(" ");
					this.game();
				})
				//this runs if the user has guessed everythign right
			} else if (this.guessesMade === this.guessesAllowed){
				console.log("You won!");
				additionalFunctions.directory[0].getBeerInfo(this.id);
				//this runs if the user runs out of guesses
			} else {
				console.log("Game over man. Game over");
				additionalFunctions.directory[0].getBeerInfo(this.id);
			}
		}


			// start: additionalFunctions.directory[0].getBeerInfo();
		}
	},
	{
		name: "Dark Lord",
		id:"FhW6gN"
	},
	{
		name: "Kentucky Brunch Brand Stout",
		id:"yNJUiU"
	},
	{
		name: "Heady Topper",
		id:"CFIZtr"
	},
	{
		name: "King Julius",
		id:"ja1toN"
	},
	{
		name: "Pliny the Younger",
		id:"9UG4pg"
	},
	{
		name: "Zombie Dust",
		id:"SPClNd"
	},
	{
		name: "Pliny the Elder",
		id:"XAXGgF"
	},
	{
		name: "Morning Wood",
		id:"rnZvtV"
	},
	{
		name: "Duck Duck Gooze",
		id:"rbvEiU"
	}
]