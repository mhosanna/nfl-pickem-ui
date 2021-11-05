import { useRouter } from 'next/router';
import PageHeading from '../../../../../components/PageHeading';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import Spacer from '../../../../../components/Spacer';
import EditGame from '../../../../../components/EditGame';
import PleaseSignIn from '../../../../../components/PleaseSignIn';
import {
  useGetWeekBySlugQuery,
  useGetGameBySlugQuery,
} from '../../../../../types/generated-queries';

export default function ManageGamePage() {
  const {
    query: { season, week, game },
  } = useRouter();

  const { data, error, loading } = useGetWeekBySlugQuery({
    variables: { slug: week, season },
  });
  const {
    data: gameData,
    error: gameError,
    loading: gameLoading,
  } = useGetGameBySlugQuery({
    variables: { slug: game, season },
  });
  if (loading || gameLoading) return <p>Loading...</p>;

  if (error || gameError)
    return <p>Error: {error ? error.message : gameError?.message}</p>;

  if (gameData.games.length === 0 || data.weeks.length === 0) {
    return (
      <p>
        Error:{' '}
        {gameData.games.length === 0 ? 'game not found' : 'week not found'}
      </p>
    );
  }

  const weekData = data.weeks[0];
  const games = gameData.games[0];
  const gameLabel = games.homeTeam.name + ' vs ' + games.awayTeam.name;

  return (
    <>
      <PageHeading heading="Manage Games" season={season} />
      <PleaseSignIn>
        <>
          <Breadcrumbs>
            <Breadcrumbs.Crumb href={`/manage-games/${season}`}>
              {season} Season
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Crumb href={`/manage-games/${season}/${week}`}>
              {weekData.label}
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Crumb href={`/manage-games/${season}/${week}/${game}`}>
              {gameLabel}
            </Breadcrumbs.Crumb>
          </Breadcrumbs>
          <Spacer size={14} />
          <EditGame game={games} />
        </>
      </PleaseSignIn>
    </>
  );
}
