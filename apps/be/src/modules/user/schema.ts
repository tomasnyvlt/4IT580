import { gql } from "apollo-server-core";

export const typeDef = gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String!
        userName: String!
        email: String!
        registered: Date!
        lastLogin: Date!
    }

    extend type Query{
        
    }

    extend type Mutation{
        registerLogin(firstName: String!, lastName: String!, userName: String, email: String, password: String): User!
    }
`;