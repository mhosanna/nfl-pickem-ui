import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthenticatedItem = Player;

export type BooleanNullableFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<BooleanNullableFilter>;
};

export type CreateInitialPlayerInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<DateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
};

export type Game = {
  __typename?: 'Game';
  awayTeam?: Maybe<Team>;
  createdAt?: Maybe<Scalars['String']>;
  homeTeam?: Maybe<Team>;
  id: Scalars['ID'];
  picks?: Maybe<Array<Pick>>;
  picksCount?: Maybe<Scalars['Int']>;
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  spread?: Maybe<Scalars['Float']>;
  week?: Maybe<Week>;
  winner?: Maybe<Team>;
};

export type GamePicksArgs = {
  orderBy?: Array<PickOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: PickWhereInput;
};

export type GamePicksCountArgs = {
  where?: PickWhereInput;
};

export type GameCreateInput = {
  awayTeam?: Maybe<TeamRelateToOneForCreateInput>;
  createdAt?: Maybe<Scalars['String']>;
  homeTeam?: Maybe<TeamRelateToOneForCreateInput>;
  picks?: Maybe<PickRelateToManyForCreateInput>;
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  spread?: Maybe<Scalars['Float']>;
  week?: Maybe<WeekRelateToOneForCreateInput>;
  winner?: Maybe<TeamRelateToOneForCreateInput>;
};

export type GameOrderByInput = {
  createdAt?: Maybe<OrderDirection>;
  id?: Maybe<OrderDirection>;
};

export type GameRelateToManyForCreateInput = {
  connect?: Maybe<Array<GameWhereUniqueInput>>;
  create?: Maybe<Array<GameCreateInput>>;
};

export type GameRelateToManyForUpdateInput = {
  connect?: Maybe<Array<GameWhereUniqueInput>>;
  create?: Maybe<Array<GameCreateInput>>;
  disconnect?: Maybe<Array<GameWhereUniqueInput>>;
  set?: Maybe<Array<GameWhereUniqueInput>>;
};

export type GameRelateToOneForCreateInput = {
  connect?: Maybe<GameWhereUniqueInput>;
  create?: Maybe<GameCreateInput>;
};

export type GameRelateToOneForUpdateInput = {
  connect?: Maybe<GameWhereUniqueInput>;
  create?: Maybe<GameCreateInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type GameUpdateArgs = {
  data: GameUpdateInput;
  where: GameWhereUniqueInput;
};

export type GameUpdateInput = {
  awayTeam?: Maybe<TeamRelateToOneForUpdateInput>;
  createdAt?: Maybe<Scalars['String']>;
  homeTeam?: Maybe<TeamRelateToOneForUpdateInput>;
  picks?: Maybe<PickRelateToManyForUpdateInput>;
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  spread?: Maybe<Scalars['Float']>;
  week?: Maybe<WeekRelateToOneForUpdateInput>;
  winner?: Maybe<TeamRelateToOneForUpdateInput>;
};

export type GameWhereInput = {
  AND?: Maybe<Array<GameWhereInput>>;
  NOT?: Maybe<Array<GameWhereInput>>;
  OR?: Maybe<Array<GameWhereInput>>;
  createdAt?: Maybe<DateTimeNullableFilter>;
  id?: Maybe<IdFilter>;
  season?: Maybe<StringNullableFilter>;
  slug?: Maybe<StringNullableFilter>;
  week?: Maybe<WeekWhereInput>;
  winner?: Maybe<TeamWhereInput>;
};

export type GameWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type IdFilter = {
  equals?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  not?: Maybe<IdFilter>;
  notIn?: Maybe<Array<Scalars['ID']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  enableSessionItem: Scalars['Boolean'];
  enableSignout: Scalars['Boolean'];
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};

export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id: Scalars['ID'];
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode: KeystoneAdminUiFieldMetaItemViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticatePlayerWithPassword: PlayerAuthenticationWithPasswordResult;
  createGame?: Maybe<Game>;
  createGames?: Maybe<Array<Maybe<Game>>>;
  createInitialPlayer: PlayerAuthenticationWithPasswordSuccess;
  createPick?: Maybe<Pick>;
  createPicks?: Maybe<Array<Maybe<Pick>>>;
  createPlayer?: Maybe<Player>;
  createPlayers?: Maybe<Array<Maybe<Player>>>;
  createTeam?: Maybe<Team>;
  createTeams?: Maybe<Array<Maybe<Team>>>;
  createWeek?: Maybe<Week>;
  createWeeks?: Maybe<Array<Maybe<Week>>>;
  deleteGame?: Maybe<Game>;
  deleteGames?: Maybe<Array<Maybe<Game>>>;
  deletePick?: Maybe<Pick>;
  deletePicks?: Maybe<Array<Maybe<Pick>>>;
  deletePlayer?: Maybe<Player>;
  deletePlayers?: Maybe<Array<Maybe<Player>>>;
  deleteTeam?: Maybe<Team>;
  deleteTeams?: Maybe<Array<Maybe<Team>>>;
  deleteWeek?: Maybe<Week>;
  deleteWeeks?: Maybe<Array<Maybe<Week>>>;
  endSession: Scalars['Boolean'];
  incrementCorrectPicks?: Maybe<Player>;
  redeemPlayerPasswordResetToken?: Maybe<RedeemPlayerPasswordResetTokenResult>;
  sendPlayerPasswordResetLink?: Maybe<SendPlayerPasswordResetLinkResult>;
  updateGame?: Maybe<Game>;
  updateGames?: Maybe<Array<Maybe<Game>>>;
  updatePick?: Maybe<Pick>;
  updatePicks?: Maybe<Array<Maybe<Pick>>>;
  updatePlayer?: Maybe<Player>;
  updatePlayers?: Maybe<Array<Maybe<Player>>>;
  updateTeam?: Maybe<Team>;
  updateTeams?: Maybe<Array<Maybe<Team>>>;
  updateWeek?: Maybe<Week>;
  updateWeeks?: Maybe<Array<Maybe<Week>>>;
  upsertPicks?: Maybe<Pick>;
};

export type MutationAuthenticatePlayerWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateGameArgs = {
  data: GameCreateInput;
};

export type MutationCreateGamesArgs = {
  data: Array<GameCreateInput>;
};

export type MutationCreateInitialPlayerArgs = {
  data: CreateInitialPlayerInput;
};

export type MutationCreatePickArgs = {
  data: PickCreateInput;
};

export type MutationCreatePicksArgs = {
  data: Array<PickCreateInput>;
};

export type MutationCreatePlayerArgs = {
  data: PlayerCreateInput;
};

export type MutationCreatePlayersArgs = {
  data: Array<PlayerCreateInput>;
};

export type MutationCreateTeamArgs = {
  data: TeamCreateInput;
};

export type MutationCreateTeamsArgs = {
  data: Array<TeamCreateInput>;
};

export type MutationCreateWeekArgs = {
  data: WeekCreateInput;
};

export type MutationCreateWeeksArgs = {
  data: Array<WeekCreateInput>;
};

export type MutationDeleteGameArgs = {
  where: GameWhereUniqueInput;
};

export type MutationDeleteGamesArgs = {
  where: Array<GameWhereUniqueInput>;
};

export type MutationDeletePickArgs = {
  where: PickWhereUniqueInput;
};

export type MutationDeletePicksArgs = {
  where: Array<PickWhereUniqueInput>;
};

export type MutationDeletePlayerArgs = {
  where: PlayerWhereUniqueInput;
};

export type MutationDeletePlayersArgs = {
  where: Array<PlayerWhereUniqueInput>;
};

export type MutationDeleteTeamArgs = {
  where: TeamWhereUniqueInput;
};

export type MutationDeleteTeamsArgs = {
  where: Array<TeamWhereUniqueInput>;
};

export type MutationDeleteWeekArgs = {
  where: WeekWhereUniqueInput;
};

export type MutationDeleteWeeksArgs = {
  where: Array<WeekWhereUniqueInput>;
};

export type MutationIncrementCorrectPicksArgs = {
  playerId: Scalars['ID'];
  season: Scalars['String'];
};

export type MutationRedeemPlayerPasswordResetTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationSendPlayerPasswordResetLinkArgs = {
  email: Scalars['String'];
};

export type MutationUpdateGameArgs = {
  data: GameUpdateInput;
  where: GameWhereUniqueInput;
};

export type MutationUpdateGamesArgs = {
  data: Array<GameUpdateArgs>;
};

export type MutationUpdatePickArgs = {
  data: PickUpdateInput;
  where: PickWhereUniqueInput;
};

export type MutationUpdatePicksArgs = {
  data: Array<PickUpdateArgs>;
};

export type MutationUpdatePlayerArgs = {
  data: PlayerUpdateInput;
  where: PlayerWhereUniqueInput;
};

export type MutationUpdatePlayersArgs = {
  data: Array<PlayerUpdateArgs>;
};

export type MutationUpdateTeamArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};

export type MutationUpdateTeamsArgs = {
  data: Array<TeamUpdateArgs>;
};

export type MutationUpdateWeekArgs = {
  data: WeekUpdateInput;
  where: WeekWhereUniqueInput;
};

export type MutationUpdateWeeksArgs = {
  data: Array<WeekUpdateArgs>;
};

