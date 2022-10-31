import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { setLocale } from "yup";

import apolloClient from "apollo/client";
// eslint-disable-next-line import/order
import { csLocale } from "components/locales/cs";

import "public/static/global.css";

import { theme } from "theme/theme";

setLocale(csLocale);

const App: FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <>
      <Head>
        <title>Sportify</title>
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
