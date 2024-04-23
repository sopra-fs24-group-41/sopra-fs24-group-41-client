import React, { useEffect, useState } from "react";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import "styles/ui/Button.scss";

const WordButton = (props) => {
    return (
        <Button {...props} className="word">
            {props.children}
        </Button>
    );
};

WordButton.propTypes = {
    children: PropTypes.node,
};

export default WordButton;
