import { gql, useQuery } from "@apollo/client";

const CURRENT_PLAYER_QUERY = gql`
  query CURRENT_PLAYER_QUERY {
    authenticatedItem {
      ... on Player {
        id
        email
        name
      }
    }
  }
`;

export function usePlayer() {
  const { data } = useQuery(CURRENT_PLAYER_QUERY);
  console.log({ data });
  return data?.authenticatedItem;
}

export { CURRENT_PLAYER_QUERY };
