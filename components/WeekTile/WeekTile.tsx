import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSeason } from '../../lib/seasonContext';
import { useGetWeeksBySeasonQuery } from '../../types/generated-queries';

export function WeekTiles() {
  const router = useRouter();
  const { season } = useSeason();
  const {
    data: weeksInfo,
    error: weeksQueryError,
    loading: weeksQueryLoading,
  } = useGetWeeksBySeasonQuery({
    variables: { season },
  });

  if (weeksQueryLoading) return <p>Loading...</p>;
  if (weeksQueryError) return <p>Error</p>;

  const weeks = weeksInfo?.weeks;

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
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const WeekTile = styled.button`
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

const WeekLabel = styled.p`
  font-size: 1.8rem;
`;

const WeekGameCount = styled.p`
  font-size: 1.2rem;
  color: var(--gray700);
`;
