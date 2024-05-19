import "../../styles/ui/ProfileIcon.scss";
import React, { useState, useEffect } from "react";
import ImageDropdown from "../popup-ui/ImageDropdown";
import IMAGES from "../../assets/images/index1.js";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import User from "models/User";

function filterImages(IMAGES, profilePictures) {
    return Object.keys(IMAGES)
        .filter((image) => profilePictures.includes(image))
        .reduce((obj, key) => {
            obj[key] = IMAGES[key];
            
            return obj;
        }, {});
}

function getProfilePictures(userAchievements) {
    let output = userAchievements.map(
        (achievement) => achievement.profilePicture
    );
    output.push("bluefrog");

    return output;
}

const ProfileIcon = ({ Current, isEditing, SelectedImage }) => {
    const [userAchievements, setUserAchievements] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(filteredImages[Current]);
    const [imageX, setImageX] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await api.get("/users/" + userId);
                const user = new User(response.data);
                setUserAchievements(user.achievements);
                setFilteredImages(
                    filterImages(IMAGES, getProfilePictures(userAchievements))
                );
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [filteredImages]);

    useEffect(() => {
        setSelectedImage(IMAGES[Current]);
    }, [Current]);

    useEffect(() => {
        SelectedImage(imageX);
    }, [imageX, SelectedImage]);

    const handleIconClick = () => {
        if (isEditing) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const handleSelectImage = (image) => {
        setSelectedImage(filteredImages[image]);
        setImageX(image);
        setIsDropdownOpen(false);
    };

    return (
        <div className="profile-icon">
            {isDropdownOpen && (
                <ImageDropdown
                    images={filteredImages}
                    onSelectImage={handleSelectImage}
                />
            )}
            <img src={selectedImage} onClick={handleIconClick} />
        </div>
    );
};

ProfileIcon.propTypes = {
    Current: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    SelectedImage: PropTypes.func.isRequired,
};

export default ProfileIcon;
