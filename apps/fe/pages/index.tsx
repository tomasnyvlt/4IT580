import { gql } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import client from "apollo/client";
import { NextPage } from "next";

const Index: NextPage = (props) => {
  console.log(props)
  return (
    <div><Button>chakra button</Button></div>
  );
};

export default Index;

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
