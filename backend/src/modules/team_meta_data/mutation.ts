import { GQLSuccess } from "../../utils/return_statements/success.js";

type addTeamMetaDataArgs = {
  key: string;
  value?: string;
  id_team: number;
};
export const addTeamMetaData = async (
  _: void,
  args: addTeamMetaDataArgs,
  context: Context
) => {
  await context.prisma.team_meta_data.create({
    data: {
      key: args.key,
      value: args?.value,
      id_team: args.id_team,
    },
  });
  return new GQLSuccess().rowCreated();
};

type updateTeamMetaDataArgs = {
  id_team_meta_data: number;
  key?: string;
  value?: string;
  id_team?: number;
};
export const updateTeamMetaData = async (
  _: void,
  args: updateTeamMetaDataArgs,
  context: Context
) => {
  const updateTeamMetaData = await context.prisma.team_meta_data.update({
    where: {
      id_team_meta_data: args.id_team_meta_data,
    },
    data: {
      id_team: args?.id_team,
      key: args?.key,
      value: args?.value,
    },
  });
  return updateTeamMetaData;
};

export const deleteTeamMetaData = async (
  _: void,
  args: { id_team_meta_data: number },
  context: Context
) => {
  await context.prisma.team_meta_data.delete({
    where: {
      id_team_meta_data: args.id_team_meta_data,
    },
  });
  return new GQLSuccess().rowDeleted();
};
