import React from "react";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import "styles/ui/Button.scss";

const WordButton = (props) => {
    return (
        <Button {...props} className={`word ${props.className ?? ""}`}>
            {props.children}
        </Button>
    );
};

WordButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default WordButton;
