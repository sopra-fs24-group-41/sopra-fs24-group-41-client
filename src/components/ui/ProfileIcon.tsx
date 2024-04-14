import "../../styles/ui/ProfileIcon.scss";
import React, { useState } from "react";
import ImageDropdown from "../popup-ui/ImageDropdown";
import IMAGES from "../../assets/images/index1.js"

const ProfileIcon = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(IMAGES.BlueFrog);
    const handleIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectImage = (image) => {
        setSelectedImage(IMAGES[image]);
        setIsDropdownOpen(false);
    };

    return (
        <div className="profile-icon">
            {isDropdownOpen && (
                <ImageDropdown images={IMAGES} onSelectImage={handleSelectImage} />
            )}
            <img src={selectedImage} onClick={handleIconClick} />
        </div>
    );
};

export default ProfileIcon;
