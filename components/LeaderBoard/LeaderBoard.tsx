import { TableStyles } from './styles';
import {
  usePlayersBySeasonQuery,
  useGamesPlayedBySeasonQuery,
  Player,
} from '../../types/generated-queries';

function rankPlayers(players: Player[]) {
  // //copy array
  const sortedPlayers = [...players];

  //we are only returning picks that were correct, so compare length of array
  return sortedPlayers.sort((a, b) => {
    if (b?.picks && a?.picks) {
      return b.picks.length - a.picks.length;
    } else return 0;
  });
}

function LeaderBoard({ season }: { season: string }) {
  //this returns a players' correct picks only!
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = usePlayersBySeasonQuery({
    variables: { season },
  });
  // returns games from season with game winners
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useGamesPlayedBySeasonQuery({
    variables: { season },
  });

  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError)
    return (
      <p>
        Error:{' '}
        {playersQueryError
          ? playersQueryError.message
          : gamesQueryError?.message}
      </p>
    );

  const players = playersInfo?.players;
  if (!players) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }

  const rankedPlayers = rankPlayers(players);

  const gamesWithWinner = gamesInfo?.games?.length;

  if (!gamesWithWinner) {
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
          {rankedPlayers.map((player, idx) => {
            //players query returns only correct picks, so just count length
            const correctPicks = player?.picks?.length;
            return (
              <tr key={player.id}>
                <td>{idx + 1}</td>
                <td>{player.name}</td>
                <td>{correctPicks}</td>
                <td>{gamesWithWinner}</td>
              </tr>
            );
          })}
        </tbody>
      </TableStyles>
    </>
  );
}

export { LeaderBoard };
