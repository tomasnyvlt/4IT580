import { gql } from "apollo-server-core";

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
  }

  extend type Query {
    matches: [Match!]!
    match(id_match: Int!): Match!
  }

  extend type Mutation {
    addMatch(time_start: String!, state: match_state!, id_league: Int!): Match!
    deleteMatch(id_match: Int!): String!
    updateMatch(id_match: Int!, state: match_state, id_league: Int): Match!
  }
`;
