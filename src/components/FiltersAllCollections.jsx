import { useState, useEffect } from "react";

function FiltersAllCollections({
  setCurrentGallery,
  currentGallery,
  setSearchParams,
  setSearchQuery,
  searchQuery,
  setCurrentPage,
  setImageRequired,
}) {
  const [keyword, setKeyword] = useState("");

  const handleGallery = (e) => {
    const newGallery = e.target.checked ? e.target.value : null;
    setCurrentGallery(newGallery);

    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (newGallery) {
          newParams.set("gallery", newGallery);
        } else {
          newParams.delete("gallery");
        }
        return newParams;
      },
      { replace: true }
    );
  };

  const handleImgs = (e) => {
    setImageRequired(e.target.checked);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(keyword);
    setCurrentPage(1);

    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (keyword) {
          newParams.set("query", keyword);
        } else {
          newParams.delete("query");
        }
        newParams.set("page", 1);
        return newParams;
      },
      { replace: true }
    );
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleReset = (e) => {
    setKeyword(null);
    setSearchQuery(null);
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-col items-center min-w-24 mb-5">
      <div className="bg-filterbox text-white w-full h-auto mb-2 p-4">
        <p className="place-content-center px-3 py-2 text-md font-medium text-center inline-flex items-center text-white">
          <svg
            className="w-6 h-6 me-2 mt-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
            />
          </svg>
          FILTERS
        </p>
        <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
        <div className="">
          <p className="ms-2 text-md font-medium underline mb-0.5">Gallery</p>
          <div className="va">
            <input
              id="imgs-checkbox"
              type="checkbox"
              value="va"
              onChange={handleGallery}
              checked={currentGallery === "va"}
              disabled={currentGallery === "artic"}
            />
            <label
              htmlFor="imgs-checkbox"
              className="ms-2 text-sm font-medium text-white"
            >
              V&A
            </label>
          </div>
          <div className="artic">
            <input
              id="imgs-checkbox"
              type="checkbox"
              value="artic"
              checked={currentGallery === "artic"}
              onChange={handleGallery}
              disabled={currentGallery === "va"}
            />
            <label
              htmlFor="imgs-checkbox"
              className="ms-2 text-sm font-medium text-white"
            >
              Art Institute of Chicago
            </label>
          </div>
        </div>
        <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
        <div className="flex items-center mb-0.5 mt-1">
          <input
            id="imgs-checkbox"
            type="checkbox"
            value=""
            onChange={handleImgs}
          />
          <label
            htmlFor="imgs-checkbox"
            className="ms-2 text-sm font-medium text-white"
          >
            Has image
          </label>
        </div>

        <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
        <p className="ms-2 text-md font-medium underline mb-2">
          Filter by Keyword
        </p>
        <form
          className="flex items-center max-w-sm mx-auto"
          onSubmit={handleSearch}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-actioncolor focus:border-actioncolor block w-full ps-10 p-2.5  "
              placeholder="KEYWORD..."
              required
              onChange={handleKeyword}
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-buttoncolor rounded-lg border border-buttoncolor hover:bg-hovercolor focus:ring-4 focus:outline-none focus:ring-actioncolor transition delay-10 duration-30 ease-in-out hover:shadow-lg"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        {searchQuery ? (
          <div>
            <p className="inline-flex items-center mt-3 bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {searchQuery}
              <button
                type="button"
                onClick={handleReset}
                className="hover:text-white"
              >
                <svg
                  className="h-5 w-5 text-gray-300 hover:text-gray-500 transition delay-10 duration-300 ease-in-out hover:shadow-lg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
    </main>
  );
}

export default FiltersAllCollections;
