import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerLogin(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
