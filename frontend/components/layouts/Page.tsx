import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { UserContext } from "components/contexts/UserContext";
import { FC, PropsWithChildren, useContext, useEffect } from "react";

import Footer from "../ui/Footer";
import Sidebar from "../ui/Sidebar";

const Page: FC<PropsWithChildren> = ({ children }) => {
  // const router = useRouter();
  // const userContext = useContext(UserContext);

  // useEffect(() => {
  //   if (userContext?.tokens === undefined || userContext!.tokens?.accessToken === undefined) {
  //     router.push("/sign-in");
  //   }
  // }, [userContext]);

  // console.log(userContext);

  // if (userContext?.tokens === undefined || userContext!.tokens?.accessToken === undefined) {
  //   router.push("/sign-in");
  // }

  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      <Sidebar />

      <Box display="flex" flexDirection="column" w="100%">
        <Box position="relative" flex="1">
          <Box>{children}</Box>
        </Box>

        <Footer />
      </Box>
    </Box>
  );

  // return (
  //   <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
  //     <Spinner />
  //   </Box>
  // );
};

export default Page;
