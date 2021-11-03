import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Spread, List, FieldWrapper, GameListWrapper } from './PicksStyles';
import TeamBlock from '../TeamBlock';
import Spacer from '../Spacer';
import { spreadToString } from '../../utils/spreadToString';
import { usePlayer } from '../../lib/usePlayer';
import useWeekSelect from '../../lib/useWeekSelect';

const pickFragment = gql`
  fragment PickFragment on Pick {
    player {
      id
      name
    }
    game {
      id
    }
    picked {
      id
      name
      city
    }
  }
`;

const PICKS_BY_WEEK_QUERY = gql`
  query GET_PICKS_BY_WEEK_QUERY($playerId: ID!, $weekId: ID!) {
    picks(
      where: {
        AND: [
          { player: { id: { equals: $playerId } } }
          { game: { week: { id: { equals: $weekId } } } }
        ]
      }
    ) {
      id
      ...PickFragment
    }
  }
  ${pickFragment}
`;

const MAKE_PICK_MUTATION = gql`
  mutation MAKE_PICK_MUTATION($player: ID!, $game: ID!, $team: ID!) {
    upsertPicks(playerId: $player, gameId: $game, teamId: $team) {
      id
      ...PickFragment
    }
  }
  ${pickFragment}
`;

function Picks() {
  const player = usePlayer();
  if (!player) return null;

  const playerId = player.id;

  return (
    <div>
      <PickWrapper playerId={playerId} />
    </div>
  );
}

const PickWrapper = ({ playerId }) => {
  const { weekSelector, selectedWeek, loading, error } = useWeekSelect();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!selectedWeek) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }
  return (
    <div>
      {weekSelector}
      <Spacer size={28} />
      <GamesList playerId={playerId} selectedWeek={selectedWeek} />
    </div>
  );
};

function GamesList({ playerId, selectedWeek }) {
  const games = selectedWeek.games;

  if (games.length === 0) return <div>No Games Found</div>;

  const { data, error, loading } = useQuery(PICKS_BY_WEEK_QUERY, {
    variables: { weekId: selectedWeek.id, playerId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <GameListWrapper>
      <FieldWrapper>
        <h3>Home</h3>
        <h3>Away</h3>
      </FieldWrapper>
      {games.map((game) => {
        const playerPick = data.picks.filter(
          (pick) => pick.game?.id === game.id
        );
        return (
          <Game
            key={game.id}
            game={game}
            playerId={playerId}
            playersPick={playerPick[0]}
          />
        );
      })}
    </GameListWrapper>
  );
}

function Game({ game, playerId, playersPick }) {
  const [pick] = useMutation(MAKE_PICK_MUTATION, {
    update(cache, { data }) {
      const newPickFromResponse = data?.upsertPicks;
      //if trying to pick game with a winner do nothing
      if (!newPickFromResponse) {
        return;
      }
      //if player removed pick
      if (!newPickFromResponse?.picked) {
        return cache.evict({ id: cache.identify(newPickFromResponse) });
      }
      const existingPicks = cache.readQuery<any>({
        query: PICKS_BY_WEEK_QUERY,
        variables: { weekId: game.week?.id, playerId },
      });
      if (existingPicks.picks.length > 0 && newPickFromResponse) {
        cache.writeQuery({
          query: PICKS_BY_WEEK_QUERY,
          variables: { weekId: game.week?.id, playerId },
          data: {
            picks: [...existingPicks?.picks, newPickFromResponse],
          },
        });
      } else {
        cache.writeQuery({
          query: PICKS_BY_WEEK_QUERY,
          variables: { weekId: game.week?.id, playerId },
          data: {
            picks: [newPickFromResponse],
          },
        });
      }
    },
  });

  const makePick = (gameId, playerId) => async (teamId) => {
    await pick({
      variables: { player: playerId, game: gameId, team: teamId },
    });
  };

  const spreadString = spreadToString(game.spread);

  return (
    <React.Fragment key={game.id}>
      <List>
        <TeamBlock
          id={game.homeTeam.id}
          name={game.homeTeam.name}
          city={game.homeTeam.city}
          field="home"
          isWinner={game.homeTeam.id === game.winner?.id}
          isPicked={game.homeTeam.id === playersPick?.picked?.id ? true : false}
          makePick={makePick(game.id, playerId)}
        />
        <TeamBlock
          id={game.awayTeam.id}
          name={game.awayTeam.name}
          city={game.awayTeam.city}
          field="away"
          isWinner={game.awayTeam.id === game.winner?.id}
          isPicked={game.awayTeam.id === playersPick?.picked?.id ? true : false}
          makePick={makePick(game.id, playerId)}
        />
        <Spread spread={spreadString} />
      </List>
    </React.Fragment>
  );
}

export { Picks, MAKE_PICK_MUTATION, PICKS_BY_WEEK_QUERY };
