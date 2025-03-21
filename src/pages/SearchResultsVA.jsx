import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { searchCollections } from "../api/api";
import SearchItemCardVA from "../components/SearchItemCardVA";
import Filters from "../components/Filters";
import ResultsPagination from "../components/ResultsPagination";
import SearchBarWithDropdown from "../components/SearchBarWithDropdown";
import { useSearchParams } from "react-router";
import Loading from "../components/Loading";
import SortBy from "../components/SortBy";

function SearchResultsVA() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [pages, setPages] = useState(null);
  const [imgsOnly, setImgsOnly] = useState(false);
  const [onDisplay, setOnDisplay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState({});
  const [collections, setCollections] = useState([]);
  const [filterCollections, setFilterCollections] = useState([]);
  const [orderBy, setOrderBy] = useState({});

  const { search_query, category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    searchCollections(
      search_query,
      currentPage,
      category,
      postsPerPage,
      imgsOnly,
      onDisplay,
      date,
      filterCollections,
      orderBy
    ).then((data) => {
      setCollections(data.clusters.collection.terms);
      setSearchParams({ page: data.info.page, image: imgsOnly });
      setResults(data.records);
      setPages(data.info.pages);
      setCurrentPage(data.info.page);
      setIsLoading(false);
    });
  }, [imgsOnly, onDisplay, date, filterCollections, orderBy, currentPage]);

  const handleNext = (e) => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = (e) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="bg-pagebg h-screen">
      <SearchBarWithDropdown />
      <div>
        <h1 className="text-white text-2xl mt-5">
          RESULTS FOR: "{search_query}"
        </h1>
        <h2 className="text-white text-xl mt-5">
          Page {currentPage} of {pages}
        </h2>
        <div className="mt-2">
          <ResultsPagination
            postsPerPage={postsPerPage}
            pages={pages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
        <div className="results_layout grid grid-cols-4 mt-1">
          <div className="bg-filterbox rounded-lg p-3 h-full">
            <SortBy setOrderBy={setOrderBy} orderBy={orderBy} />
            <Filters
              setImgsOnly={setImgsOnly}
              setOnDisplay={setOnDisplay}
              setDate={setDate}
              date={date}
              collections={collections}
              setFilterCollections={setFilterCollections}
              filterCollections={filterCollections}
            />
          </div>
          {isLoading ? (
            <div className="col-span-2">
              <Loading />
            </div>
          ) : (
            <div className="col-span-3">
              {results.length === 0 ? (
                <h3 className="text-white text-xl mt-5">No results found</h3>
              ) : (
                <div className="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                  {results.map((item) => {
                    return (
                      <SearchItemCardVA key={item.systemNumber} item={item} />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-2 xl:col-span-3 md:col-span-2 sm:col-span-1">
          <ResultsPagination
            postsPerPage={postsPerPage}
            pages={pages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      </div>
    </main>
  );
}

export default SearchResultsVA;
