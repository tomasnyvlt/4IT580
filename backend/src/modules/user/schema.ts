import { gql } from "apollo-server-core";

export const typeDef = /* GraphQL */ `
    type User{
        id: Int!
        firstName: String!
        lastName: String!
        email: String!
        timeRegistered: String!
        timeLastLogin: String!
        teams: [Team!]!
    }

    extend type Query{
        user(id_user: Int!): User!
    }

    extend type Mutation{
        registerLogin(firstName: String!, lastName: String!, email: String!, password: String!): LoginTokens!
    }
`;