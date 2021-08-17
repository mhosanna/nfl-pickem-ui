import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Spread, List, FieldWrapper, GameListWrapper } from "./PicksStyles";
import TeamBlock from "../TeamBlock";
import Select from "../Select";
import Spacer from "../Spacer";
import { spreadToString } from "../../utils/spreadToString";
import { usePlayer } from "../../lib/usePlayer";

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
    week {
      id
    }
    spread
    winner {
      id
    }
  }
`;

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
    allPicks(
      where: {
        AND: [
          { player: { id: $playerId } }
          { game: { week: { id: $weekId } } }
        ]
      }
    ) {
      id
      ...PickFragment
    }
  }
  ${pickFragment}
`;

const WEEKS_BY_SEASON_QUERY = gql`
  query GET_ALL_WEEKS_BY_SEASON($season: String) {
    allWeeks(where: { season: $season }, orderBy: { id: desc }) {
      id
      label
      games {
        id
        ...GameFragment
      }
    }
  }
  ${gameFragment}
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

function Picks({ season }) {
  const { id } = usePlayer();
  const playerId = id;

  const {
    data: weeksInfo,
    error: weeksQueryError,
    loading: weeksQueryLoading,
  } = useQuery(WEEKS_BY_SEASON_QUERY, {
    variables: { season },
  });

  if (weeksQueryLoading) return <p>Loading...</p>;
  if (weeksQueryError) return <p>Error</p>;

  const { allWeeks } = weeksInfo;

  return (
    <div>
      <PickWrapper availableWeeks={allWeeks} playerId={playerId} />
    </div>
  );
}

const PickWrapper = ({ availableWeeks, playerId }) => {
  const [dropdownLabel, setDropdownLabel] = React.useState(
    availableWeeks[0]?.label
  ); //what if null?
  const [selectedWeek, setSelectedWeek] = React.useState(availableWeeks[0]);

  React.useEffect(() => {
    const week = availableWeeks.filter((week) => week.label === dropdownLabel);
    setSelectedWeek(week[0]);
  }, [dropdownLabel, availableWeeks]);

  return (
    <div>
      <Select
        label="Select a Week"
        value={dropdownLabel}
        onChange={(ev) => setDropdownLabel(ev.target.value)}
      >
        {availableWeeks.map((week) => {
          return (
            <option key={week.id} value={week.label}>
              {week.label}
            </option>
          );
        })}
      </Select>
      <Spacer size={28} />
      <GamesList playerId={playerId} selectedWeek={selectedWeek} />
    </div>
  );
};

function GamesList({ playerId, selectedWeek }) {
  const allGames = selectedWeek.games;

  if (allGames.length === 0) return <div>No Games Found</div>;

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
      {allGames.map((game) => {
        const playerPick = data.allPicks.filter(
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
      if (existingPicks && newPickFromResponse) {
        cache.writeQuery({
          query: PICKS_BY_WEEK_QUERY,
          variables: { weekId: game.week?.id, playerId },
          data: {
            allPicks: [...existingPicks?.allPicks, newPickFromResponse],
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

export {
  Picks,
  WEEKS_BY_SEASON_QUERY,
  MAKE_PICK_MUTATION,
  PICKS_BY_WEEK_QUERY,
};