export type MutationUpsertPicksArgs = {
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type NestedStringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum PasswordAuthErrorCode {
  Failure = 'FAILURE',
  IdentityNotFound = 'IDENTITY_NOT_FOUND',
  MultipleIdentityMatches = 'MULTIPLE_IDENTITY_MATCHES',
  SecretMismatch = 'SECRET_MISMATCH',
  SecretNotSet = 'SECRET_NOT_SET',
}

export enum PasswordResetRedemptionErrorCode {
  Failure = 'FAILURE',
  IdentityNotFound = 'IDENTITY_NOT_FOUND',
  MultipleIdentityMatches = 'MULTIPLE_IDENTITY_MATCHES',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenMismatch = 'TOKEN_MISMATCH',
  TokenNotSet = 'TOKEN_NOT_SET',
  TokenRedeemed = 'TOKEN_REDEEMED',
}

export enum PasswordResetRequestErrorCode {
  IdentityNotFound = 'IDENTITY_NOT_FOUND',
  MultipleIdentityMatches = 'MULTIPLE_IDENTITY_MATCHES',
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Pick = {
  __typename?: 'Pick';
  game?: Maybe<Game>;
  id: Scalars['ID'];
  isCorrect?: Maybe<Scalars['Boolean']>;
  picked?: Maybe<Team>;
  player?: Maybe<Player>;
};

export type PickCreateInput = {
  game?: Maybe<GameRelateToOneForCreateInput>;
  isCorrect?: Maybe<Scalars['Boolean']>;
  picked?: Maybe<TeamRelateToOneForCreateInput>;
  player?: Maybe<PlayerRelateToOneForCreateInput>;
};

export type PickManyRelationFilter = {
  every?: Maybe<PickWhereInput>;
  none?: Maybe<PickWhereInput>;
  some?: Maybe<PickWhereInput>;
};

export type PickOrderByInput = {
  id?: Maybe<OrderDirection>;
};

export type PickRelateToManyForCreateInput = {
  connect?: Maybe<Array<PickWhereUniqueInput>>;
  create?: Maybe<Array<PickCreateInput>>;
};

export type PickRelateToManyForUpdateInput = {
  connect?: Maybe<Array<PickWhereUniqueInput>>;
  create?: Maybe<Array<PickCreateInput>>;
  disconnect?: Maybe<Array<PickWhereUniqueInput>>;
  set?: Maybe<Array<PickWhereUniqueInput>>;
};

export type PickUpdateArgs = {
  data: PickUpdateInput;
  where: PickWhereUniqueInput;
};

export type PickUpdateInput = {
  game?: Maybe<GameRelateToOneForUpdateInput>;
  isCorrect?: Maybe<Scalars['Boolean']>;
  picked?: Maybe<TeamRelateToOneForUpdateInput>;
  player?: Maybe<PlayerRelateToOneForUpdateInput>;
};

export type PickWhereInput = {
  AND?: Maybe<Array<PickWhereInput>>;
  NOT?: Maybe<Array<PickWhereInput>>;
  OR?: Maybe<Array<PickWhereInput>>;
  game?: Maybe<GameWhereInput>;
  id?: Maybe<IdFilter>;
  isCorrect?: Maybe<BooleanNullableFilter>;
  player?: Maybe<PlayerWhereInput>;
};

export type PickWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type Player = {
  __typename?: 'Player';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<PasswordState>;
  passwordResetIssuedAt?: Maybe<Scalars['String']>;
  passwordResetRedeemedAt?: Maybe<Scalars['String']>;
  passwordResetToken?: Maybe<PasswordState>;
  picks?: Maybe<Array<Pick>>;
  picksCount?: Maybe<Scalars['Int']>;
};

export type PlayerPicksArgs = {
  orderBy?: Array<PickOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: PickWhereInput;
};

export type PlayerPicksCountArgs = {
  where?: PickWhereInput;
};

export type PlayerAuthenticationWithPasswordFailure = {
  __typename?: 'PlayerAuthenticationWithPasswordFailure';
  code: PasswordAuthErrorCode;
  message: Scalars['String'];
};

export type PlayerAuthenticationWithPasswordResult =
  | PlayerAuthenticationWithPasswordFailure
  | PlayerAuthenticationWithPasswordSuccess;

export type PlayerAuthenticationWithPasswordSuccess = {
  __typename?: 'PlayerAuthenticationWithPasswordSuccess';
  item: Player;
  sessionToken: Scalars['String'];
};

export type PlayerCreateInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  passwordResetIssuedAt?: Maybe<Scalars['String']>;
  passwordResetRedeemedAt?: Maybe<Scalars['String']>;
  passwordResetToken?: Maybe<Scalars['String']>;
  picks?: Maybe<PickRelateToManyForCreateInput>;
};

export type PlayerOrderByInput = {
  id?: Maybe<OrderDirection>;
};

export type PlayerRelateToOneForCreateInput = {
  connect?: Maybe<PlayerWhereUniqueInput>;
  create?: Maybe<PlayerCreateInput>;
};

export type PlayerRelateToOneForUpdateInput = {
  connect?: Maybe<PlayerWhereUniqueInput>;
  create?: Maybe<PlayerCreateInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type PlayerUpdateArgs = {
  data: PlayerUpdateInput;
  where: PlayerWhereUniqueInput;
};

export type PlayerUpdateInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  passwordResetIssuedAt?: Maybe<Scalars['String']>;
  passwordResetRedeemedAt?: Maybe<Scalars['String']>;
  passwordResetToken?: Maybe<Scalars['String']>;
  picks?: Maybe<PickRelateToManyForUpdateInput>;
};

export type PlayerWhereInput = {
  AND?: Maybe<Array<PlayerWhereInput>>;
  NOT?: Maybe<Array<PlayerWhereInput>>;
  OR?: Maybe<Array<PlayerWhereInput>>;
  email?: Maybe<StringNullableFilter>;
  id?: Maybe<IdFilter>;
  name?: Maybe<StringNullableFilter>;
  picks?: Maybe<PickManyRelationFilter>;
};

export type PlayerWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  game?: Maybe<Game>;
  games?: Maybe<Array<Game>>;
  gamesCount?: Maybe<Scalars['Int']>;
  keystone: KeystoneMeta;
  pick?: Maybe<Pick>;
  picks?: Maybe<Array<Pick>>;
  picksCount?: Maybe<Scalars['Int']>;
  player?: Maybe<Player>;
  players?: Maybe<Array<Player>>;
  playersCount?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  teams?: Maybe<Array<Team>>;
  teamsCount?: Maybe<Scalars['Int']>;
  validatePlayerPasswordResetToken?: Maybe<ValidatePlayerPasswordResetTokenResult>;
  week?: Maybe<Week>;
  weeks?: Maybe<Array<Week>>;
  weeksCount?: Maybe<Scalars['Int']>;
};

export type QueryGameArgs = {
  where: GameWhereUniqueInput;
};

export type QueryGamesArgs = {
  orderBy?: Array<GameOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: GameWhereInput;
};

export type QueryGamesCountArgs = {
  where?: GameWhereInput;
};

export type QueryPickArgs = {
  where: PickWhereUniqueInput;
};

export type QueryPicksArgs = {
  orderBy?: Array<PickOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: PickWhereInput;
};

export type QueryPicksCountArgs = {
  where?: PickWhereInput;
};

export type QueryPlayerArgs = {
  where: PlayerWhereUniqueInput;
};

export type QueryPlayersArgs = {
  orderBy?: Array<PlayerOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: PlayerWhereInput;
};

export type QueryPlayersCountArgs = {
  where?: PlayerWhereInput;
};

export type QueryTeamArgs = {
  where: TeamWhereUniqueInput;
};

export type QueryTeamsArgs = {
  orderBy?: Array<TeamOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: TeamWhereInput;
};

