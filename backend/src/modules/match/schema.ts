import { gql } from "apollo-server-core";
    //TODO Match players
export const typeDef = gql`
  enum match_state {
    pending
    accepted
    running
    done
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
  }

  input AddMatchPlayersType {
    id_user: Int!
    match_game_name: String
    match_role: String
  }

  extend type Query {
    matches: [Match!]!
    match(id_match: Int!): Match!
  }

  extend type Mutation {
    addMatch(time_start: String!, state: match_state!, id_league: Int!): Match!
    addMatchPlayers(id_match: Int!, players:[AddMatchPlayersType!]!): String!
    deleteMatch(id_match: Int!): String!
    updateMatch(id_match: Int!, state: match_state, id_league: Int): Match!
  }
`;
