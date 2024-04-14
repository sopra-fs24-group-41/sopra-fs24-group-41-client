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
import { nextWordIndexContext, mergeWordListContext } from "./Game";

const WordRow = ({ key, words }) => {
  return <div className="wordrow"> {words} </div>;
};

WordRow.propTypes = {
  key: PropTypes.string,
  words: PropTypes.node,
};

const WordBoard = () => {
  const { nextWordIndex, setNextWordIndex } = useContext(nextWordIndexContext);
  const { mergeWordList, setMergeWordList } = useContext(mergeWordListContext);

  const [wordList, setWordList] = useState<String>([
    "Water",
    "Fire",
    "Earth",
    "Wind",
  ]);

  const addWordToWordBoard = (word: string) => {
    setWordList([...wordList, word]);
  };

  const getMergeResult = (word1: string, word2: string) => {
    return word1 + word2;
  };

  const addWordToMerge = (word: string) => {
    let newWordIndex = nextWordIndex;
    let newWordList = mergeWordList;

    if (newWordIndex === 2) {
      newWordList = ["", "", ""];
      newWordIndex = 0;
    }

    newWordList[newWordIndex] = word;
    newWordIndex++;

    if (newWordIndex === 2) {
      newWordList[newWordIndex] = getMergeResult(
        newWordList[0],
        newWordList[1]
      );
      addWordToWordBoard(newWordList[newWordIndex]);
    }

    setNextWordIndex(newWordIndex);
    setMergeWordList(newWordList);

    console.log(newWordIndex);
    console.log(newWordList);
  };

  const createWordMatrix = () => {
    let result = [];
    let wordRow = [];
    for (let i = 0; i < wordList.length; i++) {
      if (i > 0 && i % 8 === 0) {
        result.push(
          <WordRow key={wordRow.toString()} words={wordRow}></WordRow>
        );
        wordRow = [];
      }
      wordRow.push(
        <Word
          key={i}
          onClick={() => {
            addWordToMerge(wordList[i]);
          }}
        >
          {wordList[i]}
        </Word>
      );
    }
    result.push(<WordRow key={wordRow.toString()} words={wordRow}></WordRow>);
    return result;
  };

  return (
    <BaseContainer className="wordboard container">
      {createWordMatrix()}
    </BaseContainer>
  );
};

export default WordBoard;
