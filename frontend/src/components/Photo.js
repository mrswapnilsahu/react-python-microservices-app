import { useState } from "react";

/**
 * Photo/Image component for displaying images
 * @param {object} item 
 * @param {method} setSelectedImage
 * 
 */
export const Photo = ({ item, setSelectedImage }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageClick = src => setSelectedImage(src);

  const changeLoadState = () => setIsLoading(false);

  return (
    <div className="image-card">
      <p className="image-title">{item.title}</p>
      <img
        src={item.src}
        alt={item.title}
        onLoad={changeLoadState}
        onClick={() => handleImageClick(item.src)}
      />
      {isLoading && <span className="spinner"></span>}
    </div>
  );
};
