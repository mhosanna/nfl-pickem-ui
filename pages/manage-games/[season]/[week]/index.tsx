import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PageHeading from '../../../../components/PageHeading';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ManageGames from '../../../../components/ManageGames';
import Spacer from '../../../../components/Spacer';
import PleaseSignIn from '../../../../components/PleaseSignIn';

export const GET_WEEK_BY_SLUG_QUERY = gql`
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

export default function ManageGamesPage() {
  const {
    query: { season, week },
  } = useRouter();

  const weekParam = Array.isArray(week) ? week[0] : week;
  const seasonParam = Array.isArray(season) ? season[0] : (season as string);

  const { data, error, loading } = useQuery(GET_WEEK_BY_SLUG_QUERY, {
    variables: { slug: weekParam, season: seasonParam },
  });

  if (loading) return <p>Loading...</p>;
  if (error || data.weeks.length === 0) return <p>Error</p>;

  const weekData = data.weeks[0];

  return (
    <>
      <PageHeading heading="Manage Games" season={season} />
      <PleaseSignIn>
        <>
          <Breadcrumbs>
            <Breadcrumbs.Crumb href={`/manage-games/${season}`}>
              {seasonParam} Season
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Crumb href={`/manage-games/${season}/${week}`}>
              {weekData.label}
            </Breadcrumbs.Crumb>
          </Breadcrumbs>
          <Spacer size={14} />
          <ManageGames weekId={weekData.id} season={season} />
        </>
      </PleaseSignIn>
    </>
  );
}
