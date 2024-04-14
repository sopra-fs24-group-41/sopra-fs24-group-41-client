import React, { useEffect, useState, useContext } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";
import Word from "./Word";
import { mergeWordListContext } from "./Game";

const WordMergeBar = () => {
  const { mergeWordList } = useContext(mergeWordListContext);

  return (
    <BaseContainer className="wordmergebar container">
      <Word key={1}>{mergeWordList[0]}</Word>
      <div className="wordmergebar symbol">+</div>
      <Word key={2}>{mergeWordList[1]}</Word>
      <div className="wordmergebar symbol">=</div>
      <Word key={3}>{mergeWordList[2]}</Word>
    </BaseContainer>
  );
};

export default WordMergeBar;
