import { GQLSuccess } from "../../utils/return_statements/success";

export const deleteMatchEditor = async (
  _: void,
  args: { id_match_editor: number; match_id_match: number },
  context: Context
) => {
  await context.prisma.match_editor.delete({
    where: {
      id_match_editor_match_id_match: {
        id_match_editor: args.id_match_editor,
        match_id_match: args.match_id_match,
      },
    },
  });
  return new GQLSuccess().rowDeleted();
};

type addMatchEditorArgs = {
  first_name: string;
  last_name: string;
  user_id_user: number | undefined;
  match_id_match: number;
};
export const addMatchEditor = async (
  _: void,
  args: addMatchEditorArgs,
  context: Context
) => {
  const addMatchEditor = await context.prisma.match_editor.create({
    data: args,
  });
  return addMatchEditor;
};

type updateMatchEditorArgs = {
  id_match_editor: number;
  match_id_match: number;
  first_name: string | undefined;
  last_name: string | undefined;
  user_id_user: number | undefined;
};
export const updateMatchEditor = async (
  _: void,
  args: updateMatchEditorArgs,
  context: Context
) => {
  const updateMatchEditor = await context.prisma.match_editor.update({
    data: {
      first_name: args?.first_name,
      last_name: args?.last_name,
      user_id_user: args?.user_id_user,
    },
    where: {
      id_match_editor_match_id_match: {
        id_match_editor: args.id_match_editor,
        match_id_match: args.match_id_match,
      },
    },
  });
  return updateMatchEditor
};
