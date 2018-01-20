var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys.js");
var hangman = require("./hangman.js");
var additionalFunctions = require("./additionalfxns.js");
//creates a random number that chooses the movie that will be used
var rng = (number) => {
	randomNumber = Math.floor(Math.random( + 1) * number);
	return(randomNumber);
}
//creates the blank array and the calculates the number of guesses the user will have before he/she wins. Returns an array in the shape of [array, calcedValue]
var blankmaker = (movieMaster) =>{
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
}
//runs after the user wins or loses to give basic information about the move and runs the hangman.js opening screen when the user hits enter
var getInfo = (movie) => {
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


exports.movies = [
{
	//constructor for the game
	IMDBMovies: function(){
		this.rng = rng(249);
		this.word = exports.movies[this.rng].toUpperCase();
		this.blankArray = blankmaker(this.word)[0];
		this.blankString = this.blankArray.join(" ");
		this.previousGuesses = [];
		this.guessesAllowed = blankmaker(this.word)[1];
		this.guessesRemaining = 10;
		this.guessesMade = 0
		//primary game script
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
				additionalFunctions.directory[0].getInfo(this.word);
				// getInfo(this.word);
				//this runs if the user runs out of guesses
			} else {
				console.log("Game over man. Game over");
				getInfo(this.word);
			}
		}
	}
},
"The Shawshank Redemption",
"The Godfather",
"The Godfather: Part II",
"The Dark Knight",
"Pulp Fiction",
"The Good, the Bad and the Ugly",
"Schindler's List",
"12 Angry Men",
"The Lord of the Rings: The Return of the King",
"Fight Club",
"The Lord of the Rings: The Fellowship of the Ring",
"Star Wars: Episode V - The Empire Strikes Back",
"Inception",
"Forrest Gump",
"One Flew Over the Cuckoo's Nest",
"The Lord of the Rings: The Two Towers",
"Goodfellas",
"The Matrix",
"Star Wars: Episode IV - A New Hope",
"Seven Samurai",
"City of God",
"Se7en",
"The Usual Suspects",
"The Silence of the Lambs",
"It's a Wonderful Life",
"Once Upon a Time in the West",
"Léon: The Professional",
"Life Is Beautiful",
"Casablanca",
"The Raiders of the Lost Ark",
"American History X",
"Psycho",
"Rear Window",
"Saving Private Ryan",
"City Lights",
"Spirited Away",
"The Intouchables",
"Modern Times",
"Terminator 2: Judgment Day",
"Memento",
"The Pianist",
"Sunset Blvd",
"The Green Mile",
"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
"Apocalypse Now",
"The Departed",
"Gladiator",
"Boyhood",
"Back to the Future",
"Alien",
"The Dark Knight Rises",
"The Prestige",
"The Lives of Others",
"Django Unchained",
"The Great Dictator",
"The Lion King",
"The Shining",
"Cinema Paradiso",
"American Beauty",
"Paths of Glory",
"Guardians of the Galaxy",
"WALL·E",
"North by Northwest",
"Aliens",
"Amélie",
"Citizen Kane",
"Vertigo",
"Toy Story 3",
"M",
"Das Boot",
"Oldboy",
"Princess Mononoke",
"A Clockwork Orange",
"Taxi Driver",
"Star Wars: Episode VI - The Return of the Jedi",
"Grave of the Fireflies",
"Reservoir Dogs",
"Double Indemnity",
"Once Upon a Time in America",
"Requiem for a Dream",
"Braveheart",
"To Kill a Mockingbird",
"Lawrence of Arabia",
"Eternal Sunshine of the Spotless Mind",
"Witness for the Prosecution",
"Full Metal Jacket",
"Singin' in the Rain",
"The Sting",
"Bicycle Thieves",
"Amadeus",
"Monty Python and the Holy Grail",
"Snatch",
"L.A. Confidential",
"All About Eve",
"Rashomon",
"The Apartment",
"For a Few Dollars More",
"The Treasure of the Sierra Madre",
"Some Like It Hot",
"The Third Man",
"The Kid",
"Indiana Jones and the Last Crusade",
"Inglourious Basterds",
"A Separation",
"2001: A Space Odyssey",
"Batman Begins",
"Yojimbo",
"Metropolis",
"Toy Story",
"Unforgiven",
"Raging Bull",
"Scarface",
"Chinatown",
"Up",
"Die Hard",
"Downfall",
"The Great Escape",
"Like Stars on Earth",
"Mr. Smith Goes to Washington",
"Pan's Labyrinth",
"On the Waterfront",
"Heat",
"The Bridge on the River Kwai",
"The Hunt",
"The Wolf of Wall Street",
"3 Idiots",
"The Seventh Seal",
"Good Will Hunting",
"My Neighbor Totoro",
"The Elephant Man",
"Wild Strawberries",
"The Gold Rush",
"Ran",
"Blade Runner",
"Lock, Stock and Two Smoking Barrels",
"The General",
"Ikiru",
"X-Men: Days of Future Past",
"Dil Chahta Hai",
"Gran Torino",
"The Secret in Their Eyes",
"The Big Lebowski",
"Rebecca",
"Casino",
"Warrior",
"V for Vendetta",
"It Happened One Night",
"The Deer Hunter",
"Cool Hand Luke",
"Rush",
"Howl's Moving Castle",
"Fargo",
"How to Train Your Dragon",
"The Maltese Falcon",
"Trainspotting",
"Gone with the Wind",
"Into the Wild",
"Judgment at Nuremberg",
"Colour It Yellow",
"Hotel Rwanda",
"12 Years a Slave",
"A Beautiful Mind",
"The Sixth Sense",
"Dial M for Murder",
"The Thing",
"Butch Cassidy and the Sundance Kid",
"Kill Bill: Vol. 1",
"No Country for Old Men",
"Finding Nemo",
"Platoon",
"The Wages of Fear",
"Mary and Max",
"The Grand Budapest Hotel",
"Life of Brian",
"Sin City",
"Annie Hall",
"Network",
"Touch of Evil",
"Diabolique",
"Incendies",
"The Princess Bride",
"Stand by Me",
"There Will Be Blood",
"Amores Perros",
"Ben-Hur",
"The Wizard of Oz",
"The Avengers",
"Million Dollar Baby",
"The Grapes of Wrath",
"The 400 Blows",
"Hachi: A Dog's Tale",
"In the Name of the Father",
"The Best Years of Our Lives",
"The Bourne Ultimatum",
"Donnie Darko",
"Strangers on a Train",
"Persona",
"Gandhi",
"Nausicaä of the Valley of the Wind",
"Jaws",
"High Noon",
"Infernal Affairs",
"The King's Speech",
"Twelve Monkeys",
"Notorious",
"The Terminator",
"Stalker",
"Harry Potter and the Deathly Hallows: Part 2",
"Shutter Island",
"Ip Man",
"Groundhog Day",
"Fanny and Alexander",
"Rocky",
"The Night of the Hunter",
"Before Sunrise",
"Dog Day Afternoon",
"The Road",
"Lagaan: Once Upon a Time in India",
"Pirates of the Caribbean: The Curse of the Black Pearl",
"Her",
"Monsters, Inc.",
"La Haine",
"Barry Lyndon",
"Who's Afraid of Virginia Woolf?",
"The Battle of Algiers",
"The Big Sleep",
"Memories of Murder",
"A Fistful of Dollars",
"Castle in the Sky",
"The Graduate",
"How to Train Your Dragon 2",
"Roman Holiday",
"The Help",
"The Truman Show",
"The Hustler",
"The Celebration",
"Jurassic Park",
"In the Mood for Love",
"Slumdog Millionaire",
"Beauty and the Beast",
"Stalag 17",
"Rope",
"A Christmas Story",
"The Killing",
"Before Sunset",
"The Raid 2",
"Elite Squad: The Enemy Within",
"Papillon",
"Swades",
]