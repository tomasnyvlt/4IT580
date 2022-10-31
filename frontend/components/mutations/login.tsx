import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
