import { gql } from "apollo-server-core";

export const typeDef = /* GraphQL */ `
    type League{
        id_league: Int!
        name: String!
        description: String
        image_url: String!
    }

    extend type Query {
        leagues: [League!]!
        league(id_league: Int!): League!
    }

    extend type Mutation{
        addLeague(name: String!, description: String, image_url: String!): League!
        deleteLeague(id_league: Int!): String!
        updateLeague(id_league: Int!): String!
    }
`;