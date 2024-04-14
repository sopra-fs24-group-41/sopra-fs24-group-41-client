import PropTypes from "prop-types";
import "../../styles/popup-ui/ImageDropdown.scss";
import React from "react";

const ImageDropdown = ({ images, onSelectImage }) => {
    return (
        <div className="image-dropdown-menu">
            {Object.keys(images).map((key) => (
                <img
                    key={key}
                    src={images[key]}
                    onClick={() => onSelectImage(key)}
                />
            ))}
        </div>
    );
};

ImageDropdown.propTypes = {
    images: PropTypes.object.isRequired,
    onSelectImage: PropTypes.func.isRequired,
};

export default ImageDropdown;
