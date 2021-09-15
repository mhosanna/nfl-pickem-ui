import { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import useWeekSelect from "../../lib/useWeekSelect";
import Spacer from "../Spacer";
import Icon from "../Icon";

const PLAYERS_QUERY = gql`
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
  const { weekSelector, selectedWeek, loading, error } = useWeekSelect();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!selectedWeek) {
    return null;
  }
  return (
    <>
      <Spacer size={45} />
      {weekSelector}
      <Spacer size={32} />
      <Wrapper>
        <PlayerList
          season={season}
          selectedWeek={selectedWeek}
          setPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
        {selectedPlayer && (
          <GameList
            selectedWeek={selectedWeek}
            selectedPlayer={selectedPlayer}
          />
        )}
      </Wrapper>
    </>
  );
}

function GameList({ selectedWeek, selectedPlayer }) {
  const playerPicks = selectedPlayer?.picks;

  return (
    <GamesWrapper>
      {selectedWeek.games.map((g) => {
        const playerPick = playerPicks?.find(({ game }) => game.id === g.id);
        const isHomePicked = playerPick?.picked.id === g.homeTeam.id;
        const isAwayPicked = playerPick?.picked.id === g.awayTeam.id;
        const hasWinner = playerPick && g.winner;
        const wasCorrect = hasWinner && playerPick?.picked.id === g.winner?.id;
        return (
          <GameItem key={g.id}>
            {wasCorrect && <FloatingIcon name={"Check"} size="16" />}
            {hasWinner && !wasCorrect && <FloatingIcon name={"X"} size="16" />}
            <GameTile noWinner={!hasWinner} correct={wasCorrect}>
              <TeamAbbreviation isPicked={isHomePicked}>
                @ {g.homeTeam.abbreviation}
              </TeamAbbreviation>
              <span>{g.spread}</span>
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
  font-weight: ${(props) => (props.isPicked ? "600" : "initial")};
`;

const GamesWrapper = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
  height: fit-content;

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
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
      ? "var(--background)"
      : props.correct
      ? "var(--success)"
      : "var(--warningLight)"};
`;

function PlayerList({ season, selectedWeek, selectedPlayer, setPlayer }) {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season, weekId: selectedWeek.id },
  });

  if (playersQueryLoading) return <p>Loading...</p>;
  if (playersQueryError) return <p>Error</p>;
  const { players } = playersInfo;
  const sortedPlayers = [...players];
  sortedPlayers.sort((a, b) => b.picksCount - a.picksCount);

  return (
    <List>
      {sortedPlayers.map((player) => {
        return (
          <Player
            key={player.id}
            onClick={() => setPlayer(player)}
            isSelected={player.id === selectedPlayer?.id}
          >
            <span>{player.name}</span>
            <span>
              {player.picksCount} / {selectedWeek.games.length}
            </span>
          </Player>
        );
      })}
    </List>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;
const List = styled.ol`
  flex: 1;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  white-space: nowrap;
`;

const Player = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 3px solid var(--black);
  padding: 8px 62px 8px 32px;
  font-size: 2rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.isSelected ? "var(--black)" : "initial"};
  color: ${(props) => (props.isSelected ? "white" : "initial")};

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? "var(--black)" : "var(--backgroundHover)"};
  }
  &::after {
    display: ${(props) => (props.isSelected ? "initial" : "none")};
    content: ">";
    position: absolute;
    right: -25px;
    top: 2px;
    color: black;
    font-size: 2.5rem;
  }
`;
