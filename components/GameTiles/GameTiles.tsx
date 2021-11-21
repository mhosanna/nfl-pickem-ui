import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { season } from '../../config';
import Icon from '../Icon';
import { spreadToString } from '../../utils/spreadToString';
import { Game } from '../../types/app';

interface GamesData {
  games: Game[];
}
interface GamesVars {
  slug: string;
  season: string;
}

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

export function GameTiles({ week }: { week: string }) {
  const router = useRouter();
  const { data, error, loading } = useQuery<GamesData, GamesVars>(
    GET_GAMES_BY_WEEK_SLUG,
    {
      variables: { slug: week, season },
    }
  );
  const [selectWinner, { error: selectWinnerError }] =
    useMutation(SELECT_GAME_WINNER);

  const chooseWinner = (gameId) => async (winnerId) => {
    selectWinner({
      variables: { gameId, winnerId },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  let games;
  if (data) {
    games = data.games;
  }

  return (
    <GameListWrapper>
      {games?.map((game) => {
        const isWinner = (teamId: string) => {
          if (teamId === game.winner?.id) return true;
          return false;
        };
        return (
          <GameTile key={game.id}>
            <TeamBlock
              id={game.homeTeam?.id}
              field={'home'}
              abbreviation={game.homeTeam?.abbreviation}
              isWinner={isWinner(game.homeTeam?.id)}
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
  position: absolute;
  right: 131px;
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
  flex: 1;
  height: 100%;
  line-height: 80px;
  border: none;
  background-color: ${(props) =>
    props.isWinner ? 'var(--secondary)' : 'inherit'};
`;

const HomeTeam = styled(BaseTeam)`
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
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const GameTile = styled.div`
  display: flex;
  flex-basis: 300px;
  align-items: center;
  height: 80px;
  font-size: 1.6rem;
  background-color: var(--background);
  border: 2px solid var(--black);
  border-radius: 5px;
  position: relative;
  text-align: center;
`;

export { GET_GAMES_BY_WEEK_SLUG };
