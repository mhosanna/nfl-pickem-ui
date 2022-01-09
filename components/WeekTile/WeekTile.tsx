import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useSeason } from '../../lib/seasonContext';

const gameFragment = gql`
  fragment GameFragment on Game {
    homeTeam {
      id
      name
      city
    }
    awayTeam {
      id
      name
      city
    }
    spread
    winner {
      id
    }
  }
`;

const GET_WEEKS_BY_SEASON_QUERY = gql`
  query GET_WEEKS_BY_SEASON($season: String) {
    weeks(where: { season: { equals: $season } }) {
      id
      label
      slug
      season
      gamesCount
      createdAt
      games {
        id
        slug
        ...GameFragment
      }
    }
  }
  ${gameFragment}
`;

export function WeekTiles() {
  const router = useRouter();
  const { season } = useSeason();
  const {
    data: weeksInfo,
    error: weeksQueryError,
    loading: weeksQueryLoading,
  } = useQuery(GET_WEEKS_BY_SEASON_QUERY, {
    variables: { season },
  });

  if (weeksQueryLoading) return <p>Loading...</p>;
  if (weeksQueryError) return <p>{weeksQueryError.message}</p>;

  const { weeks } = weeksInfo;

  return (
    <WeekListWrapper>
      {weeks.map((week) => {
        return (
          <WeekTile
            key={week.id}
            onClick={() => {
              router.push({
                pathname: '/manage-games/[season]/[week]',
                query: {
                  season,
                  week: week.slug,
                },
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(175px, 100%), 1fr));
  gap: 32px;
  padding-bottom: 32px;
`;

const WeekTile = styled.button`
  height: 75px;
  background-color: var(--background);
  border: 2px solid var(--black);
  border-radius: 5px;
  &:hover,
  &:focus {
    background-color: var(--backgroundHover);
  }
`;

const WeekLabel = styled.p`
  font-size: 1.8rem;
`;

const WeekGameCount = styled.p`
  font-size: 1.2rem;
  color: var(--gray700);
`;

export { GET_WEEKS_BY_SEASON_QUERY };
