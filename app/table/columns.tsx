"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

// This type is used to define the shape of our data.
export type Record = {
  id: number
  img: string
  address: string
  latestInspectionDate: string
  latestDamageImpacts: string
  latestDamageLevel: string
  roofLifespan: string
}

// This is the columns schema of the datatable
export const columns: ColumnDef<Record>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-gray-300 w-5 h-5"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-gray-300 w-5 h-5"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "img",
    header: " ",
    cell: ({ row }) => (
      <div className="w-[50px] h-[50px]">
        <img
          className="rounded-lg w-full h-hull"
          src={row.original.img}
          alt="no img"
        />
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const record = row.original

      return <p className="text-slate-700 font-semibold">{record.address}</p>
    },
  },
  {
    accessorKey: "latestInspectionDate",
    header: "Latest Inspection Date",
  },
  {
    accessorKey: "latestDamageImpacts",
    header: "Latest Damage Impacts",
  },
  {
    accessorKey: "latestDamageLevel",
    header: "Latest Damage Level",
  },
  {
    accessorKey: "roofLifespan",
    header: "Roof Lifespan",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const record = row.original

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-12 h-12 px-0 py-0 rounded-lg"
              variant={"outline"}
              onClick={() => {
                // dev: action
                alert(`Record ${record.id} Triggered`)
              }}
            >
              <Icons.yoga3></Icons.yoga3>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-700 text-white">
            <p>Healthy</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
]
