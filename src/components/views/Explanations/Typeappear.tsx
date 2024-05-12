import React from "react";
import PropTypes from "prop-types";
import "styles/views/Explanation.scss";

const Typeappear = ({ text }) => {
    return (
        <div className="explanation_appear" key={text}>
            {text}
        </div>
    );
};

Typeappear.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Typeappear;
