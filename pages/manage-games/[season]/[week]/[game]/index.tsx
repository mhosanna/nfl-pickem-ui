import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { initializeApollo, addApolloState } from "../../../../../lib/withData";
import PageHeading from "../../../../../components/PageHeading";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import Spacer from "../../../../../components/Spacer";
import { GET_WEEKS_BY_SEASON_QUERY } from "../../../../../components/WeekTile";
import { GET_GAMES_BY_WEEK_SLUG } from "../../../../../components/GameTiles";
import { season } from "../../../../../config";
import EditGame from "../../../../../components/EditGame";
import PleaseSignIn from "../../../../../components/PleaseSignIn";

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

export async function getStaticPaths(context) {
  const apolloClient = initializeApollo({ headers: context?.req?.headers });

  const resp = await apolloClient.query({
    query: GET_WEEKS_BY_SEASON_QUERY,
    variables: { season },
  });

  const allWeeks = resp.data.weeks;

  const paths = [];
  allWeeks.map((week) => {
    const weekSlug = week.slug;
    const games = week.games;
    games.forEach((game) => {
      const path = { params: { season, week: weekSlug, game: game.slug } };
      paths.push(path);
    });
  });

  return {
    paths,
    fallback: false,
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
  await apolloClient.query({
    query: GET_GAME_BY_SLUG_QUERY,
    variables: { slug: params.game, season: params.season },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

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
  if (loading || gameLoading || gameData.games.length === 0)
    return <p>Loading...</p>;
  if (error || gameError) return <p>Oops!</p>;

  const weekData = data.weeks[0];
  const games = gameData.games[0];
  const gameLabel = games.homeTeam.name + " vs " + games.awayTeam.name;

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
          <Breadcrumbs.Crumb href={`/manage-games/${season}/${week}/${game}`}>
            {gameLabel}
          </Breadcrumbs.Crumb>
        </Breadcrumbs>
        <Spacer size={14} />
        <EditGame game={games} />
      </PleaseSignIn>
    </>
  );
}
