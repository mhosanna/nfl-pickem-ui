import { useRouter } from 'next/router';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { render, screen, waitFor, fireEvent } from '../../utils/testUtil';
import { fakeGame, fakeWeek } from '../../utils/testData';
import { GET_WEEKS_BY_SEASON_QUERY } from '../WeekTile';
import ManageWeeks, { CREATE_WEEK_MUTATION } from '.';

const FIXED_SYSTEM_TIME = '2020-11-18T00:00:00Z';
const season = '2021';

const game = fakeGame();
const weeks = fakeWeek({ games: [game], gamesCount: 1 });

const weeksMock = [
  {
    request: {
      query: GET_WEEKS_BY_SEASON_QUERY,
      variables: { season },
    },
    result: {
      data: { weeks: [weeks] },
    },
  },
];

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
});

afterAll(() => {
  jest.useRealTimers();
});

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
  const weeksMockWithNetworkError = [
    {
      request: {
        query: GET_WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={weeksMockWithNetworkError} addTypename={false}>
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
  const gamesMockWithGraphqlError = [
    {
      request: {
        query: GET_WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMockWithGraphqlError} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('[GraphQL error]: Error!')).toBeInTheDocument();
  });
});

it('displays tiles for each week in season', async () => {
  render(
    <MockedProvider mocks={weeksMock} addTypename={false}>
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

  render(
    <MockedProvider mocks={weeksMock} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Week 1')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Week 1 1 games' }));
  expect(mockRouter.push).toHaveBeenCalledWith(clickProps);
});

it('opens modal when user clicks Add New Week', async () => {
  render(
    <MockedProvider mocks={weeksMock} addTypename={false}>
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
it('displays an error when error creating new week', async () => {
  const weeksMockCreateWeekNetworkError = [
    {
      request: {
        query: GET_WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: CREATE_WEEK_MUTATION,
        variables: {
          season,
          label: 'Week 2',
          slug: 'week-2',
          createdAt: FIXED_SYSTEM_TIME,
        },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={weeksMockCreateWeekNetworkError} addTypename={false}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Week 1')).toBeInTheDocument();
  });
  expect(screen.getByText('Add New Week')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add New Week' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Week')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new week form' })
    ).toBeInTheDocument();
  });
  const input = screen.getByLabelText('Week Label');
  fireEvent.change(input, { target: { value: 'Week 2' } });
  expect(input.value).toBe('Week 2');

  const createBtn = screen.getByRole('button', { name: 'Create Week' });
  await waitFor(() => {
    fireEvent.click(createBtn);
  });

  await waitFor(() => {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('[Network error]: An error occurred')
    ).toBeInTheDocument();
  });
});
it('creates new week when user fills out form and submits form', async () => {
  const weekOne = fakeWeek({ games: [game], gamesCount: 1 });
  const weekTwo = fakeWeek({ label: 'Week 2', games: [game], gamesCount: 1 });
  const weeksMockCreateWeek = [
    {
      request: {
        query: GET_WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: CREATE_WEEK_MUTATION,
        variables: {
          season,
          label: 'Week 2',
          slug: 'week-2',
          createdAt: FIXED_SYSTEM_TIME,
        },
      },
      result: {
        data: {
          createWeek: fakeWeek({
            label: 'Week 2',
            slug: 'week-2',
            createdAt: FIXED_SYSTEM_TIME,
          }),
        },
      },
    },
    {
      request: {
        query: GET_WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weekOne, weekTwo] },
      },
    },
  ];
  render(
    <MockedProvider mocks={weeksMockCreateWeek} addTypename={true}>
      <ManageWeeks season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Week 1')).toBeInTheDocument();
    expect(screen.getByText('Add New Week')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: 'Add New Week' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Week')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new week form' })
    ).toBeInTheDocument();
  });
  const input = screen.getByLabelText('Week Label');
  fireEvent.change(input, { target: { value: 'Week 2' } });
  expect(input.value).toBe('Week 2');

  const createBtn = screen.getByRole('button', { name: 'Create Week' });
  await waitFor(() => {
    fireEvent.click(createBtn);
  });
  await waitFor(() => {
    expect(screen.getByText('Week 2')).toBeInTheDocument();
  });
});
