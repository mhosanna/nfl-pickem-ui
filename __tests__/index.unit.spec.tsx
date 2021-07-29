import HomePage from "../pages/index";
import { PLAYERS_QUERY, GAMES_PLAYED_QUERY } from "../components/LeaderBoard";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";

it("tells you where you are", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );
  expect(screen.getByRole("heading")).toHaveTextContent("LeaderBoard");
});

it("displays loading if data not yet returned", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );
  expect(screen.getByRole("heading")).toHaveTextContent("LeaderBoard");
  expect(screen.getByText("Loading...")).toBeVisible();
});

it("displays error if network error returning player data", async () => {
  const mocks = [
    {
      request: {
        query: PLAYERS_QUERY,
        variables: {
          season: "2020",
        },
      },
      error: new Error("An error occurred"),
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );

  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});

it("displays error if network error returning games data", async () => {
  const mocks = [
    {
      request: {
        query: GAMES_PLAYED_QUERY,
        variables: {
          season: "2020",
        },
      },
      error: new Error("An error occurred"),
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );

  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});

it("displays error if graphql error returning player data", async () => {
  const mocks = [
    {
      request: {
        query: PLAYERS_QUERY,
        variables: {
          season: "2020",
        },
      },
      result: {
        errors: [new GraphQLError("Error!")],
      },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );

  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});

it("displays error if graphql error returning games data", async () => {
  const mocks = [
    {
      request: {
        query: GAMES_PLAYED_QUERY,
        variables: {
          season: "2020",
        },
      },
      result: {
        errors: [new GraphQLError("Error!")],
      },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );

  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
it("displays players sorted by picks correct", async () => {
  const mocks = [
    {
      request: {
        query: PLAYERS_QUERY,
        variables: {
          season: "2020",
        },
      },
      result: {
        data: {
          allPlayers: [
            {
              __typename: "Player",
              id: "1",
              name: "Madeline",
              picks: [],
            },
            {
              __typename: "Player",
              id: "2",
              name: "Matt",
              picks: [
                {
                  __typename: "Pick",
                  id: "31",
                },
              ],
            },
          ],
        },
      },
    },
    {
      request: {
        query: GAMES_PLAYED_QUERY,
        variables: {
          season: "2020",
        },
      },
      result: {
        data: {
          allGames: [
            {
              __typename: "Game",
              id: "6",
            },
          ],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );

  await waitFor(() => {});
  const firstRow = screen.getByRole("cell", { name: "Matt" }).closest("tr");
  expect(firstRow).toBeInTheDocument();
  const secondRow = screen
    .getByRole("cell", { name: "Madeline" })
    .closest("tr");
  expect(secondRow).toBeInTheDocument();
});
