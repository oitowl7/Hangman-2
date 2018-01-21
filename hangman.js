var inquirer = require('inquirer');
var request = require('request');
var starwars = require('swapi-node');
var keys = require('./keys.js');
var beers = require('./beers.js');
var afiMovies = require('./afimovies.js');
var imdb250 = require('./imdb250.js');
var additionalFunctions = require("./additionalfxns.js");
var starWarsGame = require('./starwars.js');
var marvel = require('./marvel.js');

// console.log(keys.keys.beers);
// console.log(movies.movies[1]);
// console.log(imdb250.movies[14]);

var openingScreen = () => {
	var question = [
		{
			type: "list",
			message: "Choose your Category",
			choices: ["Marvel Characters", "Star Wars", "Microbrews", "IMDB top 250 movies", "Quit"],
			name: "selection"
		}
	]

	inquirer.prompt(question).then((answers) => {
		if (answers.selection === "IMDB top 250 movies") {
			var game = new imdb250.movies[0].IMDBMovies();
			game.game();
			// console.log(game);
		} else if (answers.selection === "Marvel Characters") {
			additionalFunctions.directory[0].marvelGetInfo();
		} else if (answers.selection === "Microbrews") {
			var game = new beers.object[0].BeerConstructor();
			game.game();
		} else if (answers.selection === "Star Wars") {
			var game = new starWarsGame.object[0].StarWarsConstructor();
			game.gameSetup();
		} else {
			return;
		}
	})
}

exports.openingScreen = [
	{
		fxn: () => {
			openingScreen();
		}
	}
]


openingScreen();