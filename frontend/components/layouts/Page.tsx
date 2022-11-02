import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import Footer from "components/ui/Footer";
import Sidebar from "components/ui/Sidebar";

const Page: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.tokens === undefined || authContext!.tokens?.accessToken === undefined) {
      router.push("/sign-in");
    }
  }, [authContext]);

  if (authContext?.tokens === undefined || authContext!.tokens?.accessToken === undefined) {
    router.push("/sign-in");
  }

  if (authContext?.tokens?.accessToken) {
    return (
      <Box display="flex" flexDirection="row" minHeight="100vh">
        <Box w="300px" flex="0 0 auto" borderRight="1px solid" borderColor="gray.400">
          <Sidebar />
        </Box>

        <Box display="flex" flexDirection="column" w="100%">
          <Box position="relative" flex="1" py="2rem">
            <Box>{children}</Box>
          </Box>

          <Footer />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
      <Spinner />
    </Box>
  );
};

export default Page;
