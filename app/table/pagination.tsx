"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  table: import("@tanstack/table-core").Table<TData>
}

export function Pagination<TData, TValue>({
  table,
}: DataTableProps<TData, TValue>) {
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
    <div className="flex w-full items-center justify-between space-x-2 py-4 px-6">
      <Button
        variant={"outline"}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeft className="mr-3 w-4" /> Previous
      </Button>
      <div className="flex items-center justify-between gap-1 text-slate-600">
        {getPageNumbers().map((pageNumber, pageIndex) =>
          typeof pageNumber == "number" ? (
            <Button
              key={pageIndex}
              variant={"ghost"}
              className={`${
                pageIndex === pageNumber ? "text-slate-800" : "text-slate-600"
              }`}
              onClick={() => {
                table.setPageIndex(pageNumber)
              }}
            >
              {pageNumber + 1}
            </Button>
          ) : (
            <span key={pageIndex}>...</span>
          )
        )}
      </div>
      <Button
        variant={"outline"}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next <ArrowRight className="ml-3 w-4" />
      </Button>
    </div>
  )
}
