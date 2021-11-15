import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakePlayer = (overrides = {}) => ({
  __typename: 'Player',
  id: casual.uuid,
  name: casual.first_name,
  email: casual.email,
  picks: [],
  ...overrides,
});

const fakeGame = (overrides = {}) => ({
  __typename: 'Game',
  id: casual.uuid,
  homeTeam: fakeHomeTeam(),
  awayTeam: fakeAwayTeam(),
  winner: null,
  spread: 1,
  picks: [],
  slug: 'falcons-jaguars',
  ...overrides,
});

const fakeHomeTeam = () => ({
  __typename: 'Team',
  id: casual.uuid,
  name: 'Falcons',
  city: 'Atlanta',
  abbreviation: 'ATL',
});

const fakeAwayTeam = () => ({
  __typename: 'Team',
  id: casual.uuid,
  name: 'Jaguars',
  city: 'Jacksonville',
  abbreviation: 'JAX',
});

const fakePick = (overrides = {}) => ({
  __typename: 'Pick',
  id: casual.uuid,
  player: fakePlayer(),
  game: fakeGame(),
  picked: fakeHomeTeam(),
  ...overrides,
});

const fakeWeek = (overrides = {}) => ({
  __typename: 'Week',
  id: casual.uuid,
  label: 'Week 1',
  games: [],
  gamesCount: 0,
  season: '2021',
  slug: 'week-1',
  ...overrides,
});

export { fakePlayer, fakeGame, fakeHomeTeam, fakeAwayTeam, fakePick, fakeWeek };
