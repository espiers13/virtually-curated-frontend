import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";

function Nav({ currentUser, setCurrentUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const { user_id, username } = currentUser;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleHome = (e) => {
    navigate("/");
  };

  const handleSearchVa = (e) => {
    navigate("/search/va");
  };

  const handleSearchArtic = (e) => {
    navigate("/search/aioc");
  };

  const handleViewCollections = (e) => {
    navigate("/collections");
  };

  const handleMyCollections = (e) => {
    navigate(`/mycollections/${username}/${user_id}`);
  };

  const handleLogout = () => {
    setCurrentUser({});
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <button
        id="menu-button"
        aria-controls={open ? "menu-list" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="ml-5 rounded-2xl bg-buttoncolor hover:bg-actioncolor p-1 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:shadow-md"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ffffff"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <Menu
        id="menu-list"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <button onClick={handleHome} className="text-bgcolor">
            Home
          </button>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <button onClick={handleSearchVa} className="text-bgcolor">
            Search V&A Collections
          </button>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <button onClick={handleSearchArtic} className="text-bgcolor">
            Search Art Institute of Chicago Collections
          </button>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <button onClick={handleViewCollections} className="text-bgcolor">
            View All Collections
          </button>
        </MenuItem>
        {user_id ? (
          <div>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <button onClick={handleMyCollections} className="text-bgcolor">
                View My Collections
              </button>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <button onClick={handleLogout} className="text-bgcolor">
                Log out
              </button>
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <a href="/login" className="text-bgcolor">
              Login
            </a>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default Nav;
