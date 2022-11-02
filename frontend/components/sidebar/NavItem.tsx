import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FC } from "react";

// import NavHoverBox from "./NavHoverBox";

type NavItemType = {
  title: string;
  href: string;
  navSizes: string;
  icon: FC;

  active?: boolean;
};

const NavItem: FC<NavItemType> = ({ title, href, navSizes, icon, active }) => {
  return (
    <Flex
      mt={navSizes === "large" ? "20px" : "55px"}
      flexDirection="column"
      width="100%"
      alignItems={navSizes === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          p={3}
          borderRadius={8}
          _hover={{ textDecoration: "none", backgroundColor: "blue", color: "white" }}
          href={href}
          //   width={navSizes === "large" && "100%"}
          width="100%"
          backgroundColor={active ? "blue" : "none"}
          color={active ? "white" : "none"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5} display={navSizes === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        {/* <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList> */}
      </Menu>
    </Flex>
  );
};

export default NavItem;
