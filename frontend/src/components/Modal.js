import React, { useEffect } from "react";

/**
 * Reusable Modal component which will close if 
 * you click outside the image or press ESC
 * @param {method} setSelectedImage 
 * @param {string} selectedImage 
 * 
 */
export const Modal = ({ setSelectedImage, selectedImage }) => {
  /**
   * Below function will close the modal
   * when we click on the black overlay/backdrop
   */
  const handleBackdropClick = e => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImage(null);
    }
  };

  /**
   * Below function will close the modal
   * when ESC key is pressed
   */
  useEffect(setSelectedImage => {
    const closeModal = e => {
      if (e.keyCode === 27) {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <img src={selectedImage} alt="Enlarged Popup" />
    </div>
  );
};
