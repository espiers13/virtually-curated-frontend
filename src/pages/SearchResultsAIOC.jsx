import { searchArtic } from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchItemCardArtic from "../components/SearchItemCardArtic";
import ResultsPagination from "../components/ResultsPagination";
import { useSearchParams } from "react-router";
import Loading from "../components/Loading";
import SearchBarAIOC from "../components/SearchBarAIOC";
import FiltersArtic from "../components/FiltersArtic";
import { retrieveSingleArticObject } from "../api/api";

function SearchResultsAIOC() {
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collectionsData, setCollectionsData] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [selectedArtist, setselectedArtist] = useState("");
  const [requireImage, setrequireImage] = useState(false);

  const { search_query, category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    searchArtic(search_query, currentPage, postsPerPage).then((data) => {
      setResults(data.data);
      setPagination(data.pagination);
      setCurrentPage(data.pagination.current_page);
      setSearchParams({ page: data.pagination.current_page });
      const fetchCollectionsData = async () => {
        const newCollections = await Promise.all(
          data.data.map(async (item) => {
            const objectData = await retrieveSingleArticObject(item.id);
            return objectData;
          })
        );
        setCollectionsData(newCollections);
      };

      fetchCollectionsData();

      setIsLoading(false);
    });
  }, [currentPage, search_query, postsPerPage]);

  const handleNext = (e) => {
    if (currentPage < pagination.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = (e) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const departments = [];
  collectionsData.forEach(({ data }) => {
    if (!departments.includes(data.department_title)) {
      departments.push(data.department_title);
    }
  });

  return (
    <main className="bg-pagebg h-screen">
      <SearchBarAIOC />
      <div>
        <h1 className="text-white text-2xl mt-5">
          RESULTS FOR: "{search_query}"
        </h1>
        <h2 className="text-white text-xl mt-3 mb-3">
          Page {currentPage} of {pagination.total_pages}
        </h2>
        <div className="mt-2">
          <ResultsPagination
            postsPerPage={pagination.limit}
            pages={pagination.total_pages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
        <div className="results_layout grid grid-cols-4 mt-1 mr-10 ml-5">
          <div className="bg-filterbox rounded-lg p-3 h-full">
            <FiltersArtic
              departments={departments}
              setCurrentDepartment={setCurrentDepartment}
              currentDepartment={currentDepartment}
              setrequireImage={setrequireImage}
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
                <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  {collectionsData
                    .filter(({ data }) => {
                      const matchesDepartment =
                        !currentDepartment ||
                        data.department_title === currentDepartment;
                      const matchesImage = !requireImage || !!data.image_id;

                      return matchesDepartment && matchesImage;
                    })
                    .map(({ data }) => (
                      <SearchItemCardArtic key={data.id} item={data} />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
        <ResultsPagination
          postsPerPage={pagination.limit}
          pages={pagination.total_pages}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </div>
    </main>
  );
}

export default SearchResultsAIOC;
