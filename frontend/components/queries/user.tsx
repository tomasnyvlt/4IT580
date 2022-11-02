import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query user($id_user: Int!) {
    user(id_user: $id_user) {
      firstName
      lastName
      userName
      email
      timeRegistered
      teams {
        id_team
        name
        image_url
      }
    }
  }
`;
