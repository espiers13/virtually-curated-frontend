import { useState } from "react";

function ItemCardImages({ currentItemImages, imgStyle }) {
  const images = currentItemImages;

  return (
    <div className={imgStyle}>
      {images.map((image) => {
        return (
          <img
            key={image}
            src={image}
            className="max-w-full object-cover ml-0.5 mr-0.5"
          />
        );
      })}
    </div>
  );
}

export default ItemCardImages;
