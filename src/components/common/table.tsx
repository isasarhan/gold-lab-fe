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
import PaginationComp from './pagination';
import { cn } from '@/lib/utils';

export interface Column {
  label: string;
  value?: string;
  render?: (row: any) => React.ReactNode;
}

export interface TablePropsComp {
  caption?: string;
  className?: string;
  columns: Column[];
  data: any[];
  total?: number;
  page?: number;
  pages?: number;
}

const TableComp: FC<TablePropsComp> = ({ data, className, columns, caption, page, pages, total }) => {
  return (
    <div className={cn(["w-full", className])}>
      {(page && pages && total) && <div className="flex justify-between px-4">
        <div className='flex gap-3 text-xl font-bold'>Total: <span className='text-green-700'>{total}</span></div>
        <div className='w-fit'>
          <PaginationComp page={page} pages={pages} total={total} />
        </div>
      </div>}

      {/* Desktop and tablet view */}
      <div className="hidden sm:block">
        <Card className="p-4">
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={`table-header-${index}`} className="p-0 text-center">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow className="p-0 text-center" key={`table-row-${rowIndex}`}>
                  {columns.map((col, colIndex) => (
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
              {columns.map((col, colIndex) => (
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
