import { Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";

import { UserContext } from "components/contexts/UserContext";
import AuthorizedPage from "components/layouts/AuthorizedPage";

const IndexPage: NextPage = () => {
  const { user } = useContext(UserContext);

  return (
    <AuthorizedPage>
      <Container maxW="6xl">
        <Heading as="h1">Hello {user?.user.firstName}</Heading>
      </Container>
    </AuthorizedPage>
  );
};

export default IndexPage;
