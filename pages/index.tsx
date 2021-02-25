import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const PLAYERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    players {
      id
      name
      totalPicksCorrect
      picks {
        correct
        team {
          id
          name
          city
        }
      }
    }
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(PLAYERS_QUERY);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      <h2>There are {data.length} players!</h2>
    </div>
  );
}
