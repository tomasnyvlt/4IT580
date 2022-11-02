import { ArrowLeftIcon, ArrowRightIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FC, useState } from "react";

import NavItem from "./NavItem";

const Sidebar: FC = () => {
  const [navSizes, setNavsize] = useState("large");
  return (
    <Flex
      position="sticky"
      left="5 h='95Vh"
      mt="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      width={navSizes === "small" ? "75px" : "200px"}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start">
        {/* <Divider display={navSizes === "small" ? "none" : "float"} /> */}
        <Flex mt="4" align="center">
          <Avatar size="sm" src="/static/images/8_big16.png" />
          <Flex flexDir="column" ml="4" display={navSizes === "small" ? "none" : "float"}>
            <Heading as="h3">Tigers</Heading>
          </Flex>
        </Flex>
        <NavItem navSizes={navSizes} icon={InfoOutlineIcon} title="Detail tymu" href="/app/team-detail" />
        <NavItem navSizes={navSizes} icon={InfoOutlineIcon} title="Ligy" href="/app/team-detail" />
        <NavItem navSizes={navSizes} icon={InfoOutlineIcon} title="Matches" href="/app/team-detail" />
      </Flex>
      <Flex p="5%" flexDir="column" alignItems="flex-start" as="nav">
        <IconButton
          background="none"
          mt="5"
          _hover={{ background: "none" }}
          icon={navSizes === "small" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          onClick={() => {
            if (navSizes === "small") {
              setNavsize("large");
            } else {
              setNavsize("small");
            }
          }}
          aria-label="hamburger menu"
        />
      </Flex>
    </Flex>

    // <Box w="300px" flex="0 0 auto" borderRight="1px solid" borderColor="gray.400">
    //   <Box display="flex" gap="1rem">
    //     <Link href="/app/team-detail" passHref>
    //       <Button as="a" variant="outline">
    //         Detail týmu
    //       </Button>
    //     </Link>
    //   </Box>
    // </Box>
  );
};

export default Sidebar;
