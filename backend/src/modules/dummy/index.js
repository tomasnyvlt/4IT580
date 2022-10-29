import { typeDef } from './schema';
import * as queries from './query';

const resolvers = {
  Query: { ...queries },
  Mutation: {},
};

export { typeDef, resolvers };
