import { useRouter } from 'next/router';
import useWeekSelect from '../../lib/useWeekSelect';
import PicksByPlayer from '../PicksByPlayer';
import PicksByGame from '../PicksByGame';
import Spacer from '../Spacer';

export default function GameResults({ season }) {
  const {
    query: { by },
  } = useRouter();

  if (by !== 'player' && by !== 'game') {
    return <p>Oops! This page doesn't exist</p>;
  }
  const { weekSelector, selectedWeek } = useWeekSelect();

  if (!selectedWeek) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }
  return (
    <>
      <Spacer size={45} />
      {weekSelector}
      <Spacer size={32} />
      {by === 'player' ? (
        <div data-testid="picks-by-player">
          <PicksByPlayer season={season} selectedWeek={selectedWeek} />
        </div>
      ) : (
        <div data-testid="picks-by-game">
          <PicksByGame season={season} selectedWeek={selectedWeek} />
        </div>
      )}
    </>
  );
}
