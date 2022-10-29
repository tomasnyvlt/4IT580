import { Button, Container } from "@chakra-ui/react";
import { NextPage } from "next";

import Landing from "components/layouts/Landing";

const IndexPage: NextPage = () => {
  return (
    <Landing>
      <Container>
        <Button>chakra button</Button>
      </Container>
    </Landing>
  );
};

export default IndexPage;

// eslint-disable-next-line no-lone-blocks
{
  /*
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
*/
}
