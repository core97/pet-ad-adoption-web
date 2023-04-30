'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Table as TableChakra,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { TableProps, RowType } from './Table.interface';
import { INITIAL_PAGE, LIMIT_PER_PAGE } from './Table.constants';

export const Table = <T extends Record<string, RowType>>({
  rows,
  columns,
  onChangePagination,
  onClickRow,
}: TableProps<T>) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [sorting, setSorting] = useState<{
    column: keyof T;
    type: 'desc' | 'asc';
    icon?: '🔼' | '🔽';
  }>();

  const totalPages = Math.ceil(rows.length / LIMIT_PER_PAGE);

  const handleClickColumn = (column: keyof T) => {
    setPage(INITIAL_PAGE);

    setSorting(prev => {
      if (!prev || prev.column !== column) {
        return {
          column,
          type: 'asc',
          icon: '🔼',
        };
      }

      if (prev.type === 'asc') {
        return {
          column,
          type: 'desc',
          icon: '🔽',
        };
      }

      return undefined;
    });
  };

  const handleChangePagination = (currentPage: number) => {
    setPage(currentPage);
    onChangePagination?.(currentPage);
  };

  const validRows = useMemo(() => {
    const initialIndex =
      page === INITIAL_PAGE ? 0 : (page - 1) * LIMIT_PER_PAGE;

    let updatedRows = rows;

    if (sorting) {
      updatedRows = updatedRows.sort((a, b) => {
        if (sorting.type === 'asc') {
          return a[sorting.column] >= b[sorting.column] ? 1 : -1;
        }

        return a[sorting.column] >= b[sorting.column] ? -1 : 1;
      });
    }

    return updatedRows.slice(initialIndex, initialIndex + LIMIT_PER_PAGE);
  }, [page, rows, sorting]);

  return (
    <TableContainer>
      <TableChakra>
        <Thead>
          <Tr>
            {columns.map(column => (
              <Th
                key={column.toString()}
                onClick={() => handleClickColumn(column)}
              >
                {`${
                  sorting?.column === column ? sorting.icon : ' '
                } ${column.toString()}`}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {validRows.map((row, index) => (
            <Tr key={index} onClick={() => onClickRow?.(row)}>
              {columns.map(column => (
                <Td key={column.toString()}>{row[column].toString()}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </TableChakra>
      <Box as="footer" mt={4}>
        <Button
          type="button"
          disabled={page === INITIAL_PAGE}
          onClick={() => handleChangePagination(page - 1)}
        >
          Anterior
        </Button>
        <Button
          type="button"
          disabled={page >= totalPages}
          onClick={() => handleChangePagination(page + 1)}
        >
          Siguiente
        </Button>
      </Box>
    </TableContainer>
  );
};
