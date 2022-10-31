import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <Box w="300px" flex="0 0 auto" borderRight="1px solid" borderColor="gray.400">
      <Box display="flex" gap="1rem">
        <Link href="/app/team-detail" passHref>
          <Button as="a" variant="outline">
            Detail týmu
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
