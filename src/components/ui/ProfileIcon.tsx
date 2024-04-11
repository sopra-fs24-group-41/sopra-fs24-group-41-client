import "../../styles/ui/ProfileIcon.scss";
import React, { useState } from "react";
import ImageDropdown from "../popup-ui/ImageDropdown";

const ProfileIcon = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("/images/BlueFrog.jpg");
    const images = ["BlueFrog.jpg", "PinkBunny.jpg", "RedSquid.jpg"];
    const handleIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectImage = (image) => {
        setSelectedImage(`/images/${image}`);
        setIsDropdownOpen(false);
    };

    return (
        <div className="profile-icon">
            {isDropdownOpen && (
                <ImageDropdown images={images} onSelectImage={handleSelectImage} />
            )}
            <img src={selectedImage} onClick={handleIconClick} />
        </div>
    );
};

export default ProfileIcon;
