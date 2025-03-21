import { retrieveAllCollections } from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SmallItemCard from "../components/SmallItemCard";
import FiltersAllCollections from "../components/FiltersAllCollections";
import ResultsPagination from "../components/ResultsPagination";
import { useSearchParams } from "react-router";
import { searchAllCollections } from "../api/api";

function ViewCollections() {
  const [isLoading, setIsLoading] = useState(false);
  const [vaResults, setVaResults] = useState([]);
  const [articResults, setArticResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vaPages, setVaPages] = useState(1);
  const [articPages, setArticPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [imageRequired, setImageRequired] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("query") || ""
  );

  const [currentGallery, setCurrentGallery] = useState(
    () => searchParams.get("gallery") || null
  );

  const va = [];
  const artic = [];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = searchQuery
      ? searchAllCollections(searchQuery, currentPage)
      : retrieveAllCollections(currentPage);

    fetchData.then((data) => {
      setVaResults(data[0].data.records);
      setVaPages(data[0].data.info.pages);
      setArticResults(data[1].data.data);
      setArticPages(data[1].data.pagination.total_pages);

      setSearchParams(
        (prevParams) => {
          const newParams = new URLSearchParams(prevParams);
          newParams.set("page", currentPage);
          if (currentGallery) newParams.set("gallery", currentGallery);
          else newParams.delete("gallery");
          if (searchQuery) newParams.set("query", searchQuery);
          else newParams.delete("query");
          return newParams;
        },
        { replace: true }
      );

      setIsLoading(false);
    });
  }, [currentPage, searchQuery]);

  let totalPages = 0;

  if (currentGallery === null) {
    vaResults.forEach((element) => {
      va.push({
        id: element.systemNumber,
        title: element._primaryTitle,
        date: element._primaryDate,
        artist: element._primaryMaker.name,
        image: element._primaryImageId,
        thumbnail: element._images._primary_thumbnail,
        api: "V&A",
      });
      totalPages = Math.max(vaPages || 1, articPages || 1);
    });

    articResults.forEach((element) => {
      artic.push({
        id: element.id,
        title: element.title,
        date: element.date_display,
        artist: element.artist_title,
        image: element.image_id,
        thumbnail: `https://www.artic.edu/iiif/2/${element.image_id}/full/400,/0/default.jpg`,
        api: "Art Institute of Chicago",
      });
    });
  }

  if (currentGallery === "va") {
    vaResults.forEach((element) => {
      va.push({
        id: element.systemNumber,
        title: element._primaryTitle,
        date: element._primaryDate,
        artist: element._primaryMaker.name,
        image: element._primaryImageId,
        thumbnail: element._images._primary_thumbnail,
        api: "V&A",
      });
    });
    totalPages = vaPages;
  }

  if (currentGallery === "artic") {
    articResults.forEach((element) => {
      artic.push({
        id: element.id,
        title: element.title,
        date: element.date_display,
        artist: element.artist_title,
        image: element.image_id,
        thumbnail: `https://www.artic.edu/iiif/2/${element.image_id}/full/400,/0/default.jpg`,
        api: "Art Institute of Chicago",
      });
    });
    totalPages = articPages;
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const allResults = va
    .concat(artic)
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="bg-pagebg h-screen">
      <h1 className="text-white text-2xl mt-5 mb-5">ALL COLLECTIONS</h1>
      <div className="results_layout grid grid-cols-4 mt-1 mr-10 ml-5">
        <div className="bg-filterbox rounded-lg p-3 h-full">
          <FiltersAllCollections
            setCurrentGallery={setCurrentGallery}
            currentGallery={currentGallery}
            setSearchParams={setSearchParams}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            searchQuery={searchQuery}
            setImageRequired={setImageRequired}
          />
        </div>
        {isLoading ? (
          <div className="mt-10 h-screen col-span-3">
            <Loading />
          </div>
        ) : (
          <div className="col-span-3">
            <div className="">
              <p className="text-white mb-2">
                Page {currentPage} of {totalPages}
              </p>
              <ResultsPagination
                pages={totalPages}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            </div>

            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mr-7 ml-5 mb-2">
              {allResults
                .filter((item) => {
                  const matchesImage = !imageRequired || !!item.image;

                  return matchesImage;
                })
                .map((item) => (
                  <SmallItemCard key={item.id} item={item} />
                ))}

              <div className="xl:col-span-4 md:col-span-3 sm:col-span-2 mt-2">
                <ResultsPagination
                  pages={totalPages}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ViewCollections;
