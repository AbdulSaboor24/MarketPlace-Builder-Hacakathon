interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm bg-gray-300 rounded-md disabled:opacity-50"
      >
        Prev
      </button>
      <span className="mx-4 text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm bg-gray-300 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;