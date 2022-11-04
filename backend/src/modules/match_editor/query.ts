import { GQLError } from "../../utils/return_statements/errors";

export const match_editors = async (_: void, __: void, context: Context) => {
  const match_editors = await context.prisma.match_editor.findMany();
  if (match_editors.length < 1) {
    throw new GQLError().noMatches();
  }
  return match_editors.slice(0, 20);
};

export const match_editor = async (
  _: void,
  args: { id_match_editor: number },
  context: Context
) => {
  const match_editor = await context.prisma.match_editor.findFirst({
    where: {
      id_match_editor: args.id_match_editor,
    },
  });
  return match_editor;
};
