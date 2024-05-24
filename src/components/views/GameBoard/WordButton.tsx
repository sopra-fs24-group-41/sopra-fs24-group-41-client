import React, { forwardRef } from "react";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import "styles/ui/Button.scss";

const WordButton = forwardRef((props, ref) => {
    return (
        <Button {...props} ref={ref} className={`word ${props.className ?? ""}`}>
            {props.children}
        </Button>
    );
});

WordButton.displayName = "WordButton";

WordButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default WordButton;
