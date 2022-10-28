import { gql } from "apollo-server-core";

export const typeDef = /* GraphQL */ `
    type Token{
        content: String!
    }

    extend type Mutation{
        login(userName: String!, password: String!): Token!
    }
`;