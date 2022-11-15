import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface BasicCardProps {
  heading?: string;
  withBackground?: boolean;
}

const BasicCard: FC<PropsWithChildren<BasicCardProps>> = ({ heading, withBackground, children }) => {
  return (
    <Flex
      boxShadow="basic"
      flexDirection="column"
      borderRadius="0.5rem"
      background="#fff"
      border={withBackground ? "1px solid" : "0"}
      borderColor="blue.400"
      overflow="hidden"
    >
      {heading && (
        <Text
          as="h3"
          borderBottom="1px solid"
          p="1rem"
          size="md"
          fontWeight={700}
          color={withBackground ? "#fff" : "blue.400"}
          bg={withBackground ? "blue.400" : "#fff"}
        >
          {heading}
        </Text>
      )}

      <Flex p="1rem" flexDirection="column">
        {children}
      </Flex>
    </Flex>
  );
};

export default BasicCard;
