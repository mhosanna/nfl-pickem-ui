import { useRouter } from 'next/router';
import PageHeading from '../../../../components/PageHeading';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ManageGames from '../../../../components/ManageGames';
import Spacer from '../../../../components/Spacer';
import PleaseSignIn from '../../../../components/PleaseSignIn';
import { useGetWeekBySlugQuery } from '../../../../types/generated-queries';

export default function ManageGamesPage() {
  const {
    query: { season, week },
  } = useRouter();

  const { data, error, loading } = useGetWeekBySlugQuery({
    variables: { slug: week, season },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  if (data.weeks.length === 0) {
    return <p>No weeks to display.</p>;
  }

  const weekData = data.weeks[0];

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
          </Breadcrumbs>
          <Spacer size={14} />
          <ManageGames weekId={weekData.id} season={season} />
        </>
      </PleaseSignIn>
    </>
  );
}
