"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import PaginationComp from "./pagination";
import { cn } from "@/lib/utils";
import SortFilter from "./filter";

export type Column<TData = any> = ColumnDef<TData>;

export interface TablePropsComp<TData = any> {
  caption?: string;
  className?: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  total?: number;
  page?: number;
  pages?: number;
  sortOptions?: { label: string; value: string }[];
}

const TableComp = <TData = any,>({
  data,
  className,
  columns,
  caption,
  page,
  pages,
  total,
  sortOptions,
}: TablePropsComp<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn(["w-full", className])}>
      {page && pages && total ? (
        <div className="flex justify-between px-4 pb-3">
          <div className="flex gap-3 text-xl font-bold items-center">
            Total:{" "}
            <span className="text-green-700 dark:text-white">{total}</span>
          </div>
          <div className="w-fit">
            <PaginationComp page={page} pages={pages} total={total} />
          </div>
          <div>
            {sortOptions ? <SortFilter options={sortOptions} /> : <></>}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Desktop and tablet view */}
      <div className="hidden sm:block">
        <Card className="p-4">
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="p-0 text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow className="p-0 text-center" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="p-4 text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id} className="p-4">
            <div className="space-y-2">
              {row.getVisibleCells().map((cell) => (
                <div className="flex justify-between text-sm" key={cell.id}>
                  <span className="text-muted-foreground">
                    {flexRender(
                      cell.column.columnDef.header,
                      cell.getContext() as any,
                    )}
                  </span>
                  <span className="text-foreground font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
