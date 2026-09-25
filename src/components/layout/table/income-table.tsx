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
import { useGetIncomeHistory } from "../../../hooks/useGetHistory";
import { PaginationLayout } from "../pagination-layout";
import { useState } from "react";

export default function IncomeTableLayout() {
  const [page, setPage] = useState(1);
  const { income, pagination, loading } = useGetIncomeHistory(page);

  return (
    <>
      {loading ? (
        <section className="w-full p-10 flex justify-center text-gray-500">
          Loading...
        </section>
      ) : income.length === 0 ? (
        <section className="bg-gray-50 w-full p-40 flex items-center justify-center">
          <p className="text-xl text-gray-300">There isn't anything</p>
        </section>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Income</TableHead>
              <TableHead>Information</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {income.map((items) => (
              <TableRow key={items._id}>
                <TableCell className="font-medium">
                  {new Date(items.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{items.income}</TableCell>
                <TableCell>{items.information}</TableCell>
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
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Delete
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
