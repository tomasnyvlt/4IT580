import { Button, Container } from "@chakra-ui/react";
import Page from "components/layouts/Page";
import { NextPage } from "next";

const IndexPage: NextPage = (props) => {

  return (
    <Page>
      <Container>
        <Button>chakra button</Button>
      </Container>
    </Page>
  );
};

export default IndexPage;
