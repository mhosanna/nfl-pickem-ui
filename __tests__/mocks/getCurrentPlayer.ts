import { CURRENT_PLAYER_QUERY } from "../../lib/usePlayer";

export const getCurrentPlayer = {
  request: {
    query: CURRENT_PLAYER_QUERY,
  },
  result: {
    data: {
      authenticatedItem: {
        __typename: "Player",
        id: "2",
        email: "matt@example.com",
        name: "Matt",
      },
    },
  },
};
