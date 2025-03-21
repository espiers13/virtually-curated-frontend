import {
  headerStyling,
  h2Styling,
  pStyling,
  imageStyling,
  itemCardStyling,
  readMoreStyling,
} from "../styling/Styling";
import { defaultImg } from "../../public/imgs/images";

function SmallItemCard(item) {
  const { api, artist, date, id, thumbnail, title, image } = item.item;

  let newTitle = "";
  if (title === "") {
    newTitle = "N/A";
  } else newTitle = title;

  let url = "artic";

  if (api === "V&A") {
    url = "va";
  }

  let thumbnailURL = defaultImg;
  if (thumbnail) {
    thumbnailURL = thumbnail;
  }
  if (!image) {
    thumbnailURL = defaultImg;
  }
  const itemLink = `/item/${url}/${id}`;

  return (
    <div className={itemCardStyling}>
      <a href={itemLink} className="place-items-center">
        <img
          className="rounded-md mt-3 bg-buttoncolor xl-p-2 md-p-2 sm-p-0 h-48 object-cover transition delay-150 duration-300 ease-in-out hover:shadow-lg"
          src={thumbnailURL}
        />
      </a>

      <h1 className={headerStyling}>{newTitle}</h1>
      <p className={h2Styling}>{artist}</p>
      <p className={h2Styling}>{date}</p>
      <p className={pStyling}>{api}</p>
      <p className="mt-2">
        <a href={itemLink} className={readMoreStyling}>
          Read more
        </a>
      </p>
    </div>
  );
}

export default SmallItemCard;
