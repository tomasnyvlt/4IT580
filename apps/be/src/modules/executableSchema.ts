import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as EventType, resolvers as eventTypeResolvers } from './event_type/index';
import { typeDef as Team, resolvers as teamResolvers } from './team/index'
import { typeDef as TeamHasPlayers, resolvers as teamHasPlayersResolvers } from './team_has_players/index'
import { typeDef as TeamMetaData, resolvers as teamMetaDataResolvers } from './team_meta_data'

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
  typeDefs: [Query, Mutation, EventType, Team, TeamHasPlayers, TeamMetaData],
  resolvers: merge(resolvers, eventTypeResolvers, teamResolvers, teamHasPlayersResolvers, teamMetaDataResolvers),
});
