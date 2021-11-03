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
