import { Button, Container } from "@chakra-ui/react";
import { NextPage } from "next";

import Page from "../../components/layouts/Page";

const IndexPage: NextPage = () => {
  return (
    <Page>
      <Container>
        <Button>chakra button</Button>
      </Container>
    </Page>
  );
};

export default IndexPage;
