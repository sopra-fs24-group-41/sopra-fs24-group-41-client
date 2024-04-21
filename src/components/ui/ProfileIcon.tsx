import "../../styles/ui/ProfileIcon.scss";
import React, { useState, useEffect } from "react";
import ImageDropdown from "../popup-ui/ImageDropdown";
import IMAGES from "../../assets/images/index1.js"
import PropTypes from "prop-types";


const ProfileIcon = ({ Current, isEditing, SelectedImage }) => {
    const currValid = (Profile) =>{
        const Output = (Profile === "") ? "BlueFrog" : Profile;
        
        return Output;
    }

    useEffect(() => {
        setSelectedImage(IMAGES[currValid(Current)]);
    }, [Current]);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(IMAGES[currValid(Current)]);
    const [imageX, setImageX] = useState();
    
    useEffect(() => {
        SelectedImage(imageX);
    }, [imageX, SelectedImage]);


    const handleIconClick = () => {
        if (isEditing) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    
    const handleSelectImage = (image) => {
        setSelectedImage(IMAGES[image]);
        setImageX(image)
        setIsDropdownOpen(false); 

    };

    return (
        <div className="profile-icon">
            {isDropdownOpen && (
                <ImageDropdown images={IMAGES} onSelectImage={handleSelectImage}/>
            )}
            <img src={selectedImage} onClick={handleIconClick}/>
            
        </div>
    );
};

ProfileIcon.propTypes = {
    Current : PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    SelectedImage: PropTypes.func.isRequired
};

export default ProfileIcon;