export type QueryTeamsCountArgs = {
  where?: TeamWhereInput;
};

export type QueryValidatePlayerPasswordResetTokenArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type QueryWeekArgs = {
  where: WeekWhereUniqueInput;
};

export type QueryWeeksArgs = {
  orderBy?: Array<WeekOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: WeekWhereInput;
};

export type QueryWeeksCountArgs = {
  where?: WeekWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RedeemPlayerPasswordResetTokenResult = {
  __typename?: 'RedeemPlayerPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type SendPlayerPasswordResetLinkResult = {
  __typename?: 'SendPlayerPasswordResetLinkResult';
  code: PasswordResetRequestErrorCode;
  message: Scalars['String'];
};

export type StringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  abbreviation?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  conference?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type TeamCreateInput = {
  abbreviation?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  conference?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TeamOrderByInput = {
  city?: Maybe<OrderDirection>;
  id?: Maybe<OrderDirection>;
  name?: Maybe<OrderDirection>;
};

export type TeamRelateToOneForCreateInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  create?: Maybe<TeamCreateInput>;
};

export type TeamRelateToOneForUpdateInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  create?: Maybe<TeamCreateInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type TeamUpdateArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpdateInput = {
  abbreviation?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  conference?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TeamWhereInput = {
  AND?: Maybe<Array<TeamWhereInput>>;
  NOT?: Maybe<Array<TeamWhereInput>>;
  OR?: Maybe<Array<TeamWhereInput>>;
  city?: Maybe<StringNullableFilter>;
  id?: Maybe<IdFilter>;
  name?: Maybe<StringNullableFilter>;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type ValidatePlayerPasswordResetTokenResult = {
  __typename?: 'ValidatePlayerPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type Week = {
  __typename?: 'Week';
  createdAt?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Game>>;
  gamesCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type WeekGamesArgs = {
  orderBy?: Array<GameOrderByInput>;
  skip?: Scalars['Int'];
  take?: Maybe<Scalars['Int']>;
  where?: GameWhereInput;
};

export type WeekGamesCountArgs = {
  where?: GameWhereInput;
};

export type WeekCreateInput = {
  createdAt?: Maybe<Scalars['String']>;
  games?: Maybe<GameRelateToManyForCreateInput>;
  label?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type WeekOrderByInput = {
  createdAt?: Maybe<OrderDirection>;
  id?: Maybe<OrderDirection>;
};

export type WeekRelateToOneForCreateInput = {
  connect?: Maybe<WeekWhereUniqueInput>;
  create?: Maybe<WeekCreateInput>;
};

export type WeekRelateToOneForUpdateInput = {
  connect?: Maybe<WeekWhereUniqueInput>;
  create?: Maybe<WeekCreateInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type WeekUpdateArgs = {
  data: WeekUpdateInput;
  where: WeekWhereUniqueInput;
};

export type WeekUpdateInput = {
  createdAt?: Maybe<Scalars['String']>;
  games?: Maybe<GameRelateToManyForUpdateInput>;
  label?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type WeekWhereInput = {
  AND?: Maybe<Array<WeekWhereInput>>;
  NOT?: Maybe<Array<WeekWhereInput>>;
  OR?: Maybe<Array<WeekWhereInput>>;
  createdAt?: Maybe<DateTimeNullableFilter>;
  id?: Maybe<IdFilter>;
  season?: Maybe<StringNullableFilter>;
  slug?: Maybe<StringNullableFilter>;
};

export type WeekWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type CreateGameMutationVariables = Exact<{
  season?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  week: Scalars['ID'];
  homeTeamId: Scalars['ID'];
  awayTeamId: Scalars['ID'];
  spread?: Maybe<Scalars['Float']>;
}>;

export type CreateGameMutation = {
  __typename?: 'Mutation';
  createGame?:
    | { __typename?: 'Game'; id: string; slug?: string | null | undefined }
    | null
    | undefined;
};

export type CreateWeekMutationVariables = Exact<{
  label?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['String']>;
}>;

export type CreateWeekMutation = {
  __typename?: 'Mutation';
  createWeek?:
    | {
        __typename?: 'Week';
        id: string;
        label?: string | null | undefined;
        slug?: string | null | undefined;
        season?: string | null | undefined;
      }
    | null
    | undefined;
};

export type DeleteGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
}>;

export type DeleteGameMutation = {
  __typename?: 'Mutation';
  deleteGame?: { __typename?: 'Game'; id: string } | null | undefined;
};

export type GamesBySeasonAndWeekQueryVariables = Exact<{
  season: Scalars['String'];
  weekId: Scalars['ID'];
}>;

export type GamesBySeasonAndWeekQuery = {
  __typename?: 'Query';
  games?:
    | Array<{
        __typename?: 'Game';
        id: string;
        spread?: number | null | undefined;
        homeTeam?:
          | { __typename?: 'Team'; name?: string | null | undefined }
          | null
          | undefined;
        awayTeam?:
          | { __typename?: 'Team'; name?: string | null | undefined }
          | null
          | undefined;
        winner?: { __typename?: 'Team'; id: string } | null | undefined;
        picks?:
          | Array<{
              __typename?: 'Pick';
              id: string;
              isCorrect?: boolean | null | undefined;
              picked?: { __typename?: 'Team'; id: string } | null | undefined;
              player?: { __typename?: 'Player'; id: string } | null | undefined;
            }>
          | null
          | undefined;
      }>
    | null
    | undefined;
};

export type GamesPlayedBySeasonQueryVariables = Exact<{
  season?: Maybe<Scalars['String']>;
}>;

export type GamesPlayedBySeasonQuery = {
  __typename?: 'Query';
  games?: Array<{ __typename?: 'Game'; id: string }> | null | undefined;
};

export type PicksByWeekAndPlayerQueryVariables = Exact<{
  playerId: Scalars['ID'];
  weekId: Scalars['ID'];
}>;

export type PicksByWeekAndPlayerQuery = {
  __typename?: 'Query';
  picks?:
    | Array<{
        __typename?: 'Pick';
        id: string;
        player?:
          | {
              __typename?: 'Player';
              id: string;
              name?: string | null | undefined;
            }
          | null
          | undefined;
        game?: { __typename?: 'Game'; id: string } | null | undefined;
        picked?:
          | {
              __typename?: 'Team';
              id: string;
              name?: string | null | undefined;
              city?: string | null | undefined;
            }
          | null
          | undefined;
      }>
    | null
    | undefined;
};

export type PlayerQueryVariables = Exact<{ [key: string]: never }>;

export type PlayerQuery = {
  __typename?: 'Query';
  authenticatedItem?:
    | {
        __typename?: 'Player';
        id: string;
        email?: string | null | undefined;
        name?: string | null | undefined;
      }
    | null
    | undefined;
};

export type PlayersBySeasonQueryVariables = Exact<{
  season: Scalars['String'];
}>;

export type PlayersBySeasonQuery = {
  __typename?: 'Query';
  players?:
    | Array<{
        __typename?: 'Player';
        id: string;
        name?: string | null | undefined;
        picks?: Array<{ __typename?: 'Pick'; id: string }> | null | undefined;
      }>
    | null
    | undefined;
};

export type PlayersBySeasonAndWeekQueryVariables = Exact<{
  season: Scalars['String'];
  weekId: Scalars['ID'];
}>;

export type PlayersBySeasonAndWeekQuery = {
  __typename?: 'Query';
  players?:
    | Array<{
        __typename?: 'Player';
        id: string;
        name?: string | null | undefined;
        picksCount?: number | null | undefined;
        picks?:
          | Array<{
              __typename?: 'Pick';
              id: string;
              isCorrect?: boolean | null | undefined;
              picked?:
                | {
                    __typename?: 'Team';
                    id: string;
                    city?: string | null | undefined;
                    name?: string | null | undefined;
                  }
                | null
                | undefined;
              game?: { __typename?: 'Game'; id: string } | null | undefined;
            }>
          | null
          | undefined;
      }>
    | null
    | undefined;
};

export type MakePickMutationVariables = Exact<{
  player: Scalars['ID'];
  game: Scalars['ID'];
  team: Scalars['ID'];
}>;

export type MakePickMutation = {
  __typename?: 'Mutation';
  upsertPicks?:
    | {
        __typename?: 'Pick';
        id: string;
        player?:
          | {
              __typename?: 'Player';
              id: string;
              name?: string | null | undefined;
            }
          | null
          | undefined;
        game?: { __typename?: 'Game'; id: string } | null | undefined;
        picked?:
          | {
              __typename?: 'Team';
              id: string;
              name?: string | null | undefined;
              city?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation'; endSession: boolean };

export type UpdateGameAndWinnerMutationVariables = Exact<{
  gameId: Scalars['ID'];
  winnerId: Scalars['ID'];
  spread?: Maybe<Scalars['Float']>;
}>;

export type UpdateGameAndWinnerMutation = {
  __typename?: 'Mutation';
  updateGame?:
    | {
        __typename?: 'Game';
        id: string;
        spread?: number | null | undefined;
        winner?: { __typename?: 'Team'; id: string } | null | undefined;
      }
    | null
    | undefined;
};

export type UpdateGameRemoveWinnerMutationVariables = Exact<{
  gameId: Scalars['ID'];
  spread?: Maybe<Scalars['Float']>;
}>;

export type UpdateGameRemoveWinnerMutation = {
  __typename?: 'Mutation';
  updateGame?:
    | {
        __typename?: 'Game';
        id: string;
        spread?: number | null | undefined;
        winner?: { __typename?: 'Team'; id: string } | null | undefined;
      }
    | null
    | undefined;
};

export const CreateGameDocument = gql`
  mutation createGame(
    $season: String
    $slug: String
    $week: ID!
    $homeTeamId: ID!
    $awayTeamId: ID!
    $spread: Float
  ) {
    createGame(
      data: {
        season: $season
        slug: $slug
        week: { connect: { id: $week } }
        homeTeam: { connect: { id: $homeTeamId } }
        awayTeam: { connect: { id: $awayTeamId } }
        spread: $spread
      }
    ) {
      id
      slug
    }
  }
`;
export type CreateGameMutationFn = Apollo.MutationFunction<
  CreateGameMutation,
  CreateGameMutationVariables
>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      season: // value for 'season'
 *      slug: // value for 'slug'
 *      week: // value for 'week'
 *      homeTeamId: // value for 'homeTeamId'
 *      awayTeamId: // value for 'awayTeamId'
 *      spread: // value for 'spread'
 *   },
 * });
 */
export function useCreateGameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGameMutation,
    CreateGameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(
    CreateGameDocument,
    options
  );
}
export type CreateGameMutationHookResult = ReturnType<
  typeof useCreateGameMutation
>;
export type CreateGameMutationResult =
  Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<
  CreateGameMutation,
  CreateGameMutationVariables
>;
export const CreateWeekDocument = gql`
  mutation createWeek($label: String, $slug: String, $season: String) {
    createWeek(data: { label: $label, slug: $slug, season: $season }) {
      id
      label
      slug
      season
    }
  }
`;
export type CreateWeekMutationFn = Apollo.MutationFunction<
  CreateWeekMutation,
  CreateWeekMutationVariables
>;

/**
 * __useCreateWeekMutation__
 *
 * To run a mutation, you first call `useCreateWeekMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWeekMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWeekMutation, { data, loading, error }] = useCreateWeekMutation({
 *   variables: {
 *      label: // value for 'label'
 *      slug: // value for 'slug'
 *      season: // value for 'season'
 *   },
 * });
 */
export function useCreateWeekMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWeekMutation,
    CreateWeekMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateWeekMutation, CreateWeekMutationVariables>(
    CreateWeekDocument,
    options
  );
}
export type CreateWeekMutationHookResult = ReturnType<
  typeof useCreateWeekMutation
>;
export type CreateWeekMutationResult =
  Apollo.MutationResult<CreateWeekMutation>;
export type CreateWeekMutationOptions = Apollo.BaseMutationOptions<
  CreateWeekMutation,
  CreateWeekMutationVariables
>;
export const DeleteGameDocument = gql`
  mutation deleteGame($gameId: ID!) {
    deleteGame(where: { id: $gameId }) {
      id
    }
  }
`;
export type DeleteGameMutationFn = Apollo.MutationFunction<
  DeleteGameMutation,
  DeleteGameMutationVariables
>;

/**
 * __useDeleteGameMutation__
 *
 * To run a mutation, you first call `useDeleteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGameMutation, { data, loading, error }] = useDeleteGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useDeleteGameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGameMutation,
    DeleteGameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteGameMutation, DeleteGameMutationVariables>(
    DeleteGameDocument,
    options
  );
}
export type DeleteGameMutationHookResult = ReturnType<
  typeof useDeleteGameMutation
>;
export type DeleteGameMutationResult =
  Apollo.MutationResult<DeleteGameMutation>;
export type DeleteGameMutationOptions = Apollo.BaseMutationOptions<
  DeleteGameMutation,
  DeleteGameMutationVariables
>;
export const GamesBySeasonAndWeekDocument = gql`
  query gamesBySeasonAndWeek($season: String!, $weekId: ID!) {
    games(
      where: {
        AND: [
          { season: { equals: $season } }
          { week: { id: { equals: $weekId } } }
        ]
      }
    ) {
      id
      homeTeam {
        name
      }
      awayTeam {
        name
      }
      winner {
        id
      }
      spread
      picks {
        id
        isCorrect
        picked {
          id
        }
        player {
          id
        }
      }
    }
  }
`;

/**
 * __useGamesBySeasonAndWeekQuery__
 *
 * To run a query within a React component, call `useGamesBySeasonAndWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesBySeasonAndWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesBySeasonAndWeekQuery({
 *   variables: {
 *      season: // value for 'season'
 *      weekId: // value for 'weekId'
 *   },
 * });
 */
export function useGamesBySeasonAndWeekQuery(
  baseOptions: Apollo.QueryHookOptions<
    GamesBySeasonAndWeekQuery,
    GamesBySeasonAndWeekQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GamesBySeasonAndWeekQuery,
    GamesBySeasonAndWeekQueryVariables
  >(GamesBySeasonAndWeekDocument, options);
}
export function useGamesBySeasonAndWeekLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GamesBySeasonAndWeekQuery,
    GamesBySeasonAndWeekQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GamesBySeasonAndWeekQuery,
    GamesBySeasonAndWeekQueryVariables
  >(GamesBySeasonAndWeekDocument, options);
}
export type GamesBySeasonAndWeekQueryHookResult = ReturnType<
  typeof useGamesBySeasonAndWeekQuery
>;
export type GamesBySeasonAndWeekLazyQueryHookResult = ReturnType<
  typeof useGamesBySeasonAndWeekLazyQuery
>;
export type GamesBySeasonAndWeekQueryResult = Apollo.QueryResult<
  GamesBySeasonAndWeekQuery,
  GamesBySeasonAndWeekQueryVariables
>;
export function refetchGamesBySeasonAndWeekQuery(
  variables?: GamesBySeasonAndWeekQueryVariables
) {
  return { query: GamesBySeasonAndWeekDocument, variables: variables };
}
export const GamesPlayedBySeasonDocument = gql`
  query gamesPlayedBySeason($season: String) {
    games(
      where: {
        AND: [{ season: { equals: $season } }, { NOT: [{ winner: null }] }]
      }
    ) {
      id
    }
  }
`;

/**
 * __useGamesPlayedBySeasonQuery__
 *
 * To run a query within a React component, call `useGamesPlayedBySeasonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesPlayedBySeasonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesPlayedBySeasonQuery({
 *   variables: {
 *      season: // value for 'season'
 *   },
 * });
 */
export function useGamesPlayedBySeasonQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GamesPlayedBySeasonQuery,
    GamesPlayedBySeasonQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GamesPlayedBySeasonQuery,
    GamesPlayedBySeasonQueryVariables
  >(GamesPlayedBySeasonDocument, options);
}
export function useGamesPlayedBySeasonLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GamesPlayedBySeasonQuery,
    GamesPlayedBySeasonQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GamesPlayedBySeasonQuery,
    GamesPlayedBySeasonQueryVariables
  >(GamesPlayedBySeasonDocument, options);
}
export type GamesPlayedBySeasonQueryHookResult = ReturnType<
  typeof useGamesPlayedBySeasonQuery
>;
export type GamesPlayedBySeasonLazyQueryHookResult = ReturnType<
  typeof useGamesPlayedBySeasonLazyQuery
>;
export type GamesPlayedBySeasonQueryResult = Apollo.QueryResult<
  GamesPlayedBySeasonQuery,
  GamesPlayedBySeasonQueryVariables
>;
export function refetchGamesPlayedBySeasonQuery(
  variables?: GamesPlayedBySeasonQueryVariables
) {
  return { query: GamesPlayedBySeasonDocument, variables: variables };
}
export const PicksByWeekAndPlayerDocument = gql`
  query picksByWeekAndPlayer($playerId: ID!, $weekId: ID!) {
    picks(
      where: {
        AND: [
          { player: { id: { equals: $playerId } } }
          { game: { week: { id: { equals: $weekId } } } }
        ]
      }
    ) {
      id
      player {
        id
        name
      }
      game {
        id
      }
      picked {
        id
        name
        city
      }
    }
  }
`;

/**
 * __usePicksByWeekAndPlayerQuery__
 *
 * To run a query within a React component, call `usePicksByWeekAndPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePicksByWeekAndPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePicksByWeekAndPlayerQuery({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      weekId: // value for 'weekId'
 *   },
 * });
 */
export function usePicksByWeekAndPlayerQuery(
  baseOptions: Apollo.QueryHookOptions<
    PicksByWeekAndPlayerQuery,
    PicksByWeekAndPlayerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PicksByWeekAndPlayerQuery,
    PicksByWeekAndPlayerQueryVariables
  >(PicksByWeekAndPlayerDocument, options);
}
export function usePicksByWeekAndPlayerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PicksByWeekAndPlayerQuery,
    PicksByWeekAndPlayerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PicksByWeekAndPlayerQuery,
    PicksByWeekAndPlayerQueryVariables
  >(PicksByWeekAndPlayerDocument, options);
}
export type PicksByWeekAndPlayerQueryHookResult = ReturnType<
  typeof usePicksByWeekAndPlayerQuery
