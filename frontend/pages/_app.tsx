import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { setLocale } from "yup";

import { EnhancedApolloProvider } from "apollo/client";
import { AuthProvider } from "components/contexts/AuthContext";
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

      <AuthProvider>
        <EnhancedApolloProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </EnhancedApolloProvider>
      </AuthProvider>
    </>
  );
};

export default App;
