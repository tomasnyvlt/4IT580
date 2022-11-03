import { ArrowLeftIcon, ArrowRightIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import * as React from "react";

export interface DataTableProps<Data extends object> {
  data: Data[];
  columns: ColumnDef<Data, any>[];
}

const DataTable = <Data extends object>({ data, columns }: DataTableProps<Data>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    state: {
      sorting
    }
  });

  return (
    <div>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    <Flex alignItems="center">
                      <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>

                      <Flex pl="2" w="1rem" h="1rem" cursor="pointer">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <Icon as={TriangleDownIcon} aria-label="sorted descending" />
                          ) : (
                            <Icon as={TriangleUpIcon} aria-label="sorted ascending" />
                          )
                        ) : null}
                      </Flex>
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>;
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" mt="1rem">
        <IconButton
          colorScheme="blue"
          aria-label="Prev page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          icon={<ArrowLeftIcon />}
        />

        <Text>
          Strana{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
          </strong>
        </Text>

        <IconButton
          colorScheme="blue"
          aria-label="Next page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          icon={<ArrowRightIcon />}
        />
      </Flex>
    </div>
  );
};

export default DataTable;
