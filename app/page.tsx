import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Record, columns } from "./table/columns"
import { DataTable } from "./table/datatable"
import mockData from "./table/mockTableData.json"

export default async function IndexPage() {
  async function getData(): Promise<Record[]> {
    // Fetch data from your API here.
    return mockData
  }
  const data = await getData()

  return (
    <section className="container px-9 py-7 grid items-center gap-7 ">
      <div className="flex flex-row justify-between items-center gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Properties
        </h3>
        <Button className="mr-4">
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
