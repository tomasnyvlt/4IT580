import { GQLSuccess } from "../../utils/return_statements/success.js";
import { generateHashOfLength } from "../../libs/token.js";
import { GQLError } from "../../utils/return_statements/errors.js";
import { match_has_team_state, match_state, seasons } from "@prisma/client";
const crypto = require("crypto");

type addMatchArgs = {
  time_start?: string;
  state: match_state;
  id_league?: number;
  season: seasons;
};
export const addMatch = async (
  _: void,
  args: addMatchArgs,
  context: Context
) => {
  const addMatch = await context.prisma.match.create({
    data: {
      edit_hash: generateHashOfLength(32),
      time_start: args.time_start? new Date(args.time_start): null,
      state: args.state,
      id_league: args?.id_league,
      season: args?.season,
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
  state?: match_state;
  id_league?: number;
  season: seasons;
  time_start?: string;
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
      season: args?.season,
      time_start: args?.time_start
    },
  });
  return updateMatch;
};

type addMatchTeamsArgs = {
  id_match: number;
  teams: Array<{
    id_team: number;
    state: match_has_team_state;
  }>;
};
export const addMatchTeams = async (
  _: void,
  args: addMatchTeamsArgs,
  context: Context
) => {
  const addMatchTeams = await context.prisma.match_has_team.createMany({
    data: args.teams.map((team) => {
      return {
        id_match: args.id_match,
        id_team: team.id_team,
        state: team.state,
      };
    }),
  });
  return new GQLSuccess().rowsCreated(addMatchTeams.count);
};

export const updateMatchTeamsState = async (
  _: void,
  args: { id_team: number; id_match: number; state: match_has_team_state },
  context: Context
) => {
  const updateMatchTeamsState = await context.prisma.match_has_team.update({
    where: {
      id_team_id_match: {
        id_match: args.id_match,
        id_team: args.id_team,
      },
    },
    data: {
      state: args.state,
    },
  });
  return new GQLSuccess().success();
};

type deleteMatchTeamsArgs = {
  pairs: Array<{
    id_team: number;
    id_match: number;
  }>;
};
export const deleteMatchTeams = async (
  _: void,
  args: deleteMatchTeamsArgs,
  context: Context
) => {
  const id_teamArr = args.pairs.map((p) => p.id_team);
  const id_matchArr = args.pairs.map((p) => p.id_match);

  const deleteMatchTeams = await context.prisma.match_has_team.deleteMany({
    where: {
      id_match: { in: id_matchArr },
      AND: {
        id_team: { in: id_teamArr },
      },
    },
  });
  return new GQLSuccess().rowsDeleted(deleteMatchTeams.count);
};

type addMatchPlayersArgs = {
  id_match: number;
  players: Array<{
    id_user: number;
    match_game_name?: string;
    match_role?: string;
    id_team: number;
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
        id_team: player.id_team
      };
    }),
  });

  if (addMatchPlayers.count > 0) {
    return new GQLSuccess().rowsCreated(addMatchPlayers.count);
  } else return new GQLError().noNewRows();
};
