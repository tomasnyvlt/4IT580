import { DocumentNode, TypedDocumentNode, useMutation as useApolloMutation } from "@apollo/client";
import { ApolloCache, DefaultContext, OperationVariables } from "@apollo/client/core";
import { MutationHookOptions, MutationTuple } from "@apollo/client/react/types/types";
import { useContext } from "react";

import { UserContext } from "components/contexts/UserContext";

export const useMutation = <
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext>
): MutationTuple<TData, TVariables, TContext, TCache> => {
  const userContext = useContext(UserContext);

  return useApolloMutation(mutation, {
    // @ts-ignore
    context: {
      headers: {
        Authorization: userContext.tokens?.accessToken
      }
    },
    ...options
  });
};
