import { useQuery } from "@apollo/client";
import { Heading, Box } from "@primer/components";
import gql from "graphql-tag";

const PLAYERS_QUERY = gql`
  query PLAYERS_QUERY($season: Int) {
    players(season: $season) {
      player {
        id
        name
      }
      correctPicks
    }
  }
`;

const GAMES_PLAYED_QUERY = gql`
  query GAMES_PLAYED_QUERY($filter: GamesInput) {
    games(filter: $filter) {
      totalPlayedGames
    }
  }
`;

export default function LeaderBoard() {
  const {
    data: playersInfo,
    error: playersQueryError,
    loading: playersQueryLoading,
  } = useQuery(PLAYERS_QUERY, {
    variables: { season: 2018 },
  });
  const {
    data: gamesInfo,
    error: gamesQueryError,
    loading: gamesQueryLoading,
  } = useQuery(GAMES_PLAYED_QUERY, {
    variables: { season: 2018 },
  });
  if (playersQueryLoading || gamesQueryLoading) return <p>Loading...</p>;
  if (playersQueryError || gamesQueryError) return <p>Error</p>;

  const { players } = playersInfo;
  var playersToRender = [...players];
  playersToRender.sort((a, b) => b.correctPicks - a.correctPicks);

  console.log(gamesInfo);

  return (
    <div>
      <Heading as="h1" mb={2}>
        Leader Board
      </Heading>
      <div>
        {playersToRender.map((playerInfo, idx) => {
          return (
            <Box key={playerInfo.player.id} bg="blue.0" p={4} mt={2}>
              <Box>{idx + 1}</Box>
              <Box>{playerInfo.player.name}</Box>
              <Box>
                {playerInfo.correctPicks} / {gamesInfo.games.totalPlayedGames}
              </Box>
            </Box>
          );
        })}
      </div>
    </div>
  );
}
