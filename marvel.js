var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys.js");
var hangman = require("./hangman.js");
var additionalFunctions = require("./additionalfxns.js");
var swapi = require("swapi-node")


// url = "https://gateway.marvel.com:443/v1/public/characters?name=iron%20man&apikey=d1941b2610bada83a4f287cc22733518"