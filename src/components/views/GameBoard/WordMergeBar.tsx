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

  const formatWord = (word: string, placeholder: string) => {
    if (word !== null && word !== undefined && word !== "")
      return word;
    return placeholder.repeat(10);
  }

  return (
    <BaseContainer className="wordmergebar container">
      <Word key={1}>{formatWord(mergeWordList[0], "-")}</Word>
      <div className="wordmergebar symbol">+</div>
      <Word key={2}>{formatWord(mergeWordList[1], "-")}</Word>
      <div className="wordmergebar symbol">=</div>
      <Word key={3}>{formatWord(mergeWordList[2], "?")}</Word>
    </BaseContainer>
  );
};

export default WordMergeBar;
