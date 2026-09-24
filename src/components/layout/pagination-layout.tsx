import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../@/components/ui/pagination";
import { getPageNumber } from "../../utils/getPageNumber";

export function PaginationLayout({
  currentPage,
  totalPages,
  onPageChanges,
}: {
  currentPage: number;
  totalPages: number;
  onPageChanges: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size={undefined}
            aria-disabled={isFirstPage}
            className={isFirstPage ? "pointer-events-none opacity-50" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (!isFirstPage) onPageChanges(currentPage - 1);
            }}
          />
        </PaginationItem>
        {getPageNumber(currentPage, totalPages).map((p, i) => (
          <PaginationItem key={`${p} - ${i}`}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                size={undefined}
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChanges(p);
                }}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            size={undefined}
            aria-disabled={isLastPage}
            className={isLastPage ? "pointer-events-none opacity-50" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (!isLastPage) onPageChanges(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
