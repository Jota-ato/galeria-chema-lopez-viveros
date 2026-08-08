"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

interface CustomPaginationProps {
  limit: number;
  page: number;
  total: number;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageNumbers(
  current: number,
  totalPages: number,
  siblingCount = 1,
): (number | "ellipsis")[] {
  const totalVisible = siblingCount * 2 + 5;

  if (totalVisible >= totalPages) return range(1, totalPages);

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + siblingCount * 2), "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [
      1,
      "ellipsis",
      ...range(totalPages - (2 + siblingCount * 2), totalPages),
    ];
  }

  return [
    1,
    "ellipsis",
    ...range(leftSibling, rightSibling),
    "ellipsis",
    totalPages,
  ];
}

export function CustomPagination({
  limit,
  page,
  total,
}: CustomPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const buildHref = (targetPage: number) => {
    console.log(Math.min(page + 1, totalPages));
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    return `${pathname}?${params.toString()}`;
  };

  const pages = getPageNumbers(page, totalPages);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="Anterior"
            href={buildHref(Math.max(+page - 1, 1))}
            aria-disabled={isFirst}
            className={isFirst ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={buildHref(p)} isActive={p === Number(page)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            text="Siguiente"
            href={buildHref(Math.min(+page + 1, totalPages))}
            aria-disabled={isLast}
            className={isLast ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
