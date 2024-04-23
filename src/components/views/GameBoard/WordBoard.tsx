import React, { useEffect, useState, useContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import Word from "models/Word";
import WordButton from "./WordButton";
import { api, handleError } from "helpers/api";
import { nextWordIndexContext, mergeWordListContext, wordListContext, playerContext} from "./Game";

const WordRow = ({ key, words }) => {
    return <div className="wordrow"> {words} </div>;
};

WordRow.propTypes = {
    key: PropTypes.string,
    words: PropTypes.node,
};

const WordBoard = () => {
    const { nextWordIndex, setNextWordIndex } =
    useContext(nextWordIndexContext);
    const { mergeWordList, setMergeWordList } =
    useContext(mergeWordListContext);
    const { wordList, setWordList } =
    useContext(wordListContext);
    const { player, setPlayer} =
    useContext(playerContext);

    const addWordToWordBoard = (name: string) => {
        let i;
        // See first if the given word is already discovered.
        for (i = 0; i < wordList.length; i++) if (name === wordList[i].name) break;
        if (i === wordList.length) setWordList([...wordList, new Word({name : name})]);
    };

    const play = async (word1: string, word2: string) => {
        try {
            let response = await api.put(`/lobbies/${player.lobbyCode}/players/${player.id}`,
                [new Word({name : word1}), new Word({name : word2})],
                { headers: { "playerToken": player.token } });
            player.points = response.data.points;
            player.playerWords = response.data.playerWords;
            player.targetWord = response.data.targetWord;
            
            return response.data.resultWord.name;

        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const addWordToMerge = async (word: string) => {
        let newWordIndex = nextWordIndex;
        let newWordList = mergeWordList;

        if (newWordIndex === 2) {
            newWordList = ["", "", ""];
            newWordIndex = 0;
        }

        newWordList[newWordIndex] = word;
        newWordIndex++;

        if (newWordIndex === 2) {
            newWordList[newWordIndex] = await play(
                newWordList[0],
                newWordList[1],
            );
            addWordToWordBoard(newWordList[newWordIndex]);
        }

        setNextWordIndex(newWordIndex);
        setMergeWordList(newWordList);
    };

    const createWordMatrix = () => {
        let result = [];
        let wordRow = [];
        for (let i = 0; i < wordList.length; i++) {
            if (i > 0 && i % 8 === 0) {
                result.push(
                    <WordRow key={wordRow.toString()} words={wordRow}></WordRow>,
                );
                wordRow = [];
            }
            wordRow.push(
                <WordButton
                    key={i}
                    onClick={() => {
                        addWordToMerge(wordList[i].name);
                    }}
                >
                    {wordList[i].name}
                </WordButton>,
            );
        }
        result.push(
            <WordRow key={wordRow.toString()} words={wordRow}></WordRow>,
        );

        return result;
    };

    return (
        <BaseContainer className="wordboard container">
            {createWordMatrix()}
        </BaseContainer>
    );
};

export default WordBoard;
