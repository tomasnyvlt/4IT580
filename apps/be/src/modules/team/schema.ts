import { gql } from 'apollo-server-core';

export const typeDef = gql`
  type Team {
    id_team: Int
    name: String
    image_url: String
  }

  extend type Query {
    teams: [Team!]!
    team(id_team: Int!): Team!
  }

  extend type Mutation {
    addTeam(name: String!, image_url: String): Team!
    deleteTeam(id_team: Int!): String!
    updateTeam(id_team: Int!, name: String!, image_url: String): Team!
  }
`;
