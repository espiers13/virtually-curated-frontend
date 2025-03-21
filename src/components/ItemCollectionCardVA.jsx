import { retrieveSingleVaObject } from "../api/api";
import { useState, useEffect } from "react";
import { defaultImg } from "../../public/imgs/images";
import Loading from "./Loading";
import { removeItemFromCollection } from "../api/api";
import {
  headerStyling,
  h2Styling,
  imageStyling,
  itemCardStyling,
  readMoreStyling,
  deleteButton,
  popupDelete,
  popupOverflow,
  popupPosition,
  popupBoxStyling,
  popupBoxSize,
  popupLayout,
  popupCancel,
} from "../styling/Styling";

function ItemCollectionCardVA({
  item,
  currentUser,
  collection_id,
  setCurrentCollection,
}) {
  const { user_id, password } = currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState({});
  const [popup, setPopup] = useState(false);
  const itemUrl = `/item/va/${item}`;
  let artist = "Artist Unknown";

  useEffect(() => {
    setIsLoading(true);
    retrieveSingleVaObject(item).then(
      (data) =>
        setCurrentItem({
          title:
            data.record.titles.length > 0
              ? data.record.titles[0].title
              : "No Title Available",
          image:
            data.record.images.length > 0
              ? `https://framemark.vam.ac.uk/collections/${data.record.images[0]}/full/220,/0/default.jpg`
              : defaultImg,
          artistOrg: data.record.artistMakerOrganisations
            ? data.record.artistMakerOrganisations[0]
            : null,
          artistGrp: data.record.artistMakerPeople
            ? data.record.artistMakerPeople[0]
            : null,
          artistPerson: data.record.artistMakerPerson
            ? data.record.artistMakerPerson[0]
            : null,
          productionDates: data.record.productionDates
            ? data.record.productionDates[0].date.text
            : "Date unknown",
        }),
      setIsLoading(false)
    );
  }, []);

  const handleDelete = (e) => {
    setIsLoading(true);
    removeItemFromCollection(user_id, password, collection_id, item).then(
      (data) => {
        setCurrentCollection(data);
        setIsLoading(false);
        window.location.assign(`/mycollection/${user_id}/${collection_id}`);
      }
    );
  };

  if (currentItem.artistOrg) {
    artist = currentItem.artistOrg.name.text;
  }
  if (currentItem.artistGrp) {
    artist = currentItem.artistGrp.name.text;
  }
  if (currentItem.artistPerson) {
    artist = currentItem.artistPerson.name.text;
  }

  return (
    <div>
      <div className={itemCardStyling}>
        {isLoading ? (
          <div className="place-content-center h-80">
            <Loading />
            <p className={headerStyling}>Loading...</p>
          </div>
        ) : (
          <div className="p-1 place-items-center">
            <a href={itemUrl}>
              {" "}
              <img
                className={imageStyling}
                src={currentItem.image}
                alt={currentItem.title}
              />
            </a>
            <h5 className={headerStyling}>{currentItem.title}</h5>
            <p className={h2Styling}>{artist}</p>
            <p className={h2Styling}>{currentItem.productionDates}</p>
            <p>
              <a href={itemUrl} className={readMoreStyling}>
                Read More
              </a>
            </p>
            <button className={deleteButton} onClick={() => setPopup(true)}>
              Delete from collection
            </button>{" "}
          </div>
        )}
      </div>

      {popup ? (
        <div className={popupOverflow}>
          <div className={popupPosition}>
            <div className={popupBoxStyling}>
              <div className={popupBoxSize}>
                <div className={popupLayout}>
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
                      Delete Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item from your
                        collection? This action cannot be undone.
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
    </div>
  );
}

export default ItemCollectionCardVA;
