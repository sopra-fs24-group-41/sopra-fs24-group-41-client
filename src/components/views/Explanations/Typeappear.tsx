import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "styles/views/Explanation.scss";

const Typeappear = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the appearance to give a typing illusion
    const delayTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust as needed

    return () => clearTimeout(delayTimeout);
  }, []);

  return (
    <div className={`explanation_appear ${isVisible ? 'fade-in' : ''}`}>
      {text}
    </div>
  );
};

Typeappear.propTypes = {
  text: PropTypes.string.isRequired
};

export default Typeappear;