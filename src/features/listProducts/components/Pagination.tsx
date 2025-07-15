import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage <= 4) {
      for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push("ellipsis");
      }
    } else if (currentPage >= totalPages - 3) {
      pages.push("ellipsis");
      for (let i = Math.max(totalPages - 4, 2); i <= totalPages - 1; i++) {
        pages.push(i);
      }
    } else {
      pages.push("ellipsis");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const baseButtonClass =
    "flex items-center justify-center w-10 h-10 rounded-lg border transition-colors text-sm font-medium " +
    "hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={baseButtonClass}
        aria-label="Primeira página"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={baseButtonClass}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {generatePageNumbers().map((page, index) =>
        page === "ellipsis" ? (
          <div
            key={`ellipsis-${index}`}
            className="flex items-center justify-center w-10 h-10"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`${baseButtonClass} ${
              currentPage === page
                ? "text-white bg-blue-600 border-blue-600 hover:bg-blue-700"
                : "border-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={baseButtonClass}
        aria-label="Próxima página"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={baseButtonClass}
        aria-label="Última página"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
