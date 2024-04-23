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

const TargetWord = () => {
    const [targetWord, setTargetWord] = useState<String>("");

    useEffect(() => {
        const fetchTargetWord = async () => {
            try {
                setTargetWord("target word");
            } catch (error) {
                alert(
                    `Something went wrong while fetching the target word: \n${handleError(
                        error
                    )}`
                );
            }
        };

        fetchTargetWord();
    }, []);

    return (
        <BaseContainer className="targetword container">
            <div className="targetword text">Target word:</div>
            <Word key={0} className="targetword word">
                {targetWord}
            </Word>
        </BaseContainer>
    );
};

export default TargetWord;