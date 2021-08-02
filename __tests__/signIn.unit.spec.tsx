import SignInPage from "../pages/signin";
import { getCurrentPlayer } from "../__mocks__/getCurrentPlayer";
import {
  signInSuccess,
  signInNetworkError,
  signInBadPassword,
} from "../__mocks__/signIn";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

it("tells you where you are", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <SignInPage />
    </MockedProvider>
  );
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Sign Into Your Account"
  );
});

it("does nothing if logged in successfully", async () => {
  const mocks = [signInSuccess, getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <SignInPage />
    </MockedProvider>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");

  fireEvent.change(emailInput, { target: { value: "matt@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  await waitFor(() => {
    expect(screen.getByLabelText("Email")).toHaveValue("matt@example.com");
  });
  await waitFor(() => {
    expect(screen.getByLabelText("Password")).toHaveValue("password");
  });
  const signInButton = screen.getByRole("button");

  fireEvent.click(signInButton);

  await waitFor(() => {
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Sign Into Your Account"
    );
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Password")).toHaveValue("");
  });
});

it("displays an error if network error", async () => {
  //mock console error so it doesn't show during tes
  const networkError = console.error;
  console.error = jest.fn();

  const mocks = [signInNetworkError, getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <SignInPage />
    </MockedProvider>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");

  fireEvent.change(emailInput, { target: { value: "matt@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  const signInButton = screen.getByRole("button");

  fireEvent.click(signInButton);
  await waitFor(() => {
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
  console.error = networkError;
});

it("displays an error if bad username or password", async () => {
  const mocks = [signInBadPassword, getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <SignInPage />
    </MockedProvider>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");

  fireEvent.change(emailInput, { target: { value: "matt@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  const signInButton = screen.getByRole("button");

  fireEvent.click(signInButton);
  await waitFor(() => {
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Authentication failed.")).toBeInTheDocument();
  });
});
