import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onJumpToFirst,
  onJumpToLast,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 2,
  className = ""
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const totalNumbers = pageRangeDisplayed + marginPagesDisplayed * 2;
    
    if (totalPages <= totalNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBoundary = marginPagesDisplayed;
      const rightBoundary = totalPages - marginPagesDisplayed + 1;
      const leftRange = currentPage - Math.floor(pageRangeDisplayed / 2);
      const rightRange = currentPage + Math.floor(pageRangeDisplayed / 2);
      
      for (let i = 1; i <= Math.min(leftBoundary, totalPages); i++) {
        pages.push(i);
      }
      
      if (leftRange > leftBoundary + 1) {
        pages.push('...');
      }
      
      const startMiddle = Math.max(leftRange, leftBoundary + 1);
      const endMiddle = Math.min(rightRange, rightBoundary - 1);
      
      for (let i = startMiddle; i <= endMiddle; i++) {
        if (i > leftBoundary && i < rightBoundary) {
          pages.push(i);
        }
      }
      
      if (rightRange < rightBoundary - 1) {
        pages.push('...');
      }
      
      for (let i = Math.max(rightBoundary, leftBoundary + 1); i <= totalPages; i++) {
        pages.push(i);
      }
    }
    
    return [...new Set(pages)].sort((a, b) => {
      if (a === '...' || b === '...') return 0;
      return a - b;
    });
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleJumpToFirst = () => {
    if (onJumpToFirst) {
      onJumpToFirst();
    } else {
      onPageChange(1);
    }
  };

  const handleJumpToLast = () => {
    if (onJumpToLast) {
      onJumpToLast();
    } else {
      onPageChange(totalPages);
    }
  };

  // if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center gap-1 sm:gap-2 ${className} flex-wrap`}>
      {/* Jump to First */}
      <button
        onClick={handleJumpToFirst}
        disabled={currentPage === 1}
        className="hidden sm:flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="First Page"
      >
        <ChevronsLeft className="w-2 h-2 sm:w-3 sm:h-3" />
      </button>

      {/* Previous */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Previous Page"
      >
        <ChevronLeft className="w-2 h-2 sm:w-3 sm:h-3" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            className={`w-5 h-5 sm:w-7 sm:h-7 text-xs sm:text-sm flex items-center justify-center border rounded-md transition-colors ${
              page === currentPage
                ? 'bg-red-400 text-white border-red-400 hover:bg-red-500'
                : page === '...'
                ? 'border-transparent text-gray-500 cursor-default'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Next Page"
      >
        <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3" />
      </button>

      {/* Jump to Last */}
      <button
        onClick={handleJumpToLast}
        disabled={currentPage === totalPages}
        className="hidden sm:flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Last Page"
      >
        <ChevronsRight className="w-2 h-2 sm:w-3 sm:h-3" />
      </button>
    </div>
  );
};

export default Pagination;
