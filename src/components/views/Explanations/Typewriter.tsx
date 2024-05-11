import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "styles/views/Explanation.scss";

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState(" ");

    useEffect(() => {
        // Each time text changes, previous should be discarded
        setDisplayText(" ");

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayText((prevText) => {
                if (currentIndex < text.length) {
                    return prevText + text[currentIndex++]; //Increment by character
                } else {
                    clearInterval(intervalId);

                    return prevText;
                }
            });
        }, 10); //Adjust type speed here

        return () => clearInterval(intervalId); 
    }, [text]);

    return <div className="explanation">{displayText}</div>;
};

Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Typewriter;