import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useToast } from "@chakra-ui/react";
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
  const toast = useToast();

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: authContext.tokens?.accessToken ? `Bearer ${authContext.tokens?.accessToken}` : ""
      }
    });

    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) =>
        toast({
          title: message,
          status: "error",
          duration: 5000,
          isClosable: true
        })
      );
    }

    if (networkError) {
      // handle network error
      // eslint-disable-next-line no-console
      console.log(networkError);
    }
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network"
      },
      mutate: {
        errorPolicy: "ignore"
      },
      query: {
        notifyOnNetworkStatusChange: true
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
