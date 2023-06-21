"use client"

import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowLeft, ArrowRight, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Toggle } from "@/components/ui/toggle"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Pagination } from "./pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [isListViewMode, setIsListViewMode] = React.useState(true)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  })
  const pageIndex = table.getState().pagination.pageIndex

  const getPageNumbers = () => {
    const pageCount = table.getPageCount()
    const pageNumbers = []
    const maxPageNumbers = 7 // Change to 6
    const currentPageNumber = pageIndex + 1

    if (pageCount <= maxPageNumbers) {
      for (let i = 0; i < maxPageNumbers; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(0, 1, 2)
      if (currentPageNumber > 4) {
        pageNumbers.push("...")
      }
      if (currentPageNumber > 3 && currentPageNumber < pageCount - 2) {
        pageNumbers.push(currentPageNumber - 1)
      }
      if (currentPageNumber < pageCount - 3) {
        pageNumbers.push("...")
      }
      pageNumbers.push(pageCount - 3, pageCount - 2, pageCount - 1)
    }

    return pageNumbers
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="w-full relative">
          <Search className="absolute ml-[29px] mt-[12px] w-4 h-4 text-gray-500"></Search>
          <Input
            placeholder="Search here..."
            value={
              (table.getColumn("address")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("address")?.setFilterValue(event.target.value)
            }
            className="pl-14 pt-2 w-full bg-gray-50"
          />
        </div>
        <div className="flex ml-4 mr-2" aria-label="Toggle View">
          <Toggle
            className="data-[state=on]:bg-white text-slate-700 whitespace-nowrap"
            pressed={isListViewMode}
            onClick={() => {
              setIsListViewMode(true)
            }}
          >
            List View
          </Toggle>
          <Toggle
            className="data-[state=on]:bg-white text-slate-700 whitespace-nowrap"
            pressed={!isListViewMode}
            onClick={() => {
              setIsListViewMode(false)
            }}
          >
            Grid View
          </Toggle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-gray-50 text-gray-500">
              <Filter className="mr-1" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-xl w-full bg-white">
        <TooltipProvider>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="first:pl-6 last:pr-6 pt-6 pb-3 h-14"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="first:pl-6 last:pr-6">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
        <Pagination table={table}></Pagination>
      </div>
    </div>
  )
}
