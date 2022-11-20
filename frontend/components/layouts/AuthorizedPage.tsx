import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { UserProvider } from "components/contexts/UserContext";
import Footer from "components/ui/Footer";
import Sidebar from "components/ui/Sidebar";

const AuthorizedPage: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.tokens === undefined) {
      router.push("/sign-in");
    }
  }, [authContext]);

  if (authContext?.tokens?.accessToken) {
    return (
      <UserProvider>
        <Box display="flex" flexDirection="row" minHeight="100vh">
          <Sidebar />

          <Box as="main" display="flex" flexDirection="column" w="100%">
            <Box position="relative" flex="1">
              <Box>{children}</Box>
            </Box>

            <Footer />
          </Box>
        </Box>
      </UserProvider>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
      <Spinner />
    </Box>
  );
};

export default AuthorizedPage;
