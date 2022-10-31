import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    registerLogin(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
