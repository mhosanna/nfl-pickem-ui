import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import TableStyles from "./styles/Table";

const PLAYERS_QUERY = gql`
  query GET_PLAYERS_BY_SEASON($season: String!) {
    allPlayers(where: { picks_some: { game: { season: $season } } }) {
      id
      name
    }
  }
`;

const GAMES_PLAYED_QUERY = gql`
  query GET_ALL_PLAYED_GAMES_BY_SEASON($season: String) {
    allGames(where: { AND: [{ season: $season }, { winner_is_null: false }] }) {
      id
    }
  }
`;

export default function LeaderBoard() {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season: "2020" },
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useQuery(GAMES_PLAYED_QUERY, {
    variables: { season: "2020" },
  });

  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError) return <p>Error</p>;

  const { allPlayers } = playersInfo;
  // var playersToRender = [...players];
  // playersToRender.sort((a, b) => b.correctPicks - a.correctPicks);

  const { allGames } = gamesInfo;
  const totalPlayedGames = allGames.length;

  console.log({ totalPlayedGames });

  return (
    <>
      <h1>Leader Board</h1>
      <TableStyles>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
          </tr>
        </thead>
        <tbody>
          {allPlayers.map((player, idx) => {
            return (
              <tr key={player.id}>
                <td>{idx + 1}</td>
                <td>{player.name}</td>
              </tr>
            );
          })}
        </tbody>
      </TableStyles>
    </>
  );
}
