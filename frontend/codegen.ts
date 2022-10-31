
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "components/types/schema.graphql",
  generates: {
    "components/types/": {
      preset: "client",
      plugins: []
    },
  }
};

export default config;
