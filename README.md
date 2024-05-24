# WOMBO COMBO

Inspired by the widely popular browser game [Infinite Craft](https://neal.fun/infinite-craft/), we wanted to develop an online multiplayer word-merging game. Infinite Craft is a sandbox game using generative AI software where the player is given four starting elements: fire, wind, water, and earth, which can be combined to create new elements. We adapted and expanded this idea by adding objectives, a scoring system, and multiplayer capabilities.

## Technologies used

The technologies we used for this project were 

* Node.js
* React
* Javascript
* Websockets
* Scss
* NPM Package Manager


## Structure and Components

Identify your project’s 3-5 main components. What is their role?
How are they correlated? Reference the main class, file, or function in the README text with a link.

Our project is structured into a few main components. These regulate and ensure the correct playing of games and functionality of Wombo Combo.
These are the following:

* Lobby Overview
* Lobby
* Game
* Profiles

The [Lobby Overview](https://github.com/sopra-fs24-group-41/sopra-fs24-group-41-client/blob/main/src/components/views/LobbyOverview.tsx) is our main file and starting page for the client. On this file, the functionalities regarding the displaying of lobbies, creating lobbies and further routing to all other pages are ensured.

Second, the lobby page takes care of all things regarding the gamemodes, the connecting of multiple players and acts as a hub for the clients to connect with and games to be started.

The Game page involves all possible interactions with our game. Here the merging of words takes place and the whole fun of our application.

And lastly, the profiles. The profiles are persisted and add a new interesting layer to Wombo Combo. Here statistics are saved and the individuality of the user can be expressed. There are profile pictures and achievements tied to these profiles.


## Illustrations

The interaction flow is based on the components mentioned above in the components section.  We'll start off with the interaction from a user perspective.

#### Lobby Overview
 
The [Lobby Overview](https://github.com/sopra-fs24-group-41/sopra-fs24-group-41-client/blob/main/src/components/views/LobbyOverview.tsx) is the landing page for our client. From here the whole interaction starts. Through a popup the person accessing the client can register their profile and receive user credentials. When they are then logged in, they may choose to create a lobby or join an existing one. All currently open lobbies are shown on the lobby overview page.

#### Lobby
When a user decides to create a lobby, they are assigned the lobby Owner role, which allows them to decide what happens in said lobby. They may choose the gamemodes, the accessibility status for other users, and also to define a timer for the game. The gamemodes may be played in singleplayer or in multiplayer. When the user feels ready and has decided on their setup, they may start the game.

#### Game & Result

If we assume the user has chosen to play the *Fusion Frenzy* Gamemode, then all users in the lobby are given the same target word and compete against each other to reach the target word. They may use their elements and must think logically how the target word may be reached, in order to win against their competitors. The game page also features an indicator of who is currently also playing in said lobby and what their most recent word was. 

Finally, when a user succeeds in reaching the target word, the game ends for all players. Everybody is redirected to the result page.

The result page shows the winner of the round as well as the amounts of combinations each player made. The winner is highlighted in blue and shown confetti, while the own user is shown in red if they've lost the game.






#### Profile, Leaderboard & Achievements

A main part in making sure the game remains fresh and has further replayability, we added achievements and a *Daily Challenge* Gamemode. These are both only playable as registered users.

Achievements are unlocked whilst playing and are shown in the Achievements tab which is accesible in the lobby Overview page. Each achievement has a unique unlock mechanism and allows the user to portray their success with their corresponding profile picture.

The Leaderboard shows the users who have completed the *Daily Challenge* for the current day and are ranked according to the amount of combinations they needed. *The Daily Challenge Gamemode is the only gamemode which is only playable in singleplayer.*

## Launch & Deployment

If you want to run our project locally, you will first need to clone this repository.


Additionally, you will need *Node.js*


We were urged to install the exact version **v20.11.0** that also comes with the *npm package manager.* You can download it [here](https://nodejs.org/download/release/v20.11.0/).

After installation, update the *npm package manager* to **10.4.0** by running `npm install -g npm@10.4.0`


You can verify that you are using the correct version by running `node -v` and `npm --version`



Before you start our application, run this command to install all other dependencies, including React:

`npm install`

In some cases, not all dependencies will be installed. The terminal will inform you which ones are you missing, install also with `npm install <dependency-name>`

Then you can start our frontend application with: 
`npm run dev`

Now you can open http://localhost:3000/ to view our app in the browser. The page will reload whenever you make modifications to our code. The terminal will also display lint errors in the console. The Client is ready but you also need to run the server for our app to work. Refer to the server's Readme on instructions how to setup and start it. [Release](M4-release-link).


## Roadmap

Further versions of Wombo Combo could include these functionalities:

* Spectator mode, where clients can spectate games
* Further achievements
* Difficulty setting for target words


## Authors


* **Timon Leupp** - [Tmmn](https://github.com/Tmmn)
* **Lucas Timothy Leo Bär** - [Grizzlytron](https://github.com/Grizzlytron)
* **Jacqueline Ulken** - [JacquelineUlken](https://github.com/JacquelineUlken)
* **Rosan Shanmuganathan** - [na50r](https://github.com/na50r)
* **Alexandru-Mihai Hurjui** - [Aquamarine-12](https://github.com/Aquamarine-12)

See also the list of [contributors](https://github.com/sopra-fs24-group-41/sopra-fs24-group-41-client/contributors) who participated in this project.

### Acknowledgments

* Inspired by [Infinite Craft](https://neal.fun/infinite-craft/) made by [Neil Agarwal](https://nealagarwal.me/)
* Jhey Tompkins (adapted Starscape from his [guide](https://css-tricks.com/an-interactive-starry-backdrop-for-content/))
* Aaron Lampros (added his [confetti](https://github.com/alampros/react-confetti) to make our result screen more fun :smile: )
* Billie Thompson (for her great README Template)
* wayou, for providing us with [Google Docs Anonymous Animal Icons](https://github.com/wayou/anonymous-animals)
* And last but not least, thanks to the Team of SOPRA for enabling this opportunity and providing us with the means to develop **WOMBO COMBO!**



## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details

