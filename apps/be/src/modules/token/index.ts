import { typeDef } from './schema.js';
import { IResolvers } from "@graphql-tools/utils"
import * as mutations from './mutation.js';

const resolvers: IResolvers<any, Context> = {
    Query: { },
    Mutation: { ...mutations },
  };
  
  export { typeDef, resolvers };