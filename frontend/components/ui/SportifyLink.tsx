import { Link, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC, PropsWithChildren } from "react";

interface SportifyLinkProps extends NextLinkProps {
  linkProps?: LinkProps;
}

const SportifyLink: FC<PropsWithChildren<SportifyLinkProps>> = ({ children, ...props }) => {
  return (
    <NextLink passHref {...props}>
      <Link color="teal.500" href="/">
        {children}
      </Link>
    </NextLink>
  );
};

export default SportifyLink;
