import { defaultImg } from "../../public/imgs/images";
import {
  headerStyling,
  h2Styling,
  pStyling,
  imageStyling,
  itemCardStyling,
  readMoreStyling,
} from "../styling/Styling";

function SearchItemCardVA(item) {
  const currentItem = item.item;
  let thumbnail = defaultImg;
  const {
    _primaryTitle,
    _images,
    _currentLocation,
    _primaryDate,
    _primaryMaker,
    systemNumber,
  } = currentItem;
  const itemLink = `/item/va/${systemNumber}`;
  let title = _primaryTitle;
  let location = " ";
  let display = "Not on display";

  if (_currentLocation.onDisplay) {
    display = "On display";
  }

  if (Object.keys(_images).length > 0) {
    thumbnail = thumbnail = _images._primary_thumbnail;
  }
  if (_primaryTitle === "") {
    title = "No Title Available";
  }

  if (_currentLocation.site === "VA") {
    location = "V&A South Kensington";
  } else if (_currentLocation.site === "YVA") {
    location = "Young V&A";
  }

  return (
    <div className={itemCardStyling}>
      <a href={itemLink} className="place-items-center">
        <img className={imageStyling} src={thumbnail} alt={_primaryTitle} />
      </a>
      <div className="p-2 place-items-center">
        <h5 className={headerStyling}>{title}</h5>

        <p className={h2Styling}>{_primaryMaker.name}</p>
        <p className={h2Styling}>{_primaryDate}</p>
        <p className={pStyling}>{location}</p>
        <p className="mb-0.5 font-normal text-white text-xs italic bg-hovercolor">
          {display}
        </p>
        <p className="mt-2">
          <a href={itemLink} className={readMoreStyling}>
            Read more
          </a>
        </p>
      </div>
    </div>
  );
}

export default SearchItemCardVA;
