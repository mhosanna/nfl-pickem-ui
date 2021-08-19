import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const PLAYERS_QUERY = gql`
  query GET_PLAYERS_BY_SEASON($season: String!) {
    players(
      where: { picks: { some: { game: { season: { equals: $season } } } } }
    ) {
      id
      name
      picks(where: { isCorrect: { equals: true } }) {
        id
      }
    }
  }
`;

const GAMES_PLAYED_QUERY = gql`
  query GET_ALL_PLAYED_GAMES_BY_SEASON($season: String) {
    games(
      where: {
        AND: [{ season: { equals: $season } }, { NOT: [{ winner: null }] }]
      }
    ) {
      id
    }
  }
`;

function LeaderBoard({ season }) {
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
  const { players } = playersInfo;
  const sortedPlayers = [...players];

  //we are only returning picks that were correct, so compare length of array
  sortedPlayers.sort((a, b) => b.picks.length - a.picks.length);

  const { games } = gamesInfo;
  const totalPlayedGames = games.length;

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
          {sortedPlayers.map((player, idx) => {
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

export { LeaderBoard, PLAYERS_QUERY, GAMES_PLAYED_QUERY };

const TableStyles = styled.table`
  border-collapse: collapse;
  width: 90%;
  max-width: 800px;
  thead {
    color: var(--grey);
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  tbody {
    font-weight: 600;
    font-size: 2rem;
  }
  td,
  th {
    text-align: left;
    padding: 8px 24px 0px 8px;
    white-space: nowrap;
  }

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
  }
`;
