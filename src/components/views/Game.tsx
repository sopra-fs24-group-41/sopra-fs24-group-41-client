import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";

const WordMergeBar = () => {
  return <BaseContainer className="wordmergebar container"></BaseContainer>;
};

const WordBoard = () => {
  return <BaseContainer className="wordboard container">text</BaseContainer>;
};

const Game = () => {
  return (
    <BaseContainer className="game container">
      <WordMergeBar></WordMergeBar>
      <WordBoard></WordBoard>
    </BaseContainer>
  );
};

export default Game;
