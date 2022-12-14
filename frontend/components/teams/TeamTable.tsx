import { Button, Link, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { FC } from "react";

const TeamTable: FC = () => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Jméno hráče</Th>
            <Th>Pozice</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Link href="/app/player/id">
              <Td>Hrac 1</Td>
            </Link>
            <Td>Brankář</Td>
          </Tr>
          <Tr>
            <Link href="/app/player/id">
              <Td>Hrac 2</Td>
            </Link>
            <Td>útočník</Td>
          </Tr>
          <Tr>
            <Link href="/app/player/id">
              <Td>Hrac 3</Td>
            </Link>
            <Td> obránce</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Link href=" https://trello.com/c/QQnOJHUH">
            <Button>Správa týmu</Button>
          </Link>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
export default TeamTable;
