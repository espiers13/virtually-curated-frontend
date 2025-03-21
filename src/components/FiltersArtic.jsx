function FiltersArtic({
  departments,
  setCurrentDepartment,
  currentDepartment,
  setrequireImage,
}) {
  const handleDepartment = (e) => {
    const newDepartment = e.target.checked ? e.target.value : null;
    setCurrentDepartment(newDepartment);
  };

  const handleImgs = (e) => {
    setrequireImage(e.target.checked);
  };

  const checkboxStyling =
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm";

  return (
    <main className="flex flex-col items-center min-w-24">
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
      <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
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
      <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
      <p className="text-sm text-white">Department</p>
      {departments.map((department, index) => {
        return (
          <div key={index}>
            <div className="flex items-center mb-2 mt-1.5 w-40">
              <input
                id="collections-checkbox"
                type="checkbox"
                value={department}
                className={checkboxStyling}
                onChange={handleDepartment}
                checked={department === currentDepartment}
                disabled={
                  currentDepartment !== null && currentDepartment !== department
                }
              />
              <label
                htmlFor="collections-checkbox"
                className="ms-1 text-xs font-medium text-white line-clamp-1"
              >
                {department}
              </label>
            </div>
            <hr className="bg-gray-300 border-0 clear-both w-full h-0.5" />
          </div>
        );
      })}
      <hr className="bg-gray-500 border-0 clear-both w-full h-0.5 m-1.5" />
    </main>
  );
}

export default FiltersArtic;
