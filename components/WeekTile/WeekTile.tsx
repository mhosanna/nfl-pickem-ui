import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";
import { string_to_slug } from "../../utils/slugify";

const SEASON = "2021";

const GET_WEEKS_BY_SEASON_QUERY = gql`
  query GET_WEEKS_BY_SEASON($season: String) {
    allWeeks(where: { season: $season }) {
      id
      label
      season
      gamesCount
    }
  }
`;

export function WeekTiles() {
  const router = useRouter();
  const {
    data: weeksInfo,
    error: weeksQueryError,
    loading: weeksQueryLoading,
  } = useQuery(GET_WEEKS_BY_SEASON_QUERY, {
    variables: { season: "2020" }, //hard code season for now
  });

  if (weeksQueryLoading) return <p>Loading...</p>;
  if (weeksQueryError) return <p>Error</p>;

  const { allWeeks } = weeksInfo;

  return (
    <WeekListWrapper>
      {allWeeks.map((week) => {
        return (
          <WeekTile
            key={week.id}
            onClick={() => {
              router.push({
                pathname: "/manage-games/[season]/[week]",
                query: { season: SEASON, week: string_to_slug(week.label) },
              });
            }}
          >
            <WeekLabel>{week.label}</WeekLabel>
            <WeekGameCount>{week.gamesCount} games</WeekGameCount>
          </WeekTile>
        );
      })}
    </WeekListWrapper>
  );
}

const WeekListWrapper = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const WeekTile = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 75px;
  background-color: var(--background);
  border: 2px solid var(--black);
  border-radius: 5px;
`;

const WeekLabel = styled.p`
  font-size: 1.8rem;
`;

const WeekGameCount = styled.p`
  font-size: 1.2rem;
  color: var(--gray700);
`;

export { GET_WEEKS_BY_SEASON_QUERY };
