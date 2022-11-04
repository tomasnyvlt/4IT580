import { gql } from "apollo-server-core";

export const typeDef = gql`
    type Event{
        id_event: Int!
        timeHappened: String!
        match: Match!
        eventType: EventType!
        user: User!
        counterEvent: Event,
        recieverUserId: Int
    }

    extend type Query {
        events: [EventType!]!
        event(idEvent: Int!): Event!
    }

    extend type Mutation {
        addEvent(eventTypeKey: String!, matchId: Int!, userId: Int!, time: String!, recieverUserId: Int): Event
    }
`;