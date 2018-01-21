var keys = require('./keys.js');
var request = require('request');
var inquirer = require("inquirer");
var hangman = require('./hangman.js');
var imdb250 = require('./imdb250.js');
var beers = require('./beers.js')
var starwars = require('swapi-node');
var md5 = require('js-md5');
var moment = require("moment");

exports.directory =[
	{
		getMovieInfo: function(movie){
			var omdbKey = keys.keys.omdb;
			var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + movie;
			request.get(url, (error, response, body) =>{
				var info = JSON.parse(body);
				console.log("_____________________")
				console.log("\nTitle: " + info.Title);
				console.log("Year: " + info.Year);
				console.log("Rating: " + info.Rated);
				console.log("Director: " + info.Director);
				console.log("Genre Keywords: " + info.Genre);
				console.log("IMDB Rating: " + info.imdbRating + "\n");
				console.log("_____________________")
				//question and inquirer thingys that require user to hit enter to run openingScreen on hangman
				var question = [
					{
						type: "input",
						message: "press enter to continue",
						name: "dontmatter"
					}
				]
				inquirer.prompt(question).then((answer) => {
					hangman.openingScreen[0].fxn();
				})
			})
		},
		rng: (number) => {
			randomNumber = Math.floor(Math.random() * number) + 1;
			return(randomNumber);
		},
		blankmaker: (movieMaster) =>{
			var movieChanger = [];
			var guesses = 0
			for (var i = 0; i < movieMaster.length; i++) {
				if (movieMaster.charCodeAt(i) >= 65 && movieMaster.charCodeAt(i) <= 90) {
					// console.log("something happened");
					movieChanger[i] = "_";
					guesses++;
				} else {
					movieChanger[i] = movieMaster[i];
				}
			}
			var value = [
				movieChanger, 
				guesses
			]
			return(value);
		},
		getBeerInfo: (id) => {
			var beerKey = keys.keys.beers;
			//https://api.brewerydb.com/v2/beer/rbvEiU?key=873b277a982e0848c84f18a6f7ed1a4c&format=json
			var url = "https://api.brewerydb.com/v2/beer/" + id + "?key=873b277a982e0848c84f18a6f7ed1a4c&format=json"
			// var url = "https://api.brewerydb.com/v2/beers?name=" + beerName + "&type=beer&key=" + beerKey + "&format=json"
			// console.log(url);
			request.get(url, (error, response, body) => {
				console.log(error);
				// console.log(response);
				var info = JSON.parse(body);
				console.log("_______________\n");
				console.log("Name: " + info.data.name + "\n");
				console.log("Style: " + info.data.style.shortName + "\n");
				console.log("Description: " + info.data.description + "\n");
				console.log("_______________\n");
				//question and inquirer thingys that require user to hit enter to run openingScreen on hangman
				var question = [
					{
						type: "input",
						message: "press enter to continue",
						name: "dontmatter"
					}
				]
				inquirer.prompt(question).then((answer) => {
					hangman.openingScreen[0].fxn();
				})
			})
		},
		rngSW: (number) => {
			randomNumber = Math.floor(Math.random() * number) + 1;
			if (randomNumber === 1){
				return(["starships",[2,3,5,9,10,11,12,13,15,21,22,23,27,28,29,]]);
			} else if (randomNumber === 2) {
				return(["planets",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]]);
			} else {
				return(["people",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20]]);
			}
		},
		starWarsInfo(result, category){
			if (category === "starships"){
				console.log("________________\n");
				console.log("Name: " + result.name);
				console.log("Manufacturer: " + result.manufacturer);
				console.log("Crew Compliment: " + result.crew);
				if (result.class){
					console.log("Class: " + result.class);
				}
				if (result.starship_class){
					console.log("Class: " + result.starship_class);
				}
				console.log("Length: " + result.length + "m");
				console.log("________________\n");
			} else if (category === "planets"){
				console.log("________________\n");
				console.log("Name: " + result.name);
				console.log("Diameter: " + result.diameter);
				console.log("Climate: " + result.climate);
				console.log("Population: " + result.population);
				console.log("________________\n");

			} else {
				console.log("________________\n");
				console.log("Name: " + result.name);
				console.log("Height: " + result.height + "cm");
				console.log("Gender: " + result.gender);
				console.log("Hair/Skin/Eye Colors: " + result.hair_color + "/" + result.skin_color + "/" + result.eye_color);
				console.log("Year of Birth: " + result.birth_year);
				console.log("________________\n");
			}
		//question and inquirer thingys that require user to hit enter to run openingScreen on hangman
			var question = [
				{
					type: "input",
					message: "press enter to continue",
					name: "dontmatter"
				}
			]
			inquirer.prompt(question).then((answer) => {
				hangman.openingScreen[0].fxn();
			})
		},
		marvelGetInfo: function(name){
			name = "iron man";
			marvelPublic = keys.keys.marvelPublic;
			marvelPrivate = keys.keys.marvelPrivate;
			ts = moment().unix().toString();
			hash = md5(ts+marvelPrivate+marvelPublic);
			url = "https://gateway.marvel.com:443/v1/public/characters?name=" + name +"&ts=" + ts + "&apikey=" + marvelPublic + "&hash=" + hash;
			request.get(url, (error, response, body) => {
				thingy = JSON.parse(body);
				console.log("Name: " + thingy.data.results[0].name);
				if (!thingy.data.results[0].description || thingy.data.results[0].description === ""){
					console.log("No description available");
				} else{
					console.log("Description: " + thingy.data.results[0].description);

				}
			})
		}
	}]