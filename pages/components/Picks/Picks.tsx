import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Spread, List } from "./PicksStyles";
import TeamBlock from "../TeamBlock";
import Select from "../Select";
import Spacer from "../Spacer";

const gameFragment = gql`
  fragment GameFragment on Game {
    homeTeam {
      id
      name
      city
    }
    awayTeam {
      id
      name
      city
    }
    spread
    winner {
      id
    }
  }
`;

const pickFragment = gql`
  fragment PickFragment on Pick {
    player {
      id
      name
    }
    game {
      id
      ...GameFragment
    }
    picked {
      id
      name
      city
    }
  }
`;

const PLAYERS_QUERY = gql`
  query GET_PLAYER_BY_ID_QUERY($id: ID!) {
    Player(where: { id: $id }) {
      name
      id
    }
  }
`;

const GAMES_BY_SEASON_QUERY = gql`
  query GET_ALL_GAMES_BY_SEASON($season: String) {
    allGames(where: { season: $season }) {
      id
      week
    }
  }
`;

const GET_ALL_GAMES_BY_SEASON_AND_WEEK = gql`
  query GET_ALL_GAMES_BY_SEASON_AND_WEEK($season: String, $week: Int) {
    allGames(where: { season: $season, week: $week }) {
      id
      ...GameFragment
      picks {
        id
        ...PickFragment
      }
    }
  }
  ${gameFragment}
  ${pickFragment}
`;

const MAKE_PICK_MUTATION = gql`
  mutation MAKE_PICK_MUTATION($player: ID!, $game: ID!, $team: ID!) {
    upsertPicks(playerId: $player, gameId: $game, teamId: $team) {
      id
      player {
        id
        name
      }
      game {
        id
      }
      picked {
        id
        name
        city
      }
    }
  }
`;

export default function Picks() {
  const playerId = 1;
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { id: playerId }, //hard code player id for now
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useQuery(GAMES_BY_SEASON_QUERY, {
    variables: { season: "2020" },
  });

  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError) return <p>Error</p>;

  const { Player } = playersInfo;
  const { allGames } = gamesInfo;

  //get all weeks available to make picks for
  const availableWeeks = allGames
    .map((game) => {
      return game.week.toString();
    })
    .filter((x, i, a) => a.indexOf(x) === i) //get unique week values
    .sort((a, b) => {
      return b - a; //sort weeks from newest to oldest
    });

  return (
    <div>
      <PickWrapper availableWeeks={availableWeeks} playerId={playerId} />
    </div>
  );
}

const PickWrapper = ({ availableWeeks, playerId }) => {
  const [selectedWeek, setSelectedWeek] = React.useState(availableWeeks[0]);

  return (
    <div>
      <Select
        label="Select a Week"
        value={selectedWeek}
        onChange={(ev) => setSelectedWeek(ev.target.value)}
      >
        {availableWeeks.map((week) => {
          return (
            <option key={week} value={week}>
              Week {week}
            </option>
          );
        })}
      </Select>
      <Spacer size={50} />
      <GamesList playerId={playerId} selectedWeek={selectedWeek} />
    </div>
  );
};

function GamesList({ playerId, selectedWeek }) {
  const { data, error, loading } = useQuery(GET_ALL_GAMES_BY_SEASON_AND_WEEK, {
    variables: { season: "2020", week: parseInt(selectedWeek) },
  });

  if (error) {
    return <p>Error</p>;
  }
  if (!data || loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.allGames.map((game) => {
        return <Game key={game.id} game={game} playerId={playerId} />;
      })}
    </div>
  );
}

function Game({ game, playerId }) {
  const playersPick = game.picks.filter((pick) => pick.player.id == playerId);

  const [pick] = useMutation(MAKE_PICK_MUTATION);

  const makePick = (gameId, playerId) => async (teamId) => {
    pick({
      variables: { player: playerId, game: gameId, team: teamId },
      refetchQueries: [{ query: GET_ALL_GAMES_BY_SEASON_AND_WEEK }],
    });
  };

  let spreadString = game.spread.toString();
  if (spreadString[0] === "0") {
    spreadString = "PK";
  } else if (spreadString[0] !== "-") {
    spreadString = "+" + spreadString;
  }

  return (
    <React.Fragment key={game.id}>
      <List>
        <TeamBlock
          id={game.homeTeam.id}
          name={game.homeTeam.name}
          city={game.homeTeam.city}
          field="home"
          isPicked={
            game.homeTeam.id === playersPick[0]?.picked?.id ? true : false
          }
          makePick={makePick(game.id, playerId)}
        />
        <TeamBlock
          id={game.awayTeam.id}
          name={game.awayTeam.name}
          city={game.awayTeam.city}
          field="away"
          isPicked={
            game.awayTeam.id === playersPick[0]?.picked?.id ? true : false
          }
          makePick={makePick(game.id, playerId)}
        />
        <Spread spread={spreadString} />
      </List>
      <Spacer size={35} />
    </React.Fragment>
  );
}
