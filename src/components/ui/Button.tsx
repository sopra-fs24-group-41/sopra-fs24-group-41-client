import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "../../styles/ui/Button.scss";

export const Button = forwardRef((props, ref) => (
    <button
        {...props}
        ref={ref}
        style={{width: props.width, ...props.style}}
        className={`primary-button ${props.className}`}>
        {props.children}
    </button>
));

Button.displayName = "Button";


Button.propTypes = {
    width: PropTypes.string,
    style: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};