>;
export type PicksByWeekAndPlayerLazyQueryHookResult = ReturnType<
  typeof usePicksByWeekAndPlayerLazyQuery
>;
export type PicksByWeekAndPlayerQueryResult = Apollo.QueryResult<
  PicksByWeekAndPlayerQuery,
  PicksByWeekAndPlayerQueryVariables
>;
export function refetchPicksByWeekAndPlayerQuery(
  variables?: PicksByWeekAndPlayerQueryVariables
) {
  return { query: PicksByWeekAndPlayerDocument, variables: variables };
}
export const PlayerDocument = gql`
  query Player {
    authenticatedItem {
      ... on Player {
        id
        email
        name
      }
    }
  }
`;

/**
 * __usePlayerQuery__
 *
 * To run a query within a React component, call `usePlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayerQuery(
  baseOptions?: Apollo.QueryHookOptions<PlayerQuery, PlayerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlayerQuery, PlayerQueryVariables>(
    PlayerDocument,
    options
  );
}
export function usePlayerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PlayerQuery, PlayerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlayerQuery, PlayerQueryVariables>(
    PlayerDocument,
    options
  );
}
export type PlayerQueryHookResult = ReturnType<typeof usePlayerQuery>;
export type PlayerLazyQueryHookResult = ReturnType<typeof usePlayerLazyQuery>;
export type PlayerQueryResult = Apollo.QueryResult<
  PlayerQuery,
  PlayerQueryVariables
>;
export function refetchPlayerQuery(variables?: PlayerQueryVariables) {
  return { query: PlayerDocument, variables: variables };
}
export const PlayersBySeasonDocument = gql`
  query playersBySeason($season: String!) {
    players(
      where: { picks: { some: { game: { season: { equals: $season } } } } }
    ) {
      id
      name
      picks(where: { isCorrect: { equals: true } }) {
        id
      }
    }
  }
`;

/**
 * __usePlayersBySeasonQuery__
 *
 * To run a query within a React component, call `usePlayersBySeasonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersBySeasonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersBySeasonQuery({
 *   variables: {
 *      season: // value for 'season'
 *   },
 * });
 */
