import { UrlObject } from "url";

import { Flex, Icon, Menu, Text, chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, ReactNode } from "react";

type NavItemType = {
  title: string;
  href: string | UrlObject;
  isBig?: boolean;
  icon?: FC;
  active?: boolean;
  avatar?: ReactNode;
};

const NavItem: FC<NavItemType> = ({ title, href, isBig = true, icon, active, avatar }) => {
  return (
    <Flex flexDirection="column" width="100%" alignItems={!isBig ? "center" : "flex-start"}>
      <Menu placement="right">
        <NextLink href={href} passHref>
          <chakra.a
            display="flex"
            w="100%"
            p={3}
            _hover={{ textDecoration: "none", backgroundColor: "blue.400", color: "white" }}
            width="100%"
            bg={active ? "blue.400" : "none"}
            color={active ? "white" : "none"}
            px="1rem"
            py="1rem"
            textAlign="left"
            alignItems="center"
          >
            {icon && <Icon as={icon} fontSize="xl" mr="5" />}

            {avatar && avatar}

            <Text display={!isBig ? "none" : "flex"} fontWeight={700}>
              {title}
            </Text>
          </chakra.a>
        </NextLink>
      </Menu>
    </Flex>
  );
};

export default NavItem;
