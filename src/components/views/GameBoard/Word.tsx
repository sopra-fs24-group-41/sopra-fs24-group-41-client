import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import "styles/ui/Button.scss";
import { User } from "types";

const Word = props => {
  return <Button {...props} className="word">{props.children}</Button>;
};

Word.propTypes = {
    children: PropTypes.node,
};

export default Word;
