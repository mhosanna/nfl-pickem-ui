import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { spreadToString } from '../../utils/spreadToString';
import {
  useGamesBySeasonAndWeekQuery,
  usePlayersBySeasonAndWeekQuery,
} from '../../types/generated-queries';

export default function PicksByGame({ season, selectedWeek }) {
  const [selectedGame, setSelectedGame] = useState({ id: '0' });
  const { data, error, loading } = useGamesBySeasonAndWeekQuery({
    variables: { season, weekId: selectedWeek.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const games = data?.games;
  if (games?.length === 0) {
    return <p>No Games</p>;
  }

  return (
    <List aria-label="games">
      {games?.map((game) => {
        const isSelected = game.id === selectedGame.id;
        return (
          <React.Fragment key={game.id}>
            <Game
              key={game.id}
              onClick={() => setSelectedGame(game)}
              isSelected={game.id === selectedGame.id}
            >
              <span>@ {game.homeTeam.name}</span>
              <span>{spreadToString(game.spread)}</span>
              <span>{game.awayTeam.name}</span>
            </Game>
            {isSelected && (
              <PlayerList
                season={season}
                selectedWeek={selectedWeek}
                selectedGame={selectedGame}
              />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}

function PlayerList({ season, selectedWeek, selectedGame }) {
  const { data, error, loading } = usePlayersBySeasonAndWeekQuery({
    variables: { season, weekId: selectedWeek.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const players = data?.players;
  if (!players) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }
  const sortedPlayers = [...players];
  sortedPlayers.sort((a, b) =>
    a.name.toUpperCase() < b.name.toUpperCase()
      ? -1
      : a.name.toUpperCase() > b.name.toUpperCase()
      ? 1
      : 0
  );
  return (
    <PlayerWrapper aria-label="players">
      {sortedPlayers.map((player) => {
        const playerPick = player?.picks?.find(
          ({ game }) => game.id === selectedGame.id
        );
        const hasWinner = !!(playerPick && selectedGame.winner);
        const wasCorrect = !!playerPick?.isCorrect;
        return (
          <PlayerItem key={player.id}>
            {wasCorrect && <FloatingIcon name={'Check'} size="16" />}
            {hasWinner && !wasCorrect && <FloatingIcon name={'X'} size="16" />}
            <PlayerTile noWinner={!hasWinner} correct={wasCorrect}>
              <span>{player.name}</span>
              <span>{playerPick?.picked?.name}</span>
            </PlayerTile>
          </PlayerItem>
        );
      })}
    </PlayerWrapper>
  );
}

const PlayerItem = styled.li`
  position: relative;
`;

const FloatingIcon = styled(Icon)`
  position: absolute;
  top: 19px;
  left: 8px;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    top: 14px;
    left: 10px;
  }
`;

const PlayerWrapper = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 45%;
  position: absolute;
  right: 0;

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    width: auto;
    position: initial;
  }
`;

const PlayerTile = styled.div<{ noWinner: boolean; correct: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  max-height: 32px;
  padding: 10px 30px;
  border-radius: 10px;
  font-size: 1.6rem;
  background-color: ${(props) =>
    props.noWinner
      ? 'var(--background)'
      : props.correct
      ? 'var(--success)'
      : 'var(--warningLight)'};

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    justify-content: space-evenly;
    padding: 5px 30px;
  }
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
  white-space: nowrap;
  position: relative;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    position: initial;
  }
`;

const Game = styled.li<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  border: 3px solid var(--black);
  padding: 2px 10px 2px 10px;
  font-size: 1.8rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.isSelected ? 'var(--black)' : 'initial'};
  color: ${(props) => (props.isSelected ? 'white' : 'initial')};

  width: 45%;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? 'var(--black)' : 'var(--backgroundHover)'};
  }
  &::after {
    display: ${(props) => (props.isSelected ? 'initial' : 'none')};
    content: '>';
    position: absolute;
    right: -25px;
    top: -5px;
    color: black;
    font-size: 2.5rem;
  }

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    width: auto;
    justify-content: space-evenly;

    &::after {
      display: none;
    }
  }
`;
