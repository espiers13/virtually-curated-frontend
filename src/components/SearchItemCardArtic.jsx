import * as React from "react";
import {
  headerStyling,
  h2Styling,
  pStyling,
  imageStyling,
  itemCardStyling,
  readMoreStyling,
} from "../styling/Styling";
import { defaultImg } from "../../public/imgs/images";

function AIOCItemCard({ item, setDepartments, departments }) {
  const { id, title, date_display, department_title, artist_title, image_id } =
    item;
  const altTxt = item.thumbnail.alt_text;

  const itemLink = `/item/artic/${id}`;

  let thumbnail = `https://www.artic.edu/iiif/2/${image_id}/full/265,/0/default.jpg`;

  if (!image_id) {
    thumbnail = defaultImg;
  }

  return (
    <div className={itemCardStyling}>
      <a href={itemLink} className="place-items-center">
        <img className={imageStyling} src={thumbnail} alt={altTxt} />
      </a>
      <div className="p-2">
        <h5 className={headerStyling}>{title}</h5>

        <p className={h2Styling}>{artist_title}</p>
        <p className={h2Styling}>{date_display}</p>
        <p className={pStyling}>{department_title}</p>
        <p className="mt-2">
          <a href={itemLink} className={readMoreStyling}>
            Read more
          </a>
        </p>
      </div>
    </div>
  );
}

export default AIOCItemCard;
