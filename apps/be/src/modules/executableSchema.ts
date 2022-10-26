import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as EventType, resolvers as eventTypeResolvers } from './event_type/index';
import { typeDef as Team, resolvers as teamResolvers } from './team/index'

// based on - https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
const Query = /* GraphQL */ `
  type Query {
    _empty: String
  }
`;

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, EventType, Team],
  resolvers: merge(resolvers, eventTypeResolvers, teamResolvers),
});
