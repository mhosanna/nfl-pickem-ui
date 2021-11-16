<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/mhosanna/nfl-pickem-ui">
    <img src="public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pick 'Em!</h3>

  <p align="center">
    Web app to play an NFL pick 'em game
    <br />
    <a href="https://github.com/mhosanna/nfl-pickem-ui"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Pick 'Em Screen Shot](https://www.pick-em.club/demo/picks.png)

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Styled Components](https://styled-components.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to run this project locally.

### Prerequisites

To run locally, you will first need to spin up the [nfl-pickem-edge](https://github.com/mhosanna/nfl-pickem-edge)

You will also need to create an account so you can log in to the front-end. Instructions for this can be found in the edge readme.

Once that is running, go to `config.ts` and make sure the `endpoint` variable matches the endpoint where your graphql schema is available from the edge.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mhosanna/nfl-pickem-ui.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter the season in the `config.ts` file
   ```js
   export const season = {{season_year}};
   ```
4. Spin it up
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### 🏈 Creating Games
To start game play, a player will create a week and add the games to be played that week. 
1. Go to the Manage Games page
2. Click the tile to add a new week.
3. Once you have defined the first week, click into its tile.
4. From there you can add each game that will be played that week. 
5. You will enter the home team, away team, and the spread of the game. Spreads can be grabbed from the sports betting site of your choice. I use [Bet MGM](https://sports.betmgm.com/en/sports). 

### 🎲 Making Picks
Once the games have been defined, players can log into their accounts and make their picks.
1. Go to the My Picks page.
2. Players can click the team they think will win with the spread.

To see other player's picks, go to Picks & Results. You can see each player's picks, or each game's picks.

### 🏆 Declaring Winners
After the real games have been played, a player will declare which team won the matchup.
1. Go to the Manage Games page.
2. Click into the current week and see the list of games.
3. Click on the team that won the match up. 

Each player's winning picks will be automatically calculated and the Leaderboard will be updated. 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## 🚦 Roadmap 🚦

- [ ] Create an Admin Role so that only certain players with admin rights can create games and declare game winners.
- [ ] Automatically create games and determine winners each week using an API data feed with betting odds.
- [ ] Add the ability to email players when the games have been created, or the current leaderboard.
- [ ] Add better feedback when players do certain actions. 
- [ ] 🌟 Make a more exciting logo


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@madhosanna](https://twitter.com/@madhosanna) - mhosanna@gmail.com

Project Link: [https://github.com/mhosanna/nfl-pickem-ui](https://github.com/mhosanna/nfl-pickem-ui)

<p align="right">(<a href="#top">back to top</a>)</p>
