"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { CaretRight } from "./icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function TablePagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activePage = parseInt(searchParams.get("page") || "1", 10);

  const createPageString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      return params.toString();
    },
    [searchParams]
  );

  function handlePageChange(page: number) {
    router.push(pathname + "?" + createPageString(page));
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, activePage - halfMaxPagesToShow);
    let endPage = Math.min(totalPages, activePage + halfMaxPagesToShow);

    if (activePage - halfMaxPagesToShow <= 0) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }

    if (activePage + halfMaxPagesToShow > totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex justify-between mt-4 w-full">
        <PaginationItem>
          <Button
            disabled={activePage === 1}
            className="py-5 font-bold bg-lightBeige text-gray-900 hover:bg-white  border-2 border-transparent hover:border-black"
            onClick={() => handlePageChange(activePage - 1)}
          >
            <CaretRight className="rotate-180" />
            Prev
          </Button>
        </PaginationItem>

        <div className="flex items-center gap-2">
          {activePage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)} href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              {activePage > 4 && <PaginationEllipsis />}
            </>
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={activePage === page}
                href="#"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > activePage + 2 && (
            <>
              {activePage < totalPages - 3 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(totalPages)}
                  href="#"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </div>

        <PaginationItem>
          <Button
            disabled={activePage >= totalPages}
            className="py-5 font-bold bg-lightBeige text-gray-900 hover:bg-white  border-2 border-transparent hover:border-black"
            onClick={() => handlePageChange(activePage + 1)}
          >
            Next
            <CaretRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TablePagination;
