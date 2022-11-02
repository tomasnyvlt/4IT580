import { DocumentNode, TypedDocumentNode, useMutation as useApolloMutation } from "@apollo/client";
import { ApolloCache, DefaultContext, OperationVariables } from "@apollo/client/core";
import { MutationHookOptions, MutationTuple } from "@apollo/client/react/types/types";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";

import { AuthContext } from "components/contexts/AuthContext";

export const useMutation = <
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext>
): MutationTuple<TData, TVariables, TContext, TCache> => {
  const authContext = useContext(AuthContext);
  const toast = useToast();

  return useApolloMutation(mutation, {
    // @ts-ignore
    context: {
      headers: {
        Authorization: authContext.tokens?.accessToken
      }
    },
    onError: (error) =>
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      }),
    ...options
  });
};
