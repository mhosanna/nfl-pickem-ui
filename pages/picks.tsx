import PageHeading from '../components/PageHeading';
import { Picks } from '../components/Picks';
import PleaseSignIn from '../components/PleaseSignIn';
import { season } from '../config';

export default function PicksPage() {
  return (
    <>
      <PageHeading heading="Make Your Picks" season={season} />
      <PleaseSignIn>
        <Picks player={defaultPlayer} />
      </PleaseSignIn>
    </>
  );
}

// PleaseSignIn will _always_ pass the logged in player
// Picks requires a player, but default player will never be used.
const defaultPlayer = {
  id: '0',
};
