import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";
import Word from "./Word";

const WordMergeBar = () => {
  const [firstWord, setFirstWord] = useState<String>("");
  const [secondWord, setSecondWord] = useState<String>("");
  const [targetWord, setTargetWord] = useState<String>("");

  return (
    <BaseContainer className="wordmergebar container">
      <Word key={1} content={firstWord}></Word>
      <div className="wordmergebar symbol">+</div>
      <Word key={2} content={secondWord}></Word>
      <div className="wordmergebar symbol">=</div>
      <Word key={3} content={targetWord}></Word>
    </BaseContainer>
  );
};

export default WordMergeBar;
