import SearchBarWithDropdown from "../components/SearchBarWithDropdown";
import { vaSearch } from "../../public/imgs/images";

function SearchVA() {
  return (
    <main className="bg-pagebg h-screen mb-96">
      <img src={vaSearch} className="mb-5 mt-3 h-80 w-full object-cover" />
      <label htmlFor="default-search" className="text-white text-lg mt-4">
        EXPLORE THE COLLECTIONS FROM THE V&A...
      </label>
      <SearchBarWithDropdown />
    </main>
  );
}

export default SearchVA;
