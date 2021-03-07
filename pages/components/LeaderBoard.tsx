import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import TableStyles from "./styles/Table";

const PLAYERS_QUERY = gql`
  query PLAYERS_QUERY($season: Int) {
    players(season: $season) {
      player {
        id
        name
      }
      correctPicks
    }
  }
`;

const GAMES_PLAYED_QUERY = gql`
  query GAMES_PLAYED_QUERY($filter: GamesInput) {
    games(filter: $filter) {
      totalPlayedGames
    }
  }
`;

export default function LeaderBoard() {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season: 2018 },
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useQuery(GAMES_PLAYED_QUERY, {
    variables: { season: 2018 },
  });

  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError) return <p>Error</p>;

  const { players } = playersInfo;
  var playersToRender = [...players];
  playersToRender.sort((a, b) => b.correctPicks - a.correctPicks);

  const { games } = gamesInfo;
  const totalPlayedGames = games.totalPlayedGames;

  return (
    <>
      <h1>Leader Board</h1>
      <TableStyles>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Record</th>
          </tr>
        </thead>
        <tbody>
          {playersToRender.map((playerInfo, idx) => {
            return (
              <tr key={playerInfo.player.id}>
                <td>{idx + 1}</td>
                <td>{playerInfo.player.name}</td>
                <td>
                  {playerInfo.correctPicks} / {totalPlayedGames}
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableStyles>
    </>
  );
}
