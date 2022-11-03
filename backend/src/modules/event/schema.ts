import { gql } from "apollo-server-core";

export const typeDef = gql`
  type Event {
    id_event: Int!
    time_happened: String
    id_match: Int!
    id_event_type: Int!
    user_id_user: Int!
    id_counter_event: Int!
  }

  extend type Query {
    events: [Event!]!
    event(id_event: Int!): Event!
  }

  extend type Mutation {
    addEvent(
      time_happened: String
      id_match: Int!
      id_event_type: Int!
      user_id_user: Int!
      id_counter_event: Int!
    ): Event!
    deleteEvent(id_event: Int!): String!
    updateEvent(id_event: Int!): Event!
  }
`;
