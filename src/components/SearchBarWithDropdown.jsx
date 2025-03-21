import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function SearchBarWithDropdown() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState("SEARCH BY...");
  const [searchCategory, setSearchCategory] = useState("all");
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value.toUpperCase());
    setSearchCategory(e.target.value);
    setAnchorEl(null);
  };

  const onTextChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.assign(`/search/va/${searchCategory}/${searchQuery}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-2/3 mx-auto flex items-stretch ... justify-center">
        <div>
          <button
            id="menu-button"
            aria-controls={open ? "menu-list" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            type="button"
            className="w-40 inline-flex items-center p-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 mt-3 mb-3 basis-64"
          >
            {category}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <Menu
            id="menu-list"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>
              <button onClick={handleCategory} value="title">
                Title
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={handleCategory} value="type">
                Type
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={handleCategory} value="place">
                Place
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={handleCategory} value="materialtechnique">
                Material/Technique
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={handleCategory} value="person">
                Person
              </button>
            </MenuItem>
          </Menu>
        </div>

        <div className="relative mt-3 mb-3 basis-80">
          <input
            type="search"
            id="default-search"
            className="p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 "
            placeholder="SEARCH..."
            onChange={onTextChange}
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-4 text-sm font-medium h-full
        text-white bg-buttoncolor rounded-e-lg border border-s-grey-50 hover:bg-hovercolor"
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
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBarWithDropdown;
