import SearchBarAIOC from "../components/SearchBarAIOC";
import { articSearch } from "../../public/imgs/images";

function SearchAIOC() {
  return (
    <main className="bg-pagebg h-screen mb-96">
      <img src={articSearch} className="mb-5 mt-3 h-80 w-full object-cover" />
      <label htmlFor="default-search" className="text-white text-lg mt-4">
        EXPLORE THE COLLECTIONS FROM ART INSTITUTE OF CHICAGO
      </label>
      <SearchBarAIOC />
    </main>
  );
}

export default SearchAIOC;
