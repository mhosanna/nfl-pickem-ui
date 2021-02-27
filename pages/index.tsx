import { useQuery } from "@apollo/client";
import { Heading, Box } from "@primer/components";
import gql from "graphql-tag";

const PLAYERS_QUERY = gql`
  query USER_ORDERS_QUERY($orderBy: PlayerOrderByInput) {
    players(orderBy: $orderBy) {
      id
      name
      totalPicksCorrect
    }
  }
`;

export default function LeaderBoard() {
  const { data, error, loading } = useQuery(PLAYERS_QUERY, {
    variables: { orderBy: { totalPicksCorrect: "desc" } },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { players } = data;

  return (
    <div>
      <Heading as="h1" mb={2}>
        Leader Board
      </Heading>
      <div>
        {players.map((player, idx) => {
          return (
            <Box key={player.id} bg="blue.0" p={4} mt={2}>
              <Box>{idx + 1}</Box>
              <Box>{player.name}</Box>
              <Box>{player.totalPicksCorrect}</Box>
            </Box>
          );
        })}
      </div>
    </div>
  );
}
