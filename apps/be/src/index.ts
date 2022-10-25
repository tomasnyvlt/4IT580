import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { PrismaClient } from '@prisma/client'

import { MOCKS, PORT } from './config/variables';
import { schema } from './modules/executableSchema';

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  const prisma = new PrismaClient()

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req.headers.Authorization || '';

      const context:Context = {
        prisma,
        auth,
      }

      return context;
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const port = PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
