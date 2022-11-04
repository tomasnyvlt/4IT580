import { typeDef } from './schema.js';
import { IResolvers } from '@graphql-tools/utils';
import * as mutations from './mutation.js';
import * as queries from './query.js';
import * as userSpecific from './user_specific.js';

const resolvers: IResolvers<any, Context> = {
  Query: { ...queries },
  Mutation: { ...mutations },
  User: {
    teams: userSpecific.userTeams,
    events: userSpecific.userEvents
  },
};

export { typeDef, resolvers };
