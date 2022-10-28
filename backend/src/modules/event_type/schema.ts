import { gql } from "apollo-server-core";

export const typeDef = gql`
    type EventType{
        id_event_type: Int!
        name: String!
        key: String!
    }

    extend type Query {
        eventTypes: [EventType!]!
    }

    extend type Mutation {
        addEventType(key: String!, name: String!): EventType!
        deleteEventType(id_event_type: Int!): String!
        updateEventType(id_event_type: Int!, name: String, key: String): EventType!
    }
`;