import PropTypes from "prop-types";
import "../../styles/ui/ProfileIcon.scss";
import React, { useState } from "react";

const ImageDropdownMenu = ({ images, onSelectImage }) => {
  return (
    <div className="image-dropdown-menu">
      {images.map((image, index) => (
        <img
          key={index}
          src={`/images/${image}`}
          onClick={() => onSelectImage(image)}
        />
      ))}
    </div>
  );
};

ImageDropdownMenu.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectImage: PropTypes.func.isRequired,
};

const ProfileIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("/images/BlueFrog.jpg");

  const images = ["BlueFrog.jpg", "PinkBunny.jpg", "RedSquid.jpg"]; 

  const handleIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectImage = (image) => {
    // Changes the resouce location based on the names in images array above.
    setSelectedImage(`/images/${image}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className="profile-icon">
      {isDropdownOpen && (
        <ImageDropdownMenu images={images} onSelectImage={handleSelectImage} />
      )}
      <img src={selectedImage} onClick={handleIconClick} />
    </div>
  );
};

export default ProfileIcon;