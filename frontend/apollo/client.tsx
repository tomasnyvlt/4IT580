import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import React, { FC, PropsWithChildren, useContext } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import config from "config";

const apolloClient = new ApolloClient({
  uri: config.apiUrl,
  cache: new InMemoryCache()
});

export default apolloClient;

const httpLink = createHttpLink({
  uri: config.apiUrl
});

export const EnhancedApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: authContext.tokens?.accessToken ? `Bearer ${authContext.tokens?.accessToken}` : ""
      }
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network"
      },
      query: {
        notifyOnNetworkStatusChange: true
      }
    }
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
