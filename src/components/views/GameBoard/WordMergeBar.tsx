import React, { useEffect, useState, useContext } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

import Word from "./Word";
import { nextWordIndexContext, mergeWordListContext } from "./Game";

const WordMergeBar = () => {
    const { nextWordIndex, setNextWordIndex } =
        useContext(nextWordIndexContext);
    const { mergeWordList, setMergeWordList } =
        useContext(mergeWordListContext);

    const removeWord = () => {
        // Assumption: this is always executed only when `nextWordIndex` = 1.
        if (nextWordIndex !== 1)
            return;

        let newNextWordIndex = 0;
        let newMergeWordList = mergeWordList;
        newMergeWordList[newNextWordIndex] = "";

        setNextWordIndex(newNextWordIndex);
        setMergeWordList(newMergeWordList);
    }

    const formatWord = (word: string, placeholder: string) => {
        if (word !== null && word !== undefined && word !== "") return word;

        return placeholder.repeat(10);
    };

    return (
        <BaseContainer className="wordmergebar container">
            <Word key={1} onClick={removeWord}>{formatWord(mergeWordList[0], "-")}</Word>
            <div className="wordmergebar symbol">+</div>
            <Word key={2}>{formatWord(mergeWordList[1], "-")}</Word>
            <div className="wordmergebar symbol">=</div>
            <Word key={3}>{formatWord(mergeWordList[2], "?")}</Word>
        </BaseContainer>
    );
};

export default WordMergeBar;
