import { gql } from "apollo-server-core";

export const typeDef = gql`
  enum match_state {
    pending
    accepted
    running
    done
  }
  enum seasons {
    s2013
    s2014
    s2015
    s2016
    s2017
    s2018
    s2019
    s2020
    s2021
    s2022
    s2023
  }

  type Match {
    id_match: Int!
    time_created: String
    time_start: String!
    state: match_state!
    edit_hash: String!
    id_league: Int!
    teams: [Team]
    match_editors: [Match_editor]
    events(teamId: Int!): [Event]!
    match_players: [MatchPlayers!]
    season: seasons!
  }

  type MatchPlayers {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    timeRegistered: String!
    timeLastLogin: String!
    teams: [Team!]!
    events(teamId: Int!, matchId: Int, eventKey: String): [Event]!
    match_game_name: String
    match_role: [String]
  }

  input AddMatchPlayersType {
    id_user: Int!
    match_game_name: String
    match_role: String
  }

  extend type Query {
    matches: [Match!]!
    match(id_match: Int!): Match!
    matchesBySeason(season: seasons!): [Match!]!
  }

  extend type Mutation {
    addMatch(
      time_start: String!
      state: match_state!
      id_league: Int!
      season: seasons
    ): Match!
    addMatchPlayers(id_match: Int!, players: [AddMatchPlayersType!]!): String!
    deleteMatch(id_match: Int!): String!
    updateMatch(
      id_match: Int!
      state: match_state
      id_league: Int
      season: seasons
    ): Match!
  }
`;
