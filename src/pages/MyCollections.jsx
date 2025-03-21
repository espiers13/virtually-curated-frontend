import { useEffect, useState } from "react";
import { retrieveUserCollections } from "../api/api";
import Loading from "../components/Loading";
import UserCollectionCard from "../components/UserCollectionCard";
import { useNavigate } from "react-router";
import { createNewCollection } from "../api/api";
import { newCollection } from "../../public/imgs/images";

function MyCollections({ currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userCollections, setUserCollctions] = useState([]);
  const [collectionsError, setCollectionsError] = useState("");
  const [popup, setPopup] = useState(false);
  const [collectionName, setCollectionName] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { username, user_id, password, name } = currentUser;

  const handleNewCollection = (e) => {
    setPopup(true);
  };

  const handleCollectionName = (e) => {
    setCollectionName(e.target.value);
  };

  const confirmNewCollection = (e) => {
    createNewCollection(user_id, password, collectionName)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setError(err.response.status);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    retrieveUserCollections(user_id)
      .then((data) => {
        setUserCollctions(data);
        setIsLoading(false);
      })
      .catch(
        (err) =>
          err.response.status === 500
            ? navigate("/login")
            : setCollectionsError(err.response.data.msg),
        setIsLoading(false)
      );
  }, []);

  return (
    <main className="bg-pagebg h-screen mb-96">
      <h1 className="text-white text-xl mt-5">WELCOME {name}</h1>
      <h1 className="text-white text-2xl mt-5 mb-5">MY COLLECTIONS</h1>
      {collectionsError ? (
        <div>
          <p className="text-slate-300 text-xl mt-5">{collectionsError}</p>
          <div className="flex mt-5 place-content-center">
            <button
              className="bg-white border rounded-lg place-content-center p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              onClick={handleNewCollection}
            >
              <img
                className="rounded-lg shadow-sm w-60 h-60 object-contain place-self-center"
                src={newCollection}
                alt="New collection"
              />
              <h1 className="text-xl mt-3">Create a new collection</h1>
            </button>
          </div>
          <p className="text-white text-lg mt-3">
            OR click{" "}
            <button className="hover:underline" onClick={() => navigate("/")}>
              here
            </button>{" "}
            to start exploring artworks!
          </p>
        </div>
      ) : (
        <p></p>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-3 mr-5 ml-5">
          {userCollections.map((collection) => {
            return (
              <UserCollectionCard
                key={collection.collection_id}
                collection={collection}
              />
            );
          })}
          <div className="flex">
            <button
              className="bg-white border rounded-lg place-content-center p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
              onClick={handleNewCollection}
            >
              <img
                className="rounded-lg shadow-sm w-60 h-60 object-contain place-self-center"
                src={newCollection}
                alt="New collection"
              />
              <h1 className="text-xl mt-3">Create a new collection</h1>
            </button>
          </div>
        </div>
      )}

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
                      <input
                        type="name"
                        name="collection_name"
                        id="collection_name"
                        className="bg-gray-50 border border-hovercolor text-pagebg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-3"
                        placeholder="My Collection"
                        required
                        onChange={handleCollectionName}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {error === 409 ? (
                <div className="ml-14">
                  <p className="text-sm text-red-700">
                    Collection title already exists
                  </p>
                </div>
              ) : (
                <div className="h-5"></div>
              )}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex place-content-center">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-buttoncolor px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-hovercolor sm:ml-3 sm:w-auto mr-5"
                  onClick={confirmNewCollection}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setPopup(false)}
                >
                  Cancel
                </button>
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

export default MyCollections;
