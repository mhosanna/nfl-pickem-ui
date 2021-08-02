import PicksPage from "../pages/picks";
import { getCurrentPlayer } from "../__mocks__/getCurrentPlayer";
import {
  getWeeksBySeason,
  getWeeksBySeasonNetworkError,
  getWeeksBySeasonGraphqlError,
} from "../__mocks__/getWeeksBySeason";
import { getPicksByWeekEmpty } from "../__mocks__/getPicksByWeek";
import { makePick } from "../__mocks__/makePick";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

it("tells you where you are", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Make Your Picks"
  );
});
it("displays login form if player is not logged in", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Sign Into Your Account"
  );
});
it("displays loading if weeks data not yet returned", async () => {
  const mocks = [getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
it("displays error if network error returning week data", async () => {
  const mocks = [getCurrentPlayer, getWeeksBySeasonNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
it("displays error if graphql error returning week data", async () => {
  const mocks = [getCurrentPlayer, getWeeksBySeasonGraphqlError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
it("displays dropdown with weeks that exist in a season", async () => {
  const mocks = [getCurrentPlayer, getWeeksBySeason];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Week 1" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Week 8" })).toBeInTheDocument();
  });
});
it("displays no games found if week does not have any games", async () => {
  const mocks = [getCurrentPlayer, getWeeksBySeason];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Week 8" })).toBeInTheDocument();
    expect(screen.getByText("No Games Found")).toBeInTheDocument();
  });
});
it("displays list of games in the selected week", async () => {
  const mocks = [getCurrentPlayer, getWeeksBySeason, getPicksByWeekEmpty];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Week 1" },
  });
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Seattle Seahawks" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Washington Football Team" })
    ).toBeInTheDocument();
  });
});
it("adds a tag to the game winner", async () => {
  const mocks = [getCurrentPlayer, getWeeksBySeason, getPicksByWeekEmpty];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Week 1" },
  });
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Game Winner New England Patriots" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "New Orleans Saints" })
    ).toBeInTheDocument();
  });
});
it("highlights the game after the player picks it", async () => {
  const mocks = [
    getCurrentPlayer,
    getWeeksBySeason,
    getPicksByWeekEmpty,
    makePick,
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {});
  await waitFor(() => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Week 1" },
  });
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Washington Football Team" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("picked-team")).toBeNull();
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Washington Football Team" })
  );

  await waitFor(() => {
    expect(screen.getByTestId("picked-team")).toBeInTheDocument();
  });
});
