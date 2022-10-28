import { gql } from 'apollo-server-core';

export const typeDef = gql`
  type Team_meta_data {
    id_team_meta_data: Int!
    key: String!
    value: String
    id_team: Int!
  }

  extend type Query {
    teamsMetaData: [Team_meta_data!]!
    teamMetaData(id_team: Int!): [Team_meta_data!]!
  }

  extend type Mutation {
    addTeamMetaData(key: String!, value: String, id_team: Int!): String!
    updateTeamMetaData(
      id_team_meta_data: Int!
      key: String
      value: String
      id_team: Int
    ): Team_meta_data!
    deleteTeamMetaData(id_team_meta_data: Int!): String!
  }
`;
