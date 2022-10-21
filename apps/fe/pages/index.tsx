import { Button, Container } from "@chakra-ui/react";
import Landing from "components/layouts/Landing";
import Page from "components/layouts/Page";
import { NextPage } from "next";

const IndexPage: NextPage = (props) => {

  return (
    <Landing>
      <Container>
        <Button>chakra button</Button>
      </Container>
    </Landing>
  );
};

export default IndexPage;

{/*
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Recipes {
        recipes {id}
      }
    `,
  });

  return {
    props: {
      countries: data,
    },
  };
}
*/}
