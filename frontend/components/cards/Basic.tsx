import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface BasicCardProps {
  heading?: string;
}

const BasicCard: FC<PropsWithChildren<BasicCardProps>> = ({ heading, children }) => {
  return (
    <Flex
      boxShadow="basic"
      flexDirection="column"
      borderRadius="0.5rem"
      border="1px solid"
      borderColor="blue.400"
      // _hover={{ backgroundColor: "blue.400", color: "white" }}
    >
      {heading && (
        <Text as="h3" borderBottom="1px solid" bg="blue.400" p="1rem" size="md" fontWeight={700} color="#fff">
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
