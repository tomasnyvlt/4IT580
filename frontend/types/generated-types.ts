import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddMatchPlayersType = {
  id_team: Scalars['Int'];
  id_user: Scalars['Int'];
  match_game_name?: InputMaybe<Scalars['String']>;
  match_role?: InputMaybe<Scalars['String']>;
};

export type AddMatchTeamsType = {
  id_team?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Match_Has_Team_State>;
};

export type AddPlayersInput = {
  id_team: Scalars['Int'];
  id_user: Scalars['Int'];
  state: Team_Has_Players_State;
};

export type DeleteMatchTeamsPairsType = {
  id_match?: InputMaybe<Scalars['Int']>;
  id_team?: InputMaybe<Scalars['Int']>;
};

export type Event = {
  __typename?: 'Event';
  counterEvent?: Maybe<Event>;
  eventType: EventType;
  id_event: Scalars['Int'];
  match: Match;
  recieverUserId?: Maybe<Scalars['Int']>;
  timeHappened: Scalars['String'];
  user: User;
};

export type EventType = {
  __typename?: 'EventType';
  id_event_type: Scalars['Int'];
  key: Scalars['String'];
  name: Scalars['String'];
};

export type League = {
  __typename?: 'League';
  admin?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id_league: Scalars['Int'];
  image_url: Scalars['String'];
  name: Scalars['String'];
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type LoginTokens = {
  __typename?: 'LoginTokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  edit_hash: Scalars['String'];
  events: Array<Maybe<Event>>;
  id_league?: Maybe<Scalars['Int']>;
  id_match: Scalars['Int'];
  match_editors?: Maybe<Array<Maybe<Match_Editor>>>;
  match_players?: Maybe<Array<MatchPlayers>>;
  score?: Maybe<Array<Maybe<MatchScore>>>;
  season: Seasons;
  state: Match_State;
  teams?: Maybe<Array<Maybe<Team>>>;
  time_created?: Maybe<Scalars['String']>;
  time_start?: Maybe<Scalars['String']>;
};


export type MatchEventsArgs = {
  teamId: Scalars['Int'];
};

export type MatchPlayers = {
  __typename?: 'MatchPlayers';
  email: Scalars['String'];
  events: Array<Maybe<Event>>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  match_game_name?: Maybe<Scalars['String']>;
  match_role?: Maybe<Array<Maybe<Scalars['String']>>>;
  teams: Array<Team>;
  timeLastLogin: Scalars['String'];
  timeRegistered: Scalars['String'];
};


export type MatchPlayersEventsArgs = {
  eventKey?: InputMaybe<Scalars['String']>;
  matchId?: InputMaybe<Scalars['Int']>;
  teamId: Scalars['Int'];
};

export type MatchScore = {
  __typename?: 'MatchScore';
  name: Scalars['String'];
  points: Scalars['Int'];
};

export type MatchTeamPlayerType = {
  id_player?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
};

export type MatchTeamType = {
  id_team: Scalars['Int'];
  match_team_name?: InputMaybe<Scalars['String']>;
  players: Array<MatchTeamPlayerType>;
};

export type Match_Editor = {
  __typename?: 'Match_editor';
  first_name: Scalars['String'];
  id_match_editor: Scalars['Int'];
  last_name: Scalars['String'];
  match_id_match: Scalars['Int'];
  user_id_user?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addEvent?: Maybe<Event>;
  addEventType: EventType;
  addLeague: League;
  addMatch: Match;
  addMatchEditor: Match_Editor;
  addMatchPlayers: Scalars['String'];
  addMatchTeams: Scalars['String'];
  addPlayersToTeams: Scalars['String'];
  addTeam: Team;
  addTeamMetaData: Scalars['String'];
  confirmRegistration: LoginTokens;
  createMatch: Match;
  deleteEventType: Scalars['String'];
  deleteLeague: Scalars['String'];
  deleteMatch: Scalars['String'];
  deleteMatchEditor: Scalars['String'];
  deleteMatchTeams: Scalars['String'];
  deletePlayerFromTeam: Scalars['String'];
  deleteTeam: Scalars['String'];
  deleteTeamMetaData: Scalars['String'];
  login: LoginTokens;
  logout: Scalars['String'];
  refresh: Scalars['String'];
  registerLogin: Scalars['String'];
  testMail?: Maybe<Scalars['String']>;
  updateEventType: EventType;
  updateLeague: League;
  updateMatch: Match;
  updateMatchEditor: Match_Editor;
  updateMatchTeamsState: Scalars['String'];
  updatePlayerInTeamState: Team_Has_Players;
  updateTeam: Team;
  updateTeamMetaData: Team_Meta_Data;
};


export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']>;
};


