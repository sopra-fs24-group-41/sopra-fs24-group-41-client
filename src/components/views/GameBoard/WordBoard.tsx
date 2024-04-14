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

const WordRow = ({ key, words }) => {
  return <div className="wordrow"> {words} </div>;
};

WordRow.propTypes = {
  key: PropTypes.string,
  words: PropTypes.node,
};

const WordBoard = () => {
  const [wordList, setWordList] = useState<String>([]);

  const addWord = (word: string) => {
    setWordList([...wordList, word]);
  };

  const createWordMatrix = () => {
    let result = [];
    let wordRow = [];
    for (let i = 0; i < wordList.length; i++) {
      if (i > 0 && i % 8 === 0) {
        result.push(<WordRow key={wordRow.toString()} words={wordRow}></WordRow>);
        wordRow = [];
      }
      wordRow.push(<Word key={wordList[i]} content={wordList[i]}></Word>);
    }
    result.push(<WordRow key={wordRow.toString()} words={wordRow}></WordRow>);

    console.log(result);
    return result;
  };

  return (
    <BaseContainer className="wordboard container">
      {createWordMatrix()}
    </BaseContainer>
  );
};

export default WordBoard;
