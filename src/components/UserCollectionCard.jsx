import { useEffect, useState } from "react";
import { retrieveSingleVaObject, retrieveSingleArticObject } from "../api/api";
import { defaultImg } from "../../public/imgs/images";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UserCollectionCard(currentCollection) {
  const { user_id } = useParams();
  const { collection_id, collection_name, collection } =
    currentCollection.collection;
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(defaultImg);
  const [altText, setAltText] = useState("");
  const collectionPage = `/mycollection/${user_id}/${collection_id}`;
  const navigate = useNavigate();

  if (collection.length > 0 && collection[0][0] === "O") {
    useEffect(() => {
      setIsLoading(true);
      retrieveSingleVaObject(collection[0]).then((data) => {
        if (data.record.images[0]) {
          setThumbnail(
            `https://framemark.vam.ac.uk/collections/${data.record.images[0]}/full/220,/0/default.jpg`
          );
          setAltText(data.record.briefDescription);
        }

        setIsLoading(false);
      });
    }, []);
  }
  if (collection.length > 0 && collection[0][0] !== "O") {
    useEffect(() => {
      setIsLoading(true);
      retrieveSingleArticObject(collection[0]).then((data) => {
        if (data.data.image_id) {
          setThumbnail(
            `https://www.artic.edu/iiif/2/${data.data.image_id}/full/265,/0/default.jpg`
          );
          setAltText(data.data.title);
        }
        setIsLoading(false);
      });
    }, []);
  }

  const handleClick = (e) => {
    navigate(collectionPage);
  };

  return (
    <main className="flex">
      <button
        className="bg-white border rounded-lg place-content-center p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
        onClick={handleClick}
      >
        <img
          className="rounded-lg shadow-sm w-60 h-60 object-cover place-self-center"
          src={thumbnail}
          alt={altText}
        />
        <h1 className="text-xl mt-3">{collection_name}</h1>
      </button>
    </main>
  );
}

export default UserCollectionCard;
