import { typeDef } from './schema.js';
import * as queries from './query.js';
import { IResolvers } from '@graphql-tools/utils';
import * as mutations from './mutation.js';
import * as teamSpecific from './team_specific.js';

const resolvers: IResolvers<any, Context> = {
  Query: { ...queries },
  Mutation: { ...mutations },
  Team: {
    players: teamSpecific.teamPlayers,
    invited_players: teamSpecific.teamInvitedPlayers,
    admins: teamSpecific.teamAdmins,
    team_meta_data: teamSpecific.teamMetaData,
  },
};

export { typeDef, resolvers };
