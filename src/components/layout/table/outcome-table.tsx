import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../@/components/ui/table";
import { Button } from "../../../../@/components/ui/button";
import { useGetOutcomeHistory } from "../../../hooks/useGetHistory";
import { PaginationLayout } from "../pagination-layout";
import { useState } from "react";
import { useDelete } from "../../../hooks/useDelete";

export default function OutcomeTableLayout() {
  const [page, setPage] = useState(1);
  const { outcome, pagination, loading, refetch } = useGetOutcomeHistory(page);
  const { executeDelete, isLoading } = useDelete();

  async function handleDelete(id?: string) {
    const isConfirm = window.confirm("Are you sure delete this item ?");

    if (isConfirm) {
      try {
        await executeDelete(`/outcome/${id}`);
        refetch();
      } catch (error) {
        console.error("Failed delete item: ", error);
      }
    }
  }
  return (
    <>
      {loading ? (
        <section className="w-full p-10 flex justify-center text-gray-500">
          Loading...
        </section>
      ) : outcome.length === 0 ? (
        <section className="bg-gray-50 w-full p-40 flex items-center justify-center">
          <p className="text-xl text-gray-300">There isn't anything here</p>
        </section>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outcome.map((items) => (
              <TableRow key={items._id}>
                <TableCell className="font-medium">
                  {new Date(items.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{items.outcome}</TableCell>
                <TableCell>{items.category}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon" className="size-8">
                          ...
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Detail</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(items._id)}
                        variant="destructive"
                      >
                        {isLoading ? "Delete Item..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <PaginationLayout
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChanges={setPage}
      />
    </>
  );
}
