import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";
import { season } from "../../config";
import Icon from "../Icon";

const GET_GAMES_BY_WEEK_SLUG = gql`
  query GET_GAMES_BY_WEEK_SLUG($slug: String, $season: String) {
    allGames(where: { season: $season, week: { slug: $slug } }) {
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
      }
    }
  }
`;

export function GameTiles() {
  const router = useRouter();
  const { week } = router.query;

  const { data, error, loading } = useQuery(GET_GAMES_BY_WEEK_SLUG, {
    variables: { slug: week, season },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const games = data.allGames;

  return (
    <GameListWrapper>
      {games.map((game) => {
        return (
          <GameTile
            key={game.id}
            onClick={() => {
              router.push({
                pathname: "/manage-games/[season]/[week]/[game]",
                query: {
                  season,
                  week,
                  game: game.slug,
                },
              });
            }}
          >
            <HomeTeam>
              <AtSpan>@ </AtSpan>
              {game.homeTeam.abbreviation}
            </HomeTeam>
            <Spread>
              <SpreadCircle>{game.spread}</SpreadCircle>
            </Spread>
            <AwayTeam>{game.awayTeam.abbreviation}</AwayTeam>
            <EditButton>
              <Icon name="Edit" size={14} />
            </EditButton>
          </GameTile>
        );
      })}
    </GameListWrapper>
  );
}

const EditButton = styled.button`
  border: none;
  background-color: initial;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const Spread = styled.div`
  flex: 1;
  display: flex;
`;

const SpreadCircle = styled.div`
  width: 40px;
  margin: auto;
  height: 40px;
  border-radius: 50%;
  line-height: 3.9rem;
`;

const AwayTeam = styled.div`
  flex: 1;
`;

const HomeTeam = styled.div`
  flex: 1;
`;

const AtSpan = styled.span``;

const GameListWrapper = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const GameTile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 80px;
  font-size: 1.6rem;
  background-color: var(--background);
  border: 2px solid var(--black);
  border-radius: 5px;
  position: relative;
`;

export { GET_GAMES_BY_WEEK_SLUG };
