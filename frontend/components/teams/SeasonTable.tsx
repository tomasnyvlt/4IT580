import { Button, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Link } from "@chakra-ui/react";

import { FC } from "react";

const SeasonTable: FC = () => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Logo sportu</Th>
            <Th>Název soutěže</Th>
            <Th>Umístění </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Logo</Td>
            <Td>Název soutěže</Td>
            <Td>Umístění</Td>
          </Tr>
          <Tr>
            <Td>Logo</Td>
            <Td>Název soutěže</Td>
            <Td>Umístění</Td>
          </Tr>
          <Tr>
            <Td>Logo</Td>
            <Td>Název soutěže</Td>
            <Td>Umístění</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default SeasonTable;
