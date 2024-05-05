import React, { createContext, useContext, useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import Word from "models/Word";
import PlayerWord from "models/PlayerWord";
import WordButton from "./WordButton";
import Game, {playerContext} from "./Game";
import WordMergeBar from "./WordMergeBar";

export const mergeWordListContext = createContext([]);

export const nextWordIndexContext = createContext(0);

const WordRow = (props) => {
    return (
        <div {...props} className="word-row">
            {" "}
            {props.children}{" "}
        </div>
    );
};

WordRow.propTypes = {
    children: PropTypes.node,
};

const WordBoard = ({ playFunction }: { playFunction: (arg0: any, arg1: any) => any }) => {
    const [mergeWordList, setMergeWordList] = useState<String[]>([]);
    const [nextWordIndex, setNextWordIndex] = useState<number>(0);
    const { player } = useContext(playerContext);
    const rowLength = 8;

    const addWordToMerge = async (playerWord: PlayerWord) => {
        let newWordIndex = nextWordIndex;
        let newWordList = mergeWordList;

        if (newWordIndex === 2) {
            newWordList = [null, null, null];
            newWordIndex = 0;
        }

        if (playerWord.uses !== null) {
            playerWord.uses -= 1;
        }

        newWordList[newWordIndex] = playerWord;
        newWordIndex++;

        if (newWordIndex === 2) {
            newWordList[newWordIndex] = await playFunction(
                newWordList[0],
                newWordList[1]
            );
        }

        setNextWordIndex(newWordIndex);
        setMergeWordList(newWordList);
    };

    const formatWord = (playerWord : PlayerWord) => {
        let result = playerWord.word.name;
        if (playerWord.uses !== null && playerWord.uses !== undefined && playerWord.uses > 0) {
            result += " " + playerWord.uses.toString();
        }

        return result;
    }

    const wordAvailable = (playerWord : PlayerWord) => {
        return playerWord.uses === null || playerWord.uses === undefined || playerWord.uses > 0;
    }

    const createWordMatrix = () => {
        let matrix = [];
        let row = [];

        for (let i = 0; i < player.playerWords.length; i++) {
            if (i > 0 && i % rowLength === 0) {
                matrix.push(<WordRow key={matrix.length}>{row}</WordRow>);
                row = [];
            }

            row.push(
                <WordButton
                    key={i}
                    onClick={() => {
                        addWordToMerge(player.playerWords[i]);
                    }}
                    disabled={!wordAvailable(player.playerWords[i])}
                >
                    {formatWord(player.playerWords[i])}
                </WordButton>
            );
        }

        matrix.push(<WordRow key={matrix.length}>{row}</WordRow>);

        return matrix;
    };

    useEffect(() => {
        createWordMatrix();
    }, [player]);

    const removeWord = () => {
        // Assumption: this is always executed only when `nextWordIndex` = 1.
        if (nextWordIndex !== 1)
            return;

        let newNextWordIndex = 0;
        let newMergeWordList = mergeWordList;
        mergeWordList[newNextWordIndex].uses += 1;
        newMergeWordList[newNextWordIndex] = null;

        setNextWordIndex(newNextWordIndex);
        setMergeWordList(newMergeWordList);
        createWordMatrix();
    }

    return (
        <BaseContainer className="game vertical-container">
            <mergeWordListContext.Provider value={{ mergeWordList, setMergeWordList }}>
                <nextWordIndexContext.Provider value={{ nextWordIndex, setNextWordIndex }}>
                    <WordMergeBar removeWordFunction={removeWord}></WordMergeBar>
                </nextWordIndexContext.Provider>
            </mergeWordListContext.Provider>
            <BaseContainer className="word-board container">
                {createWordMatrix()}
            </BaseContainer>
        </BaseContainer>
    );
};

WordBoard.propTypes = {
    playFunction: PropTypes.func,
};

export default WordBoard;
