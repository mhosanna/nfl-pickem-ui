import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import TableStyles from "./components/styles/Table";

const PLAYERS_QUERY = gql`
  query PLAYERS_QUERY($season: Int) {
    players(season: $season) {
      player {
        id
        name
      }
    }
  }
`;

const WEEKS_QUERY = gql`
  query WEEKS_QUERY($season: Int) {
    weeks(season: $season) {
      week
    }
  }
`;

const GAMES_QUERY = gql`
  query WEEKS_QUERY($filter: GamesInput) {
    games(filter: $filter) {
      games {
        teams {
          field
          team {
            name
            city
          }
        }
        spread
      }
    }
  }
`;

export default function PicksPage() {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season: 2018 },
  });
  const {
    data: weeksInfo,
    error: weeksQueryError,
    loading: weeksQueryLoading,
  } = useQuery(WEEKS_QUERY, {
    variables: { season: 2018 },
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useQuery(GAMES_QUERY, {
    variables: { season: 2018, week: 1 },
  });

  if (playersQueryLoading || weeksQueryLoading || gamesQueryLoading)
    return <p>Loading...</p>;
  if (playersQueryError || weeksQueryError || gamesQueryError)
    return <p>Error</p>;

  const { players } = playersInfo;
  const { weeks } = weeksInfo;
  const { games } = gamesInfo;

  return (
    <>
      <h1>Make Your Picks</h1>
      <label htmlFor="players">Choose a player:</label>

      <select name="players" id="players">
        {players.map((playerInfo) => {
          return (
            <option key={playerInfo.player.id} value={playerInfo.player.id}>
              {playerInfo.player.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="weeks">Choose a week:</label>

      <select name="weeks" id="weeks">
        {weeks.map((week) => {
          return (
            <option key={week.week} value={week.week}>
              {week.week}
            </option>
          );
        })}
      </select>

      <TableStyles>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Spread</th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {games.games.map((gameInfo, idx) => {
            const homeTeam = gameInfo.teams.filter((game) => {
              return game.field === "HOME";
            });
            const awayTeam = gameInfo.teams.filter((game) => {
              return game.field === "AWAY";
            });
            console.log(awayTeam);
            return (
              <tr key={gameInfo.id}>
                <td>{homeTeam[0].team.name}</td>
                <td>{gameInfo.spread}</td>
                <td>{awayTeam[0].team.name}</td>
              </tr>
            );
          })}
        </tbody>
      </TableStyles>
    </>
  );
}
