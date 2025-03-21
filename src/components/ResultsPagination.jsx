import React from "react";

function ResultsPagination({ handleNext, handlePrevious }) {
  return (
    <nav className="inline-flex -space-x-px text-sm mb-5">
      <button
        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        href="#"
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
        onClick={handleNext}
      >
        Next
      </button>
    </nav>
  );
}

export default ResultsPagination;
