import { useRouter } from 'next/router';
import PicksByPlayer from '../PicksByPlayer';
import PicksByGame from '../PicksByGame';

export default function GameResults({ season }: { season: string }) {
  const {
    query: { by },
  } = useRouter();

  if (by === 'player')
    return (
      <div data-testid="picks-by-player">
        <PicksByPlayer season={season} />
      </div>
    );
  if (by === 'game')
    return (
      <div data-testid="picks-by-game">
        <PicksByGame season={season} />
      </div>
    );
  return <p>Oops! This page doesn't exist</p>;
}
