import { gql } from 'apollo-server-core';

export const typeDef = gql`
  enum team_has_players_state {
    invited
    joined
    admin
  }

  type Team_has_players {
    id_user: Int!
    id_team: Int!
    state: team_has_players_state!
  }

  input AddPlayersInput {
    id_user: Int!
    id_team: Int!
    state: team_has_players_state!
  }

  extend type Query {
    teamsHavePlayers: [Team_has_players!]!
    teamHasPlayers(id_team: Int): [Team_has_players!]!
    playerInTeams(id_user: Int): [Team_has_players!]!
  }

  extend type Mutation {
    addPlayersToTeams(players: [AddPlayersInput!]!): String!
    deletePlayerFromTeam(id_user: Int!, id_team: Int!): String!
    updatePlayerInTeamState(
      id_user: Int!
      id_team: Int!
      new_state: team_has_players_state!
    ): Team_has_players!
  }
`;
