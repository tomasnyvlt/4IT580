import { GQLSuccess } from "../../utils/return_statements/success.js";
import { generateHashOfLength } from "../../libs/token.js";
import { GQLError } from "../../utils/return_statements/errors.js";
const crypto = require("crypto");

type addMatchArgs = {
  time_start: string;
  state: "pending" | "accepted" | "running" | "done";
  id_league: number;
};
export const addMatch = async (
  _: void,
  args: addMatchArgs,
  context: Context
) => {
  const addMatch = await context.prisma.match.create({
    data: {
      edit_hash: generateHashOfLength(32),
      time_start: new Date(args.time_start),
      state: args.state,
      id_league: args.id_league,
    },
  });
  return addMatch;
};

export const deleteMatch = async (
  _: void,
  args: { id_match: number },
  context: Context
) => {
  await context.prisma.match.delete({
    where: {
      id_match: args.id_match,
    },
  });
  return new GQLSuccess().rowDeleted();
};

type updateMatchArgs = {
  id_match: number;
  state: "pending" | "accepted" | "running" | "done" | undefined;
  id_league: number | undefined;
};
export const updateMatch = async (
  _: void,
  args: updateMatchArgs,
  context: Context
) => {
  const updateMatch = await context.prisma.match.update({
    where: {
      id_match: args.id_match,
    },
    data: {
      state: args?.state,
      id_league: args?.id_league,
    },
  });
  return updateMatch;
};

type addMatchPlayersArgs = {
  id_match: number;
  players: Array<{
    id_user: number;
    match_game_name?: string;
    match_role?: string;
  }>;
};
export const addMatchPlayers = async (
  _: void,
  args: addMatchPlayersArgs,
  context: Context
) => {
  const addMatchPlayers = await context.prisma.match_players.createMany({
    data: args.players.map((player) => {
      return {
        id_match: args.id_match,
        id_player: player.id_user,
        match_game_name: player.match_game_name,
        match_role: player.match_role,
      };
    }),
  });

  if (addMatchPlayers.count > 0) {
    return new GQLSuccess().rowsCreated(addMatchPlayers.count);
  } else return new GQLError().noNewRows();
};
