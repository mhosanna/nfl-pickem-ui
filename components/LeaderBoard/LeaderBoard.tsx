import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const PLAYERS_QUERY = gql`
  query GET_PLAYERS_BY_SEASON($season: String!) {
    allPlayers(where: { picks_some: { game: { season: $season } } }) {
      id
      name
      picks(where: { isCorrect: true }) {
        id
      }
    }
  }
`;

export const GAMES_PLAYED_QUERY = gql`
  query GET_ALL_PLAYED_GAMES_BY_SEASON($season: String) {
    allGames(where: { AND: [{ season: $season }, { winner_is_null: false }] }) {
      id
    }
  }
`;

export default function LeaderBoard({ season }) {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season },
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useQuery(GAMES_PLAYED_QUERY, {
    variables: { season },
  });

  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError) return <p>Error</p>;

  const { allPlayers } = playersInfo;
  // var playersToRender = [...players];
  // playersToRender.sort((a, b) => b.correctPicks - a.correctPicks);

  const { allGames } = gamesInfo;
  const totalPlayedGames = allGames.length;

  return (
    <>
      <TableStyles>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Games Played</th>
          </tr>
        </thead>
        <tbody>
          {allPlayers.map((player, idx) => {
            const correctPicks = player.picks.length;
            return (
              <tr key={player.id}>
                <td>{idx + 1}</td>
                <td>{player.name}</td>
                <td>{correctPicks}</td>
                <td>{totalPlayedGames}</td>
              </tr>
            );
          })}
        </tbody>
      </TableStyles>
    </>
  );
}

const TableStyles = styled.table`
  border-collapse: collapse;
  width: 90%;
  max-width: 800px;
  thead {
    color: var(--grey);
    text-transform: uppercase;
  }
  tbody {
    font-weight: 600;
    font-size: 2rem;
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
`;
