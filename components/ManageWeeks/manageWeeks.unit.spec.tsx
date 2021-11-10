import { useRouter } from 'next/router';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '../../utils/testUtils';
import {
  getWeeksBySeason,
  getWeeksBySeasonNetworkError,
  getWeeksBySeasonGraphqlError,
} from '../../__mocks__/getWeeksBySeason';
import { createWeek, createWeekNetworkError } from '../../__mocks__/createWeek';
import ManageWeeks from '.';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

it('tells you where you are', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  expect(screen.getByText('Add New Week')).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('displays network error if error loading weeks', async () => {
  const mocks = [getWeeksBySeasonNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText('[Network error]: An error occurred')
    ).toBeInTheDocument();
  });
});

it('displays graphql error if error loading weeks', async () => {
  const mocks = [getWeeksBySeasonGraphqlError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('[GraphQL error]: Error!')).toBeInTheDocument();
  });
});

it('displays tiles for each week in season', async () => {
  const mocks = [getWeeksBySeason];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Week 1')).toBeInTheDocument();
  });
});

it('routes user to manage week page when they click a week tile', async () => {
  const mockRouter = {
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  const clickProps = {
    pathname: '/manage-games/[season]/[week]',
    query: { season: '2021', week: 'week-1' },
  };

  const mocks = [getWeeksBySeason];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Week 1')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Week 1 6 games' }));
  expect(mockRouter.push).toHaveBeenCalledWith(clickProps);
});

it('opens modal when user clicks Add New Week', async () => {
  const mocks = [getWeeksBySeason];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  expect(screen.getByText('Add New Week')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add New Week' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Week')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new week form' })
    ).toBeInTheDocument();
  });
});

it('creates new week when user fills out form and submits form', async () => {
  const mocks = [getWeeksBySeason, createWeek];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  expect(screen.getByText('Add New Week')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add New Week' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Week')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new week form' })
    ).toBeInTheDocument();
  });
  const input = screen.getByLabelText('Week Label');
  fireEvent.change(input, { target: { value: 'Week 9' } });
  expect(input.value).toBe('Week 9');

  const createBtn = screen.getByRole('button', { name: 'Create Week' });
  await waitFor(() => {
    fireEvent.click(createBtn);
  });
  expect(screen.getByText('Week 9')).toBeInTheDocument();
});

it('displays an error when error creating new week', async () => {
  const mocks = [getWeeksBySeason, createWeekNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  expect(screen.getByText('Add New Week')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add New Week' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Week')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new week form' })
    ).toBeInTheDocument();
  });
  const input = screen.getByLabelText('Week Label');
  fireEvent.change(input, { target: { value: 'Week 9' } });
  expect(input.value).toBe('Week 9');

  const createBtn = screen.getByRole('button', { name: 'Create Week' });
  await waitFor(() => {
    fireEvent.click(createBtn);
  });
  expect(screen.getByText('Oops!')).toBeInTheDocument();
  expect(screen.getByText('An error occurred')).toBeInTheDocument();
});