export function usePlayersBySeasonQuery(
  baseOptions: Apollo.QueryHookOptions<
    PlayersBySeasonQuery,
    PlayersBySeasonQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlayersBySeasonQuery, PlayersBySeasonQueryVariables>(
    PlayersBySeasonDocument,
    options
  );
}
export function usePlayersBySeasonLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlayersBySeasonQuery,
    PlayersBySeasonQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PlayersBySeasonQuery,
    PlayersBySeasonQueryVariables
  >(PlayersBySeasonDocument, options);
}
export type PlayersBySeasonQueryHookResult = ReturnType<
  typeof usePlayersBySeasonQuery
>;
export type PlayersBySeasonLazyQueryHookResult = ReturnType<
  typeof usePlayersBySeasonLazyQuery
>;
export type PlayersBySeasonQueryResult = Apollo.QueryResult<
  PlayersBySeasonQuery,
  PlayersBySeasonQueryVariables
>;
export function refetchPlayersBySeasonQuery(
  variables?: PlayersBySeasonQueryVariables
) {
  return { query: PlayersBySeasonDocument, variables: variables };
}
export const PlayersBySeasonAndWeekDocument = gql`
  query playersBySeasonAndWeek($season: String!, $weekId: ID!) {
    players(
      where: { picks: { some: { game: { season: { equals: $season } } } } }
    ) {
      id
      name
      picksCount(
        where: {
          AND: [
            { game: { week: { id: { equals: $weekId } } } }
            { isCorrect: { equals: true } }
          ]
        }
      )
      picks(where: { game: { week: { id: { equals: $weekId } } } }) {
        id
        isCorrect
        picked {
          id
          city
          name
        }
        game {
          id
        }
      }
    }
  }
`;

