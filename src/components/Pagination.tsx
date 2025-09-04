import React from 'react';
import { usePagination } from '@/hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav>
      <ul className="flex justify-center items-center my-8 space-x-2 flex-wrap">
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-[#333333] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            Anterior
          </button>
        </li>
        
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return <li key={index} className="px-4 py-2 text-gray-400">...</li>;
          }

          return (
            <li key={index}>
              <button
                onClick={() => onPageChange(pageNumber as number)}
                className={`px-4 py-2 rounded-lg transition duration-200 ${
                  currentPage === pageNumber
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-[#333333] text-white hover:bg-blue-600'
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={onNext}
            disabled={currentPage === lastPage}
            className="px-4 py-2 rounded-lg bg-[#333333] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            Próxima
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;