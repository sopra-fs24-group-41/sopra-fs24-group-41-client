import React from "react";
import PropTypes from "prop-types"; 
import "../../styles/ui/Icon.scss";
import BaseContainer from "components/ui/BaseContainer";

const Icon = ({ onClick }) => {
  return (
    <BaseContainer className="icon-pos container">
      <button className="icon-button" onClick={onClick}>
        <svg
          width="70"
          height="90"
          viewBox="0 0 90 89"
          fill="grey"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="89"
            height="88"
            rx="29.5"
            fill="#454545"
          />
          <rect
            x="0.5"
            y="0.5"
            width="89"
            height="88"
            rx="29.5"
            stroke="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45 14.8333C28.4315 14.8333 15 28.1156 15 44.5C15 52.2842 18.0302 59.3699 22.995 64.665C23.1824 64.0517 23.4317 63.4493 23.7569 62.8743C24.8594 60.925 26.2502 59.1226 27.9003 57.5288C29.5564 55.9292 31.4248 54.5869 33.44 53.5263C30.3708 50.621 28.4519 46.5605 28.4519 42.0278C28.4519 33.071 35.9445 25.9583 45 25.9583C54.0555 25.9583 61.5481 33.071 61.5481 42.0278C61.5481 46.5605 59.6292 50.621 56.56 53.5263C58.5752 54.5869 60.4436 55.9292 62.0997 57.5288C63.7498 59.1226 65.1406 60.925 66.2431 62.8743C66.5683 63.4493 66.8176 64.0517 67.005 64.665C71.9698 59.3699 75 52.2842 75 44.5C75 28.1156 61.5685 14.8333 45 14.8333ZM59.7792 70.3236C59.9248 69.5829 59.9978 68.8876 60 68.2715C60.0036 67.2536 59.815 66.7027 59.6974 66.4947C58.9453 65.165 57.9938 63.9304 56.8592 62.8346C53.7287 59.811 49.4644 58.0972 45 58.0972C40.5356 58.0972 36.2713 59.811 33.1408 62.8346C32.0062 63.9304 31.0547 65.165 30.3026 66.4947C30.185 66.7027 29.9964 67.2536 30.0001 68.2715C30.0022 68.8876 30.0752 69.5829 30.2208 70.3236C34.5807 72.7697 39.6206 74.1667 45 74.1667C50.3794 74.1667 55.4193 72.7697 59.7792 70.3236ZM45 50.6806C50.081 50.6806 54.0481 46.7247 54.0481 42.0278C54.0481 37.3309 50.081 33.375 45 33.375C39.919 33.375 35.9519 37.3309 35.9519 42.0278C35.9519 46.7247 39.919 50.6806 45 50.6806ZM7.5 44.5C7.5 24.0194 24.2893 7.41667 45 7.41667C65.7107 7.41667 82.5 24.0194 82.5 44.5C82.5 57.6915 75.532 69.271 65.0549 75.8397C59.2527 79.4775 52.3693 81.5833 45 81.5833C37.6307 81.5833 30.7473 79.4775 24.9451 75.8397C14.468 69.271 7.5 57.6915 7.5 44.5Z"
            fill="#F5F5F5"
          />
        </svg>
      </button>
    </BaseContainer>
  );
};

Icon.propTypes = {
  onClick: PropTypes.func.isRequired, 
};

export default Icon;