export type Maybe<T> = T | null;
export interface Player {
  __typename?: 'Player';
  email: string;
  id: number;
  name: string;
  password?: string;
  picks?: Pick[];
  picksCount?: number;
}

export interface Pick {
  __typename?: 'Pick';
  game?: Maybe<Game>;
  id: number;
  isCorrect?: boolean;
  picked?: Maybe<Team>;
  player?: Maybe<Player>;
}

export interface Team {
  __typename?: 'Team';
  abbreviation?: string;
  city: string;
  conference?: string;
  division?: string;
  id: number;
  name: string;
}

export interface Week {
  __typename?: 'Week';
  createdAt?: string;
  games?: Game[];
  gamesCount?: number;
  id: number;
  label: string;
  season: string;
  slug: string;
}

export interface Game {
  __typename?: 'Game';
  awayTeam?: Team;
  createdAt?: string;
  homeTeam?: Team;
  id: number;
  picks?: Pick[];
  picksCount?: number;
  season: string;
  slug: string;
  spread?: Maybe<number>;
  week?: Week;
  winner?: Maybe<Team>;
}
