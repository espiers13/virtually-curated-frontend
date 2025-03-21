import { useState } from "react";

function Filters({
  setImgsOnly,
  setOnDisplay,
  setDate,
  collections,
  setFilterCollections,
  filterCollections,
}) {
  const [collectionsToggle, setCollectionsToggle] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [dateFrom, setDateFrom] = useState(-2000);
  const [dateTo, setDateTo] = useState(2025);

  const handleImgs = (e) => {
    setImgsOnly(e.target.checked);
  };
  const handleOnDisplay = (e) => {
    setOnDisplay(e.target.checked);
  };

  const handleCollections = (e) => {
    if (e.target.checked === true) {
      setFilterCollections([...filterCollections, e.target.value]);
    }
    if (e.target.checked === false) {
      setFilterCollections(
        filterCollections.filter(
          (filterCollections) => filterCollections !== e.target.value
        )
      );
    }
  };

  const handleDateFrom = (e) => {
    setDateFrom(e.target.value);
  };
  const handleDateTo = (e) => {
    setDateTo(e.target.value);
  };

  const handleDateSearch = (e) => {
    setDate({ from: dateFrom, to: dateTo });
  };

  const checkboxStyling =
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm";

  return (
    <main className="flex flex-col items-center min-w-24">
      <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
      <div className="flex items-center space-x-2 mb-2 mt-2">
        <span className="text-white sm:text-md">FILTERS </span>
        <svg
          className="w-6 h-6 text-white mt-0.5 sm:text-sm"
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
      </div>
      <div className="flex items-center mb-0.5 mt-1">
        <input
          id="imgs-checkbox"
          type="checkbox"
          value=""
          className={checkboxStyling}
          onChange={handleImgs}
        />
        <label
          htmlFor="imgs-checkbox"
          className="ms-2 text-sm font-medium text-white"
        >
          Has image
        </label>
      </div>
      <div className="flex items-center mb-1 mt-0.5">
        <input
          id="display-checkbox"
          type="checkbox"
          value=""
          className={checkboxStyling}
          onChange={handleOnDisplay}
        />
        <label
          htmlFor="display-checkbox"
          className="ms-2 text-sm font-medium text-white"
        >
          On display
        </label>
      </div>
      <hr className="bg-gray-500 border-0 clear-both w-5/6 h-0.5 m-1.5" />
      <div>
        <button
          className="text-sm px-5 py-2.5 text-center inline-flex items-center me-2 text-white"
          onClick={() => setCollectionsToggle(!collectionsToggle)}
        >
          Collections
          <svg
            className="w-4 h-4 ml-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
            />
          </svg>
        </button>
        {collectionsToggle ? (
          <div className="max-w-[325px] mb-2 pl-4 pr-4 rounded-lg bg-gray-100 border-2">
            {collections.map((collection) => {
              const id = collection.id;
              return (
                <div key={collection.id}>
                  <div className="flex items-center mb-1 mt-1">
                    <input
                      id="collections-checkbox"
                      type="checkbox"
                      value={id}
                      className={checkboxStyling}
                      onChange={handleCollections}
                    />
                    <label
                      htmlFor="collections-checkbox"
                      className="ms-2 text-xs font-medium text-filterbox"
                    >
                      {collection.value}
                    </label>
                  </div>
                  <hr className="bg-gray-300 border-0 clear-both w-full h-0.5" />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="bg-gray-500 border-0 clear-both w-5/6 h-0.5 m-1.5" />
      <div>
        <button
          className="text-sm px-5 py-2.5 text-center inline-flex items-center me-2 text-white"
          onClick={() => setDateToggle(!dateToggle)}
        >
          Date
          <svg
            className="w-4 h-4 ml-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
            />
          </svg>
        </button>
        {dateToggle ? (
          <div className="max-w-[325px] mb-2 pl-4 pr-4 rounded-lg bg-gray-100 border-2">
            <h2 className="ms-2 text-xs italic text-filterbox">
              Use a hyphen to indicate dates BC. For example -800 is 800 BC.
            </h2>
            <form className="max-w-sm mx-auto grid grid-cols-2 mt-2">
              <div>
                <label
                  htmlFor="number-input"
                  className="block mb-0.5 text-xs text-filterbox"
                >
                  From year
                </label>
                <input
                  type="number"
                  id="year-from"
                  name="year-from"
                  min="-2000"
                  max="2025"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-0.5 w-14"
                  placeholder="-800"
                  onChange={handleDateFrom}
                />
              </div>
              <div>
                <label
                  htmlFor="number-input"
                  className="block mb-0.5 text-xs text-filterbox"
                >
                  To year
                </label>
                <input
                  type="number"
                  id="year-to"
                  name="year-to"
                  min="-2000"
                  max="2025"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-0.5 w-14"
                  placeholder="2025"
                  onChange={handleDateTo}
                />
              </div>
              <button
                type="button"
                className="block mb-0.5 text-sm text-filterbox col-span-2 hover:underline"
                onClick={handleDateSearch}
              >
                Search
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="bg-gray-500 border-0 clear-both w-5/6 h-0.5 m-1.5" />
    </main>
  );
}

export default Filters;
