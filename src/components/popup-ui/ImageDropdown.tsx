import PropTypes from "prop-types";
import "../../styles/popup-ui/ImageDropdown.scss";
import React from "react";

const ImageDropdown = ({ images, onSelectImage }) => {
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

ImageDropdown.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectImage: PropTypes.func.isRequired,
};

export default ImageDropdown;
