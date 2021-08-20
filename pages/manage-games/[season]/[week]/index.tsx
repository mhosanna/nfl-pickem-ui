import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { initializeApollo, addApolloState } from "../../../../lib/withData";
import PageHeading from "../../../../components/PageHeading";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ManageGames from "../../../../components/ManageGames";
import Spacer from "../../../../components/Spacer";
import { GET_WEEKS_BY_SEASON_QUERY } from "../../../../components/WeekTile";
import { GET_GAMES_BY_WEEK_SLUG } from "../../../../components/GameTiles";
import { season } from "../../../../config";
import PleaseSignIn from "../../../../components/PleaseSignIn";

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

export async function getStaticPaths(context) {
  const apolloClient = initializeApollo({ headers: context?.req?.headers });

  const resp = await apolloClient.query({
    query: GET_WEEKS_BY_SEASON_QUERY,
    variables: { season },
  });
  const allWeeks = resp.data.weeks;
  const paths = allWeeks.map((week) => ({
    params: { season, week: week.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, context }) {
  const apolloClient = initializeApollo({ headers: context?.req?.headers });

  await apolloClient.query({
    query: GET_GAMES_BY_WEEK_SLUG,
    variables: { slug: params.week, season: params.season },
  });

  await apolloClient.query({
    query: GET_WEEK_BY_SLUG_QUERY,
    variables: { slug: params.week, season: params.season },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default function ManageGamesPage() {
  const {
    query: { season, week },
  } = useRouter();

  const { data, error, loading } = useQuery(GET_WEEK_BY_SLUG_QUERY, {
    variables: { slug: week, season },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const weekData = data.weeks[0];

  return (
    <>
      <PageHeading heading="Manage Games" season={season} />
      <PleaseSignIn>
        <Breadcrumbs>
          <Breadcrumbs.Crumb href={`/manage-games/${season}`}>
            {season} Season
          </Breadcrumbs.Crumb>
          <Breadcrumbs.Crumb href={`/manage-games/${season}/${week}`}>
            {weekData.label}
          </Breadcrumbs.Crumb>
        </Breadcrumbs>
        <Spacer size={14} />
        <ManageGames week={weekData} season={season} />
      </PleaseSignIn>
    </>
  );
}
