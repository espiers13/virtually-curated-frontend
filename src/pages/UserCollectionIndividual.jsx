import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { retrieveCollection } from "../api/api";
import Loading from "../components/Loading";
import ItemCollectionCardVA from "../components/ItemCollectionCardVA";
import ItemCollectionCardArtic from "../components/ItemCollectionCardArtic";
import { deleteCollection } from "../api/api";
import { useNavigate } from "react-router";
import { popupDelete, popupCancel } from "../styling/Styling";

function UserCollectionIndividual({ currentUser }) {
  const { user_id, collection_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCollection, setCurrentCollection] = useState({});
  const [collectionArr, setCollectionArr] = useState([]);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const { password, username } = currentUser;

  useEffect(() => {
    setIsLoading(true);
    retrieveCollection(user_id, collection_id).then((data) => {
      setCurrentCollection(data);
      setCollectionArr(data.collection);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = (e) => {
    deleteCollection(user_id, password, collection_id).then((data) => {
      navigate(`/mycollections/${username}/${user_id}`);
    });
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex bg-homepage h-2 rounded-b-lg mb-5" />
        <Loading />{" "}
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-white text-2xl mt-5">
        {currentCollection.collection_name}
      </h1>

      {collectionArr.length > 0 ? (
        <p></p>
      ) : (
        <button
          onClick={() => {
            navigate("/");
          }}
          className=" text-white hover:underline mt-5 mb-5"
        >
          Start exploring the collections to add here!
        </button>
      )}
      <div className="collections_layout grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-5">
        {collectionArr.map((item) => {
          return (
            <div key={item}>
              {item[0] === "O" ? (
                <ItemCollectionCardVA
                  item={item}
                  currentUser={currentUser}
                  collection_id={collection_id}
                  setCurrentCollection={setCurrentCollection}
                />
              ) : (
                <ItemCollectionCardArtic
                  item={item}
                  currentUser={currentUser}
                  collection_id={collection_id}
                  setCurrentCollection={setCurrentCollection}
                />
              )}
            </div>
          );
        })}
      </div>
      <button
        className="w-1/2 text-white bg-red-500 hover:bg-red-400 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 transition delay-150 duration-300 ease-in-out hover:shadow-lg hover:scale-105"
        onClick={() => setPopup(true)}
      >
        Delete collection
      </button>
      {popup ? (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-brightness-50 ">
          <div className="flex min-h-full items-center place-content-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="">
                    <svg
                      className="size-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="modal-title"
                    >
                      Delete Collection
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this collection? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className={popupDelete}
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className={popupCancel}
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

export default UserCollectionIndividual;
