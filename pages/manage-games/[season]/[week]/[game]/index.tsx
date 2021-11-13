import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PageHeading from '../../../../../components/PageHeading';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import Spacer from '../../../../../components/Spacer';
import EditGame from '../../../../../components/EditGame';
import PleaseSignIn from '../../../../../components/PleaseSignIn';

const GET_WEEK_BY_SLUG_QUERY = gql`
  query GET_WEEK_BY_SLUG_QUERY($slug: String, $season: String) {
    weeks(
      where: {
        AND: [{ slug: { equals: $slug } }, { season: { equals: $season } }]
      }
    ) {
      id
      slug
      label
    }
  }
`;

const GET_GAME_BY_SLUG_QUERY = gql`
  query GET_GAME_BY_SLUG_QUERY($slug: String, $season: String) {
    games(
      where: {
        AND: [{ slug: { equals: $slug } }, { season: { equals: $season } }]
      }
    ) {
      id
      slug
      homeTeam {
        id
        name
        city
        abbreviation
      }
      awayTeam {
        id
        name
        city
        abbreviation
      }
      spread
      winner {
        id
        name
        city
        abbreviation
      }
    }
  }
`;

export default function ManageGamePage() {
  const {
    query: { season, week, game },
  } = useRouter();

  const { data, error, loading } = useQuery(GET_WEEK_BY_SLUG_QUERY, {
    variables: { slug: week, season },
  });
  const {
    data: gameData,
    error: gameError,
    loading: gameLoading,
  } = useQuery(GET_GAME_BY_SLUG_QUERY, {
    variables: { slug: game, season },
  });
  if (loading || gameLoading) return <p>Loading...</p>;
  if (
    error ||
    gameError ||
    gameData.games.length === 0 ||
    data.weeks.length === 0
  )
    return <p>Error</p>;

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
