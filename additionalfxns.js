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
		//*******************************************************************************************************************************************
		//gets the movie info from omdb. Needs omdb api key and movie name
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
		//*******************************************************************************************************************************************
		//calcs a random number. accepts the number of random numbers to choose from
		rng: (number) => {
			randomNumber = Math.floor(Math.random() * number) + 1;
			return(randomNumber);
		},
		//*******************************************************************************************************************************************
		//makes the blank array that is used for the game. also calculates the number of guesses the player has
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
		//*******************************************************************************************************************************************
		//gets beer info from brewerydb. takes the BEER ID and not the beer name. this means the beer id must be known and in the beer array before the game begins
		getBeerInfo: (id) => {
			var beerKey = keys.keys.beers;
			//https://api.brewerydb.com/v2/beer/rbvEiU?key=873b277a982e0848c84f18a6f7ed1a4c&format=json
			var url = "https://api.brewerydb.com/v2/beer/" + id + "?key=873b277a982e0848c84f18a6f7ed1a4c&format=json"
			// var url = "https://api.brewerydb.com/v2/beers?name=" + beerName + "&type=beer&key=" + beerKey + "&format=json"
			// console.log(url);
			request.get(url, (error, response, body) => {
				// console.log(response);
				var info = JSON.parse(body);
				console.log("_______________\n");
				console.log("Name: " + info.data.name + "\n");
				console.log("Style: " + info.data.style.shortName + "\n");
				if (!info.data.description || info.data.description === "") {
					console.log("Description: None Available");
				} else {
					console.log("Description: " + info.data.description + "\n");
				}
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
					//after enter is pressed, it reruns the whole app from the start
					hangman.openingScreen[0].fxn();
				})
			})
		},
		//*******************************************************************************************************************************************
		//function that generates the star wars data needed from a list of categories. the array in the return is needed because swapi doesn't have all the 
		//different numbers filled in its database (ie starships/1 returns a 404)
		rngSW: (number) => {
			randomNumber = Math.floor(Math.random() * number) + 1;
			console.log("Ramdom number: "+ randomNumber);
			if (randomNumber === 1){
				return(["starships",[2,3,5,9,10,11,12,13,15,21,22,23,27,28,29,]]);
			} else if (randomNumber === 2) {
				return(["planets",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]]);
			} else {
				return(["people",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20]]);
			}
		},
		//*******************************************************************************************************************************************
		//gets the info from the rngSW to display the info after the game ends. 
		starWarsInfo(result, category){
			console.log(category);

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
					//after enter is pressed, it reruns the whole app from the start
				hangman.openingScreen[0].fxn();
			})
		},
		//*******************************************************************************************************************************************
		//gets the marvel character information from the marvel api. Needs a public key, private key, and a unique timestamp. Also requires md5
		marvelGetInfo: function(name){
			marvelPublic = keys.keys.marvelPublic;
			marvelPrivate = keys.keys.marvelPrivate;
			ts = moment().unix().toString();
			hash = md5(ts+marvelPrivate+marvelPublic);
			url = "https://gateway.marvel.com:443/v1/public/characters?name=" + name +"&ts=" + ts + "&apikey=" + marvelPublic + "&hash=" + hash;
			request.get(url, (error, response, body) => {
				thingy = JSON.parse(body);
				console.log("\n________________");
				console.log("Name: " + thingy.data.results[0].name);
				console.log("Marvel ID Number: " + thingy.data.results[0].id);
				if (!thingy.data.results[0].description || thingy.data.results[0].description === ""){
					console.log("No description available. Marvel's API has descriptions on stuff that don't matter and don't have it on things that do");
					console.log("but I put too much time into this not to use it so whatevs yo");
				} else{
					console.log("Description: " + thingy.data.results[0].description);
				}
				console.log("________________\n");
				//question and inquirer thingys that require user to hit enter to run openingScreen on hangman
				var question = [
					{
						type: "input",
						message: "press enter to continue",
						name: "dontmatter"
					}
				]
				inquirer.prompt(question).then((answer) => {
					//after enter is pressed, it reruns the whole app from the start
					hangman.openingScreen[0].fxn();
				})
			})
		}, 
		//*******************************************************************************************************************************************
		//main game run from everywhere but starwars.js(it uses a different method to play the game)
		game: function(result) {
			console.log(result.word);
			console.log(result.blankString);
			if (result.guessesRemaining > 0 && result.guessesAllowed != result.guessesMade) {
				//have to set a variable equal to this due to scoping and such. Only used for validation
				var prior = result.previousGuesses;
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
					for (var i = 0; i < result.word.length; i++){
						if (result.word.charAt(i) === uppercase){
							result.blankArray[i] = uppercase;
							foundOne = true;
							result.guessesMade++;
						}
					}
					if (foundOne === false) {
						result.guessesRemaining--;
					}
					//pushes uppercase to the previous guesses
					result.previousGuesses.push(uppercase);
					result.blankString = result.blankArray.join(" ");
					result.game();
				})
				//this runs if the user has guessed everythign right
			} else if (result.guessesMade === result.guessesAllowed){
				var won = true;
				console.log("You won!");
				exports.directory[0].routeToCorrectInfoFunction(result);
				//this runs if the user runs out of guesses
			} else {
				var won = false;
				console.log("Game over man. Game over");
				exports.directory[0].routeToCorrectInfoFunction(result);
			}
		},
		//this function directs the information from the game into the right function (ie if a marvel game was played it goes to marvelGetInfo etc)
		routeToCorrectInfoFunction: function(result) {
			if (result.gameType === "marvel") {
				exports.directory[0].marvelGetInfo(result.word);
			} else if (result.gameType === "beers") {
				exports.directory[0].getBeerInfo(result.id);
			} else if (result.gameType === "imdb") {
				exports.directory[0].getMovieInfo(result.word)
			}
		}
	}]