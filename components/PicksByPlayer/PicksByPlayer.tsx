import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { spreadToString } from '../../utils/spreadToString';
import { usePlayersBySeasonAndWeekQuery } from '../../types/generated-queries';
import { Player } from '../../types/types';

function rankPlayers(players: Player[]) {
  const sortedPlayers = [...players];
  return sortedPlayers.sort((a, b) => {
    if (b?.picksCount && a?.picksCount) {
      return b.picksCount - a.picksCount;
    } else return 0;
  });
}

export default function PicksByPlayer({ season, selectedWeek }) {
  const [selectedPlayer, setSelectedPlayer] = useState();
  const { data, error, loading } = usePlayersBySeasonAndWeekQuery({
    variables: { season, weekId: selectedWeek.id },
  });
  //if week changed from dropdown, reselect the selected player
  useEffect(() => {
    const player = data?.players?.find(
      (player) => player.id === selectedPlayer?.id
    );
    setSelectedPlayer(player);
  }, [selectedWeek]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  const players = data?.players;
  if (!players) {
    return <p>The season hasn't started yet. Check back soon!</p>;
  }
  const sortedPlayers = rankPlayers(players);

  return (
    <List aria-label="players">
      {sortedPlayers.map((player) => {
        const isSelected = player.id === selectedPlayer?.id;
        return (
          <React.Fragment key={player.id}>
            <ListedPlayer
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              isSelected={isSelected}
            >
              <span>{player.name}</span>
              <span>
                {player.picksCount} / {selectedWeek.games.length}
              </span>
            </ListedPlayer>
            {isSelected && (
              <GameList
                selectedWeek={selectedWeek}
                selectedPlayer={selectedPlayer}
              />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}

function GameList({ selectedWeek, selectedPlayer }) {
  const playerPicks = selectedPlayer?.picks;

  return (
    <GamesWrapper aria-label="games">
      {selectedWeek.games.map((g) => {
        const playerPick = playerPicks?.find(({ game }) => game.id === g.id);
        const isHomePicked = playerPick?.picked.id === g.homeTeam.id;
        const isAwayPicked = playerPick?.picked.id === g.awayTeam.id;
        const hasWinner = playerPick && g.winner;
        const wasCorrect = hasWinner && playerPick?.picked.id === g.winner?.id;
        return (
          <GameItem key={g.id}>
            {wasCorrect && (
              <FloatingIcon
                name={'Check'}
                size="16"
                data-testid="correct-pick"
              />
            )}
            {hasWinner && !wasCorrect && (
              <FloatingIcon name={'X'} size="16" data-testid="incorrect-pick" />
            )}
            <GameTile noWinner={!hasWinner} correct={wasCorrect}>
              <TeamAbbreviation isPicked={isHomePicked}>
                @ {g.homeTeam.abbreviation}
              </TeamAbbreviation>
              <span>{spreadToString(g.spread)}</span>
              <TeamAbbreviation isPicked={isAwayPicked}>
                {g.awayTeam.abbreviation}
              </TeamAbbreviation>
            </GameTile>
          </GameItem>
        );
      })}
    </GamesWrapper>
  );
}

const GameItem = styled.li`
  position: relative;
`;

const FloatingIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  left: 8px;
`;

const TeamAbbreviation = styled.span`
  font-weight: ${(props) => (props.isPicked ? '800' : 'initial')};
`;

const GamesWrapper = styled.ul`
  flex: 1;
  width: 47%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 18px;
  height: fit-content;
  position: absolute;
  right: 0;

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    width: auto;
    position: initial;
    padding: 10px 0px;
    grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  }
`;

const GameTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2px;
  max-height: 32px;
  padding: 1px 12px;
  border-radius: 50px;
  font-size: 1.6rem;
  background-color: ${(props) =>
    props.noWinner
      ? 'var(--background)'
      : props.correct
      ? 'var(--success)'
      : 'var(--warningLight)'};
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

const ListedPlayer = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 3px solid var(--black);
  padding: 8px 62px 8px 32px;
  font-size: 2rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.isSelected ? 'var(--black)' : 'initial'};
  color: ${(props) => (props.isSelected ? 'white' : 'initial')};

  width: 35%;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? 'var(--black)' : 'var(--backgroundHover)'};
  }
  &::after {
    display: ${(props) => (props.isSelected ? 'initial' : 'none')};
    content: '>';
    position: absolute;
    right: -25px;
    top: 2px;
    color: black;
    font-size: 2.5rem;
  }
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    width: auto;
    &::after {
      display: none;
    }
  }
`;
