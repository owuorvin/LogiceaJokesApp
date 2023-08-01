import React from 'react';

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (pageNumber: number) => void;
    children?: React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalItems, onPageChange, children }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div>
      {children}
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
