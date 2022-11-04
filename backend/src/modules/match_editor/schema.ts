import { gql } from "apollo-server-core";

export const typeDef = gql`
  type Match_editor {
    id_match_editor: Int!
    first_name: String!
    last_name: String!
    user_id_user: Int
    match_id_match: Int!
  }

  extend type Query {
    match_editors: [Match_editor]
    match_editor(id_match_editor: Int!): Match_editor!
  }

  extend type Mutation {
    addMatchEditor(
      first_name: String!
      last_name: String!
      user_id_user: Int
      match_id_match: Int!
    ): Match_editor!
    deleteMatchEditor(id_match_editor: Int!, match_id_match: Int!): String!
  }
`;
