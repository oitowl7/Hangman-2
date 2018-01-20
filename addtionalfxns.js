var keys = require('./keys.js');
exports.directory =[
	{
		getInfo: function(movie){
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
		}
	}
]