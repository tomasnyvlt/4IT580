import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "types/schema.graphql",
  documents: "types/**/*.graphql",
  generates: {
    "types/generated-types.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true
      }
    }
  }
};

export default config;
