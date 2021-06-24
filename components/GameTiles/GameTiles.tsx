import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";

const SEASON = "2020";

const GET_GAMES_BY_WEEK_QUERY = gql`
  query GET_GAMES_BY_WEEK_QUERY($season: String, $week: String) {
    allGames(where: { season: $season, week: { slug: $week } }) {
      id
      slug
    }
  }
`;

export default function GameTiles() {
  const router = useRouter();
  const week = router.query.week;
  const { data, error, loading } = useQuery(GET_GAMES_BY_WEEK_QUERY, {
    variables: { season: SEASON, week }, //hard code season for now
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { allGames } = data;

  return (
    <GameListWrapper>
      {allGames.map((game) => {
        return (
          <GameTile
            key={game.id}
            onClick={() => {
              router.push({
                pathname: "/manage-games/[season]/[week]/[game]",
                query: {
                  season: SEASON,
                  week: week,
                  game: game.slug,
                },
              });
            }}
          ></GameTile>
        );
      })}
    </GameListWrapper>
  );
}

const GameListWrapper = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const GameTile = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 75px;
  background-color: var(--background);
  border: 2px solid var(--black);
  border-radius: 5px;
  &:hover,
  &:focus {
    background-color: var(--backgroundHover);
  }
`;
