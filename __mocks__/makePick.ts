import { MAKE_PICK_MUTATION } from "../components/Picks";

export const makePick = {
  request: {
    query: MAKE_PICK_MUTATION,
    variables: { playerId: "2", gameId: "30", teamId: "32" },
  },
  result: {
    data: {
      upsertPicks: {
        id: "77",
        player: {
          id: "2",
          name: "Matt",
          __typename: "Player",
        },
        game: {
          id: "30",
          __typename: "Game",
        },
        picked: {
          id: "32",
          name: "Football Team",
          city: "Washington",
          __typename: "Team",
        },
        __typename: "Pick",
      },
    },
  },
};
