import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import useWeekSelect from '../../lib/useWeekSelect';
import Spacer from '../Spacer';
import Icon from '../Icon';
import { spreadToString } from '../../utils/spreadToString';
import { useEffect } from 'react';

export const PLAYERS_QUERY = gql`
  query GET_PLAYERS_BY_SEASON_AND_WEEK($season: String!, $weekId: ID!) {
    players(
      where: { picks: { some: { game: { season: { equals: $season } } } } }
    ) {
      id
      name
      picksCount(
        where: {
          AND: [
            { game: { week: { id: { equals: $weekId } } } }
            { isCorrect: { equals: true } }
          ]
        }
      )
      picks(where: { game: { week: { id: { equals: $weekId } } } }) {
        id
        isCorrect
        picked {
          id
          city
          name
        }
        game {
          id
        }
      }
    }
  }
`;

export default function PicksByPlayer({ season }) {
  const [selectedPlayer, setSelectedPlayer] = useState();
  const { weekSelector, selectedWeek } = useWeekSelect();

  if (!selectedWeek) {
    return null;
  }

  return (
    <>
      <Spacer size={45} />
      {weekSelector}
      <Spacer size={32} />
      <PlayerPicks
        season={season}
        selectedWeek={selectedWeek}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />
    </>
  );
}

function PlayerPicks({
  season,
  selectedWeek,
  selectedPlayer,
  setSelectedPlayer,
}) {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season, weekId: selectedWeek.id },
  });
  //if week changed from dropdown, reselect the selected player
  useEffect(() => {
    const player = playersInfo?.players.find(
      (player) => player.id === selectedPlayer?.id
    );
    setSelectedPlayer(player);
  }, [selectedWeek]);

  if (playersQueryLoading) return <p>Loading...</p>;
  if (playersQueryError) return <p>{playersQueryError.message}</p>;

  const { players } = playersInfo;
  const sortedPlayers = [...players];
  sortedPlayers.sort((a, b) => b.picksCount - a.picksCount);

  return (
    <div>
      <PlayerList
        selectedWeek={selectedWeek}
        players={sortedPlayers}
        setPlayer={setSelectedPlayer}
        selectedPlayer={selectedPlayer}
      />
    </div>
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
            {wasCorrect && <FloatingIcon name={'Check'} size="16" />}
            {hasWinner && !wasCorrect && <FloatingIcon name={'X'} size="16" />}
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

const TeamAbbreviation = styled.span<{ isPicked: boolean }>`
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

const GameTile = styled.div<{ noWinner: boolean; correct: boolean }>`
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

function PlayerList({ players, selectedWeek, selectedPlayer, setPlayer }) {
  return (
    <List aria-label="players">
      {players.map((player) => {
        const isSelected = player.id === selectedPlayer?.id;
        return (
          <React.Fragment key={player.id}>
            <Player
              key={player.id}
              onClick={() => setPlayer(player)}
              isSelected={isSelected}
            >
              <span>{player.name}</span>
              <span>
                {player.picksCount} / {selectedWeek.games.length}
              </span>
            </Player>
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

const List = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
  white-space: nowrap;
  position: relative;
  padding-bottom: 32px;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    position: initial;
    padding-bottom: 25px;
  }
`;

const Player = styled.li<{ isSelected: boolean }>`
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
