import ItemCardImages from "./ItemCardImages";
import { addToCollection } from "../api/api";
import { useState, useEffect } from "react";
import { retrieveUserCollections } from "../api/api";
import { createNewCollection } from "../api/api";
import Loading from "./Loading";
import {
  headerStyling,
  h2Styling,
  buttonStyling,
  inputStyling,
  tableStyling,
  titleStyling,
  dataStyling,
  itemPageStyling,
  oneImg,
} from "../styling/Styling";

function ItemPageCardArtic({ currentItem, item_id, currentUser }) {
  const {
    title,
    artist_title,
    date_display,
    department_title,
    medium_display,
    style_title,
    artwork_type_title,
    is_on_view,
    gallery_title,
    place_of_origin,
    provenance_text,
  } = currentItem;
  const [isLoading, setIsLoading] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [error, setError] = useState(false);
  const { user_id, password } = currentUser;
  const images = [
    `https://www.artic.edu/iiif/2/${currentItem.image_id}/full/265,/0/default.jpg`,
  ];
  let onView = "No";
  let style = style_title;

  if (is_on_view) {
    onView = "Yes";
  }

  if (!style_title) {
    style = "unknown";
  }

  if (user_id) {
    useEffect(() => {
      setIsLoading(true);
      retrieveUserCollections(user_id).then(
        (data) => setUserCollections(data),
        setIsLoading(false)
      );
    }, []);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addToCollection(user_id, password, selectedCollectionId, item_id).then(
      (data) => {
        setIsLoading(false);
        alert(`Item added to ${data.collection_name}`);
      }
    );
  };

  const handleCollection = (e) => {
    if (e.target.value === "New") {
      setPopup(true);
    } else {
      setSelectedCollectionId(e.target.value);
    }
  };

  const handleNewCollection = (e) => {
    e.preventDefault();
    createNewCollection(user_id, password, collectionName)
      .then((data) => {
        setIsLoading(true);
        addToCollection(user_id, password, data.collection_id, item_id).then(
          (data) => {
            setIsLoading(false);
            setPopup(false);
            alert(`Item added to ${data.collection_name}`);
          }
        );
      })
      .catch((err) => {
        setError(true);
      });
  };

  const handleCollectionName = (e) => {
    setCollectionName(e.target.value);
  };

  const lineStyling = "bg-white border-b border-gray-200";

  if (isLoading) {
    return (
      <main className="mt-5 p-5 w-84 h-84 place-content-center bg-white border border-gray-200 rounded-lg h-2/3">
        <div className="">
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main className="flex mt-5 p-5 w-full place-content-center">
      <div className={itemPageStyling}>
        <div>
          <ItemCardImages currentItemImages={images} imgStyle={oneImg} />
        </div>
        <h1 className={headerStyling}>{title}</h1>
        <h1 className={h2Styling}>{artist_title}</h1>
        <p className={h2Styling}>{department_title}</p>
        <div className="relative overflow-x-auto mb-4">
          <table className={tableStyling}>
            <tbody>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  DATE PRODUCED
                </th>
                <td className={dataStyling}>{date_display}</td>
              </tr>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  STYLE
                </th>
                <td className={dataStyling}>{style}</td>
              </tr>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  MEDIUM
                </th>
                <td className={dataStyling}>{medium_display}</td>
              </tr>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  ARTWORK TYPE
                </th>
                <td className={dataStyling}>{artwork_type_title}</td>
              </tr>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  PLACE OF ORIGIN
                </th>
                <td className={dataStyling}>{place_of_origin}</td>
              </tr>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  HISTORY
                </th>
                <td className={dataStyling}>{provenance_text}</td>
              </tr>
              <tr className={lineStyling}>
                <th scope="row" className={titleStyling}>
                  ON DISPLAY
                </th>
                <td className={dataStyling}>{onView}</td>
              </tr>
              {is_on_view ? (
                <tr className={lineStyling}>
                  <th scope="row" className={titleStyling}>
                    GALLERY
                  </th>
                  <td className={dataStyling}>{gallery_title}</td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>

        {user_id ? (
          <form className="max-w-sm mx-auto mb-5" onSubmit={handleSubmit}>
            <label
              htmlFor="countries"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Add item to my collection:
            </label>
            <select
              id="countries"
              defaultValue="Add to my collection"
              onChange={handleCollection}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pagebg focus:border-pagebg block w-full p-2.5"
            >
              <option value="Add to my collection">Select a collection</option>
              <option value="New">New collection</option>
              {userCollections.map((collection) => {
                return (
                  <option
                    value={collection.collection_id}
                    key={collection.collection_id}
                  >
                    {collection.collection_name}
                  </option>
                );
              })}
            </select>
            <button type="submit" className={buttonStyling}>
              Add to collection
            </button>
          </form>
        ) : (
          <></>
        )}
      </div>
      {popup ? (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-brightness-50 ">
          <div className="flex min-h-full items-center place-content-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3 mt-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>

                  <div>
                    <span className="font-medium">
                      Please input a name for your new collection:
                    </span>{" "}
                    <div>
                      <form onSubmit={handleNewCollection}>
                        <input
                          type="text"
                          name="collection_name"
                          id="collection_name"
                          className={inputStyling}
                          placeholder="My Collection"
                          required
                          aria-required="true"
                          onChange={handleCollectionName}
                        />
                        {error ? (
                          <p className="flex items-start mt-2 text-xs text-red-500 mb-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-1.5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Collection name already exists
                          </p>
                        ) : (
                          <div className="h-5 mt-2 mb-0.5"></div>
                        )}
                        <div className="px-4 py-3 sm:px-6 flex place-content-center">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-buttoncolor px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-hovercolor sm:w-auto mr-5"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => {
                              setPopup(false), setError(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

export default ItemPageCardArtic;
