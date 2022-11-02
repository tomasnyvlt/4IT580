import { DocumentNode, TypedDocumentNode, useQuery as useApolloQuery } from "@apollo/client";
import { OperationVariables } from "@apollo/client/core";
import { QueryHookOptions, QueryResult } from "@apollo/client/react/types/types";
import { useContext } from "react";

import { AuthContext } from "components/contexts/AuthContext";

// eslint-disable-next-line import/no-cycle

export const useQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const authContext = useContext(AuthContext);

  return useApolloQuery(query, {
    // @ts-ignore
    context: {
      headers: {
        Authorization: authContext.tokens?.accessToken
      }
    },
    ...options
  });
};
