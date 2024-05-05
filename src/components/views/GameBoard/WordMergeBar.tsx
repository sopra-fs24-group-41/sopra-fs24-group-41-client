import React, { useContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import PropTypes from "prop-types";
import WordButton from "./WordButton";
import PlayerWord from "models/PlayerWord";
import { mergeWordListContext } from "./WordBoard";

const WordMergeBar = ({ removeWordFunction }) => {
    const { mergeWordList, setMergeWordList } = useContext(mergeWordListContext);

    const formatPlayerWord = (playerWord: PlayerWord, placeholder: string) => {
        if (playerWord !== null && playerWord !== undefined) return playerWord.word.name;

        return placeholder.repeat(10);
    };

    return (
        <BaseContainer className="word-merge-bar container">
            <WordButton key={1} onClick={removeWordFunction}>{formatPlayerWord(mergeWordList[0], "-")}</WordButton>
            <div className="word-merge-bar symbol">+</div>
            <WordButton key={2}>{formatPlayerWord(mergeWordList[1], "-")}</WordButton>
            <div className="word-merge-bar symbol">=</div>
            <WordButton key={3}>{formatPlayerWord(mergeWordList[2], "?")}</WordButton>
        </BaseContainer>
    );
};

WordMergeBar.propTypes = {
    removeWordFunction: PropTypes.func,
};

export default WordMergeBar;
