import React, { useEffect, useState, createContext, useContext } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";
import WordBoard from "./WordBoard";
import WordMergeBar from "./WordMergeBar";
import TargetWord from "./TargetWord";

export const nextWordIndexContext = createContext(123);

export const mergeWordListContext = createContext([]);

const Game = () => {
    const [nextWordIndex, setNextWordIndex] = useState(0);
    const [mergeWordList, setMergeWordList] = useState<String>([]);

    return (
        <div>
            <BaseContainer>
                <TargetWord></TargetWord>
            </BaseContainer>
            <BaseContainer className="game container">
                <nextWordIndexContext.Provider
                    value={{ nextWordIndex, setNextWordIndex }}
                >
                    <mergeWordListContext.Provider
                        value={{ mergeWordList, setMergeWordList }}
                    >
                        <WordMergeBar></WordMergeBar>
                        <WordBoard></WordBoard>
                    </mergeWordListContext.Provider>
                </nextWordIndexContext.Provider>
            </BaseContainer>
        </div>
    );
};

export default Game;
