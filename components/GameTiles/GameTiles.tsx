import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { season } from '../../config';
import Icon from '../Icon';
import { spreadToString } from '../../utils/spreadToString';

const GET_GAMES_BY_WEEK_SLUG = gql`
  query GET_GAMES_BY_WEEK_SLUG($slug: String, $season: String) {
    games(
      where: {
        AND: [
          { season: { equals: $season } }
          { week: { slug: { equals: $slug } } }
        ]
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
      }
    }
  }
`;

const SELECT_GAME_WINNER = gql`
  mutation SELECT_GAME_WINNER($gameId: ID!, $winnerId: ID!) {
    updateGame(
      where: { id: $gameId }
      data: { winner: { connect: { id: $winnerId } } }
    ) {
      id
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
  const [selectWinner, { error: selectWinnerError }] =
    useMutation(SELECT_GAME_WINNER);

  const chooseWinner = (gameId) => async (winnerId) => {
    selectWinner({
      variables: { gameId, winnerId },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { games } = data;
  const sortedGames = [...games];
  sortedGames.sort((a, b) => {
    const aGame = a.homeTeam.abbreviation.toUpperCase();
    const bGame = b.homeTeam.abbreviation.toUpperCase();
    if (aGame < bGame) {
      return -1;
    }
    if (aGame > bGame) {
      return 1;
    }

    return 0;
  });
  return (
    <GameListWrapper>
      {sortedGames.map((game) => {
        const isWinner = (teamId) => {
          if (teamId === game.winner?.id) return true;
          return false;
        };
        return (
          <GameTile key={game.id}>
            <TeamBlock
              id={game.homeTeam.id}
              field={'home'}
              abbreviation={game.homeTeam.abbreviation}
              isWinner={isWinner(game.homeTeam.id)}
              chooseWinner={chooseWinner(game.id)}
            />
            <Spread>
              <SpreadCircle>{spreadToString(game.spread)}</SpreadCircle>
            </Spread>
            <TeamBlock
              id={game.awayTeam.id}
              field={'away'}
              abbreviation={game.awayTeam.abbreviation}
              isWinner={isWinner(game.awayTeam.id)}
              chooseWinner={chooseWinner(game.id)}
            />
            <EditButton
              aria-label="edit game"
              onClick={() => {
                router.push({
                  pathname: '/manage-games/[season]/[week]/[game]',
                  query: {
                    season,
                    week,
                    game: game.slug,
                  },
                });
              }}
            >
              <Icon name="Edit" size={14} />
            </EditButton>
          </GameTile>
        );
      })}
    </GameListWrapper>
  );
}

function TeamBlock({
  id,
  field,
  abbreviation,
  isWinner = false,
  chooseWinner,
}) {
  let Component;
  let WinFlag;
  if (field === 'home') {
    Component = HomeTeam;
    WinFlag = HomeFlag;
  } else if (field === 'away') {
    Component = BaseTeam;
    WinFlag = AwayFlag;
  } else {
    throw new Error(`Unrecognized Team Field: ${field}`);
  }
  return (
    <>
      <Component isWinner={isWinner} onClick={() => chooseWinner(id)}>
        {isWinner && (
          <WinFlag>
            <Icon name={'Star'} size={10} /> Winner!
          </WinFlag>
        )}
        <span>{abbreviation}</span>
      </Component>
    </>
  );
}

const EditButton = styled.button`
  border: none;
  background-color: initial;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  height: 30px;
  width: 40px;
`;

const Spread = styled.div`
  grid-area: 1 / 1 / 3 /3;
  width: fit-content;
  margin: auto;
  z-index: 2;
`;

const SpreadCircle = styled.div`
  width: 40px;
  border-radius: 50%;
  line-height: 4rem;
  text-align: center;
  background-color: var(--background);
  border: 1px solid var(--black);
`;

const BaseTeam = styled.button<{ isWinner: boolean }>`
  grid-area: 1 / 2 / 3 / 3;
  border: none;
  background-color: ${(props) =>
    props.isWinner ? 'var(--secondary)' : 'inherit'};
`;

const HomeTeam = styled(BaseTeam)`
  grid-area: 1 / 1 / 3 / 2;
  border-right: 1px solid var(--black);
  &:before {
    content: '@ ';
  }
`;

const FlagBase = styled.div`
  position: absolute;
  background-color: var(--primary);
  padding: 5px 12px;
  font-size: 1.2rem;
  border-radius: 50px;
  color: white;
  line-height: initial;
`;

const HomeFlag = styled(FlagBase)`
  top: -12px;
  left: -10px;
`;
const AwayFlag = styled(FlagBase)`
  top: -12px;
  right: -10px;
`;

const GameListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr));
  gap: 32px;
  padding-bottom: 32px;
`;

const GameTile = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(2, 40px);
  font-size: 1.6rem;
  background-color: var(--background);
  border: 2px solid var(--black);
  border-radius: 5px;
  position: relative;
  text-align: center;
`;

export { GET_GAMES_BY_WEEK_SLUG };
