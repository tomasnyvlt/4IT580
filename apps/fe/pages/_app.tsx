import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import apolloClient from "apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

import "public/static/global.css";
import { theme } from "theme/theme";

const App: FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <>
      <Head>
        <title>title</title>
      </Head>

      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
