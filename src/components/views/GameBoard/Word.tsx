import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";

const Word = ({ key, content }) => {
  return <div className="word">{content}</div>;
};

Word.propTypes = {
  key: PropTypes.string,
  content: PropTypes.string,
};

export default Word;
