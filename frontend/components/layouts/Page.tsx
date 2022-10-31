import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect } from "react";

import { UserContext } from "components/contexts/UserContext";
import Footer from "components/ui/Footer";
import Sidebar from "components/ui/Sidebar";

const Page: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext?.tokens === undefined || userContext!.tokens?.accessToken === undefined) {
      router.push("/sign-in");
    }
  }, [userContext]);

  console.log(userContext);

  if (userContext?.tokens === undefined || userContext!.tokens?.accessToken === undefined) {
    router.push("/sign-in");
  }

  if (userContext?.tokens?.accessToken) {
    return (
      <Box display="flex" flexDirection="row" minHeight="100vh">
        <Box w="300px" flex="0 0 auto" borderRight="1px solid" borderColor="gray.400">
          <Sidebar />
        </Box>

        <Box display="flex" flexDirection="column" w="100%">
          <Box position="relative" flex="1">
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