/**
 * __usePlayersBySeasonAndWeekQuery__
 *
 * To run a query within a React component, call `usePlayersBySeasonAndWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersBySeasonAndWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersBySeasonAndWeekQuery({
 *   variables: {
 *      season: // value for 'season'
 *      weekId: // value for 'weekId'
 *   },
 * });
 */
export function usePlayersBySeasonAndWeekQuery(
  baseOptions: Apollo.QueryHookOptions<
    PlayersBySeasonAndWeekQuery,
    PlayersBySeasonAndWeekQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PlayersBySeasonAndWeekQuery,
    PlayersBySeasonAndWeekQueryVariables
  >(PlayersBySeasonAndWeekDocument, options);
}
export function usePlayersBySeasonAndWeekLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlayersBySeasonAndWeekQuery,
    PlayersBySeasonAndWeekQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PlayersBySeasonAndWeekQuery,
    PlayersBySeasonAndWeekQueryVariables
  >(PlayersBySeasonAndWeekDocument, options);
}
export type PlayersBySeasonAndWeekQueryHookResult = ReturnType<
  typeof usePlayersBySeasonAndWeekQuery
>;
export type PlayersBySeasonAndWeekLazyQueryHookResult = ReturnType<
  typeof usePlayersBySeasonAndWeekLazyQuery
