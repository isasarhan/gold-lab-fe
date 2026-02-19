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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "../ui/card";
import PaginationComp from "./pagination";
import { cn } from "@/lib/utils";
import SortFilter from "./filter";
import { Inbox } from "lucide-react";

export type Column<TData = any> = ColumnDef<TData>;

export interface TablePropsComp<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  caption?: string;
  className?: string;
  data: TData[];
  total?: number;
  page?: number;
  pages?: number;
  sortOptions?: { label: string; value: string }[];
}

const TableComp = <TData, TValue>({
  data,
  className,
  columns,
  caption,
  page,
  pages,
  total,
  sortOptions,
}: TablePropsComp<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasPagination = page && pages && total;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Toolbar */}
      {hasPagination ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border bg-card px-4 py-2.5 shadow-sm sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
              {total}
            </span>
          </div>
          <PaginationComp page={page} pages={pages} total={total} />
          {sortOptions ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort</span>
              <SortFilter options={sortOptions} />
            </div>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      ) : null}

      {/* Desktop / Tablet */}
      <div className="hidden sm:block">
        <Card className="overflow-hidden rounded-xl border border-border shadow-sm">
          {caption && (
            <CardHeader className="border-b border-primary/20 bg-primary/8 px-6 py-3">
              <p className="text-sm font-medium text-primary">
                {caption}
              </p>
            </CardHeader>
          )}
          <div className="max-h-130 overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-primary/20 bg-primary/10 hover:bg-primary/10"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="h-11 px-4 text-center text-xs font-semibold uppercase tracking-wider text-primary"
                      >
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
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      className={cn(
                        "transition-colors hover:bg-accent/60",
                        index % 2 === 0 ? "bg-card" : "bg-primary/5",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-4 py-3 text-center text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-48 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <Inbox className="h-10 w-10 opacity-30" />
                        <p className="text-sm">No records found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <Card
              key={row.id}
              className="overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="h-1 w-full bg-primary/60" />
              <div className="space-y-2.5 p-4">
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="shrink-0 font-medium text-muted-foreground">
                      {flexRender(
                        cell.column.columnDef.header,
                        cell.getContext() as any,
                      )}
                    </span>
                    <span className="text-right font-medium text-foreground">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))
        ) : (
          <Card className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border text-muted-foreground shadow-sm">
            <Inbox className="h-8 w-8 opacity-30" />
            <p className="text-sm">No records found</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TableComp;
