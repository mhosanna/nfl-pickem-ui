import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import PageHeading from "../../../../components/PageHeading";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ManageWeeks from "../../../../components/ManageWeeks";
import Spacer from "../../../../components/Spacer";

const GET_WEEK_BY_SLUG_QUERY = gql`
  query GET_WEEK_BY_SLUG_QUERY($slug: String, $season: String) {
    allWeeks(where: { slug: $slug, season: $season }) {
      id
      label
      slug
      gamesCount
    }
  }
`;

export default function manageGames() {
  const { query } = useRouter();
  const season = query.season;
  const { data, error, loading } = useQuery(GET_WEEK_BY_SLUG_QUERY, {
    variables: { slug: query.week, season },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const weekData = data.allWeeks[0];

  return (
    <>
      <PageHeading heading="Manage Games" season={season} />
      <Breadcrumbs>
        <Breadcrumbs.Crumb href={`/manage-games/${season}`}>
          {season} Season
        </Breadcrumbs.Crumb>
        <Breadcrumbs.Crumb href={`/manage-games/${season}/${query.week}`}>
          {weekData.label}
        </Breadcrumbs.Crumb>
      </Breadcrumbs>
      <Spacer size={14} />
    </>
  );
}
