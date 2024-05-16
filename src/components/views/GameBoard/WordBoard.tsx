import React, { createContext, useContext, useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import PlayerWord from "models/PlayerWord";
import WordButton from "./WordButton";
import { playerContext } from "./Game";
import WordMergeBar from "./WordMergeBar";
import { Button } from "components/ui/Button";

export const mergeWordListContext = createContext([]);

export const nextWordIndexContext = createContext(0);

const WordBoard = ({ playFunction }) => {
    const [mergeWordList, setMergeWordList] = useState<String[]>([]);
    const [nextWordIndex, setNextWordIndex] = useState<number>(0);
    const [searchWord, setSearchWord] = useState<string>("");
    const { player } = useContext(playerContext);

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

    const formatWord = (playerWord: PlayerWord) => {
        let result = playerWord.word.name;
        if (playerWord.uses !== null && playerWord.uses !== undefined && playerWord.uses > 0) {
            result += " " + playerWord.uses.toString();
        }

        return result;
    };

    const wordAvailable = (playerWord: PlayerWord) => {
        return playerWord.uses === null || playerWord.uses === undefined || playerWord.uses > 0;
    }

    const isNew = (playerWord: PlayerWord) => {
        if (playerWord !== null && playerWord !== undefined) {
            return playerWord.word.newlyDiscovered
        }

        return false
    }


    const removeWord = () => {
        if (nextWordIndex !== 1) {
            return;
        }

        if (mergeWordList[0].uses !== null && mergeWordList[0].uses !== undefined && !isNaN(mergeWordList[0])) {
            mergeWordList[0].uses += 1;
        }

        setNextWordIndex(0);
        setMergeWordList([null, null, null]);
    };

    
    const WordList = player.playerWords.filter((playerWord) =>
        playerWord.word.name.toLowerCase().includes(searchWord.toLowerCase())
    );

    return (
        <BaseContainer className="game vertical-container">
            <mergeWordListContext.Provider value={{ mergeWordList, setMergeWordList }}>
                <nextWordIndexContext.Provider value={{ nextWordIndex, setNextWordIndex }}>
                    <WordMergeBar removeWordFunction={removeWord}></WordMergeBar>
                </nextWordIndexContext.Provider>
            </mergeWordListContext.Provider>
            <BaseContainer className="word-board container">
                <div className="search-bar">
                    <input className="search-input-css"
                        type="text"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        placeholder="Search words..."
                    />
                    <Button onClick={() => setSearchWord("")}>✖️</Button>
                </div>
                <div className="word-table">
                    {WordList.map((playerWord, index) => (
                        <WordButton
                            key={index}
                            onClick={() => {
                                addWordToMerge(playerWord);
                            }}
                            className={isNew(player.playerWords[index]) ? "glow" : ""}
                            disabled={!wordAvailable(playerWord)}
                        >
                            {formatWord(playerWord)}
                        </WordButton>
                    ))}
                </div>
            </BaseContainer>
        </BaseContainer>
    );
};

WordBoard.propTypes = {
    playFunction: PropTypes.func,
};

export default WordBoard;