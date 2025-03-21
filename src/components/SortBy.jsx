import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function SortBy({ setOrderBy, orderBy }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSelected, setIsSelected] = useState("");
  const isOpen = Boolean(anchorEl);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSortBy = (e) => {
    setIsSelected(e.target.innerHTML);
    if (e.target.innerHTML === "Date: Oldest to Newest") {
      setOrderBy({ order_by: "date", order_sort: "asc" });
    } else if (e.target.innerHTML === "Date: Newest to Oldest") {
      setOrderBy({ order_by: "date", order_sort: "desc" });
    } else if (e.target.innerHTML === "Artist: A-Z") {
      setOrderBy({ order_by: "artist", order_sort: "asc" });
    } else if (e.target.innerHTML === "Artist: Z-A") {
      setOrderBy({ order_by: "artist", order_sort: "desc" });
    }
  };

  return (
    <main className="flex flex-col items-center min-w-24">
      <div>
        <button
          id="menu-button"
          aria-controls={open ? "menu-list" : undefined}
          aria-haspopup="true"
          className="text-filterbox bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
        >
          Sort By
        </button>
        <Menu
          id="menu-list"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <button className="text-filterbox text-sm" onClick={handleSortBy}>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                {isSelected === "Date: Oldest to Newest" ? (
                  <svg
                    className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                ) : (
                  <></>
                )}
                <span>Date: Oldest to Newest</span>
              </li>
            </button>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <button className="text-filterbox text-sm" onClick={handleSortBy}>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                {isSelected === "Date: Newest to Oldest" ? (
                  <svg
                    className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                ) : (
                  <></>
                )}
                <span>Date: Newest to Oldest</span>
              </li>
            </button>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <button className="text-filterbox text-sm" onClick={handleSortBy}>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                {isSelected === "Artist: A-Z" ? (
                  <svg
                    className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                ) : (
                  <></>
                )}
                <span>Artist: A-Z</span>
              </li>
            </button>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <button className="text-filterbox text-sm" onClick={handleSortBy}>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                {isSelected === "Artist: Z-A" ? (
                  <svg
                    className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                ) : (
                  <></>
                )}
                <span>Artist: Z-A</span>
              </li>
            </button>
          </MenuItem>
        </Menu>
      </div>
    </main>
  );
}

export default SortBy;
