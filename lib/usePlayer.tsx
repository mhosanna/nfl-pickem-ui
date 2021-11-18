import { gql, useQuery } from '@apollo/client';
import { Player } from '../types/app';

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

interface authenicatedItemType {
  authenticatedItem: Player | null;
}

export function usePlayer(): Player | null | undefined {
  const { data } = useQuery<authenicatedItemType>(CURRENT_PLAYER_QUERY);

  return data?.authenticatedItem;
}

export { CURRENT_PLAYER_QUERY };
