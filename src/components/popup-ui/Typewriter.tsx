import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "styles/popup-ui/Typewriter.scss";

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState(" ");


    useEffect(() => {
        let currentIndex = 0;
        let deleting = false;
        if(text.trim() === "") {deleting = true}

        const timeframe = setInterval(() => {
            setDisplayText((prevText) => {
                if (deleting) {
                    if (prevText.length > 0) {
                        return prevText.slice(0, -1); // Delete one character
                    } else {
                        clearInterval(timeframe);
                        deleting = false;

                        return " ";
                    }
                } else {
                    if (currentIndex < text.length) {
                        return prevText + text[currentIndex++]; // Increment by character
                    } else {
                        clearInterval(timeframe);
                        deleting = true;

                        return prevText;
                    }
                }
            });
        }, 10); // 10ms interval per character

        return () => clearInterval(timeframe);
    }, [text]);

    return <div className="explanation">{displayText}</div>;
};

Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Typewriter;