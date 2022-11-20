import { gql } from 'apollo-server-core';

export const typeDef = gql`
  type Team {
    id_team: Int
    name: String
    image_url: String
    players: [User!]!
    invited_players: [User!]!
    admins: [User!]!
    team_meta_data: [Team_meta_data!]!
    matches: [Match]
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
