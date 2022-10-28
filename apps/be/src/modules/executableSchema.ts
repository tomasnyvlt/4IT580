import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as EventType, resolvers as eventTypeResolvers } from './event_type/index';
import { typeDef as Team, resolvers as teamResolvers } from './team/index.js'
import { typeDef as TeamHasPlayers, resolvers as teamHasPlayersResolvers } from './team_has_players/index.js'
import { typeDef as TeamMetaData, resolvers as teamMetaDataResolvers } from './team_meta_data/index.js'
import { typeDef as User, resolvers as userResolvers } from './user/index.js';
import { typeDef as Token, resolvers as tokenResolvers } from './token/index.js';

// based on - https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
const Query = /* GraphQL */ `
  type Query {
    test: String
  }
`;

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, User, EventType, Token, Team, TeamHasPlayers, TeamMetaData],
  resolvers: merge(resolvers, userResolvers, eventTypeResolvers, tokenResolvers, teamResolvers, teamHasPlayersResolvers, teamMetaDataResolvers),
});
