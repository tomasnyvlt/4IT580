import { gql } from "apollo-server-core";

export const typeDef = /* GraphQL */ `
    type LoginTokens{
        accessToken: String!
        refreshToken: String!
    }

    extend type Mutation{
        login(email: String!, password: String!): LoginTokens!
        logout: String!
        refresh(refreshToken: String!): String!
    }
`;