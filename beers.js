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
		this.id = exports.object[this.rng].id
		this.blankArray = additionalFunctions.directory[0].blankmaker(this.word)[0];
		this.blankString = this.blankArray.join(" ");
		this.previousGuesses = [];
		this.guessesAllowed = additionalFunctions.directory[0].blankmaker(this.word)[1];
		this.guessesRemaining = 10;
		this.guessesMade = 0;
		this.gameType = "beers";
		this.game = function(){
			additionalFunctions.directory[0].game(this);
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