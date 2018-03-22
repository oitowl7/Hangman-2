# Hangman
### *HOMEWORK #11:* Hangman Reloaded
This is another Node.js app. This is also another trip down the hangman path. However, this is the first time ever that hangman and Node.js have ever been done at the same time probably.

The instructions for this was to basically just make a hangman game that worked in Node. However, I thought this didn't seem very challenging so once again I decided to make it harder for myself by also adding in API information and, in the case of the *Star Wars* portion, actually got my list of possible answers from the API itself. And once again, the little added part took longer than the rest of the app. How does it all look/work? Stay tuned for more!

***
## The App
### Landing
![Landing](https://i.imgur.com/kWCveBx.jpg)
The landing page uses the NPM package Inquirer to ask the user to choose one of 5 options. Each one of these activates a different part of the app to display the game and then render whatever information is applicable at the end.

### Marvel
![Marvel](https://i.imgur.com/wMsOmsK.jpg)
If the user selects the Marvel option, the app pulls from an array I created and displays the blank string (I currently have the answer displayed so that I could answer it and get to the next screen). The user has 10 wrong guesses to get the answer before they lose. The app checks to see if the answer is a letter and if that letter has been used before. If either of them return false, it throws an error. 

After the game ends, win or lose, the app then makes a call to the Marvel API to get some additional info about the hero that was guessed upon. In this case, the hero was Thor and it returned his name, ID number, and a short description.

After this information is displayed, the user is prompted to "press enter to continue", which then sends the user back to the landing page. This is true for each category.

### Star Wars
![Star Wars Planet](https://i.imgur.com/gVEjOq9.jpg)
If the user selects *Star Wars*, they go to the *Star Wars* game (shocker!). This is a unique game in this app, but the user experience is essentially the same. On the back-end, however, the app is actually grabbing the word that is being used from the *Star Wars* API randomly instead of grabbing the answer from an array of pre-packaged answers inside the app. 

There are also 3 different types of information that the *Star Wars* API returns: planets, ships, and people. Each one returns a different set of information so the the app has to be able to handle each different type of information coming into it to make sure it can properly display it when the game ends. Above is an example of what a planet game looks like and below are examples of people and ships.

![Star Wars People](https://i.imgur.com/j7Fkj9Z.jpg)
![Star Wars Ships](https://i.imgur.com/Ma8rji1.jpg)

### Microbrews
![Microbrews](https://i.imgur.com/KscRKqF.jpg)
The microbrew game is one that ended up being a bit more difficult than I originally envisioned. Each beer has it's own different unique ID that proved very difficult to find within the breweryDB API. I think with a bit more time this one could have come together quite nicely. As it is, the user gets to guess between the 9 different types of beer. When the game ends, it makes an API call to the breweryDB to get the type of beer and a description of it.

### IMDB Top 250 Movies
![Jaws](https://i.imgur.com/XCRqOM7.jpg)
The final category the user could select is the from the IMDB top 250 movies. This one has an array inside the game itself that has each one of these movies. It works in much the same way as the **Marvel** and **Microbrew** categories but after it ends, makes a call to the OMDB API to get information such as year, rating, director, genre keywords, and IMDB rating.

***
## Technologies
This app was very similar to [homework #10 Liri App](https://github.com/oitowl7/liri-node-app) and doesn't have too many extra technologies. It is essentially a more difficult version of the Liri App. The NPM packages I used for this particular app were inquirer, js-md5, moment, request, and swapi-node.

One new thing I did learn is about was MD5 hashing. The Marvel API requires both a public and private key and a timestamp, all of which must be run through an MD5 hashing function.

***
## Lessons Learned
As mentioned above and that I'm too lazy to move because it's both a technology and something I learned (rambling....back on track), I learned about MD5 hashing. That one took a significant amount of time to figure out how to get to work right because there wasn't a lot of feedback on what I was doing wrong. Just the Marvel API pinging back with an error. 

The biggest thing that this project did for me was really hammer home how to get information from public APIs. After this assignment, I didn't have too much trouble with APIs...although I guess we kinda stopped using public ones after this...but still I haven't had many problems with them since then.

## Issues
This app runs pretty solidly. One issue that may arise is if the *Star Wars* API changes something in their format. That would essentially blow up that whole category. Other than that, I really haven't been able to break my app. I'll keep trying though.
