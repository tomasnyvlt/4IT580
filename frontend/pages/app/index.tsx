import { Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";

import { UserContext } from "components/contexts/UserContext";
import Page from "components/layouts/Page";

const IndexPage: NextPage = () => {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <Page>
      <Container>
        <Heading as="h1">Hello {user?.firstName}</Heading>
      </Container>
    </Page>
  );
};

export default IndexPage;
