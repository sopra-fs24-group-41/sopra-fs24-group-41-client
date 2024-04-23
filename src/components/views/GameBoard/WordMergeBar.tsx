import React, { useEffect, useState, useContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordButton from "./WordButton";
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
            <WordButton key={1} onClick={removeWord}>{formatWord(mergeWordList[0], "-")}</WordButton>
            <div className="wordmergebar symbol">+</div>
            <WordButton key={2}>{formatWord(mergeWordList[1], "-")}</WordButton>
            <div className="wordmergebar symbol">=</div>
            <WordButton key={3}>{formatWord(mergeWordList[2], "?")}</WordButton>
        </BaseContainer>
    );
};

export default WordMergeBar;
