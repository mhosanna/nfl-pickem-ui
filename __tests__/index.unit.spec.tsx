import HomePage from "../pages/index";
import { PLAYERS_QUERY, GAMES_PLAYED_QUERY } from "../components/LeaderBoard";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [];

it("tells you where you are", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );
  expect(screen.getByRole("heading")).toHaveTextContent("LeaderBoard");
});