>;
export type PlayersBySeasonAndWeekQueryResult = Apollo.QueryResult<
  PlayersBySeasonAndWeekQuery,
  PlayersBySeasonAndWeekQueryVariables
>;
export function refetchPlayersBySeasonAndWeekQuery(
  variables?: PlayersBySeasonAndWeekQueryVariables
) {
  return { query: PlayersBySeasonAndWeekDocument, variables: variables };
}
export const MakePickDocument = gql`
  mutation makePick($player: ID!, $game: ID!, $team: ID!) {
    upsertPicks(playerId: $player, gameId: $game, teamId: $team) {
      id
      player {
        id
        name
      }
      game {
        id
      }
      picked {
        id
        name
        city
      }
    }
  }
`;
export type MakePickMutationFn = Apollo.MutationFunction<
  MakePickMutation,
  MakePickMutationVariables
>;

/**
 * __useMakePickMutation__
 *
 * To run a mutation, you first call `useMakePickMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakePickMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makePickMutation, { data, loading, error }] = useMakePickMutation({
 *   variables: {
 *      player: // value for 'player'
 *      game: // value for 'game'
 *      team: // value for 'team'
 *   },
 * });
 */
export function useMakePickMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MakePickMutation,
    MakePickMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MakePickMutation, MakePickMutationVariables>(
    MakePickDocument,
    options
  );
}
export type MakePickMutationHookResult = ReturnType<typeof useMakePickMutation>;
export type MakePickMutationResult = Apollo.MutationResult<MakePickMutation>;
export type MakePickMutationOptions = Apollo.BaseMutationOptions<
  MakePickMutation,
  MakePickMutationVariables
>;
export const SignOutDocument = gql`
  mutation signOut {
    endSession
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    options
  );
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
export const UpdateGameAndWinnerDocument = gql`
  mutation updateGameAndWinner($gameId: ID!, $winnerId: ID!, $spread: Float) {
    updateGame(
      where: { id: $gameId }
      data: { winner: { connect: { id: $winnerId } }, spread: $spread }
    ) {
      id
      winner {
        id
      }
      spread
    }
  }
`;
export type UpdateGameAndWinnerMutationFn = Apollo.MutationFunction<
  UpdateGameAndWinnerMutation,
  UpdateGameAndWinnerMutationVariables
>;

/**
 * __useUpdateGameAndWinnerMutation__
 *
 * To run a mutation, you first call `useUpdateGameAndWinnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameAndWinnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameAndWinnerMutation, { data, loading, error }] = useUpdateGameAndWinnerMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      winnerId: // value for 'winnerId'
 *      spread: // value for 'spread'
 *   },
 * });
 */
export function useUpdateGameAndWinnerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGameAndWinnerMutation,
    UpdateGameAndWinnerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateGameAndWinnerMutation,
    UpdateGameAndWinnerMutationVariables
  >(UpdateGameAndWinnerDocument, options);
}
export type UpdateGameAndWinnerMutationHookResult = ReturnType<
  typeof useUpdateGameAndWinnerMutation
>;
export type UpdateGameAndWinnerMutationResult =
  Apollo.MutationResult<UpdateGameAndWinnerMutation>;
export type UpdateGameAndWinnerMutationOptions = Apollo.BaseMutationOptions<
  UpdateGameAndWinnerMutation,
  UpdateGameAndWinnerMutationVariables
>;
export const UpdateGameRemoveWinnerDocument = gql`
  mutation updateGameRemoveWinner($gameId: ID!, $spread: Float) {
    updateGame(
      where: { id: $gameId }
      data: { winner: { disconnect: true }, spread: $spread }
    ) {
      id
      winner {
        id
      }
      spread
    }
  }
`;
export type UpdateGameRemoveWinnerMutationFn = Apollo.MutationFunction<
  UpdateGameRemoveWinnerMutation,
  UpdateGameRemoveWinnerMutationVariables
>;

/**
 * __useUpdateGameRemoveWinnerMutation__
 *
 * To run a mutation, you first call `useUpdateGameRemoveWinnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameRemoveWinnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameRemoveWinnerMutation, { data, loading, error }] = useUpdateGameRemoveWinnerMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      spread: // value for 'spread'
 *   },
 * });
 */
export function useUpdateGameRemoveWinnerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGameRemoveWinnerMutation,
    UpdateGameRemoveWinnerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateGameRemoveWinnerMutation,
    UpdateGameRemoveWinnerMutationVariables
  >(UpdateGameRemoveWinnerDocument, options);
}
export type UpdateGameRemoveWinnerMutationHookResult = ReturnType<
  typeof useUpdateGameRemoveWinnerMutation
>;
export type UpdateGameRemoveWinnerMutationResult =
  Apollo.MutationResult<UpdateGameRemoveWinnerMutation>;
export type UpdateGameRemoveWinnerMutationOptions = Apollo.BaseMutationOptions<
  UpdateGameRemoveWinnerMutation,
  UpdateGameRemoveWinnerMutationVariables
>;
