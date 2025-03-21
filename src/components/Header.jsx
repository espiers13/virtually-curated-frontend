import * as React from "react";
import Nav from "./Nav";

function Header({ currentUser, setCurrentUser }) {
  return (
    <header className="flex bg-hovercolor p-5 w-84 h-50">
      <div className="place-content-center">
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
      <div className="bg-hovercolor w-2/3 place-content-center" />
      <a
        href="/"
        className="text-white ml-10 bg-pagebg hover:bg-actioncolor p-2 w-48 transition delay-150 duration-300 ease-in-out hover:scale-115 hover:shadow-md"
      >
        VIRTUALLY CURATED
      </a>
    </header>
  );
}

export default Header;
