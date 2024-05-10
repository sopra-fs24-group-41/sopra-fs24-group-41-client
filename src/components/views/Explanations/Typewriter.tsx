import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "styles/views/Explanation.scss";

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayText((prevText) => {
                if (currentIndex < text.length) {
                    return prevText + text[currentIndex++];
                } else {
                    clearInterval(intervalId);
                    
                    return prevText;
                }
            });
        }, 10); // adjust the interval to control typing speed

        return () => clearInterval(intervalId); // cleanup on component unmount
    }, [text]);

    useEffect(() => {
        setDisplayText(""); // Reset displayText when text prop changes
    }, [text]);

    return <div className="explanation">{displayText}</div>;
};

Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Typewriter;
