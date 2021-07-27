import PageHeading from "../../../components/PageHeading";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ManageWeeks from "../../../components/ManageWeeks";
import { GET_WEEKS_BY_SEASON_QUERY } from "../../../components/WeekTile";
import Spacer from "../../../components/Spacer";
import { initializeApollo, addApolloState } from "../../../lib/withData";
import { season } from "../../../config";
import PleaseSignIn from "../../../components/PleaseSignIn";

export async function getStaticPaths() {
  return {
    paths: [{ params: { season } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_WEEKS_BY_SEASON_QUERY,
    variables: { season: params.season },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default function ManageWeeksPage() {
  return (
    <>
      <PageHeading heading="Manage Games" season={season} />
      <PleaseSignIn>
        <Breadcrumbs>
          <Breadcrumbs.Crumb href={`/manage-games/${season}`}>
            {season} Season
          </Breadcrumbs.Crumb>
        </Breadcrumbs>
        <Spacer size={14} />
        <ManageWeeks season={season} />
      </PleaseSignIn>
    </>
  );
}
