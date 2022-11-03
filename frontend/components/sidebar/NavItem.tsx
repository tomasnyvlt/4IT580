import { UrlObject } from "url";

import { Flex, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

type NavItemType = {
  title: string;
  href: string | UrlObject;
  isBig?: boolean;
  icon: FC;
  active?: boolean;
};

const NavItem: FC<NavItemType> = ({ title, href, isBig, icon, active }) => {
  return (
    <Flex flexDirection="column" width="100%" alignItems={!isBig ? "center" : "flex-start"}>
      <Menu placement="right">
        <NextLink href={href} passHref>
          <MenuButton
            w="100%"
            p={3}
            borderRadius={8}
            _hover={{ textDecoration: "none", backgroundColor: "blue.400", color: "white" }}
            width="100%"
            bg={active ? "blue.400" : "none"}
            color={active ? "white" : "none"}
          >
            <Flex>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5} display={!isBig ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </NextLink>
      </Menu>
    </Flex>
  );
};

export default NavItem;
