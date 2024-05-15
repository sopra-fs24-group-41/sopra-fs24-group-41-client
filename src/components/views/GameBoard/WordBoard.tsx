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
        if (nextWordIndex === 2) {
            return;
        }

        let newWordIndex = nextWordIndex;
        let newWordList = mergeWordList;

        if (nextWordIndex === 0) {
            newWordList = [null, null, null];
        }

        newWordList[newWordIndex] = playerWord;
        newWordIndex++;

        if (playerWord.uses !== null && playerWord.uses !== undefined && !isNaN(playerWord.uses)) {
            playerWord.uses -= 1;
        }

        setNextWordIndex(newWordIndex);
        setMergeWordList(newWordList);
    };

    useEffect(() => {
        const executePlayFunction = async () => {
            if (nextWordIndex === 2) {
                const result = await playFunction(mergeWordList[0], mergeWordList[1]);
                setMergeWordList(prev => [...prev.slice(0, 2), result]);
                setNextWordIndex(0);
            }
        };

        executePlayFunction();
    }, [nextWordIndex]);

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

    const isNew = (playerWord: PlayerWord) => {
        if (playerWord !== null && playerWord !== undefined) {
            return playerWord.word.newlyDiscovered
        }

        return false
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
                    className={isNew(player.playerWords[i]) ? "glow" : ""}
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
        if (nextWordIndex !== 1) {
            return;
        }

        if (mergeWordList[0].uses !== null && mergeWordList[0].uses !== undefined && !isNaN(mergeWordList[0])) {
            mergeWordList[0].uses += 1;
        }

        setNextWordIndex(0);
        setMergeWordList([null, null, null]);
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
