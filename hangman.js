var inquirer = require('inquirer');
var request = require('request');
var starwars = require('swapi-node');
var keys = require('./keys.js');
var beers = require('./beers.js');
var movies = require('./movies.js');
var imdb250 = require('./imdb250.js');

// console.log(keys.keys.beers);
// console.log(movies.movies[1]);
// console.log(imdb250.movies[14]);

var openingScreen = () => {
	var question = [
		{
			type: "list",
			message: "Choose your Category",
			choices: ["IMDB top 250 movies", "AFI top 100 movies", "Microbrews", "Star Wars", "Quit"],
			name: "selection"
		}
	]

	inquirer.prompt(question).then((answers) => {
		if (answers.selection === "IMDB top 250 movies") {
			var info;
			var game = new imdb250.movies[0].IMDBMovies();
			game.game();
			// console.log(game);
		} else if (answers.selection === "AFI top 100 movies") {
			afiGame();
		} else if (answers.selection === "Microbrews") {
			beerGame();
		} else if (answers.selection === "Star Wars") {
			starWarsGame();
		} else {
			return;
		}
	})
}

var rng = (number) => {
	randomNumber = Math.floor(Math.random( + 1) * number);
	return(randomNumber);
}

exports.openingScreen = [
	{
		fxn: () => {
			openingScreen();
		}
	}
]


openingScreen();