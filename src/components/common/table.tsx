import React, { FC } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card } from '../ui/card';

export interface Column {
  label: string;
  value?: string;
  render?: (row: any) => React.ReactNode;
}

export interface TablePropsComp {
  caption?: string;
  column: Column[];
  data: any[];
}

const TableComp: FC<TablePropsComp> = ({ data, column, caption }) => {
  return (
    <div className="w-full">
      {/* Desktop and tablet view */}
      <div className="hidden sm:block">
        <Card className="p-4">
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              <TableRow>
                {column.map((col, index) => (
                  <TableHead key={`table-header-${index}`} className="p-0 text-center">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow className="p-0 text-center" key={`table-row-${rowIndex}`}>
                  {column.map((col, colIndex) => (
                    <TableCell className="p-4 text-center" key={`table-cell-${colIndex}`}>
                      {col.render ? col.render(row) : row[col.value || '']}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {data.map((row, rowIndex) => (
          <Card key={`mobile-card-${rowIndex}`} className="p-4">
            <div className="space-y-2">
              {column.map((col, colIndex) => (
                <div className="flex justify-between text-sm" key={`mobile-cell-${colIndex}`}>
                  <span className="text-muted-foreground">{col.label}</span>
                  <span className="text-foreground font-medium">
                    {col.render ? col.render(row) : row[col.value || '']}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TableComp;
