var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys.js");
var hangman = require("./hangman.js");
var additionalFunctions = require("./additionalfxns.js");
var swapi = require("swapi-node")


// url = "https://gateway.marvel.com:443/v1/public/characters?name=iron%20man&apikey=d1941b2610bada83a4f287cc22733518"
exports.marvel = [
	{
		CharacterConstructor: function(){
			this.rng = additionalFunctions.directory[0].rng(36);
			this.word = exports.marvel[1][this.rng].toUpperCase();
			this.blankArray = additionalFunctions.directory[0].blankmaker(this.word)[0];
			this.blankString = this.blankArray.join(" ");
			this.previousGuesses = [];
			this.guessesAllowed = additionalFunctions.directory[0].blankmaker(this.word)[1];
			this.guessesRemaining = 10;
			this.guessesMade = 0
			this.gameType = "marvel";
			//primary game script
			this.game = function(){
				additionalFunctions.directory[0].game(this);
			}
		}
	},
	[
		"Intentionally left blank",
		"Iron Man",
		"Captain America",
		"Hulk",
		"Hawkeye",
		"Black Widow",
		"Thor",
		"Iron Patriot",
		"Vision",
		"Scarlet Witch",
		"Thanos",
		"Nick Fury",
		"Maria Hill",
		"Peter Quill",
		"Gamora",
		"Nebula",
		"Drax",
		"Rocket Raccoon",
		"Groot",
		"Mantis",
		"Ego",
		"Doctor Strange",
		"Black Panther",
		"Bucky",
		"Falcon",
		"Pepper Potts",
		"Happy Hogan",
		"Spider-Man",
		"Mary Jane Watson",
		"Odin",
		"Loki",
		"Jane Foster",
		"Sif",
		"Daredevil",
		"Jessica Jones",
		"Luke Cage",
		"Foggy Nelson"
	]
]