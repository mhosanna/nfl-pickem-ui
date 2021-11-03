import styled from 'styled-components';
import {
  usePlayersBySeasonQuery,
  useGamesPlayedBySeasonQuery,
} from '../../types/generated-queries';

function LeaderBoard({ season }) {
  //this returns a players' correct picks only!
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = usePlayersBySeasonQuery({
    variables: { season },
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useGamesPlayedBySeasonQuery({
    variables: { season },
  });

  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError) return <p>Error</p>;

  const players = playersInfo?.players;
  if (!players) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }
  const sortedPlayers = [...players];

  //we are only returning picks that were correct, so compare length of array
  sortedPlayers.sort((a, b) => b.picks.length - a.picks.length);

  const games = gamesInfo?.games;
  const totalPlayedGames = games?.length;

  if (totalPlayedGames === 0) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }

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
            console.log(player);
            //players query returns only correct picks, so just count length
            const correctPicks = player?.picks?.length;
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

export { LeaderBoard };

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
  }
  th:last-child,
  td:last-child {
    padding-right: 0px;
  }
  th:first-child,
  td:first-child {
    padding-left: 0px;
  }

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    th {
      line-height: 1.3;
    }
  }
`;