export type MutationAddEventArgs = {
  eventTypeKey: Scalars['String'];
  matchId: Scalars['Int'];
  recieverUserId?: InputMaybe<Scalars['Int']>;
  time: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationAddEventTypeArgs = {
  key: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddLeagueArgs = {
  description?: InputMaybe<Scalars['String']>;
  image_url: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddMatchArgs = {
  id_league?: InputMaybe<Scalars['Int']>;
  season?: InputMaybe<Seasons>;
  state?: InputMaybe<Match_State>;
  time_start?: InputMaybe<Scalars['String']>;
};


export type MutationAddMatchEditorArgs = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  match_id_match: Scalars['Int'];
  user_id_user?: InputMaybe<Scalars['Int']>;
};


export type MutationAddMatchPlayersArgs = {
  id_match: Scalars['Int'];
  players: Array<AddMatchPlayersType>;
};


export type MutationAddMatchTeamsArgs = {
  id_match: Scalars['Int'];
  teams: Array<AddMatchTeamsType>;
};


export type MutationAddPlayersToTeamsArgs = {
  players: Array<AddPlayersInput>;
};


export type MutationAddTeamArgs = {
  image_url?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationAddTeamMetaDataArgs = {
  id_team: Scalars['Int'];
  key: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};


export type MutationConfirmRegistrationArgs = {
  confirmationCode: Scalars['String'];
};


export type MutationCreateMatchArgs = {
  id_league: Scalars['Int'];
  season: Seasons;
  state?: InputMaybe<Match_State>;
  teamStructure1?: InputMaybe<MatchTeamType>;
  teamStructure2?: InputMaybe<MatchTeamType>;
  time_start: Scalars['String'];
};


export type MutationDeleteEventTypeArgs = {
  id_event_type: Scalars['Int'];
};


export type MutationDeleteLeagueArgs = {
  id_league: Scalars['Int'];
};


export type MutationDeleteMatchArgs = {
  id_match: Scalars['Int'];
};


export type MutationDeleteMatchEditorArgs = {
  id_match_editor: Scalars['Int'];
  match_id_match: Scalars['Int'];
};


export type MutationDeleteMatchTeamsArgs = {
  pairs: Array<DeleteMatchTeamsPairsType>;
};


export type MutationDeletePlayerFromTeamArgs = {
  id_team: Scalars['Int'];
  id_user: Scalars['Int'];
};


export type MutationDeleteTeamArgs = {
  id_team: Scalars['Int'];
};


export type MutationDeleteTeamMetaDataArgs = {
  id_team_meta_data: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterLoginArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateEventTypeArgs = {
  id_event_type: Scalars['Int'];
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateLeagueArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_league: Scalars['Int'];
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateMatchArgs = {
  id_league?: InputMaybe<Scalars['Int']>;
  id_match: Scalars['Int'];
  season?: InputMaybe<Seasons>;
  state?: InputMaybe<Match_State>;
  time_start?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateMatchEditorArgs = {
  first_name?: InputMaybe<Scalars['String']>;
  id_match_editor: Scalars['Int'];
  last_name?: InputMaybe<Scalars['String']>;
  match_id_match: Scalars['Int'];
  user_id_user?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateMatchTeamsStateArgs = {
  id_match: Scalars['Int'];
  id_team: Scalars['Int'];
  state: Match_Has_Team_State;
};


export type MutationUpdatePlayerInTeamStateArgs = {
  id_team: Scalars['Int'];
  id_user: Scalars['Int'];
  new_state: Team_Has_Players_State;
};


export type MutationUpdateTeamArgs = {
  id_team: Scalars['Int'];
  image_url?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationUpdateTeamMetaDataArgs = {
  id_team?: InputMaybe<Scalars['Int']>;
  id_team_meta_data: Scalars['Int'];
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  event: Event;
  eventTypes: Array<EventType>;
  events: Array<EventType>;
  league: League;
  leagues: Array<League>;
  match: Match;
  match_editor: Match_Editor;
  match_editors?: Maybe<Array<Maybe<Match_Editor>>>;
  matches: Array<Match>;
  matchesBySeason: Array<Match>;
  playerInTeams: Array<Team_Has_Players>;
  team: Team;
  teamHasPlayers: Array<Team_Has_Players>;
  teamMetaData: Array<Team_Meta_Data>;
  teams: Array<Team>;
  teamsHavePlayers: Array<Team_Has_Players>;
  teamsMetaData: Array<Team_Meta_Data>;
  test?: Maybe<Scalars['String']>;
  user: User;
};


export type QueryEventArgs = {
  idEvent: Scalars['Int'];
};


export type QueryLeagueArgs = {
  id_league: Scalars['Int'];
};


export type QueryMatchArgs = {
  id_match: Scalars['Int'];
};


export type QueryMatch_EditorArgs = {
  id_match_editor: Scalars['Int'];
};


export type QueryMatchesBySeasonArgs = {
  season: Seasons;
};


export type QueryPlayerInTeamsArgs = {
  id_user?: InputMaybe<Scalars['Int']>;
};


export type QueryTeamArgs = {
  id_team: Scalars['Int'];
};


export type QueryTeamHasPlayersArgs = {
  id_team?: InputMaybe<Scalars['Int']>;
};


export type QueryTeamMetaDataArgs = {
  id_team: Scalars['Int'];
};


export type QueryUserArgs = {
  id_user: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  admins: Array<User>;
  id_team?: Maybe<Scalars['Int']>;
  image_url?: Maybe<Scalars['String']>;
  invited_players: Array<User>;
  matches?: Maybe<Array<Maybe<Match>>>;
  name?: Maybe<Scalars['String']>;
  players: Array<User>;
  team_meta_data: Array<Team_Meta_Data>;
};

export type Team_Has_Players = {
  __typename?: 'Team_has_players';
  id_team: Scalars['Int'];
  id_user: Scalars['Int'];
  state: Team_Has_Players_State;
};

export type Team_Meta_Data = {
  __typename?: 'Team_meta_data';
  id_team: Scalars['Int'];
  id_team_meta_data: Scalars['Int'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  events: Array<Maybe<Event>>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  teams: Array<Team>;
  timeLastLogin: Scalars['String'];
  timeRegistered: Scalars['String'];
};


export type UserEventsArgs = {
  eventKey?: InputMaybe<Scalars['String']>;
  matchId?: InputMaybe<Scalars['Int']>;
  season?: InputMaybe<Seasons>;
  teamId: Scalars['Int'];
};

export enum Match_Has_Team_State {
  Accepted = 'accepted',
  Declined = 'declined',
  Invited = 'invited'
}

export enum Match_State {
  Accepted = 'accepted',
  Done = 'done',
  Pending = 'pending',
  Running = 'running'
}

export enum Seasons {
  S2013 = 's2013',
  S2014 = 's2014',
  S2015 = 's2015',
  S2016 = 's2016',
  S2017 = 's2017',
  S2018 = 's2018',
  S2019 = 's2019',
  S2020 = 's2020',
  S2021 = 's2021',
  S2022 = 's2022',
  S2023 = 's2023'
}

export enum Team_Has_Players_State {
  Admin = 'admin',
  Invited = 'invited',
  Joined = 'joined'
}

export type ConfirmRegMutationVariables = Exact<{
  confirmationCode: Scalars['String'];
}>;


export type ConfirmRegMutation = { __typename?: 'Mutation', confirmRegistration: { __typename?: 'LoginTokens', accessToken: string, refreshToken: string } };

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginTokens', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type MatchAddMutationVariables = Exact<{ [key: string]: never; }>;


export type MatchAddMutation = { __typename?: 'Mutation', addMatch: { __typename?: 'Match', id_match: number, time_created?: string | null, time_start?: string | null, state: Match_State, edit_hash: string } };

export type RegisterMutationMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', registerLogin: string };

export type MatchDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MatchDetailQuery = { __typename?: 'Query', match: { __typename?: 'Match', id_match: number, time_created?: string | null, time_start?: string | null, state: Match_State, edit_hash: string, id_league?: number | null, teams?: Array<{ __typename?: 'Team', id_team?: number | null, name?: string | null } | null> | null, score?: Array<{ __typename?: 'MatchScore', name: string, points: number } | null> | null } };

export type TeamDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TeamDetailQuery = { __typename?: 'Query', team: { __typename?: 'Team', id_team?: number | null, name?: string | null, image_url?: string | null, players: Array<{ __typename?: 'User', firstName: string, lastName: string }>, invited_players: Array<{ __typename?: 'User', firstName: string }>, admins: Array<{ __typename?: 'User', firstName: string }>, team_meta_data: Array<{ __typename?: 'Team_meta_data', key: string, value?: string | null }>, matches?: Array<{ __typename?: 'Match', id_match: number, time_created?: string | null, time_start?: string | null, state: Match_State, edit_hash: string, id_league?: number | null, season: Seasons, teams?: Array<{ __typename?: 'Team', name?: string | null } | null> | null, score?: Array<{ __typename?: 'MatchScore', name: string, points: number } | null> | null, events: Array<{ __typename?: 'Event', id_event: number, timeHappened: string } | null> } | null> | null } };

export type UserQueryVariables = Exact<{
  id_user: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', firstName: string, lastName: string, email: string, timeRegistered: string, teams: Array<{ __typename?: 'Team', id_team?: number | null, name?: string | null, image_url?: string | null, players: Array<{ __typename?: 'User', firstName: string, lastName: string, id: number }> }> } };


export const ConfirmRegDocument = gql`
    mutation confirmReg($confirmationCode: String!) {
  confirmRegistration(confirmationCode: $confirmationCode) {
    accessToken
    refreshToken
  }
}
    `;
export type ConfirmRegMutationFn = Apollo.MutationFunction<ConfirmRegMutation, ConfirmRegMutationVariables>;

/**
 * __useConfirmRegMutation__
 *
 * To run a mutation, you first call `useConfirmRegMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmRegMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmRegMutation, { data, loading, error }] = useConfirmRegMutation({
 *   variables: {
 *      confirmationCode: // value for 'confirmationCode'
 *   },
 * });
 */
export function useConfirmRegMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmRegMutation, ConfirmRegMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmRegMutation, ConfirmRegMutationVariables>(ConfirmRegDocument, options);
      }
export type ConfirmRegMutationHookResult = ReturnType<typeof useConfirmRegMutation>;
export type ConfirmRegMutationResult = Apollo.MutationResult<ConfirmRegMutation>;
export type ConfirmRegMutationOptions = Apollo.BaseMutationOptions<ConfirmRegMutation, ConfirmRegMutationVariables>;
export const LoginMutationDocument = gql`
    mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;

/**
 * __useLoginMutationMutation__
 *
 * To run a mutation, you first call `useLoginMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutationMutation, { data, loading, error }] = useLoginMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutationMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutationMutation, LoginMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument, options);
      }
export type LoginMutationMutationHookResult = ReturnType<typeof useLoginMutationMutation>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MatchAddDocument = gql`
    mutation MatchAdd {
  addMatch(state: pending) {
    id_match
    time_created
    time_start
    state
    edit_hash
  }
}
    `;
export type MatchAddMutationFn = Apollo.MutationFunction<MatchAddMutation, MatchAddMutationVariables>;

/**
 * __useMatchAddMutation__
 *
 * To run a mutation, you first call `useMatchAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMatchAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [matchAddMutation, { data, loading, error }] = useMatchAddMutation({
 *   variables: {
 *   },
 * });
 */
export function useMatchAddMutation(baseOptions?: Apollo.MutationHookOptions<MatchAddMutation, MatchAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MatchAddMutation, MatchAddMutationVariables>(MatchAddDocument, options);
      }
export type MatchAddMutationHookResult = ReturnType<typeof useMatchAddMutation>;
export type MatchAddMutationResult = Apollo.MutationResult<MatchAddMutation>;
export type MatchAddMutationOptions = Apollo.BaseMutationOptions<MatchAddMutation, MatchAddMutationVariables>;
export const RegisterMutationDocument = gql`
    mutation RegisterMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  registerLogin(
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
  )
}
    `;
export type RegisterMutationMutationFn = Apollo.MutationFunction<RegisterMutationMutation, RegisterMutationMutationVariables>;

/**
 * __useRegisterMutationMutation__
 *
 * To run a mutation, you first call `useRegisterMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutationMutation, { data, loading, error }] = useRegisterMutationMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutationMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutationMutation, RegisterMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutationMutation, RegisterMutationMutationVariables>(RegisterMutationDocument, options);
      }
export type RegisterMutationMutationHookResult = ReturnType<typeof useRegisterMutationMutation>;
export type RegisterMutationMutationResult = Apollo.MutationResult<RegisterMutationMutation>;
export type RegisterMutationMutationOptions = Apollo.BaseMutationOptions<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const MatchDetailDocument = gql`
    query matchDetail($id: Int!) {
  match(id_match: $id) {
    id_match
    time_created
    time_start
    state
    edit_hash
    id_league
    teams {
      id_team
      name
    }
    score {
      name
      points
    }
  }
}
    `;

/**
 * __useMatchDetailQuery__
 *
 * To run a query within a React component, call `useMatchDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMatchDetailQuery(baseOptions: Apollo.QueryHookOptions<MatchDetailQuery, MatchDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchDetailQuery, MatchDetailQueryVariables>(MatchDetailDocument, options);
      }
export function useMatchDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchDetailQuery, MatchDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchDetailQuery, MatchDetailQueryVariables>(MatchDetailDocument, options);
        }
export type MatchDetailQueryHookResult = ReturnType<typeof useMatchDetailQuery>;
export type MatchDetailLazyQueryHookResult = ReturnType<typeof useMatchDetailLazyQuery>;
export type MatchDetailQueryResult = Apollo.QueryResult<MatchDetailQuery, MatchDetailQueryVariables>;
export const TeamDetailDocument = gql`
    query TeamDetail($id: Int!) {
  team(id_team: $id) {
    id_team
    name
    image_url
    players {
      firstName
      lastName
    }
    invited_players {
      firstName
    }
    admins {
      firstName
    }
    team_meta_data {
      key
      value
    }
    matches {
      id_match
      time_created
      time_start
      state
      edit_hash
      id_league
      teams {
        name
      }
      score {
        name
        points
      }
      season
      events(teamId: $id) {
        id_event
        timeHappened
      }
    }
  }
}
    `;

/**
 * __useTeamDetailQuery__
 *
 * To run a query within a React component, call `useTeamDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamDetailQuery(baseOptions: Apollo.QueryHookOptions<TeamDetailQuery, TeamDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamDetailQuery, TeamDetailQueryVariables>(TeamDetailDocument, options);
      }
export function useTeamDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamDetailQuery, TeamDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamDetailQuery, TeamDetailQueryVariables>(TeamDetailDocument, options);
        }
export type TeamDetailQueryHookResult = ReturnType<typeof useTeamDetailQuery>;
export type TeamDetailLazyQueryHookResult = ReturnType<typeof useTeamDetailLazyQuery>;
export type TeamDetailQueryResult = Apollo.QueryResult<TeamDetailQuery, TeamDetailQueryVariables>;
export const UserDocument = gql`
    query user($id_user: Int!) {
  user(id_user: $id_user) {
    firstName
    lastName
    email
    timeRegistered
    teams {
      id_team
      name
      image_url
      players {
        firstName
        lastName
        id
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id_user: // value for 'id_user'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;