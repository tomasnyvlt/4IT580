import { Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

import Page from "components/layouts/Page";

const TeamDetailPage: NextPage = () => {
  return (
    <Page>
      <Container>
        <Heading as="h1">Hello</Heading>
      </Container>
    </Page>
  );
};

export default TeamDetailPage;
