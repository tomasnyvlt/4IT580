/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddPlayersInput = {
  id_team: Scalars["Int"];
  id_user: Scalars["Int"];
  state: Team_Has_Players_State;
};

export type EventType = {
  __typename?: "EventType";
  id_event_type: Scalars["Int"];
  key: Scalars["String"];
  name: Scalars["String"];
};

export type LoginTokens = {
  __typename?: "LoginTokens";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]>;
  addEventType: EventType;
  addPlayersToTeams: Scalars["String"];
  addTeam: Team;
  addTeamMetaData: Scalars["String"];
  confirmRegistration: LoginTokens;
  deleteEventType: Scalars["String"];
  deletePlayerFromTeam: Scalars["String"];
  deleteTeam: Scalars["String"];
  deleteTeamMetaData: Scalars["String"];
  login: LoginTokens;
  logout: Scalars["String"];
  refresh: Scalars["String"];
  registerLogin: Scalars["String"];
  testMail?: Maybe<Scalars["String"]>;
  updateEventType: EventType;
  updatePlayerInTeamState: Team_Has_Players;
  updateTeam: Team;
  updateTeamMetaData: Team_Meta_Data;
};

export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars["String"]>;
};

export type MutationAddEventTypeArgs = {
  key: Scalars["String"];
  name: Scalars["String"];
};

export type MutationAddPlayersToTeamsArgs = {
  players: Array<AddPlayersInput>;
};

export type MutationAddTeamArgs = {
  image_url?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type MutationAddTeamMetaDataArgs = {
  id_team: Scalars["Int"];
  key: Scalars["String"];
  value?: InputMaybe<Scalars["String"]>;
};

export type MutationConfirmRegistrationArgs = {
  confirmationCode: Scalars["String"];
};

export type MutationDeleteEventTypeArgs = {
  id_event_type: Scalars["Int"];
};

export type MutationDeletePlayerFromTeamArgs = {
  id_team: Scalars["Int"];
  id_user: Scalars["Int"];
};

export type MutationDeleteTeamArgs = {
  id_team: Scalars["Int"];
};

export type MutationDeleteTeamMetaDataArgs = {
  id_team_meta_data: Scalars["Int"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRefreshArgs = {
  refreshToken: Scalars["String"];
};

export type MutationRegisterLoginArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateEventTypeArgs = {
  id_event_type: Scalars["Int"];
  key?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdatePlayerInTeamStateArgs = {
  id_team: Scalars["Int"];
  id_user: Scalars["Int"];
  new_state: Team_Has_Players_State;
};

export type MutationUpdateTeamArgs = {
  id_team: Scalars["Int"];
  image_url?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type MutationUpdateTeamMetaDataArgs = {
  id_team?: InputMaybe<Scalars["Int"]>;
  id_team_meta_data: Scalars["Int"];
  key?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  eventTypes: Array<EventType>;
  playerInTeams: Array<Team_Has_Players>;
  team: Team;
  teamHasPlayers: Array<Team_Has_Players>;
  teamMetaData: Array<Team_Meta_Data>;
  teams: Array<Team>;
  teamsHavePlayers: Array<Team_Has_Players>;
  teamsMetaData: Array<Team_Meta_Data>;
  test?: Maybe<Scalars["String"]>;
  user: User;
};

export type QueryPlayerInTeamsArgs = {
  id_user?: InputMaybe<Scalars["Int"]>;
};

export type QueryTeamArgs = {
  id_team: Scalars["Int"];
};

export type QueryTeamHasPlayersArgs = {
  id_team?: InputMaybe<Scalars["Int"]>;
};

export type QueryTeamMetaDataArgs = {
  id_team: Scalars["Int"];
};

export type QueryUserArgs = {
  id_user: Scalars["Int"];
};

export type Team = {
  __typename?: "Team";
  admins: Array<User>;
  id_team?: Maybe<Scalars["Int"]>;
  image_url?: Maybe<Scalars["String"]>;
  invited_players: Array<User>;
  name?: Maybe<Scalars["String"]>;
  players: Array<User>;
  team_meta_data: Array<Team_Meta_Data>;
};

export type Team_Has_Players = {
  __typename?: "Team_has_players";
  id_team: Scalars["Int"];
  id_user: Scalars["Int"];
  state: Team_Has_Players_State;
};

export type Team_Meta_Data = {
  __typename?: "Team_meta_data";
  id_team: Scalars["Int"];
  id_team_meta_data: Scalars["Int"];
  key: Scalars["String"];
  value?: Maybe<Scalars["String"]>;
};

export type User = {
  id_user: any;
  __typename?: "User";
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["Int"];
  lastName: Scalars["String"];
  teams: Array<Team>;
  timeLastLogin: Scalars["String"];
  timeRegistered: Scalars["String"];
};

export enum Team_Has_Players_State {
  Admin = "admin",
  Invited = "invited",
  Joined = "joined"
}
